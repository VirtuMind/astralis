"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { MasonryGrid } from "@/components/masonry-grid";
import { MobileSnapScroll } from "@/components/mobile-snap-scroll";
import { useLibrarySearch } from "@/hooks/use-library";
import { useMobile } from "@/hooks/use-mobile";
import { NormalizedLibraryItem } from "@/lib/types";

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

  if (error) {
    return (
      <>
        <main className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="mb-2 font-bold text-2xl text-foreground">
              Failed to load media
            </h2>
            <p className="text-muted-foreground">Please try again later</p>
          </div>
        </main>
      </>
    );
  }

  const displayItems = allItems.length > 0 ? allItems : [];

  if (isMobile && displayItems.length > 0) {
    return (
      <>
        <MobileSnapScroll
          items={displayItems}
          onLoadMore={handleLoadMore}
          hasMore={data ? data.length > displayItems.length : false}
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
