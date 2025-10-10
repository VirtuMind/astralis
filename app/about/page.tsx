import { SiteHeader } from "@/components/header";
import { NASAAttribution } from "@/components/nasa-attribution";
import { Card } from "@/components/ui/card";
import { Rocket, Sparkles, Globe, ImageIcon } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <main className="container py-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 font-bold text-4xl text-balance md:text-5xl">
            About NASA Explorer
          </h1>
          <p className="mb-8 text-lg text-muted-foreground text-pretty">
            Discover the wonders of space through NASA's incredible collection
            of images and videos.
          </p>

          <div className="space-y-6">
            <Card className="border-border/50 bg-card p-6">
              <h2 className="mb-4 font-bold text-2xl">Our Mission</h2>
              <p className="text-foreground/90 leading-relaxed">
                NASA Explorer brings together multiple NASA APIs to create a
                unified, beautiful interface for exploring space imagery. From
                daily astronomy pictures to real-time Earth observations from
                satellites, we make NASA's vast media collection accessible and
                enjoyable for everyone.
              </p>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-border/50 bg-card p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Rocket className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-lg">Home Gallery</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Browse through thousands of space images with infinite scroll
                  and responsive masonry layout.
                </p>
              </Card>

              <Card className="border-border/50 bg-card p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-lg">Cosmic Spotlight</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Discover random astronomy pictures of the day from NASA's APOD
                  collection.
                </p>
              </Card>

              <Card className="border-border/50 bg-card p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Globe className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-lg">Terra</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  View Earth from space through NASA's DSCOVR satellite at the
                  L1 Lagrange point.
                </p>
              </Card>

              <Card className="border-border/50 bg-card p-6">
                <div className="mb-3 flex items-center gap-2">
                  <ImageIcon className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-lg">Shareable Pages</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Every image has its own page with Open Graph tags for
                  beautiful social media sharing.
                </p>
              </Card>
            </div>

            <Card className="border-border/50 bg-card p-6">
              <h2 className="mb-4 font-bold text-2xl">Data Sources</h2>
              <div className="space-y-3 text-sm text-foreground/80">
                <p>
                  <span className="font-semibold">
                    APOD (Astronomy Picture of the Day):
                  </span>{" "}
                  Daily featured images and videos showcasing the cosmos.
                </p>
                <p>
                  <span className="font-semibold">
                    NASA Image and Video Library:
                  </span>{" "}
                  Searchable collection of NASA's media assets.
                </p>
                <p>
                  <span className="font-semibold">
                    EPIC (Earth Polychromatic Imaging Camera):
                  </span>{" "}
                  Full-disc Earth imagery from the DSCOVR satellite.
                </p>
              </div>
            </Card>

            <div className="flex justify-center pt-4">
              <NASAAttribution />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
