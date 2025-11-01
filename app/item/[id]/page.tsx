import { notFound } from "next/navigation";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { ShareButtons } from "@/components/share-buttons";
import { Calendar, HelpCircle } from "lucide-react";
import { LibrarySearchResponse } from "@/lib/types";
import {
  fetchLibraryImages,
  normalizeLibraryItem,
} from "@/lib/adapters/library";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data: LibrarySearchResponse | null = await fetchLibraryImages(1, id);
  const item = normalizeLibraryItem(data.collection.items[0]);

  if (!item) {
    notFound();
  }

  // tiff/tif are unsupported by Next.js Image
  const isTiffImage =
    item.hdImageUrl?.toLowerCase().endsWith(".tif") ||
    item.hdImageUrl?.toLowerCase().endsWith(".tiff");

  const imageUrl = isTiffImage
    ? item.thumbnailUrl
    : item.hdImageUrl || item.thumbnailUrl || "/placeholder.svg";

  return (
    <main className="flex min-h-screen flex-col md:flex-row md:pt-24 overflow-hidden">
      {/* Fixed Image - Left Half */}
      <div className="relative w-full md:h-[calc(100vh-6rem)] md:w-1/2 md:fixed md:left-0 md:top-24 flex items-start justify-center md:items-center md:p-8">
        <div className="relative w-full md:w-full md:h-full md:max-w-3xl md:max-h-[85vh]">
          <Image
            src={imageUrl}
            alt={item.title}
            width={1200}
            height={800}
            className="w-full h-auto md:hidden object-contain object-top"
            priority
            sizes="100vw"
          />
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            className="hidden md:block object-contain"
            priority
            sizes="50vw"
          />
          {isTiffImage && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 md:px-4 md:py-2">
              <div className="flex items-center gap-2">
                <p className="text-white/50 text-[10px] md:text-xs whitespace-nowrap">
                  Preview only
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-white/50 hover:text-white/80 transition-colors">
                        <HelpCircle className="h-3 w-3 md:h-3.5 md:w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-2xs bg-black/90 border-white/20 text-white/90">
                      <p className="text-xs text-center">
                        The original image is in TIFF format, which is too large
                        and not supported. You're viewing a compressed version.{" "}
                        <Link
                          href={item.hdImageUrl!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white underline underline-offset-2 hover:text-white/80"
                        >
                          Download full resolution
                        </Link>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Content - Right Half */}
      <div className="w-full md:w-1/2 md:ml-auto mb-12">
        <div className="min-h-screen px-6 py-8 md:px-12 md:px-10">
          <div className="mx-auto max-w-2xl space-y-6">
            {/* Title */}
            <h1 className="font-bold text-4xl md:text-5xl mb-2 text-white leading-tight">
              {item.title}
            </h1>

            {/* Date */}
            <div className="flex items-center gap-2 text-white/70">
              <Calendar className="h-4 w-4" />
              <time className="text-sm md:text-base">
                {new Date(item.date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {/* Description */}
            <p className="leading-relaxed text-base md:text-lg break-words overflow-wrap-anywhere text-white/90">
              {item.description}
            </p>

            {/* Keywords */}
            {item.keywords && item.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.keywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    variant="outline"
                    className="bg-white/5 border-white/20 text-white/80"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}

            {/* Share Buttons */}
            <ShareButtons title={item.title} />
          </div>
        </div>
      </div>
    </main>
  );
}
