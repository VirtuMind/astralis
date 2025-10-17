import { notFound } from "next/navigation";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShareButtons } from "@/components/share-buttons";
import { Calendar } from "lucide-react";
import {
  fetchLibraryImages,
  normalizeLibraryItem,
} from "@/lib/adapters/library";
import { NormalizedLibraryItem } from "@/lib/types";

async function getItemData(
  nasa_id: string
): Promise<NormalizedLibraryItem | null> {
  const response = await fetchLibraryImages(1, nasa_id);

  const item = response.collection.items[0];
  const normalized = normalizeLibraryItem(item);
  console.log("Normalized item:", normalized);
  return normalized;
}

export default async function ItemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await getItemData(params.id);

  if (!item) {
    notFound();
  }

  return (
    <>
      <main className="container pt-32">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="overflow-hidden border-border/50 bg-card">
            <div className="relative aspect-square overflow-hidden bg-secondary">
              <Image
                src={item.hdImageUrl || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
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

                <Badge variant="outline">{item.nasa_id.toUpperCase()}</Badge>
              </div>

              <h1 className="mb-4 font-bold text-3xl text-balance leading-tight md:text-4xl">
                {item.title}
              </h1>

              <div className="prose prose-invert max-w-none">
                <p className="text-foreground/90 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {item.keywords && item.keywords.length > 0 && (
              <div>
                <h3 className="mb-3 font-semibold text-sm">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {item.keywords.map((keyword) => (
                    <Badge key={keyword} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="mb-3 font-semibold text-sm">Share this image</h3>
              <ShareButtons title={item.title} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
