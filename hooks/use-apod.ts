"use client";

import useSWR from "swr";
import { NormalizedMediaItem } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAPOD(count?: number, date?: string) {
  const params = new URLSearchParams();
  if (count) params.append("count", count.toString());
  if (date) params.append("date", date);

  const { data, error, isLoading } = useSWR<NormalizedMediaItem[]>(
    `/api/apod?${params.toString()}`,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
  };
}
