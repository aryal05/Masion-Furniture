// Storefront layout — MainLayoutWrapper in root layout handles all navbar/footer
// This route group only exists for sub-routes like account, wishlist, etc.
export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
