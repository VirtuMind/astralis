import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="w-full flex min-h-[600px] items-center justify-center py-8 px-6">
      <div className="text-center">
        <Image
          src="/galactic-center.png"
          alt="Galactic Center"
          width={200}
          height={200}
          className="mx-auto"
        />
        <h2 className="mb-4 font-bold text-xl">Item not found</h2>
        <p className="mb-8 text-foreground">
          It may exist in a parallel universe though.
        </p>

        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-lg py-3 text-sm font-medium text-primary-foreground transition-all"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Gallery</span>
        </Link>
      </div>
    </main>
  );
}
