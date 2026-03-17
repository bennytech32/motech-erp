// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // HII NDIO INAYORUDISHA RANGI NA MPANGILIO

export const metadata: Metadata = {
  title: "MoTech-i | Premium Auto Care",
  description: "Intelligent Autoworks Management System",
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