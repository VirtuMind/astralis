import { type NextRequest, NextResponse } from "next/server";
import { fetchAPOD, normalizeAPOD } from "@/lib/adapters/apod";
import { cache } from "@/lib/cache";

const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let date = searchParams.get("date");

  if (!date) {
    const start = new Date(1995, 5, 16);
    const end = new Date();
    const randomTime =
      start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);
    date = randomDate.toISOString().split("T")[0];
  }

  console.log("Fetching APOD for date:", date);

  const cacheKey = `apod-${date}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    return NextResponse.json(cached);
  }

  try {
    const item = await fetchAPOD(NASA_API_KEY, date || "");
    const normalized = normalizeAPOD(item);

    // Cache for 1 hour
    cache.set(cacheKey, normalized, 60);
    return NextResponse.json(normalized);
  } catch (error) {
    console.error("APOD API error:", error);

    const status = parseInt((error as Error).message) || 500;

    return NextResponse.json({ error: true }, { status });
  }
}
