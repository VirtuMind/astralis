import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cosmic Spotlight",
};

export default function CosmicSpotlightLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
