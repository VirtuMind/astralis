import type { EPICItem, NormalizedEPICItem } from "@/lib/types";

const NASA_API_KEY = process.env.NASA_API_KEY;

export async function fetchEPIC(date?: string): Promise<EPICItem[]> {
  const response = date
    ? await fetch(
        `https://epic.gsfc.nasa.gov/api/natural/date/${date}?api_key=${NASA_API_KEY}`
      )
    : await fetch(
        `https://epic.gsfc.nasa.gov/api/natural?api_key=${NASA_API_KEY}`
      );

  if (!response.ok) {
    throw new Error(`EPIC API error: ${response.statusText}`);
  }

  return response.json();
}

export function normalizeEPIC(item: EPICItem): NormalizedEPICItem {
  const date = item.date.split(" ")[0];
  const [year, month, day] = date.split("-");
  const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${item.image}.png`;

  return {
    id: item.identifier,
    caption: item.caption,
    imageUrl,
    timestamp: item.date,
  };
}
