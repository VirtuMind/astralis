import { type NextRequest, NextResponse } from "next/server";
import { fetchEPIC, normalizeEPIC } from "@/lib/adapters/epic";
import { cache } from "@/lib/cache";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date");

  const cacheKey = `epic-${date || "latest"}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    return NextResponse.json(cached);
  }

  try {
    const items = await fetchEPIC(date || undefined);
    const normalized = items.map(normalizeEPIC);

    // Cache for 6 hours
    cache.set(cacheKey, normalized, 360);

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("EPIC API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch EPIC data" },
      { status: 500 }
    );
  }
}
