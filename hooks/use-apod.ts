"use client";

import useSWR from "swr";
import { NormalizedAPODItem } from "@/lib/types";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (data.error) {
    const error = new Error("APOD_ERROR");
    (error as any).status = res.status;
    throw error;
  }

  return data;
};

export function useAPOD(date?: string) {
  const params = date ? `?date=${date}` : "";
  const { data, error, isLoading } = useSWR<NormalizedAPODItem>(
    `/api/apod${params}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      shouldRetryOnError: false,
    }
  );

  return {
    data,
    isLoading,
    error,
  };
}
