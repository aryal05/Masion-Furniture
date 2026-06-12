// Supabase Edge Function: verify-esewa-payment
// Verifies eSewa payment callback data and updates order status

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHmac } from "https://deno.land/std@0.208.0/node/crypto.ts";

const ESEWA_SECRET = Deno.env.get("ESEWA_SECRET_KEY")!;

interface EsewaResponse {
  transaction_code: string;
  status: string;
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
  signed_field_names: string;
  signature: string;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { encodedData, orderId } = await req.json();

    // Decode base64 response from eSewa
    const decoded: EsewaResponse = JSON.parse(atob(encodedData));

    // Verify signature
    const message = `total_amount=${decoded.total_amount},transaction_uuid=${decoded.transaction_uuid},product_code=${decoded.product_code}`;
    const expectedSignature = createHmac("sha256", ESEWA_SECRET)
      .update(message)
      .digest("base64");

    if (decoded.signature !== expectedSignature) {
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (decoded.status !== "COMPLETE") {
      return new Response(
        JSON.stringify({ error: "Payment not completed", status: decoded.status }),
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
        transaction_code: decoded.transaction_code,
        amount: decoded.total_amount,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("eSewa verification error:", err);
    return new Response(
      JSON.stringify({ error: "Verification failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
