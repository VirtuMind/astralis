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
  const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${item.image}.jpg`;

  // Calculate distance between two position vectors in 3D space
  const calculateDistance = (
    pos1: { x: number; y: number; z: number },
    pos2: { x: number; y: number; z: number }
  ) => {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    const dz = pos1.z - pos2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };

  // Format coordinates for display
  const formatCoordinate = (value: number, type: "lat" | "lon") => {
    const abs = Math.abs(value);
    const direction =
      type === "lat" ? (value >= 0 ? "N" : "S") : value >= 0 ? "E" : "W";
    return `${abs.toFixed(2)}° ${direction}`;
  };

  const earthPos = { x: 0, y: 0, z: 0 };
  const satellitePos = item.coords.dscovr_j2000_position;
  const sunPos = item.coords.sun_j2000_position;
  const moonPos = item.coords.lunar_j2000_position;

  return {
    id: item.identifier,
    caption: item.caption,
    imageUrl,
    timestamp: item.date,
    earthCentroidCoordinates: {
      lat: formatCoordinate(item.coords.centroid_coordinates.lat, "lat"),
      lon: formatCoordinate(item.coords.centroid_coordinates.lon, "lon"),
    },
    distances: {
      satelliteToEarth: calculateDistance(satellitePos, earthPos),
      satelliteToSun: calculateDistance(satellitePos, sunPos),
      satelliteToMoon: calculateDistance(satellitePos, moonPos),
      earthToSun: calculateDistance(earthPos, sunPos),
      earthToMoon: calculateDistance(earthPos, moonPos),
      sunToMoon: calculateDistance(sunPos, moonPos),
    },
  };
}
