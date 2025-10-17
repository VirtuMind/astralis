"use client";

import dynamic from "next/dynamic";

const Galaxy = dynamic(() => import("@/components/Galaxy"), {
  ssr: false,
});

export function GalaxyWrapper() {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-full">
      <Galaxy
        mouseInteraction={false}
        mouseRepulsion={false}
        density={0.8}
        glowIntensity={0.2}
      />
    </div>
  );
}
