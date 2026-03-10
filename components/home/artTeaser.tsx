import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Sample art pieces to display in the teaser
const artPieces = [
  { src: '/art/digital/digital-1.jpg', alt: 'Digital artwork 1' },
  { src: '/art/pixel/pixel-1.png', alt: 'Pixel art 1' },
  { src: '/art/generative/gen-1.jpg', alt: 'Generative art 1' },
  { src: '/art/drawing/drawing-1.jpg', alt: 'Drawing 1' },
];

export function ArtTeaser() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className={`mb-12 md:mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <span className="section-label">Art & Creativity</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-[hsl(var(--foreground))]">
            Visual Explorations
          </h2>
          <p className="text-[hsl(var(--text-secondary))] text-base md:text-lg mt-4 max-w-2xl">
            Drawing since childhood. Creating with code. From pixel art to generative experiments, 
            art has always been at the heart of what I do.
          </p>
        </div>
        
        {/* Art Strip - Horizontal Scroll */}
        <div 
          className={`
            flex gap-4 md:gap-6 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory
            scrollbar-hide
            ${isVisible ? 'fade-in-up stagger-2' : 'opacity-0'}
          `}
        >
          {artPieces.map((piece, index) => (
            <Link 
              key={index}
              href="/art"
              className="group relative flex-shrink-0 snap-start"
            >
              <div className="relative w-64 h-80 md:w-72 md:h-96 overflow-hidden rounded-2xl glass-card">
                {/* Placeholder gradient for missing images */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(${135 + index * 45}deg, 
                      hsl(var(--surface-elevated)), 
                      hsl(var(--surface)),
                      hsl(var(--accent) / 0.1)
                    )`
                  }}
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[hsl(var(--background)/0.7)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="font-mono text-sm text-[hsl(var(--accent))]">
                    View Gallery
                  </span>
                </div>
                
                {/* Scale effect on hover */}
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
              </div>
            </Link>
          ))}
          
          {/* View All Card */}
          <Link 
            href="/art"
            className="group flex-shrink-0 snap-start"
          >
            <div className="w-64 h-80 md:w-72 md:h-96 rounded-2xl border-2 border-dashed border-[hsl(var(--border))] flex flex-col items-center justify-center gap-4 hover:border-[hsl(var(--accent)/0.5)] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[hsl(var(--surface))] flex items-center justify-center group-hover:bg-[hsl(var(--accent)/0.1)] transition-colors">
                <ArrowRight className="w-6 h-6 text-[hsl(var(--accent))]" />
              </div>
              <span className="font-display text-lg text-[hsl(var(--foreground))]">
                Explore Gallery
              </span>
            </div>
          </Link>
        </div>
        
        {/* View All Link - Mobile */}
        <div className={`mt-8 md:hidden ${isVisible ? 'fade-in-up stagger-4' : 'opacity-0'}`}>
          <Link 
            href="/art"
            className="inline-flex items-center gap-2 text-[hsl(var(--accent))] font-medium hover:gap-3 transition-all"
          >
            Explore the gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default ArtTeaser;
