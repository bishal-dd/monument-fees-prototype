import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Portal - Bhutan Monument Tickets",
  description: "Verify and manage monument tickets",
};

export default function StaffLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen">{children}</div>;
}
