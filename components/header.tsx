"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AmbientSoundToggle } from "./ambient-sound-toggle";

import dynamic from "next/dynamic";

const GlassSurface = dynamic(() => import("./GlassSurface"), {
  ssr: false,
});

const navigation = [
  { name: "Gallery", href: "/" },
  { name: "Cosmic Spotlight", href: "/spotlight" },
  { name: "Terra", href: "/terra" },
  { name: "About", href: "/about" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="pointer-events-none fixed top-0 left-0 right-0 z-50 px-4 py-6 md:px-8">
        <div className="relative flex items-center justify-between">
          {/* Logo - Left */}
          <Link
            href="/"
            className="pointer-events-auto text-white flex min-h-[44px] min-w-[44px] items-center font-bold text-2xl opacity-60  transition-opacity hover:opacity-100"
          >
            Astralis
          </Link>

          {/* Toast Navigation */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
            <GlassSurface
              width={400}
              borderRadius={50}
              height={50}
              opacity={0.7}
              backgroundOpacity={0.25}
              saturation={0.3}
              className="pointer-events-auto flex items-center gap-1"
            >
              {navigation.map((item, index) => {
                return (
                  <div key={item.href} className="flex items-center">
                    <Link
                      href={item.href}
                      className={
                        "flex min-h-[44px] items-center px-4 text-sm font-medium transition-colors text-white hover:text-white/80"
                      }
                    >
                      {item.name}
                    </Link>
                    {index < navigation.length - 1 && (
                      <div className="h-4 w-px bg-white/20" />
                    )}
                  </div>
                );
              })}
            </GlassSurface>
          </div>

          {/* Sound Toggle - Right */}
          <div className="pointer-events-auto flex justify-center items-center gap-2">
            <AmbientSoundToggle />

            {/* Mobile Menu Button */}
            <div
              className="md:hidden opacity-60 h-8 w-8 flex justify-center items-center "
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-4 right-4 z-50 md:hidden">
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={20}
            saturation={0.3}
            backgroundOpacity={0.7}
          >
            <nav className="flex w-full flex-col items-stretch py-1">
              {navigation.map((item, index) => {
                return (
                  <div key={item.href} className="w-full">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={
                        "flex w-full min-h-[44px] items-center justify-start px-4 py-2 text-left text-sm font-medium transition-colors hover:text-white"
                      }
                    >
                      {item.name}
                    </Link>
                    {index < navigation.length - 1 && (
                      <div className="mx-2 h-px bg-white/15" />
                    )}
                  </div>
                );
              })}
            </nav>
          </GlassSurface>
        </div>
      )}
    </>
  );
}
