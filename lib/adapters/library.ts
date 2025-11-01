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
  page = 1,
  nasaId?: string
): Promise<LibrarySearchResponse> {
  const params = new URLSearchParams({
    media_type: "image",
    page: page.toString(),
  });

  if (nasaId) {
    params.set("nasa_id", nasaId);
  } else {
    // --- Randomize keyword selection ---
    const shuffled = libraryKeywords.sort(() => Math.random() - 0.5);
    const randomKeywords = shuffled.slice(0, 5 + Math.floor(Math.random() * 5)); // pick 5-9 keywords
    params.set("keywords", randomKeywords.join(","));

    // --- Randomize page ---
    const randomPage = 1 + Math.floor(Math.random() * 5); // random page 1–5
    params.set("page", randomPage.toString());

    console.log(
      "Searching library with keywords:",
      randomKeywords,
      "on page:",
      randomPage
    );
  }

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

  if (!data || !thumbnail) return null;

  return {
    nasa_id: data.nasa_id,
    title: data.title,
    description: data.description,
    thumbnailUrl: thumbnail.href,
    hdImageUrl: hdImage?.href,
    date: data.date_created,
    keywords: data.keywords,
  };
}
