"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteHeader } from "@/components/header";
import { NASAAttribution } from "@/components/nasa-attribution";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAPOD } from "@/hooks/use-apod";
import { Sparkles, Calendar, ExternalLink, RefreshCw } from "lucide-react";
import { VideoModal } from "@/components/video-modal";

export default function SpotlightPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { data, isLoading, error } = useAPOD(1);

  const item = data?.[0];

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 flex items-center gap-3 font-bold text-4xl text-balance md:text-5xl">
              <Sparkles className="h-10 w-10 text-primary" />
              Cosmic Spotlight
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Discover a random astronomy picture of the day from NASA's APOD
              collection
            </p>
          </div>

          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            size="lg"
            className="gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            New Image
          </Button>
        </div>

        {isLoading && !item ? (
          <div className="flex min-h-[600px] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <h2 className="mb-2 font-bold text-2xl">Failed to load APOD</h2>
              <p className="text-muted-foreground">Please try again later</p>
            </div>
          </div>
        ) : item ? (
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="overflow-hidden border-border/50 bg-card">
              <div className="relative aspect-video overflow-hidden bg-secondary">
                {item.mediaType === "image" ? (
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div
                    className="group relative h-full w-full cursor-pointer"
                    onClick={() => setSelectedVideo(item.videoUrl || null)}
                  >
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm transition-all group-hover:bg-background/70">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                        <svg
                          className="h-10 w-10"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {item.hdImageUrl && item.mediaType === "image" && (
                <div className="border-t border-border/50 bg-secondary/50 p-4">
                  <a
                    href={item.hdImageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View HD Version
                  </a>
                </div>
              )}
            </Card>

            <div className="flex flex-col gap-6">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <Badge variant="secondary" className="gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Badge>

                  {item.mediaType === "video" && (
                    <Badge variant="default" className="gap-1">
                      Video
                    </Badge>
                  )}
                </div>

                <h2 className="mb-4 font-bold text-3xl text-balance leading-tight">
                  {item.title}
                </h2>

                <div className="prose prose-invert max-w-none">
                  <p className="text-foreground/90 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {item.copyright && (
                <Card className="border-border/50 bg-secondary/30 p-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Copyright:</span>{" "}
                    {item.copyright}
                  </p>
                </Card>
              )}

              <div className="mt-auto">
                <NASAAttribution />
              </div>
            </div>
          </div>
        ) : null}
      </main>

      {selectedVideo && (
        <VideoModal
          url={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
