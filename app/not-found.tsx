import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="container flex min-h-[600px] items-center justify-center py-8">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-5xl text-primary">404</h1>

        <h2 className="mb-4 font-bold text-xl">Nothing found here</h2>
        <p className="mb-8 text-foreground">
          What you are looking for may exist in a parallel universe though.
        </p>

        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-lg  px-6 py-3 text-sm font-medium text-primary-foreground transition-all"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Gallery</span>
        </Link>
      </div>
    </main>
  );
}
