import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <AdminDashboard />
    </div>
  );
}
