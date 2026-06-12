import crypto from "crypto";

const ESEWA_CONFIG = {
  merchantId: process.env.ESEWA_MERCHANT_ID!,
  secretKey: process.env.ESEWA_SECRET_KEY!,
  baseUrl: process.env.NODE_ENV === "production"
    ? "https://esewa.com.np"
    : "https://uat.esewa.com.np",
};

interface EsewaPaymentParams {
  amount: number;
  taxAmount?: number;
  productServiceCharge?: number;
  productDeliveryCharge?: number;
  transactionUuid: string;
  productCode: string;
  successUrl: string;
  failureUrl: string;
}

export function generateEsewaSignature(params: EsewaPaymentParams): string {
  const message = `total_amount=${params.amount + (params.taxAmount ?? 0)},transaction_uuid=${params.transactionUuid},product_code=${params.productCode}`;
  
  return crypto
    .createHmac("sha256", ESEWA_CONFIG.secretKey)
    .update(message)
    .digest("base64");
}

export function createEsewaPaymentUrl(params: EsewaPaymentParams): string {
  const signature = generateEsewaSignature(params);

  const formData = new URLSearchParams({
    amount: params.amount.toString(),
    tax_amount: (params.taxAmount ?? 0).toString(),
    total_amount: (params.amount + (params.taxAmount ?? 0)).toString(),
    transaction_uuid: params.transactionUuid,
    product_code: params.productCode,
    product_service_charge: (params.productServiceCharge ?? 0).toString(),
    product_delivery_charge: (params.productDeliveryCharge ?? 0).toString(),
    success_url: params.successUrl,
    failure_url: params.failureUrl,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature,
  });

  return `${ESEWA_CONFIG.baseUrl}/epay/main?${formData.toString()}`;
}

export function verifyEsewaPayment(
  encodedData: string
): { verified: boolean; data: any } {
  try {
    const decoded = JSON.parse(
      Buffer.from(encodedData, "base64").toString("utf-8")
    );

    const expectedSignature = crypto
      .createHmac("sha256", ESEWA_CONFIG.secretKey)
      .update(
        `total_amount=${decoded.total_amount},transaction_uuid=${decoded.transaction_uuid},product_code=${decoded.product_code}`
      )
      .digest("base64");

    return {
      verified: decoded.signature === expectedSignature,
      data: decoded,
    };
  } catch {
    return { verified: false, data: null };
  }
}
