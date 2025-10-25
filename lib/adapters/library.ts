import type {
  LibrarySearchResponse,
  LibrarySearchItem,
  NormalizedLibraryItem,
} from "@/lib/types";

const libraryKeywords: string[] = [
  "galaxy",
  "nebula",
  "planet",
  "star",
  "comet",
  "asteroid",
  "supernova",
  "black hole",
  "cosmos",
  "universe",
  "telescope",
  "satellite",
  "spacecraft",
  "astronaut",
  "space station",
  "solar system",
  "moon",
  "rocket",
  "space shuttle",
  "sun",
  "eclipse",
  "meteor",
  "constellation",
  "dark matter",
  "exoplanet",
  "quasar",
  "pulsar",
  "gravity",
  "light year",
  "interstellar",
  "cosmic",
  "orbital",
  "celestial",
  "lunar",
  "stellar",
  "astronomy",
  "astrophysics",
  "cosmology",
  "space exploration",
  "deep space",
  "Hubble",
  "James Webb",
  "Voyager",
  "Mars rover",
  "Saturn",
  "Jupiter",
  "Andromeda",
  "Milky Way",
  "Aurora",
  "Big Bang",
  "Black Hole",
  "Nebulae",
  "Supernovae",
  "Exoplanets",
  "Pulsars",
  "Quasars",
  "Dark Energy",
  "Cosmic Microwave Background",
  "Gravitational Waves",
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
    const randomKeywords = shuffled.slice(0, 3 + Math.floor(Math.random() * 4)); // pick 3–6 keywords
    params.set("keywords", randomKeywords.join(","));

    // --- Randomize page ---
    const randomPage = 1 + Math.floor(Math.random() * 5); // random page 1–5
    params.set("page", randomPage.toString());
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
