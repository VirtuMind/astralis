import { type NextRequest, NextResponse } from "next/server";
import {
  fetchLibraryImages,
  fetchLibraryItem,
  normalizeLibraryItem,
} from "@/lib/adapters/library";
import { cache } from "@/lib/cache";
import { NormalizedLibraryItem } from "@/lib/types";

export async function GET(request: NextRequest) {
  // Build a robust cache key
  const page = request.nextUrl.searchParams.get("page") || "all";
  const cacheKey = `library-search-${page}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    return NextResponse.json(cached);
  }

  try {
    // Make all 4 API calls in parallel
    const fetchPromises = Array.from({ length: 4 }, () => fetchLibraryImages());

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

    // Cache the final result for 5 minutes
    cache.set(cacheKey, shuffledResult, 5);

    return NextResponse.json(shuffledResult);
  } catch (error) {
    console.error("Image Search API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}
