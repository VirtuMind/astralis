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
  "planet",
  "Neutron star",
  "Cluster",
  "star",
  "comet",
  "asteroid",
  "supernova",
  "black hole",
  "cosmos",
  "universe",
  "spacecraft",
  "astronaut",
  "solar system",
  "moon",
  "rocket",
  "sun",
  "eclipse",
  "meteor",
  "constellation",
  "quasar",
  "pulsar",
  "interstellar",
  "cosmic",
  "orbital",
  "celestial",
  "lunar",
  "stellar",
  "astrophysics",
  "cosmology",
  "Andromeda",
  "Milky Way",
  "Aurora",
  "Big Bang",
  "Black Hole",
  "wormhole",
  "Galaxy Clusters",
  "dark Matter",
  "Nebulae",
  "Supernovae",
  "Pulsars",
  "Quasars",
  "Gravitational Waves",
  "Event Horizon",
  "Intergalactic",
  "Redshift",
  "Hubble",
  "James Webb",
  "Voyager",
];

export async function fetchLibraryImages(
  page = 1
): Promise<LibrarySearchResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    media_type: "image",
    page_size: "25",
  });

  // --- Randomize keyword selection ---
  const shuffled = libraryKeywords.sort(() => Math.random() - 0.5);
  const randomKeywords = shuffled.slice(0, 3 + Math.floor(Math.random() * 3)); // pick 3-5 keywords
  params.set("keywords", randomKeywords.join(","));

  console.log(
    "Searching library with keywords:",
    randomKeywords,
    "on page:",
    page
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
