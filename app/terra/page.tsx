"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { useEPIC } from "@/hooks/use-epic";
import { Label } from "@/components/ui/label";
import TerraDatePicker from "@/components/terra-date-picker";
import CelestialDistanceMap from "@/components/celestial-distance-map";

export default function TerraPage() {
  // Initialize with undefined to fetch latest data, then set to actual data date
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const { data, isLoading, error } = useEPIC(selectedDate);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 10 }, [
    Fade(),
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleRandomDate = () => {
    // Generate random date between 2015-06-13 (EPIC start) and today
    const start = new Date("2015-06-13");
    const end = new Date();
    const randomTime =
      start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);

    // Format date in local timezone to avoid UTC conversion issues
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, "0");
    const day = String(randomDate.getDate()).padStart(2, "0");
    setSelectedDate(`${year}-${month}-${day}`);
  };

  const item = data?.[currentIndex];

  return (
    <main className="relative w-full py-24">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <p className="text-white text-base font-bold md:text-xl">
            Earth from NASA's EPIC camera onboard the NOAA DSCOVR spacecraft at
            Lagrange Point L1
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-white" />
              <p className="text-white/60 text-lg">Loading Earth imagery...</p>
            </div>
          </div>
        ) : error || !item ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center space-y-2">
              <Image
                src="/solar-eclipse.png"
                alt="Solar Eclipse"
                width={200}
                height={200}
                className="mx-auto"
              />
              <h2 className="font-bold text-xl text-white">
                Our beloved planet was feeling shy during that day.
              </h2>
              <p className="text-white/60">
                Try selecting a different date or click Random Date
              </p>
              <div className="lg:col-span-4 flex flex-col gap-3 mt-8">
                {/* Date Controls */}
                <div className="flex-shrink-0 space-y-3">
                  <div className="flex flex-row gap-3 w-full">
                    <TerraDatePicker
                      data={data}
                      setSelectedDate={setSelectedDate}
                    />
                    <Button
                      onClick={handleRandomDate}
                      variant="outline"
                      className="flex-1 border-white/20 bg-black/40  backdrop-blur-md text-white"
                    >
                      <Shuffle className="h-4 w-4 mr-2" />
                      Random
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : data && data.length > 0 ? (
          <>
            {/* Main Content: Metadata (Left) + Carousel (Right) */}
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
                {/* Right Side: Carousel - Shows first on mobile */}
                <div className="lg:col-span-5 flex flex-col gap-3 order-1 lg:order-2">
                  {/* Current Viewing Info */}
                  <p className="text-white/90 text-sm text-center">
                    You are seeing how earth looked like on{" "}
                    <span className="font-semibold text-white">
                      {new Date(item.timestamp).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZoneName: "short",
                      })}
                    </span>
                  </p>

                  {/* Carousel - Adjustable size via aspect-ratio (currently 3/4 = smaller than square) */}
                  <div className="relative w-full aspect-[3/4] lg:aspect-square border border-white/10 rounded-xl">
                    <div
                      className="overflow-hidden rounded-2xl w-full h-full"
                      ref={emblaRef}
                    >
                      <div className="flex h-full">
                        {data.map((item, index) => (
                          <div
                            key={item.id}
                            className="relative min-w-0 flex-[0_0_100%] h-full"
                          >
                            <div className="relative w-full h-full">
                              <Image
                                src={item.imageUrl}
                                alt={item.caption}
                                fill
                                className="object-cover"
                                priority={index === 0}
                                sizes="(max-width: 1024px) 100vw, 66vw"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  {data.length > 1 && (
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 border border-white/20 flex-shrink-0"
                        onClick={scrollPrev}
                      >
                        <ChevronLeft className="h-5 w-5 text-white" />
                      </Button>

                      {/* Pagination Dots - Scrollable on mobile */}
                      <div className="flex items-center justify-start gap-2 overflow-x-auto max-w-[200px] md:max-w-none scrollbar-hide px-2">
                        {data.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => scrollTo(idx)}
                            className={`h-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                              idx === currentIndex
                                ? "w-8 bg-white"
                                : "w-2 bg-white/40 hover:bg-white/60"
                            }`}
                            aria-label={`Go to image ${idx + 1}`}
                          />
                        ))}
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 border border-white/20 flex-shrink-0"
                        onClick={scrollNext}
                      >
                        <ChevronRight className="h-5 w-5 text-white" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Left Side: Date Controls + Celestial Map - Shows second on mobile */}
                {item && (
                  <div className="lg:col-span-7 flex flex-col gap-3 order-2 lg:order-1">
                    {/* Date Controls */}
                    <div className="flex-shrink-0 space-y-3">
                      <Label htmlFor="date" className="px-1  text-sm">
                        Select Date
                      </Label>
                      <div className="flex flex-row gap-3 w-full">
                        <TerraDatePicker
                          data={data}
                          setSelectedDate={setSelectedDate}
                        />
                        <Button
                          onClick={handleRandomDate}
                          variant="outline"
                          className="flex-1 border-white/20 bg-black/40  backdrop-blur-md text-white"
                        >
                          <Shuffle className="h-4 w-4 mr-2" />
                          Random
                        </Button>
                      </div>
                    </div>

                    {/* Celestial Distance Visualization */}
                    <CelestialDistanceMap item={item} />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}
