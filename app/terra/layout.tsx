import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terra, Earth Observation Imagery",
};

export default function TerraLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
