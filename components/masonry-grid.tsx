"use client";

import { useEffect, useRef, useState } from "react";
import { MediaCard } from "./media-card";
import type { NormalizedLibraryItem } from "@/lib/types";
import { Spinner } from "./ui/spinner";

interface MasonryGridProps {
  items: NormalizedLibraryItem[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export function MasonryGrid({
  items,
  onLoadMore,
  hasMore = false,
  isLoading = false,
}: MasonryGridProps) {
  const observerTarget = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);

  // Update number of columns based on screen width
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1440) setColumns(4);
      else if (width >= 1024) setColumns(3);
      else if (width >= 768) setColumns(2);
      else setColumns(1);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && onLoadMore) {
          onLoadMore();
        }
      },
      { threshold: 0.2 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, onLoadMore]);

  // Distribute items across columns evenly
  const columnItems: NormalizedLibraryItem[][] = Array.from(
    { length: columns },
    () => []
  );
  items.forEach((item, index) => {
    columnItems[index % columns].push(item);
  });

  return (
    <>
      <div
        className="grid min-h-screen"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {columnItems.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col">
            {column.map((item, itemIndex) => (
              <MediaCard
                key={item.nasa_id}
                item={item}
                priority={columnIndex === 0 && itemIndex < 2}
              />
            ))}
          </div>
        ))}
      </div>

      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-10">
          {isLoading && <Spinner className="size-8 text-white/70" />}
        </div>
      )}
    </>
  );
}
