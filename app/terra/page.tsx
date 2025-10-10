"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteHeader } from "@/components/header";
import { NASAAttribution } from "@/components/nasa-attribution";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEPIC } from "@/lib/nasa/hooks";
import {
  Globe,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function TerraPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isLoading, error } = useEPIC();

  const item = data?.[currentIndex];
  const hasNext = data && currentIndex < data.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 flex items-center gap-3 font-bold text-4xl text-balance md:text-5xl">
            <Globe className="h-10 w-10 text-primary" />
            Terra - Earth from Space
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            View Earth from NASA's DSCOVR satellite, positioned at the L1
            Lagrange point
          </p>
        </div>

        {isLoading ? (
          <div className="flex min-h-[600px] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <h2 className="mb-2 font-bold text-2xl">
                Failed to load EPIC data
              </h2>
              <p className="text-muted-foreground">Please try again later</p>
            </div>
          </div>
        ) : item && data ? (
          <div className="space-y-6">
            <Card className="overflow-hidden border-border/50 bg-card">
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />

                {/* Navigation arrows */}
                {hasPrev && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-1/2 left-4 h-12 w-12 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    onClick={handlePrev}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                )}

                {hasNext && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-1/2 right-4 h-12 w-12 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    onClick={handleNext}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                )}

                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <Badge
                    variant="secondary"
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    {currentIndex + 1} / {data.length}
                  </Badge>
                </div>
              </div>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-border/50 bg-card p-6">
                <h2 className="mb-4 font-bold text-2xl">{item.title}</h2>
                <p className="mb-4 text-foreground/90 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </Card>

              <Card className="border-border/50 bg-card p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  Satellite Position
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Centroid Latitude:
                    </span>
                    <span className="font-mono">
                      {item.id.includes("epic-") && data[currentIndex]
                        ? `${
                            (
                              data[currentIndex] as any
                            ).coords?.centroid_coordinates?.lat?.toFixed(2) ||
                            "N/A"
                          }°`
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Centroid Longitude:
                    </span>
                    <span className="font-mono">
                      {item.id.includes("epic-") && data[currentIndex]
                        ? `${
                            (
                              data[currentIndex] as any
                            ).coords?.centroid_coordinates?.lon?.toFixed(2) ||
                            "N/A"
                          }°`
                        : "N/A"}
                    </span>
                  </div>

                  <div className="mt-4 rounded-lg bg-secondary/50 p-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      The DSCOVR satellite orbits at the L1 Lagrange point,
                      approximately 1.5 million kilometers from Earth, providing
                      a unique view of our planet's sunlit side.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-center">
              <NASAAttribution />
            </div>
          </div>
        ) : null}
      </main>
    </>
  );
}
