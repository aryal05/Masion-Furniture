import { NextRequest, NextResponse } from "next/server";

const KHALTI_CONFIG = {
  secretKey: process.env.KHALTI_SECRET_KEY!,
  baseUrl: process.env.NODE_ENV === "production"
    ? "https://khalti.com/api/v2"
    : "https://a.khalti.com/api/v2",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount, customerInfo } = body;

    if (!orderId || !amount) {
      return NextResponse.json(
        { error: "Order ID and amount required" },
        { status: 400 }
      );
    }

    // Initiate Khalti payment
    const response = await fetch(`${KHALTI_CONFIG.baseUrl}/epayment/initiate/`, {
      method: "POST",
      headers: {
        Authorization: `Key ${KHALTI_CONFIG.secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/khalti/callback`,
        website_url: process.env.NEXT_PUBLIC_SITE_URL,
        amount: amount * 100, // Khalti expects paisa
        purchase_order_id: orderId,
        purchase_order_name: `Maison Order ${orderId}`,
        customer_info: customerInfo,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Khalti initiation failed");
    }

    return NextResponse.json({ paymentUrl: data.payment_url, pidx: data.pidx });
  } catch (error: any) {
    console.error("Khalti initiation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to initiate payment" },
      { status: 500 }
    );
  }
}
