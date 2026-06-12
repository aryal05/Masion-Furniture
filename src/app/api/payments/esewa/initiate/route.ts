import { NextRequest, NextResponse } from "next/server";
import { createEsewaPaymentUrl } from "@/lib/esewa";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount } = body;

    if (!orderId || !amount) {
      return NextResponse.json(
        { error: "Order ID and amount required" },
        { status: 400 }
      );
    }

    const paymentUrl = createEsewaPaymentUrl({
      amount,
      transactionUuid: orderId,
      productCode: "MAISON",
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/esewa/callback`,
      failureUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?error=payment_failed`,
    });

    return NextResponse.json({ paymentUrl });
  } catch (error) {
    console.error("eSewa initiation error:", error);
    return NextResponse.json(
      { error: "Failed to initiate payment" },
      { status: 500 }
    );
  }
}
