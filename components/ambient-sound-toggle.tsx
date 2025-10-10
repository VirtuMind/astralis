"use client";

import { Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { useAmbientSound } from "@/hooks/use-ambient-sound";
import { cn } from "@/lib/utils";

interface AmbientSoundToggleProps {
  className?: string;
}

export function AmbientSoundToggle({ className }: AmbientSoundToggleProps) {
  const { isPlaying, toggle, isLoaded } = useAmbientSound();

  if (!isLoaded) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-pressed={isPlaying}
      className={cn("relative h-9 w-9", className)}
      aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
      title={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 animate-pulse rounded-full bg-primary" />
        </>
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
    </Button>
  );
}
