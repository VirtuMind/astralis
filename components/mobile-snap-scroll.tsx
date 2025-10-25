"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Share2, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ShareButtons } from "@/components/share-buttons";
import type { NormalizedLibraryItem } from "@/lib/types";

interface MobileSnapScrollProps {
  items: NormalizedLibraryItem[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export function MobileSnapScroll({
  items,
  onLoadMore,
  hasMore = false,
  isLoading = false,
}: MobileSnapScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showSharePanel, setShowSharePanel] = useState(false);

  // Track scroll position to update current index
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const itemHeight = window.innerHeight;
      const index = Math.round(scrollTop / itemHeight);
      setCurrentIndex(index);

      // Load more when near the end
      if (hasMore && !isLoading && onLoadMore && index >= items.length - 2) {
        onLoadMore();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [items.length, hasMore, isLoading, onLoadMore]);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const targetIndex = Math.max(0, Math.min(index, items.length - 1));
    container.scrollTo({
      top: targetIndex * window.innerHeight,
      behavior: "smooth",
    });
  };

  // Set CSS custom property for viewport height on mobile
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);

    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <div className="fixed right-6 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-6 md:hidden">
        {/* View Details Button */}
        <Link
          href={`/item/${items[currentIndex]?.nasa_id}`}
          className="text-white/60 transition-all hover:text-white/100"
        >
          <Eye className="h-8 w-8" strokeWidth={1.5} />
        </Link>

        {/* Share Button */}
        <button
          onClick={() => setShowSharePanel(!showSharePanel)}
          className="text-white/60 transition-all hover:text-white/100"
        >
          <Share2 className="h-8 w-8" strokeWidth={1.5} />
        </button>
      </div>

      {/* Share Panel Overlay */}
      {showSharePanel && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden transition-opacity duration-300"
          onClick={() => setShowSharePanel(false)}
        >
          <div
            className={`fixed bottom-0 left-0 right-0 rounded-t-3xl border-t border-white/10 bg-background/95 backdrop-blur-xl p-6 pb-8 shadow-2xl transition-transform duration-500 ease-out ${
              showSharePanel ? "translate-y-0" : "translate-y-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg text-white">
                Share this image
              </h3>
              <button
                onClick={() => setShowSharePanel(false)}
                className="text-white/60 hover:text-white text-2xl leading-none"
              >
                ✕
              </button>
            </div>
            <ShareButtons
              title={items[currentIndex]?.title || ""}
              id={items[currentIndex]?.nasa_id}
            />
          </div>
        </div>
      )}

      {/* Snap scroll container */}
      <div
        ref={containerRef}
        className="h-full snap-y snap-mandatory overflow-y-scroll"
      >
        {items.map((item, index) => (
          <div
            key={item.nasa_id}
            className="relative w-full snap-start snap-always"
            style={{ height: "calc(var(--vh, 1vh) * 100)" }}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src={item.hdImageUrl || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
                priority={index < 3}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/90" />
            </div>

            {/* Content overlay */}
            <div className="relative flex h-full flex-col justify-end p-4">
              <div className="space-y-3">
                <div>
                  <h2 className="mb-1 font-bold text-2xl text-balance leading-tight text-white drop-shadow-lg">
                    {item.title}
                  </h2>

                  {/* Date */}
                  {showDetails && (
                    <div className="mb-2 flex items-center text-white/80">
                      <time className="text-xs">
                        {new Date(item.date).toLocaleDateString()}
                      </time>
                    </div>
                  )}

                  <div
                    className={
                      "overflow-y-auto transition-all duration-300 " +
                      (showDetails ? "max-h-64" : "max-h-20")
                    }
                  >
                    <p className="text-sm text-white/90 leading-relaxed drop-shadow">
                      {item.description}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetails(!showDetails)}
                    className="mt-2 h-auto p-0 text-xs text-white/80 hover:bg-transparent hover:text-white"
                  >
                    {showDetails ? "Show less" : "Show more"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div
            className="flex w-full snap-start items-center justify-center"
            style={{ height: "calc(var(--vh, 1vh) * 100)" }}
          >
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}
