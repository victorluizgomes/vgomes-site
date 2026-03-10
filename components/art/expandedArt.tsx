import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ArtPropertiesInterface } from "../../model/art.interface";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface ExpandedArtProps {
  art: ArtPropertiesInterface;
  artArray: ArtPropertiesInterface[];
  currentIndex: number;
  onClose: () => void;
}

export function ExpandedArt(props: ExpandedArtProps) {
  const [currentIndex, setCurrentIndex] = useState(props.currentIndex);
  const [currArt, setCurrArt] = useState(props.art);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToPrevious = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(currentIndex - 1);
      setCurrArt(props.artArray[currentIndex - 1]);
      setTimeout(() => setIsAnimating(false), 200);
    }
  }, [currentIndex, props.artArray, isAnimating]);

  const goToNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex < props.artArray.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(currentIndex + 1);
      setCurrArt(props.artArray[currentIndex + 1]);
      setTimeout(() => setIsAnimating(false), 200);
    }
  }, [currentIndex, props.artArray, isAnimating]);

  useEffect(() => {
    // Prevent background scroll
    document.body.style.overflow = "hidden";

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.onClose, goToPrevious, goToNext]);

  return (
    <div
      className="fixed inset-0 z-50 bg-[hsl(var(--background)/0.95)] backdrop-blur-xl flex items-center justify-center scale-in"
      onClick={props.onClose}
    >
      {/* Close Button */}
      <button
        onClick={props.onClose}
        className="absolute top-6 right-6 z-10 p-3 rounded-full bg-[hsl(var(--surface))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-elevated))] hover:border-[hsl(var(--accent-tertiary)/0.3)] transition-all"
        aria-label="Close modal"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Content Container */}
      <div
        className="relative max-w-6xl w-full max-h-[90vh] mx-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title & Info - Top */}
        <div className="absolute top-0 left-0 right-0 p-4 z-10 pointer-events-none">
          <div className="text-center">
            <h2 className="font-display text-xl md:text-2xl text-[hsl(var(--foreground))]">
              {currArt.name}
            </h2>
            {currArt.description && (
              <p className="text-sm text-[hsl(var(--text-secondary))] mt-2 max-w-xl mx-auto">
                {currArt.description}
              </p>
            )}
          </div>
        </div>

        {/* Image/Video */}
        <div className={`flex items-center justify-center py-16 transition-opacity duration-200 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
          {currArt.isVideo ? (
            <video
              className="max-w-full max-h-[70vh] rounded-xl border border-[hsl(var(--border))]"
              controls
              loop
              autoPlay
              muted
              poster={currArt.cover || ""}
            >
              <source src={currArt.link} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          ) : (
            <Image
              src={currArt.link}
              alt={currArt.name}
              width={1200}
              height={800}
              className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-xl"
              priority
            />
          )}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
          <button
            onClick={goToPrevious}
            disabled={currentIndex <= 0}
            className={`
              pointer-events-auto p-3 rounded-full transition-all
              ${currentIndex <= 0
                ? "opacity-30 cursor-not-allowed bg-[hsl(var(--surface))]"
                : "bg-[hsl(var(--surface))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--surface-elevated))] hover:border-[hsl(var(--accent-tertiary)/0.3)]"
              }
            `}
            aria-label="Previous artwork"
          >
            <ChevronLeft className="w-6 h-6 text-[hsl(var(--foreground))]" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= props.artArray.length - 1}
            className={`
              pointer-events-auto p-3 rounded-full transition-all
              ${currentIndex >= props.artArray.length - 1
                ? "opacity-30 cursor-not-allowed bg-[hsl(var(--surface))]"
                : "bg-[hsl(var(--surface))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--surface-elevated))] hover:border-[hsl(var(--accent-tertiary)/0.3)]"
              }
            `}
            aria-label="Next artwork"
          >
            <ChevronRight className="w-6 h-6 text-[hsl(var(--foreground))]" />
          </button>
        </div>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <span className="font-mono text-sm text-[hsl(var(--text-secondary))]">
            {currentIndex + 1} / {props.artArray.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ExpandedArt;
