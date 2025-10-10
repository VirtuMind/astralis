// NASA API response types

export interface APODItem {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: "image" | "video";
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
  thumbnail_url?: string;
}

export interface LibrarySearchItem {
  href: string;
  data: Array<{
    center?: string;
    date_created: string;
    description: string;
    keywords: string[];
    media_type: "image" | "video" | "audio";
    nasa_id: string;
    title: string;
  }>;
  links: Array<{
    href: string;
    rel: string;
    render: string;
    width?: number;
    size?: number;
    height?: number;
  }>;
}

export interface LibrarySearchResponse {
  collection: {
    version: string;
    href: string;
    items: LibrarySearchItem[];
    metadata: {
      total_hits: number;
    };
    links: Array<{
      rel: string;
      prompt: string;
      href: string;
    }>;
  };
}

export interface EPICImage {
  identifier: string;
  caption: string;
  image: string;
  version: string;
  centroid_coordinates: {
    lat: number;
    lon: number;
  };
  dscovr_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  lunar_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  sun_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  attitude_quaternions: {
    q0: number;
    q1: number;
    q2: number;
    q3: number;
  };
  date: string;
  coords: {
    centroid_coordinates: {
      lat: number;
      lon: number;
    };
    dscovr_j2000_position: {
      x: number;
      y: number;
      z: number;
    };
    lunar_j2000_position: {
      x: number;
      y: number;
      z: number;
    };
    sun_j2000_position: {
      x: number;
      y: number;
      z: number;
    };
    attitude_quaternions: {
      q0: number;
      q1: number;
      q2: number;
      q3: number;
    };
  };
}

export interface NormalizedLibraryItem {
  nasa_id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  hdImageUrl?: string;
  date: string;
  keywords?: string[];
}
