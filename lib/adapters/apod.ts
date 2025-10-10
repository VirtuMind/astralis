import type { APODItem, NormalizedMediaItem } from "@/lib/types";

export async function fetchAPOD(
  apiKey: string,
  count?: number,
  date?: string
): Promise<APODItem[]> {
  const params = new URLSearchParams({ api_key: apiKey });
  if (count) params.append("count", count.toString());
  if (date) params.append("date", date);

  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`APOD API error: ${response.statusText}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}

export function normalizeAPOD(item: APODItem): NormalizedMediaItem {
  return {
    id: `apod-${item.date}`,
    title: item.title,
    description: item.explanation,
    imageUrl: item.media_type === "image" ? item.url : item.thumbnail_url || "",
    hdImageUrl: item.hdurl,
    mediaType: item.media_type,
    date: item.date,
    source: "apod",
    copyright: item.copyright,
    videoUrl: item.media_type === "video" ? item.url : undefined,
  };
}
