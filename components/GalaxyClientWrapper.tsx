"use client";

import dynamic from "next/dynamic";

const Galaxy = dynamic(() => import("@/components/Galaxy"), {
  ssr: false,
});

export function GalaxyClientWrapper() {
  return (
    <Galaxy
      mouseInteraction={false}
      mouseRepulsion={false}
      density={0.8}
      glowIntensity={0.2}
    />
  );
}
