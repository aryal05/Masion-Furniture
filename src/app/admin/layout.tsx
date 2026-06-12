import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ivory">
      <AdminSidebar />
      <main className="ml-64 min-h-screen p-8">{children}</main>
    </div>
  );
}
