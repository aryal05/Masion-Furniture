// Supabase Edge Function: verify-khalti-payment
// Verifies Khalti payment using their lookup API and updates order status

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const KHALTI_SECRET_KEY = Deno.env.get("KHALTI_SECRET_KEY")!;
const KHALTI_BASE_URL = Deno.env.get("KHALTI_ENV") === "production"
  ? "https://khalti.com/api/v2"
  : "https://a.khalti.com/api/v2";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { pidx, orderId } = await req.json();

    if (!pidx || !orderId) {
      return new Response(
        JSON.stringify({ error: "pidx and orderId are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify payment with Khalti lookup API
    const lookupResponse = await fetch(`${KHALTI_BASE_URL}/epayment/lookup/`, {
      method: "POST",
      headers: {
        Authorization: `Key ${KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pidx }),
    });

    if (!lookupResponse.ok) {
      const errText = await lookupResponse.text();
      console.error("Khalti lookup failed:", errText);
      return new Response(
        JSON.stringify({ error: "Payment verification failed" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const lookupData = await lookupResponse.json();

    // Check payment status
    if (lookupData.status !== "Completed") {
      return new Response(
        JSON.stringify({
          error: "Payment not completed",
          status: lookupData.status,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update order in database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase
      .from("orders")
      .update({
        payment_status: "paid",
        status: "confirmed",
      })
      .eq("id", orderId);

    if (error) {
      console.error("Failed to update order:", error);
      return new Response(
        JSON.stringify({ error: "Failed to update order" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        verified: true,
        transaction_id: lookupData.transaction_id,
        amount: lookupData.total_amount,
        fee: lookupData.fee,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Khalti verification error:", err);
    return new Response(
      JSON.stringify({ error: "Verification failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
