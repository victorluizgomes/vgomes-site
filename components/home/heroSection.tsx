import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark base */}
      <div className="absolute inset-0 bg-[hsl(var(--background))]" />

      {/* Aurora Blobs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
        <div className="aurora-blob aurora-blob-4" />
      </div>

      {/* Noise grain overlay */}
      <div className="noise-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-20">

          {/* Left Side — Text Content */}
          <div className="w-full lg:max-w-xl text-center lg:text-left">

            {/* Role Tag — mx-auto centers on mobile, lg:mx-0 left-aligns on desktop */}
            <p className="section-label mb-5 mx-auto lg:mx-0 fade-in-up stagger-1">
              Front-end Engineer. Artist.
            </p>

            {/* Name — Massive Display */}
            <h1
              className="font-display font-bold leading-[0.92] mb-8 fade-in-up stagger-2"
              style={{ fontSize: 'clamp(3rem, 9vw, 7rem)', letterSpacing: '-0.03em' }}
            >
              <span className="text-[hsl(var(--foreground))]">Victor</span>
              <br />
              <span className="text-[hsl(var(--foreground))]">Gomes</span>
              <span className="text-[hsl(var(--accent))]">.</span>
            </h1>

            {/* Bio — explicit centering on mobile so it's never left-aligned */}
            <p className="text-center lg:text-left text-[hsl(var(--text-secondary))] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 fade-in-up stagger-3">
              Building exceptional digital experiences at{' '}
              <a
                href="https://www.coinbase.com/about"
                target="_blank"
                rel="noreferrer"
                className="text-[hsl(var(--foreground))] animated-underline"
              >
                Coinbase
              </a>
              . Previously at{' '}
              <a
                href="https://www.blackrock.com/us/individual/about-us/about-blackrock"
                target="_blank"
                rel="noreferrer"
                className="text-[hsl(var(--foreground))] animated-underline"
              >
                BlackRock
              </a>
              . Based in Atlanta, crafting interfaces that blend code with creativity.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start fade-in-up stagger-4">
              <Link
                href="/projects"
                className="btn-primary inline-flex items-center justify-center gap-2 group"
              >
                View Projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/blog"
                className="btn-ghost inline-flex items-center justify-center"
              >
                Read Blog
              </Link>
            </div>
          </div>

          {/* Right Side — Profile Photo (chips hidden on mobile) */}
          <div className="flex-shrink-0 relative mt-12 lg:mt-0 fade-in-up stagger-3">

            {/* Gradient border wrapper */}
            <div
              style={{
                padding: '2px',
                background: 'conic-gradient(from 180deg, hsl(var(--accent)), hsl(var(--accent-tertiary)), hsl(var(--accent)))',
                borderRadius: '2rem',
              }}
            >
              <div style={{ borderRadius: 'calc(2rem - 2px)', overflow: 'hidden' }}>
                <Image
                  src="/profile-picture-2024.jpeg"
                  alt="Victor Gomes — Front-end Engineer & Creative Technologist"
                  width={320}
                  height={320}
                  className="w-64 h-64 md:w-80 md:h-80 object-cover object-top block"
                  priority
                />
              </div>
            </div>

            {/* Stat Chips — desktop only */}
            <div className="hidden lg:block absolute -bottom-4 -left-14 fade-in-up stagger-5">
              <div className="stat-chip">Coinbase</div>
            </div>
            <div className="hidden lg:block absolute -top-4 -left-20 fade-in-up stagger-6">
              <div className="stat-chip">Atlanta, GA</div>
            </div>
            <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-24 fade-in-up stagger-6">
              <div className="stat-chip">5+ yrs experience</div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator — desktop only */}
      <div
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 fade-in-up"
        style={{ animationDelay: '700ms' }}
      >
        <span className="text-xs font-mono text-[hsl(var(--text-secondary))] uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-[hsl(var(--accent))] scroll-indicator" />
      </div>
    </section>
  );
}

export default HeroSection;
