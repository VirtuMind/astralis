import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Astralis - Scroll through the cosmos",
  description:
    "Explore stunning images and videos from NASA's vast collection of space exploration media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`m-0 p-0 font-sans ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <Header />
        <div className="min-h-screen">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
