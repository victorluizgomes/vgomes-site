import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArtPropertiesInterface } from "../../model/art.interface";
import ExpandedArt from "./expandedArt";
import artworksData from "../../model/artworks.json";
import { Play } from "lucide-react";

type ArtCategory = "all" | "drawing" | "painting" | "digital" | "pixel" | "generative";

const categories: { key: ArtCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "digital", label: "Digital" },
  { key: "drawing", label: "Drawing" },
  { key: "painting", label: "Painting" },
  { key: "generative", label: "Generative" },
  { key: "pixel", label: "Pixel" },
];

export function ArtGallery() {
  const [activeCategory, setActiveCategory] = useState<ArtCategory>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedArt, setExpandedArt] = useState<ArtPropertiesInterface | null>(null);
  const [expandedArtIndex, setExpandedArtIndex] = useState(-1);
  const [expandedCurrArray, setExpandedCurrArray] = useState<ArtPropertiesInterface[]>([]);
  const loadedCount = useRef(0);

  // Get all artworks or filtered by category
  const currentArt = useMemo(() => {
    if (activeCategory === "all") {
      // Combine all categories
      const all: ArtPropertiesInterface[] = [];
      artworksData.forEach((category: any) => {
        const key = Object.keys(category)[0];
        if (category[key]) {
          all.push(...category[key]);
        }
      });
      return all;
    }

    const categoryData = artworksData.find((category: any) => category[activeCategory]);
    return categoryData ? categoryData[activeCategory] || [] : [];
  }, [activeCategory]);

  // Reset loading state when category changes
  useEffect(() => {
    loadedCount.current = 0;
    setIsLoading(true);
    
    // Set a maximum load time
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [activeCategory]);

  const handleImageLoad = () => {
    loadedCount.current += 1;
    if (loadedCount.current >= Math.min(currentArt.length, 6)) {
      setIsLoading(false);
    }
  };

  const handleExpandArt = (
    art: ArtPropertiesInterface,
    currArtArray: ArtPropertiesInterface[],
    index: number
  ) => {
    setExpandedArtIndex(index);
    setExpandedArt(art);
    setExpandedCurrArray(currArtArray);
  };

  const closeExpandedArt = () => {
    setExpandedArtIndex(-1);
    setExpandedArt(null);
  };

  return (
    <div>
      {/* Modal */}
      {expandedArt && (
        <ExpandedArt
          art={expandedArt}
          artArray={expandedCurrArray}
          currentIndex={expandedArtIndex}
          onClose={closeExpandedArt}
        />
      )}

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center md:justify-start">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${activeCategory === cat.key
                ? "bg-[hsl(var(--accent-tertiary))] text-[hsl(var(--background))]"
                : "bg-[hsl(var(--surface))] text-[hsl(var(--text-secondary))] border border-[hsl(var(--border))] hover:border-[hsl(var(--accent-tertiary)/0.5)] hover:text-[hsl(var(--foreground))]"
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div 
        className={`
          columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4
          transition-opacity duration-300
          ${isLoading ? 'opacity-50' : 'opacity-100'}
        `}
      >
        {currentArt.map((art: ArtPropertiesInterface, index: number) => (
          <div
            key={`${art.link}-${index}`}
            className="break-inside-avoid group cursor-pointer scale-in"
            style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
            onClick={() => !art.isVideo && handleExpandArt(art, currentArt, index)}
          >
            <div className="relative overflow-hidden rounded-2xl bg-[hsl(var(--surface))] border border-[hsl(var(--border))] hover:border-[hsl(var(--accent-tertiary)/0.3)] transition-all duration-300">
              {art.isVideo ? (
                // Video Card
                <div className="relative">
                  <Image
                    src={art.cover || art.link}
                    alt={art.name}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    onLoad={handleImageLoad}
                    onError={handleImageLoad}
                  />
                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[hsl(var(--background)/0.3)] group-hover:bg-[hsl(var(--background)/0.5)] transition-colors">
                    <div className="w-16 h-16 rounded-full bg-[hsl(var(--background)/0.8)] backdrop-blur-sm flex items-center justify-center border border-[hsl(var(--border))]">
                      <Play className="w-6 h-6 text-[hsl(var(--accent-tertiary))] ml-1" />
                    </div>
                  </div>
                  {/* Video element that plays on hover */}
                  <video
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    src={art.link}
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseLeave={(e) => {
                      const video = e.target as HTMLVideoElement;
                      video.pause();
                      video.currentTime = 0;
                    }}
                    poster={art.cover}
                  />
                </div>
              ) : (
                // Image Card
                <Image
                  src={art.link}
                  alt={art.name}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                />
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background)/0.9)] via-[hsl(var(--background)/0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display text-lg text-[hsl(var(--foreground))] mb-1">
                    {art.name}
                  </h3>
                  <p className="font-mono text-xs text-[hsl(var(--accent-tertiary))]">
                    {art.isVideo ? "Video" : "Image"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentArt.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[hsl(var(--text-secondary))]">
            No artwork found in this category.
          </p>
        </div>
      )}
    </div>
  );
}

export default ArtGallery;
