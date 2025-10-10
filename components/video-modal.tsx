"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "./ui/button"

interface VideoModalProps {
  url: string
  onClose: () => void
}

export function VideoModal({ url, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 h-10 w-10 rounded-full"
        onClick={onClose}
        aria-label="Close video"
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="relative h-[80vh] w-[90vw] max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={url}
          className="h-full w-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="NASA Video"
        />
      </div>
    </div>
  )
}
