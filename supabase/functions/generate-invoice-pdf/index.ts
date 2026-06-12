// Supabase Edge Function: generate-invoice-pdf
// Generates a PDF invoice for an order using jsPDF

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return new Response(
        JSON.stringify({ error: "orderId is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch order details
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate a simple text-based invoice (plain text format for maximum compatibility)
    // In production, use a proper PDF library like @react-pdf/renderer or puppeteer
    const address = order.shipping_address ?? {};
    const items = order.order_items ?? [];
    const createdAt = new Date(order.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const lines: string[] = [
      "═══════════════════════════════════════════",
      "              MAISON FURNITURE              ",
      "         Premium Handcrafted Furniture       ",
      "═══════════════════════════════════════════",
      "",
      `  INVOICE                                   `,
      `  Order:    ${order.order_number}`,
      `  Date:     ${createdAt}`,
      `  Status:   ${order.status.toUpperCase()}`,
      `  Payment:  ${order.payment_method?.replace("_", " ").toUpperCase()}`,
      "",
      "───────────────────────────────────────────",
      "  BILL TO:",
      `  ${address.name ?? ""}`,
      `  ${address.line1 ?? ""}`,
      address.line2 ? `  ${address.line2}` : "",
      `  ${address.city ?? ""}, ${address.district ?? ""}`,
      `  ${address.province ?? ""} ${address.pincode ?? ""}`,
      `  Phone: ${address.phone ?? ""}`,
      "",
      "───────────────────────────────────────────",
      "  ITEMS",
      "───────────────────────────────────────────",
    ].filter(Boolean);

    items.forEach((item: any) => {
      const total = item.price * item.quantity;
      lines.push(
        `  ${item.name}`,
        `    ${item.variant_label} × ${item.quantity}`,
        `    NPR ${total.toLocaleString()}`,
        ""
      );
    });

    lines.push(
      "───────────────────────────────────────────",
      `  Subtotal:              NPR ${Number(order.subtotal).toLocaleString()}`,
      `  Shipping:              ${order.shipping_cost == 0 ? "FREE" : `NPR ${Number(order.shipping_cost).toLocaleString()}`}`,
    );

    if (order.discount_amount > 0) {
      lines.push(
        `  Discount:             -NPR ${Number(order.discount_amount).toLocaleString()}`
      );
    }

    lines.push(
      "═══════════════════════════════════════════",
      `  TOTAL:                 NPR ${Number(order.total).toLocaleString()}`,
      "═══════════════════════════════════════════",
      "",
      "  Thank you for shopping with Maison Furniture!",
      "  Durbar Marg, Kathmandu, Nepal",
      "  +977-01-5555555 | info@maisonfurniture.com.np",
      "",
      `  Generated on ${new Date().toLocaleDateString("en-US")}`,
    );

    const invoiceText = lines.join("\n");

    // Upload invoice to storage
    const fileName = `invoices/${order.order_number}.txt`;
    const { error: uploadError } = await supabase.storage
      .from("payment-slips")
      .upload(fileName, new TextEncoder().encode(invoiceText), {
        contentType: "text/plain",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
    }

    return new Response(invoiceText, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="invoice-${order.order_number}.txt"`,
      },
    });
  } catch (err) {
    console.error("Invoice generation error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to generate invoice" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
