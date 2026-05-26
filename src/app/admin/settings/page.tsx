import { db } from "@/lib/db";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const rows = await db.setting.findMany();
  const settings = Object.fromEntries(rows.map((s) => [s.key, s.value]));

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">Settings</h1>
      <p className="text-sm text-[#6B6866] mb-8">Manage your sender address, announcement bar, and discount modal.</p>
      <SettingsForm settings={settings} />
    </div>
  );
}
