import { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://astralis.khoubaz.com"),
  title: "Explore in depth",
};

export default function ItemDetailsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
