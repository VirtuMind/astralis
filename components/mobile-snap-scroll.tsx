"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ExternalLink, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

  const handlePrevious = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Snap scroll container */}
      <div
        ref={containerRef}
        className="h-full snap-y snap-mandatory overflow-y-scroll"
      >
        {items.map((item, index) => (
          <div
            key={item.nasa_id}
            className="relative h-screen w-full snap-start snap-always"
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src={item.thumbnailUrl || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
                priority={index < 3}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/90" />
            </div>

            {/* Content overlay */}
            <div className="relative flex h-full flex-col justify-between p-4 pb-safe">
              {/* Top info */}
              <div className="flex items-start justify-between pt-20">
                <Badge
                  variant="secondary"
                  className="gap-1 bg-background/80 backdrop-blur-sm"
                >
                  <Calendar className="h-3 w-3" />
                  {new Date(item.date).toLocaleDateString()}
                </Badge>

                <Badge
                  variant="secondary"
                  className="bg-background/80 backdrop-blur-sm"
                >
                  {index + 1} / {items.length}
                </Badge>
              </div>

              {/* Bottom info */}
              <div className="space-y-3">
                <div>
                  <h2 className="mb-2 font-bold text-2xl text-balance leading-tight text-white drop-shadow-lg">
                    {item.title}
                  </h2>

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

                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <Link href={`/item/${item.nasa_id}`}>View Details</Link>
                  </Button>

                  {item.hdImageUrl && (
                    <Button asChild size="sm" variant="secondary">
                      <a
                        href={item.hdImageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex h-screen w-full snap-start items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}
      </div>

      {/* Navigation arrows */}
      {/* <div className="pointer-events-none absolute inset-y-0 right-4 flex flex-col items-center justify-center gap-4">
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "pointer-events-auto h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm",
            currentIndex === 0 && "opacity-50"
          )}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          aria-label="Previous item"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "pointer-events-auto h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm",
            currentIndex === items.length - 1 && !hasMore && "opacity-50"
          )}
          onClick={handleNext}
          disabled={currentIndex === items.length - 1 && !hasMore}
          aria-label="Next item"
        >
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div> */}
    </div>
  );
}
