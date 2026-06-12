import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().regex(/^9[678]\d{8}$/, "Enter a valid Nepali mobile number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  line1: z.string().min(5, "Street address is required"),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  district: z.string().min(1, "Select a district"),
  province: z.string().min(1, "Select a province"),
  pincode: z.string().regex(/^\d{5}$/, "5-digit postal code"),
});

export const shippingSchema = z.object({
  method: z.enum(["standard", "express", "pickup"]),
});

export const paymentSchema = z.discriminatedUnion("method", [
  z.object({ method: z.literal("cod") }),
  z.object({ method: z.literal("esewa") }),
  z.object({ method: z.literal("khalti") }),
  z.object({
    method: z.literal("bank_transfer"),
    slipPath: z.string().min(1, "Please upload your payment slip"),
  }),
]);

export const reviewSchema = z.object({
  termsAccepted: z.boolean().refine((v) => v === true, {
    message: "Please accept the terms & conditions",
  }),
});

export type AddressForm = z.infer<typeof addressSchema>;
export type ShippingForm = z.infer<typeof shippingSchema>;
export type PaymentForm = z.infer<typeof paymentSchema>;