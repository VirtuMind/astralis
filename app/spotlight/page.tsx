"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAPOD } from "@/hooks/use-apod";
import { Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CustomDatePicker from "@/components/custom-date-picker";
import { PiShootingStarBold } from "react-icons/pi";

export default function SpotlightPage() {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );
  const { data, isLoading, error } = useAPOD(selectedDate);

  const handleRandomDate = () => {
    // Generate random date between 1995-06-16 (APOD start) and today
    const start = new Date(1995, 5, 16);
    const end = new Date();
    const randomTime =
      start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);
    setSelectedDate(randomDate.toISOString().split("T")[0]);
  };

  return (
    <main className="relative w-full md:pt-24 pb-8 md:pb-16">
      <div className="container mx-auto">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center mt-20">
            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-white/40 border-t-white" />
              <p className="text-white/60 text-lg">Loading cosmic wonders...</p>
            </div>
          </div>
        ) : error || data === null ? (
          <div className="flex flex-1 items-center justify-center px-6 mt-32 max-w-lg mx-auto">
            <div className="text-center space-y-2">
              {error.status === 404 || error.status === 400 ? (
                <>
                  <Image
                    src="/telescope.png"
                    alt="Telescope"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                  <p className="text-white/70 text-base leading-relaxed">
                    No cosmic snapshot for this date, try another day in the
                    universe's timeline.
                  </p>
                </>
              ) : (
                <>
                  <Image
                    src="/space-cat.png"
                    alt="Space Cat"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />

                  <h2 className="font-bold text-xl text-white">
                    This service is currently unavailable
                  </h2>
                  <p className="text-white/70">
                    perhaps the universe is taking a break. Please try again
                    later
                  </p>
                </>
              )}
              <div className="lg:col-span-4 flex flex-col gap-3 mt-8">
                <div className="flex-shrink-0 space-y-3">
                  <div className="flex flex-row gap-3 w-full">
                    <CustomDatePicker
                      timestamp={undefined}
                      setSelectedDate={setSelectedDate}
                      startDay={16}
                      startMonth={6}
                      startYear={1995}
                    />
                    <Button
                      onClick={handleRandomDate}
                      variant="outline"
                      className="flex-1 border-white/20 bg-black/40 text-white"
                    >
                      <PiShootingStarBold className="h-4 w-4 mr-2" />
                      Surprise Me
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : data ? (
          <>
            {/* Image / Video */}
            <div className="max-w-5xl mx-auto mb-6">
              {/* Media Display */}
              <div className="relative w-full aspect-video">
                {data.mediaType === "image" ? (
                  <>
                    <div className="relative w-full md:h-[calc(100vh-6rem)] md:w-1/2 md:fixed md:left-0 md:top-24 flex items-start justify-center md:items-center md:p-8">
                      <div className="relative w-full md:w-full md:h-full md:max-w-3xl md:max-h-[85vh]">
                        <Image
                          src={data.url}
                          alt={data.title}
                          width={1200}
                          height={800}
                          className="w-full h-auto md:hidden object-contain object-top"
                          priority
                          sizes="100vw"
                        />
                      </div>
                    </div>
                    <Image
                      src={data.url}
                      alt={data.title}
                      fill
                      className="hidden md:block object-contain rounded-2xl"
                      priority
                      sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                  </>
                ) : (
                  <div className="group relative h-full w-full cursor-pointer bg-black">
                    <iframe
                      src={data.url}
                      className="h-full w-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="NASA Video"
                    />
                  </div>
                )}
              </div>

              {/* Copyright */}
              {data.copyright && (
                <p className="text-sm my-4 text-white/60 text-center">
                  <span className="font-semibold text-white/80">
                    Image Credit & Copyright:
                  </span>{" "}
                  {data.copyright}
                </p>
              )}
            </div>
            {/* Info Card */}
            <div className="max-w-2xl mx-auto px-6 md:px-0">
              {data.copyright && <Separator className="opacity-20 mb-6" />}

              {/* Date and Type Badges */}
              <div className="flex-shrink-0 space-y-3 mx-auto mb-8">
                <Label htmlFor="date" className="px-1 text-sm">
                  Select a date to explore
                </Label>
                <div className="flex flex-row gap-3 w-full">
                  <CustomDatePicker
                    timestamp={data.date}
                    setSelectedDate={setSelectedDate}
                    startDay={16}
                    startMonth={6}
                    startYear={1995}
                  />
                  <Button
                    onClick={handleRandomDate}
                    variant="outline"
                    className="flex-1 border-white/20 bg-black/40 text-white"
                  >
                    <PiShootingStarBold className="h-4 w-4 mr-2" />
                    Surprise Me
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <h2 className="font-bold text-4xl md:text-5xl mb-2 text-white leading-tight">
                  {data.title}
                </h2>

                <div className="flex items-center gap-2 text-white/70">
                  <Calendar className="h-4 w-4" />
                  {new Date(data.date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                {/* Description */}
                <p className="leading-relaxed text-base md:text-lg break-words overflow-wrap-anywhere text-white/80">
                  {data.description}
                </p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}
