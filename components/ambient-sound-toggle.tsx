"use client";

import { Volume2, VolumeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAmbientSound } from "@/hooks/use-ambient-sound";

export function AmbientSoundToggle() {
  const { isPlaying, toggle, isLoaded } = useAmbientSound();

  return (
    <div
      onClick={isLoaded ? toggle : undefined}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
      title={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
      className="h-11 w-11 cursor-pointer transition-all duration-200 opacity-60 hover:opacity-100  hover:bg-transparent hover:text-white flex justify-center items-center"
    >
      {isPlaying ? (
        <>
          <Volume2 className="h-5 w-5" />
        </>
      ) : (
        <VolumeOff className="h-5 w-5" />
      )}
    </div>
  );
}
