"use client";

import { useMobile } from "@/hooks/use-mobile";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Galaxy = dynamic(() => import("@/components/Galaxy"), {
  ssr: false,
});

const GalaxyWrapper = () => {
  const isMobile = useMobile();
  const pathname = usePathname();

  const isHome = pathname === "/";

  if (isHome && isMobile) return null;
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
};

export default GalaxyWrapper;
