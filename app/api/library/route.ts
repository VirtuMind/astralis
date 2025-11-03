import { type NextRequest, NextResponse } from "next/server";
import {
  fetchLibraryImages,
  fetchLibraryItem,
  normalizeLibraryItem,
} from "@/lib/adapters/library";
import { cache } from "@/lib/cache";
import { NormalizedLibraryItem } from "@/lib/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";

  // Build a cache key
  const cacheKey = `library-search-all-page-${page}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    console.log("Returning cached data for key:", cacheKey);
    return NextResponse.json(cached);
  }

  try {
    // Make all 4 API calls in parallel
    const fetchPromises = Array.from({ length: 4 }, () =>
      fetchLibraryImages(Number.parseInt(page))
    );

    const responses = await Promise.all(fetchPromises);

    // Normalize and combine results
    const result: NormalizedLibraryItem[] = responses.flatMap((response) =>
      response.collection.items.map(normalizeLibraryItem).filter(Boolean)
    ) as NormalizedLibraryItem[];

    // Remove duplicates based on nasa_id
    const uniqueItems = Array.from(
      new Map(result.map((item) => [item.nasa_id, item])).values()
    );

    // Shuffle results to mix items from different fetches
    const shuffledResult = uniqueItems.sort(() => Math.random() - 0.5);

    // Cache the final result for 30 minutes
    cache.set(cacheKey, shuffledResult, 30);

    return NextResponse.json(shuffledResult);
  } catch (error) {
    console.error("Image Search API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}
