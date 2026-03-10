import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface FeaturedProject {
  title: string;
  description: string;
  tags: string[];
  year: string;
  slug: string;
}

const featuredProjects: FeaturedProject[] = [
  {
    title: 'Taskventure',
    description: 'An RPG productivity app that gamifies task management with pixel art aesthetics and character progression.',
    tags: ['React', 'TypeScript', 'Pixel Art', 'Game Design'],
    year: '2024',
    slug: 'taskventure'
  },
  {
    title: 'Lua Labs',
    description: 'Web3 studio exploring blockchain, NFTs, and generative art. Built custom minting experiences and smart contracts.',
    tags: ['Web3', 'Solidity', 'React', 'Generative Art'],
    year: '2022',
    slug: 'lua-labs'
  },
  {
    title: 'BlackRock Design System',
    description: 'Led development of complex data grids, visualization components, and AI chat interfaces used by 100+ teams.',
    tags: ['Design Systems', 'React', 'TypeScript', 'AI'],
    year: '2023',
    slug: 'blackrock-design-system'
  },
];

export function FeaturedProjects() {
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
          <span className="section-label">Selected Work</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-[hsl(var(--foreground))]">
            Featured Projects
          </h2>
        </div>
        
        {/* Projects List */}
        <div className="space-y-6">
          {featuredProjects.map((project, index) => (
            <Link 
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`
                group block glass-card p-6 md:p-8 card-lift
                ${isVisible ? 'fade-in-up' : 'opacity-0'}
              `}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-mono text-sm text-[hsl(var(--text-secondary))]">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-[hsl(var(--foreground))] mb-2 group-hover:text-[hsl(var(--accent))] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[hsl(var(--text-secondary))] text-sm md:text-base mb-4 md:mb-0 max-w-2xl">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="accent-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowRight className="w-5 h-5 text-[hsl(var(--text-secondary))] group-hover:text-[hsl(var(--accent))] group-hover:translate-x-1 transition-all hidden md:block" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* View All Link */}
        <div className={`mt-10 ${isVisible ? 'fade-in-up stagger-5' : 'opacity-0'}`}>
          <Link 
            href="/projects"
            className="inline-flex items-center gap-2 text-[hsl(var(--accent))] font-medium hover:gap-3 transition-all"
          >
            View all projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
