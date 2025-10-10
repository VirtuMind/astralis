"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { NormalizedLibraryItem } from "@/lib/types";
import { Spinner } from "./ui/spinner";

interface MediaCardProps {
  item: NormalizedLibraryItem;
  priority?: boolean;
}

export function MediaCard({ item, priority = false }: MediaCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      href={`/item/${item.nasa_id}`}
      className="group relative block overflow-hidden"
    >
      <div className="relative w-full">
        <Image
          src={item.thumbnailUrl || "/placeholder.svg"}
          alt={item.title}
          width={600}
          height={400}
          className={`w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
        />

        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner className="size-8 text-white" />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="mb-1 font-bold text-balance text-white text-lg leading-tight drop-shadow-lg">
          {item.title}
        </h3>
        <p className="mb-3 text-xs text-white/90 drop-shadow">
          Click for details
        </p>
        <div className="flex items-center justify-between text-xs text-white/80">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(item.date).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Link>
  );
}
