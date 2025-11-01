import type { APODItem, NormalizedAPODItem } from "@/lib/types";

export async function fetchAPOD(
  apiKey: string,
  date: string
): Promise<APODItem> {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`,
      { signal: AbortSignal.timeout(10000) }
    );

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      throw new Error("504");
    }
    throw error;
  }
}

export function normalizeAPOD(item: APODItem): NormalizedAPODItem {
  return {
    date: item.date,
    title: item.title,
    description: item.explanation,
    mediaType: item.media_type,
    url: item.media_type === "image" ? item.hdurl || item.url : item.url,
    copyright: item.copyright,
  };
}
