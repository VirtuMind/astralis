"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Share2, Check, Twitter, Facebook, LinkIcon } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";

interface ShareButtonsProps {
  title?: string;
  id?: string;
}

export function ShareButtons({ title, id }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Build the share URL - use item detail page if id is provided, otherwise current page
  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    if (id) {
      const origin = window.location.origin;
      return `${origin}/item/${id}`;
    }
    return window.location.href;
  };

  const handleCopyLink = async () => {
    try {
      const shareUrl = getShareUrl();
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const handleTwitterShare = () => {
    const shareUrl = getShareUrl();
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(
      `Check out this amazing space image: ${title || "Astralis"}`
    );
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      "_blank",
      "width=550,height=420"
    );
  };

  const handleFacebookShare = () => {
    const shareUrl = getShareUrl();
    const url = encodeURIComponent(shareUrl);
    const quote = encodeURIComponent(
      `Check out this amazing space image: ${title || "Astralis"}`
    );
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`,
      "_blank",
      "width=550,height=420"
    );
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        const shareUrl = getShareUrl();
        await navigator.share({
          title: title || "Astralis - Space Images",
          text: `Check out this amazing space image: ${title || ""}`,
          url: shareUrl,
        });
      } catch (error) {
        // Ignore user cancelled error
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Native share failed:", error);
        }
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="gap-2 bg-transparent"
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <LinkIcon className="h-4 w-4" />
        )}
        {copied ? "Copied!" : "Copy Link"}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleTwitterShare}
        className="gap-2 bg-transparent"
      >
        <FaXTwitter className="h-4 w-4" />
        Twitter
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleFacebookShare}
        className="gap-2 bg-transparent"
      >
        <FaFacebookF className="h-4 w-4" />
        Facebook
      </Button>

      {typeof navigator !== "undefined" && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleNativeShare}
          className="gap-2 bg-transparent "
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      )}
    </div>
  );
}
