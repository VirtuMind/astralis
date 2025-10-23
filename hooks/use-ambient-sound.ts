"use client";

import { useEffect, useState, useRef } from "react";

export function useAmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false); // disabled by default
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/ambient.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = "auto";

    audio.addEventListener("canplaythrough", () => setIsLoaded(true));

    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;

    if (isPlaying) {
      audio
        .play()
        .catch((err) =>
          console.warn("Playback blocked until user gesture:", err)
        );
    } else {
      audio.pause();
    }
  }, [isPlaying, isLoaded]);

  const toggle = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);

    const audio = audioRef.current;
    if (!audio) return;

    if (newState) {
      audio.play().catch((err) => {
        console.warn("Playback blocked:", err);
      });
    } else {
      audio.pause();
    }
  };

  return { isPlaying, toggle, isLoaded };
}
