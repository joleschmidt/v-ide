"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectorImageGalleryProps {
  images: string[];
  sectorName: string;
}

export const SectorImageGallery = ({ images, sectorName }: SectorImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-md bg-[#1a1a1a]">
        <Image
          src="/placeholder.jpg"
          alt={sectorName}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-md">
      {/* Main Image */}
      <Image
        src={images[currentIndex]}
        alt={`${sectorName} - Image ${currentIndex + 1}`}
        fill
        className="object-cover"
        priority
      />

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-[#171717]/80 backdrop-blur-sm hover:bg-[#262626]/80"
          >
            <ChevronLeft className="h-5 w-5 text-[#e5e5e5]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-[#171717]/80 backdrop-blur-sm hover:bg-[#262626]/80"
          >
            <ChevronRight className="h-5 w-5 text-[#e5e5e5]" />
          </Button>
        </>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-[#171717]/80 px-3 py-1 backdrop-blur-sm">
          <span className="font-sans text-xs text-[#e5e5e5]">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      )}

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 flex gap-2 overflow-x-auto bg-[#171717]/60 p-4 backdrop-blur-sm">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                index === currentIndex
                  ? "border-[#4a6f4a]"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

