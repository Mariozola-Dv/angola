import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Esta linha é a mais importante de todas

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Angola Digital Twin",
  description: "Plataforma de Inteligência Geoespacial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-pt">
      <body className={inter.className}>{children}</body>
    </html>
  );
}