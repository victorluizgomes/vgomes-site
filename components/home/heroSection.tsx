import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh noise-overlay" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Side - Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Role Tag */}
            <p className="font-mono text-sm md:text-base text-[hsl(var(--accent))] mb-4 fade-in-up stagger-1">
              Front-end Engineer. Artist.
            </p>
            
            {/* Name - Massive Display */}
            <h1 
              className="font-display font-bold text-[clamp(3rem,9vw,7rem)] leading-[0.95] tracking-tight mb-6 fade-in-up stagger-2"
              style={{ letterSpacing: '-0.03em' }}
            >
              <span className="text-[hsl(var(--foreground))]">Victor</span>
              <br />
              <span className="text-[hsl(var(--foreground))]">Gomes</span>
              <span className="text-[hsl(var(--accent))]">.</span>
            </h1>
            
            {/* Bio */}
            <p className="text-[hsl(var(--text-secondary))] text-base md:text-lg leading-relaxed mb-8 max-w-xl fade-in-up stagger-3">
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
          
          {/* Right Side - Profile Photo + Stats */}
          <div className="flex-shrink-0 relative">
            {/* Profile Photo Container */}
            <div className="relative fade-in-up stagger-3">
              {/* Gradient border effect */}
              <div 
                className="absolute inset-0 rounded-[2rem] p-[2px]"
                style={{
                  background: 'conic-gradient(from 180deg, hsl(var(--accent)), hsl(var(--accent-tertiary)), hsl(var(--accent)))',
                }}
              />
              
              {/* Photo with blob mask */}
              <div className="relative float-animation">
                <Image
                  src="/profile-picture-2024.jpeg"
                  alt="Victor Gomes - Front-end Engineer"
                  width={320}
                  height={320}
                  className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-[2rem] border-2 border-[hsl(var(--surface))]"
                  priority
                />
              </div>
            </div>
            
            {/* Floating Stat Chips */}
            <div className="absolute -bottom-4 -left-8 md:-left-16 fade-in-up stagger-4">
              <div className="stat-chip">Coinbase</div>
            </div>
            <div className="absolute -top-4 -right-4 md:-right-12 fade-in-up stagger-5">
              <div className="stat-chip">Atlanta, GA</div>
            </div>
            <div className="absolute bottom-20 -right-8 md:-right-20 fade-in-up stagger-6">
              <div className="stat-chip">5+ yrs experience</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 fade-in-up" style={{ animationDelay: '600ms' }}>
        <span className="text-xs font-mono text-[hsl(var(--text-secondary))] uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-[hsl(var(--accent))] scroll-indicator" />
      </div>
    </section>
  );
}

export default HeroSection;
