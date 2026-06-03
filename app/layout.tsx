// app/layout.tsx — root layout with font injection

import type { Metadata } from "next";
import { Syne, Syne_Mono } from "next/font/google";
import "@/styles/globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-syne",
  display: "swap",
});

const syneMono = Syne_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-syne-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SimpleFi — Financial education that goes all the way",
  description:
    "A complete financial curriculum. From your first paycheck to your portfolio — in the exact order you need it.",
  keywords: ["financial education", "investing", "personal finance", "curriculum"],
  openGraph: {
    title: "SimpleFi",
    description: "From your first paycheck to your portfolio — in the exact order you need it.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${syneMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
