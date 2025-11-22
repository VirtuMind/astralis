"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { MasonryGrid } from "@/components/masonry-grid";
import { MobileSnapScroll } from "@/components/mobile-snap-scroll";
import { useLibrarySearch } from "@/hooks/use-library";
import { useMobile } from "@/hooks/use-mobile";
import { NormalizedLibraryItem } from "@/lib/types";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";

const ITEMS_PER_PAGE = Number.parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE!);

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allItems, setAllItems] = useState<NormalizedLibraryItem[]>([]);
  const { data, isLoading, error } = useLibrarySearch(page);
  const isMobile = useMobile();

  // Accumulate items when new data arrives
  useEffect(() => {
    if (data && data.length > 0) {
      setAllItems((prev) => {
        // Filter out duplicates
        const newItems = data.filter(
          (item) => !prev.some((p) => p.nasa_id === item.nasa_id)
        );
        return [...prev, ...newItems];
      });

      // If we got fewer items than expected, we've reached the end
      if (data.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }
    }
  }, [data]);

  // Load more when we reach the bottom
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((p) => p + 1);
    }
  }, [isLoading, hasMore, page]);

  const initialLoading =
    isLoading && allItems.length === 0 && !error && page === 1;

  if (initialLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-10 text-white/70" />
      </div>
    );
  }

  const noResultsAfterLoad =
    !isLoading && !error && allItems.length === 0 && data && data.length === 0;

  if (error || noResultsAfterLoad) {
    return (
      <>
        <div className="flex flex-1 items-center justify-center px-6 mt-32 max-w-lg mx-auto">
          <div className="text-center space-y-2">
            <Image
              src="/space-cat.png"
              alt="Space Cat"
              width={200}
              height={200}
              className="mx-auto"
            />

            <h2 className="font-bold text-xl text-white">
              This service is currently unavailable
            </h2>
            <p className="text-white/70">
              perhaps the universe is taking a break. Please try again later
            </p>
          </div>
        </div>
      </>
    );
  }

  const displayItems = allItems.length > 0 ? allItems : [];

  if (isMobile) {
    return (
      <>
        <MobileSnapScroll
          items={displayItems}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          isLoading={isLoading}
        />
      </>
    );
  }

  return (
    <MasonryGrid
      items={displayItems}
      onLoadMore={handleLoadMore}
      hasMore={hasMore}
      isLoading={isLoading}
    />
  );
}
