import React from "react";
import { AuthProvider } from "@/components/admin/AuthProvider";
import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
  title: "Admin Portal & Dashboard | Zubyte Solution",
  description: "Administrative control center for Zubyte Solution services, products, case studies, and inquiries.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootAdminLayout({ children }) {
  return (
    <AuthProvider>
      <AdminLayout>{children}</AdminLayout>
    </AuthProvider>
  );
}

