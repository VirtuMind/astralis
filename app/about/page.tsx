import { Rocket, Sparkles, Globe, Mail, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-24 pb-16">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* What is Astralis */}
        <div className="rounded-md border border-white/10 bg-black/20 backdrop-blur-lg p-8">
          <div className="flex items-start gap-4 mb-4">
            <h2 className="font-bold text-xl text-white">
              What and why Astralis?
            </h2>
          </div>
          <p className="text-white/80 leading-relaxed text-base mb-4">
            I built Astralis to create an easier way to explore the universe by
            transforming NASA's media library into an immersive visual
            experience.
          </p>
          <p className="text-white/80 leading-relaxed text-base ">
            Astralis is a window into the cosmos, bringing together NASA's vast
            collection of space imagery into a seamless, beautiful experience.
            From stunning astronomy pictures to real-time Earth observations
            captured by telescopes roaming the vastness of space, rovers on
            distant planets or satellites in orbit, Astralis makes exploring the
            universe as simple as a swipe.
          </p>
        </div>

        {/* Credits */}

        <div className="rounded-md border border-white/10 bg-black/20 backdrop-blur-lg p-8">
          <div className="flex items-start gap-4 mb-4">
            <h2 className="font-bold text-xl text-white">
              Credits & Acknowledgments
            </h2>
          </div>
          <p className="text-white/80 leading-relaxed text-base mb-6">
            This project would not be possible without the incredible work of
            NASA and their commitment to making science discoveries accessible
            to everyone. Special thanks to the Open Innovation team for
            providing public APIs to these resources.
          </p>

          {/* <div className="flex justify-center">
            <Image
              src="/nasa-logo.png"
              alt="NASA Logo"
              height={200}
              width={200}
              className="block"
            />
          </div> */}

          <p className="text-white/80 leading-relaxed text-base mb-6">
            Powered by NASA's Open Innovation APIs, including the Astronomy
            Picture of the Day (APOD), EPIC (Earth Polychromatic Imaging
            Camera), and the NASA Image and Video Library. You can find more
            information about these APIs and their capabilities on the{" "}
            <Link
              href="https://api.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white font-semibold underline decoration-white/40 underline-offset-4 hover:decoration-white transition-colors"
            >
              NASA APIs website
              {/* <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg> */}
            </Link>
            .
          </p>

          <p className="text-white/80 leading-relaxed text-base">
            All space imagery and data are courtesy of NASA and remain in the
            public domain. Individual image credits can be found on each image's
            detail page.
          </p>
        </div>

        {/* Contact */}
        <div className="rounded-md border border-white/10 bg-black/20 backdrop-blur-lg p-8">
          <div className="flex items-start gap-4 mb-4">
            <h2 className="font-bold text-xl text-white">Get in Touch</h2>
          </div>
          <p className="text-white/80 leading-relaxed text-base mb-6">
            If you have any suggestions, questions, or just want to share your
            favorite space image, I'd love to hear from you!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:younes.khoubaz@gmail.com"
              className="flex items-center gap-3 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
            >
              <Mail className="h-5 w-5 text-white" />
              <span className="text-white font-medium">Email Me</span>
            </a>

            <a
              href="https://x.com/VirtuoMind"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
            >
              <FaXTwitter className="h-5 w-5 text-white" />
              <span className="text-white font-medium">X (Twitter)</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
