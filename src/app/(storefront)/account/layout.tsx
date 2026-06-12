import { AccountSidebar } from "@/components/account/AccountSidebar";

export const dynamic = "force-dynamic";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-24 md:px-8">
      <h1 className="font-display text-3xl mb-8">My Account</h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <AccountSidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
