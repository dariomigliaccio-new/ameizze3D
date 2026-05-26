import AdminSidebar from "./components/AdminSidebar";

export const metadata = { title: "Ameizze Manager" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
