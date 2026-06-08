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
  title: "SimpleFi — The financial education most people never get",
  description:
    "A complete curriculum covering everything from how money works to how derivatives work. Built in the order that makes each concept build on the last.",
  keywords: ["financial education", "investing", "personal finance", "curriculum"],
  openGraph: {
    title: "SimpleFi",
    description: "The financial education most people never get.",
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
