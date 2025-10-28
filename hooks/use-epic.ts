"use client";

import useSWR from "swr";
import { NormalizedEPICItem } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useEPIC(date?: string) {
  const params = date ? `?date=${date}` : "";
  const { data, error, isLoading } = useSWR<NormalizedEPICItem[]>(
    `/api/epic${params}`,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
  };
}
