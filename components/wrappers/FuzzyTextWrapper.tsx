"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const FuzzyText = dynamic(() => import("@/components/FuzzyText"), {
  ssr: false,
});

interface FuzzyTextWrapperProps {
  children: ReactNode;
  baseIntensity?: number;
  hoverIntensity?: number;
  enableHover?: boolean;
}

export const FuzzyTextWrapper = ({
  children,
  baseIntensity = 0.2,
  hoverIntensity = 0.5,
  enableHover = true,
}: FuzzyTextWrapperProps) => {
  return (
    <FuzzyText
      baseIntensity={baseIntensity}
      hoverIntensity={hoverIntensity}
      enableHover={enableHover}
    >
      {children}
    </FuzzyText>
  );
};
