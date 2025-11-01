import { type NextRequest, NextResponse } from "next/server";
import {
  fetchLibraryImages,
  normalizeLibraryItem,
} from "@/lib/adapters/library";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const nasaId = searchParams.get("nasa_id") || undefined;

  try {
    const response = await fetchLibraryImages(Number.parseInt(page), nasaId);
    const normalizedItems = response.collection.items
      .map(normalizeLibraryItem)
      .filter(Boolean);

    return NextResponse.json(normalizedItems);
  } catch (error) {
    console.error("Image Search API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}
