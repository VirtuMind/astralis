import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/styles/globals.css";
import { Header } from "@/components/header";
import GalaxyWrapper from "@/components/wrappers/GalaxyWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://astralis.khoubaz.com"),
  title: {
    default: "Scroll through the cosmos - Astralis",
    template: "%s - Astralis",
  },
  description:
    "Explore stunning images and videos from NASA's vast collection of space exploration media",
  authors: [{ name: "Younes Khoubaz", url: "https://khoubaz.com" }],
  creator: "Younes Khoubaz",
  publisher: "Younes Khoubaz",
  icons: {
    icon: [
      {
        rel: "icon",
        url: "/favicon-dark.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        rel: "icon",
        url: "/favicon-light.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
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
        <GalaxyWrapper />
        <Header />
        <div className="relative min-h-screen">{children}</div>
      </body>
    </html>
  );
}
