import type {
  LibrarySearchResponse,
  LibrarySearchItem,
  NormalizedLibraryItem,
} from "@/lib/types";

const libraryKeywords: string[] = [
  "Saturn",
  "Neptune",
  "Uranus",
  "Pluto",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "galaxy",
  "nebula",
  "Neutron star",
  "Cluster",
  "star",
  "supernova",
  "black hole",
  "cosmos",
  "sun",
  "eclipse",
  "meteor",
  "constellation",
  "quasar",
  "pulsar",
  "Andromeda",
  "Milky Way",
  "Aurora",
  "Black Hole",
  "wormhole",
  "dark Matter",
  "Nebulae",
  "Supernova",
  "Pulsars",
  "Quasars",
  "Hubble",
  "James Webb",
  "Cassini",
  "Orion",
  "Apollo",
  "Crab Nebula",
  "Horsehead Nebula",
  "Eagle Nebula",
  "Lagoon Nebula",
  "Sombrero Galaxy",
  "Whirlpool Galaxy",
  "Pinwheel Galaxy",
];

export async function fetchLibraryImages(): Promise<LibrarySearchResponse> {
  // --- Randomize keywords and page ---
  const randomPage = Math.floor(Math.random() * 20) + 1;
  const shuffled = libraryKeywords.sort(() => Math.random() - 0.5);
  const randomKeywords = shuffled.slice(0, 3 + Math.floor(Math.random() * 3)); // pick 3-5 keywords

  // pick a random keyword
  const randomKeyword = shuffled[0];

  const params = new URLSearchParams({
    media_type: "image",
    page_size: "25",
    // q: randomKeyword,
    keywords: randomKeywords.join(","),
    page: randomPage.toString(),
  });

  console.log(
    "Searching library with keywords:",
    randomKeywords,
    "on page:",
    randomPage
  );

  const response = await fetch(
    `https://images-api.nasa.gov/search?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Image Search API error: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchLibraryItem(
  nasaId: string
): Promise<LibrarySearchResponse> {
  const params = new URLSearchParams({
    page: "1",
    nasa_id: nasaId,
  });

  const response = await fetch(
    `https://images-api.nasa.gov/search?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Image Search API error: ${response.statusText}`);
  }

  return response.json();
}

export function normalizeLibraryItem(
  item: LibrarySearchItem
): NormalizedLibraryItem | null {
  if (!item || !item.data || item.data.length === 0) {
    return null;
  }

  const data = item.data[0];
  const thumbnail = item.links?.find((l) => l.rel === "preview");
  const hdImage = item.links?.find((l) => l.rel === "canonical");
  const mediumImage =
    hdImage && hdImage.size && hdImage.size < 1_000_000
      ? hdImage
      : item.links
          ?.filter((l) => l.rel === "alternate" && l.size && l.size < 1_000_000) // just in case an alternate that is > 1MB
          .sort((a, b) => {
            return (b.size || 0) - (a.size || 0);
          })[0];

  if (!data || !thumbnail) return null;

  return {
    nasa_id: data.nasa_id,
    title: data.title,
    description: data.description,
    thumbnailUrl: thumbnail.href,
    hdImageUrl: hdImage?.href,
    mediumImageUrl: mediumImage?.href,
    date: data.date_created,
    keywords: data.keywords,
  };
}
