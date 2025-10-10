"use client";

import { NormalizedLibraryItem } from "@/lib/types";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useLibrarySearch(page: number) {
  const { data, error, isLoading } = useSWR<NormalizedLibraryItem[]>(
    `/api/library?page=${page}`,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
  };
}
