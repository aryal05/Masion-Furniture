export const SHIPPING_METHODS = [
  { id: "standard", label: "Standard Delivery", eta: [3, 5], cost: (subtotal: number) => (subtotal >= 50000 ? 0 : 500) },
  { id: "express",  label: "Express Delivery",  eta: [1, 2], cost: () => 1500 },
  { id: "pickup",   label: "Store Pickup — Kathmandu Showroom", eta: [0, 1], cost: () => 0 },
] as const;

export function estimatedDeliveryDate(etaDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + etaDays);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}