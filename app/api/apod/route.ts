import { type NextRequest, NextResponse } from "next/server";
import { fetchAPOD, normalizeAPOD } from "@/lib/adapters/apod";
import { cache } from "@/lib/cache";

const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const count = searchParams.get("count");
  const date = searchParams.get("date");

  const cacheKey = `apod-${count || "single"}-${date || "today"}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    return NextResponse.json(cached);
  }

  try {
    const items = await fetchAPOD(
      NASA_API_KEY,
      count ? Number.parseInt(count) : undefined,
      date || undefined
    );

    const normalized = items.map(normalizeAPOD);

    // Cache for 1 hour
    cache.set(cacheKey, normalized, 60);

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("APOD API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch APOD data" },
      { status: 500 }
    );
  }
}
