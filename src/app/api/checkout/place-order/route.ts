import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { createEsewaPaymentUrl } from "@/lib/esewa";
import { generateOrderNumber } from "@/lib/utils";
import { SHIPPING_METHODS } from "@/lib/shipping";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, address, shipping, payment, discountCode } = body;

    // Validate items exist and have stock
    const variantIds = items.map((i: any) => i.variantId);
    const { data: variants, error: variantError } = await supabaseAdmin
      .from("variants")
      .select("id, price, stock, product:products(id, name, price)")
      .in("id", variantIds);

    if (variantError || !variants?.length) {
      return NextResponse.json({ error: "Invalid items" }, { status: 400 });
    }

    // Calculate totals server-side (never trust client)
    let subtotal = 0;
    const orderItems = items.map((item: any) => {
      const variant = variants.find((v) => v.id === item.variantId);
      if (!variant) throw new Error(`Variant ${item.variantId} not found`);
      if (variant.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${(variant.product as any).name}`);
      }

      const price = variant.price ?? (variant.product as any).price;
      subtotal += price * item.quantity;

      return {
        variant_id: item.variantId,
        product_id: (variant.product as any).id,
        name: (variant.product as any).name,
        price,
        quantity: item.quantity,
      };
    });

    // Shipping cost
    const shippingMethod = SHIPPING_METHODS.find((m) => m.id === shipping.method);
    const shippingCost = shippingMethod?.cost(subtotal) ?? 0;

    // Discount (placeholder - would validate against promo_codes table)
    let discountAmount = 0;
    if (discountCode) {
      const { data: promo } = await supabaseAdmin
        .from("promo_codes")
        .select("*")
        .eq("code", discountCode.toUpperCase())
        .eq("is_active", true)
        .single();

      if (promo) {
        if (promo.type === "percentage") {
          discountAmount = Math.min(
            subtotal * (promo.value / 100),
            promo.max_discount ?? Infinity
          );
        } else {
          discountAmount = promo.value;
        }
      }
    }

    const total = subtotal + shippingCost - discountAmount;
    const orderNumber = generateOrderNumber();

    // Get user if logged in
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Create order
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: orderNumber,
        user_id: user?.id ?? null,
        email: address.email ?? user?.email,
        status: "pending",
        subtotal,
        shipping_cost: shippingCost,
        discount_amount: discountAmount,
        total,
        shipping_method: shipping.method,
        payment_method: payment.method,
        payment_status: "pending",
        shipping_address: address,
      })
      .select()
      .single();

    if (orderError) {
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    // Create order items
    await supabaseAdmin.from("order_items").insert(
      orderItems.map((item: any) => ({ ...item, order_id: order.id }))
    );

    // Decrement stock
    for (const item of items) {
      await supabaseAdmin.rpc("decrement_stock", {
        variant_id: item.variantId,
        qty: item.quantity,
      });
    }

    // Handle payment method
    if (payment.method === "esewa") {
      const paymentUrl = createEsewaPaymentUrl({
        amount: total,
        transactionUuid: order.id,
        productCode: "MAISON",
        successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/esewa/callback`,
        failureUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?error=payment`,
      });
      return NextResponse.json({ redirectUrl: paymentUrl });
    }

    if (payment.method === "khalti") {
      // Similar flow for Khalti
      return NextResponse.json({ redirectUrl: `/checkout?khalti=${order.id}` });
    }

    // COD or bank transfer - order is placed
    return NextResponse.json({ orderNumber });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
