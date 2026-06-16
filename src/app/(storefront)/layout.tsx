// Storefront layout — navbar/footer are now in root layout
// This route group only exists for sub-routes like account, wishlist, etc.
export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
