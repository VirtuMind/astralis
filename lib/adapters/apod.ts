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
  let imageUrl;
  if (item.media_type === "image") {
    if (item.hdurl?.match(/\.(tiff|tif)$/i)) {
      // TIFF images are not supported
      imageUrl = item.url;
    } else {
      imageUrl = item.hdurl;
    }
  } else {
    imageUrl = item.url;
  }
  return {
    date: item.date,
    title: item.title,
    description: item.explanation,
    mediaType: item.media_type,
    url: imageUrl || item.url,
    copyright: item.copyright,
  };
}
