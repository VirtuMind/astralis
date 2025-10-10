import { type NextRequest, NextResponse } from "next/server";
import {
  fetchLibraryImages,
  normalizeLibraryItem,
} from "@/lib/adapters/library";
import { cache } from "@/lib/cache";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const nasaId = searchParams.get("nasa_id") || undefined;

  // Build consistent cache key
  const cacheKey = nasaId
    ? `library-search-item-${nasaId}`
    : `library-search-all-page-${page}`;

  const cached = cache.get(cacheKey);

  if (cached) {
    return NextResponse.json(cached);
  }

  try {
    const response = await fetchLibraryImages(Number.parseInt(page), nasaId);
    const normalizedItems = response.collection.items
      .map(normalizeLibraryItem)
      .filter(Boolean);

    // Cache for 30 minutes
    cache.set(cacheKey, normalizedItems, 30);

    return NextResponse.json(normalizedItems);
  } catch (error) {
    console.error("Image Search API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}
