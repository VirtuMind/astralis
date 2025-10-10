import type { EPICImage, NormalizedMediaItem } from "../../lib/types";

export async function fetchEPIC(date?: string): Promise<EPICImage[]> {
  const dateStr = date || "latest";
  const response = await fetch(
    `https://epic.gsfc.nasa.gov/api/natural/date/${dateStr}`
  );

  if (!response.ok) {
    throw new Error(`EPIC API error: ${response.statusText}`);
  }

  return response.json();
}

export function normalizeEPIC(item: EPICImage): NormalizedMediaItem {
  const date = item.date.split(" ")[0];
  const [year, month, day] = date.split("-");
  const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${item.image}.png`;

  return {
    id: `epic-${item.identifier}`,
    title: `Earth from DSCOVR - ${date}`,
    description: item.caption,
    imageUrl,
    mediaType: "image",
    date: item.date,
    source: "epic",
  };
}
