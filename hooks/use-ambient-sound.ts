"use client";

import { useEffect, useState, useRef } from "react";

export function useAmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check localStorage for saved preference
    const savedPreference = localStorage.getItem("ambient-sound-enabled");
    if (savedPreference !== null) {
      setIsPlaying(savedPreference === "true");
    }

    // Create audio element
    audioRef.current = new Audio("/ambient.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.addEventListener("canplaythrough", () => {
      setIsLoaded(true);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current || !isLoaded) return;

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, isLoaded]);

  const toggle = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    localStorage.setItem("ambient-sound-enabled", String(newState));
  };

  return { isPlaying, toggle, isLoaded };
}
