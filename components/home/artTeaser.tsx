import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const featuredArt = [
  { src: '/art/digital/tentacle-portrait.heic.jpg', name: 'Tentacle Portrait', medium: 'Digital' },
  { src: '/art/drawing/fallen-angel.jpg', name: 'Fallen Angel Stylized', medium: 'Drawing' },
  { src: '/art/pixel/purple-moonbird.png', name: 'Purple Moonbird', medium: 'Pixel Art' },
  { src: '/art/generative/lucid-paths-unrevealed.png', name: 'Lucid Paths Unrevealed', medium: 'Generative' },
];

export function ArtTeaser() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const visible = isVisible ? 'fade-in-up' : 'opacity-0';

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6">
        <div className={`mb-12 md:mb-16 ${visible}`}>
          <span
            className="text-sm font-mono tracking-widest uppercase inline-flex items-center gap-2"
            style={{ color: 'hsl(var(--accent-tertiary))' }}
          >
            <span style={{ transform: 'translateY(-1px)', display: 'inline-block' }}>◆</span>
            Art &amp; Creativity
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-[hsl(var(--foreground))]">
            Visual Explorations
          </h2>
          <p className="text-[hsl(var(--text-secondary))] text-base md:text-lg mt-4 max-w-2xl">
            Drawing since childhood. Creating with code. From pixel art to generative experiments,
            art has always been at the heart of what I do.
          </p>
        </div>
      </div>

      {/* Scroll strip — inside max-w-6xl (no overflow:hidden) so pl-6 aligns with content */}
      <div className="max-w-6xl mx-auto">
        <div className={`overflow-x-auto scrollbar-hide ${isVisible ? 'fade-in-up stagger-2' : 'opacity-0'}`}>
          <div className="flex gap-4 md:gap-6 pl-6">
            {featuredArt.map((piece, index) => (
              <Link key={index} href="/art" className="group relative flex-shrink-0">
                <div
                  className="relative w-56 h-72 md:w-64 md:h-80 overflow-hidden rounded-2xl"
                  style={{
                    background: 'hsl(var(--surface))',
                    border: '1px solid hsl(var(--border))',
                  }}
                >
                  <Image
                    src={piece.src}
                    alt={piece.name}
                    fill
                    quality={90}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 224px, 256px"
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, hsl(var(--background) / 0.9) 0%, hsl(var(--background) / 0.4) 50%, transparent 100%)' }}
                  >
                    <p className="font-display text-sm text-[hsl(var(--foreground))] leading-tight">
                      {piece.name}
                    </p>
                    <p className="font-mono text-xs mt-1" style={{ color: 'hsl(var(--accent-tertiary))' }}>
                      {piece.medium}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            <div className="flex-shrink-0 w-6" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Explore link */}
      <div className="max-w-6xl mx-auto px-6">
        <div className={`mt-8 ${isVisible ? 'fade-in-up stagger-4' : 'opacity-0'}`}>
          <Link
            href="/art"
            className="inline-flex items-center gap-2 font-medium hover:gap-3 transition-all"
            style={{ color: 'hsl(var(--accent-tertiary))' }}
          >
            Explore the gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ArtTeaser;
