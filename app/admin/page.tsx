import type { Metadata } from "next";
import { AdminSettingsForm } from "./AdminSettingsForm";

export const metadata: Metadata = {
  title: "Admin Panel",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return <AdminSettingsForm />;
}
