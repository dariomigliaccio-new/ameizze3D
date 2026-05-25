import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminSidebar from "./components/AdminSidebar";

export const metadata = { title: "Ameizze Manager" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
