"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AmbientSoundToggle } from "./ambient-sound-toggle";
import { Button } from "./ui/button";
// import GlassSurface from "./GlassSurface";
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
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="pointer-events-none fixed top-0 left-0 right-0 z-50 px-4 py-6 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <Link
            href="/"
            className="pointer-events-auto text-white flex min-h-[44px] min-w-[44px] items-center font-bold text-2xl opacity-60  transition-opacity hover:opacity-100"
          >
            Astralis
          </Link>

          {/* Toast Navigation - Center (Desktop) */}
          <GlassSurface
            width={400}
            borderRadius={50}
            height={50}
            opacity={0.7}
            backgroundOpacity={0.25}
            className="pointer-events-auto hidden md:flex items-center gap-1"
          >
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;

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
          {/* Sound Toggle - Right */}
          <div className="flex items-center gap-2">
            <AmbientSoundToggle className="opacity-50 hover:opacity-100" />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-4 right-4 z-50 rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col p-2">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={
                    "flex min-h-[44px] items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5 hover:text-white" +
                    (isActive ? " text-white" : " text-white/70") +
                    (index < navigation.length - 1
                      ? " border-b border-white/10"
                      : "")
                  }
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
