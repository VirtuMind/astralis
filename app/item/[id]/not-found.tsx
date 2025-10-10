import Link from "next/link";
import { SiteHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container flex min-h-[600px] items-center justify-center py-8">
        <div className="text-center">
          <h1 className="mb-4 font-bold text-6xl text-primary">404</h1>
          <h2 className="mb-4 font-bold text-2xl">Item Not Found</h2>
          <p className="mb-8 text-muted-foreground">
            The media item you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Gallery
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
