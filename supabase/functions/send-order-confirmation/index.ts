// Supabase Edge Function: send-order-confirmation
// Sends order confirmation email via Resend

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "orders@maisonfurniture.com.np";

interface OrderConfirmationPayload {
  orderId: string;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { orderId }: OrderConfirmationPayload = await req.json();

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

    // Build email HTML
    const itemsHtml = (order.order_items ?? [])
      .map(
        (item: any) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #EFEAE2;">
            <strong>${item.name}</strong><br/>
            <span style="color: #8A7E72; font-size: 13px;">${item.variant_label}</span>
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #EFEAE2; text-align: center;">
            ${item.quantity}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #EFEAE2; text-align: right;">
            NPR ${(item.price * item.quantity).toLocaleString()}
          </td>
        </tr>`
      )
      .join("");

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin: 0; padding: 0; background: #F8F5F0; font-family: system-ui, -apple-system, sans-serif; color: #2A2A2A;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 28px; color: #3B2314; margin: 0;">Maison Furniture</h1>
          <p style="color: #8A7E72; margin-top: 8px;">Order Confirmation</p>
        </div>

        <!-- Card -->
        <div style="background: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 16px rgba(59,35,20,0.06);">
          <p style="margin: 0 0 8px;">Hi ${order.shipping_address?.name ?? "there"},</p>
          <p style="color: #8A7E72; margin: 0 0 24px;">
            Thank you for your order! We've received your order and will begin processing it shortly.
          </p>

          <!-- Order Info -->
          <div style="background: #F8F5F0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <table style="width: 100%; font-size: 14px;">
              <tr>
                <td style="color: #8A7E72;">Order Number</td>
                <td style="text-align: right; font-weight: 600;">${order.order_number}</td>
              </tr>
              <tr>
                <td style="color: #8A7E72; padding-top: 8px;">Payment Method</td>
                <td style="text-align: right; padding-top: 8px; text-transform: capitalize;">${order.payment_method?.replace("_", " ")}</td>
              </tr>
              <tr>
                <td style="color: #8A7E72; padding-top: 8px;">Shipping</td>
                <td style="text-align: right; padding-top: 8px; text-transform: capitalize;">${order.shipping_method?.replace("_", " ")}</td>
              </tr>
            </table>
          </div>

          <!-- Items -->
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 2px solid #3B2314;">
                <th style="padding: 12px; text-align: left;">Item</th>
                <th style="padding: 12px; text-align: center;">Qty</th>
                <th style="padding: 12px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>

          <!-- Totals -->
          <div style="margin-top: 24px; font-size: 14px;">
            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
              <span style="color: #8A7E72;">Subtotal</span>
              <span>NPR ${Number(order.subtotal).toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
              <span style="color: #8A7E72;">Shipping</span>
              <span>${order.shipping_cost == 0 ? "Free" : `NPR ${Number(order.shipping_cost).toLocaleString()}`}</span>
            </div>
            ${order.discount_amount > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 4px 0; color: #4A7C59;">
              <span>Discount</span>
              <span>-NPR ${Number(order.discount_amount).toLocaleString()}</span>
            </div>
            ` : ""}
            <div style="display: flex; justify-content: space-between; padding: 12px 0 0; border-top: 2px solid #3B2314; font-size: 18px; font-weight: 600;">
              <span>Total</span>
              <span>NPR ${Number(order.total).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 32px; color: #8A7E72; font-size: 13px;">
          <p>Need help? Reply to this email or call us at +977-01-5555555</p>
          <p style="margin-top: 8px;">Maison Furniture · Durbar Marg, Kathmandu</p>
        </div>
      </div>
    </body>
    </html>`;

    // Send via Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: order.email,
        subject: `Order Confirmed — ${order.order_number}`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errText = await emailResponse.text();
      console.error("Resend API error:", errText);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const emailResult = await emailResponse.json();

    return new Response(
      JSON.stringify({ success: true, emailId: emailResult.id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Email send error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to send confirmation" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
