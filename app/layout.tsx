import type { Metadata } from "next";
import "./globals.css"; // <--- HUU MSTARI NDIO MUHIMU KULIKO YOTE!

export const metadata: Metadata = {
  title: "MoTech-i ERP",
  description: "Professional Auto Garage Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}