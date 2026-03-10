import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface BlogPost {
  title: string;
  date: string;
  slug: string;
}

interface LatestBlogPostsProps {
  posts?: BlogPost[];
}

// Default posts for when none are provided
const defaultPosts: BlogPost[] = [
  {
    title: 'Building Pixel Art Games with React and TypeScript',
    date: '2024-08',
    slug: 'building-pixel-art-games'
  },
  {
    title: 'My Journey from BlackRock to Coinbase',
    date: '2024-07',
    slug: 'blackrock-to-coinbase'
  },
  {
    title: 'Design Systems at Scale: Lessons Learned',
    date: '2024-03',
    slug: 'design-systems-at-scale'
  },
];

function formatDate(dateString: string): string {
  const parts = dateString.split('-');
  if (parts.length === 2) {
    const [year, month] = parts;
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  const [year, month, day] = parts.map(num => parseInt(num, 10));
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function LatestBlogPosts({ posts = defaultPosts }: LatestBlogPostsProps) {
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-[hsl(var(--surface))]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className={`mb-12 md:mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <span className="section-label">From The Blog</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-[hsl(var(--foreground))]">
            Latest Writing
          </h2>
        </div>
        
        {/* Blog Posts List */}
        <div className="divide-y divide-[hsl(var(--border))]">
          {posts.map((post, index) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`
                group flex items-center py-6 row-hover px-4 -mx-4
                ${isVisible ? 'fade-in-up' : 'opacity-0'}
              `}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <span className="font-mono text-sm text-[hsl(var(--text-secondary))] w-28 shrink-0">
                {formatDate(post.date)}
              </span>
              <h3 className="font-display text-lg md:text-xl text-[hsl(var(--foreground))] flex-1 group-hover:text-[hsl(var(--accent))] transition-colors">
                {post.title}
              </h3>
              <ArrowRight className="w-5 h-5 text-[hsl(var(--text-secondary))] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-4" />
            </Link>
          ))}
        </div>
        
        {/* View All Link */}
        <div className={`mt-10 ${isVisible ? 'fade-in-up stagger-5' : 'opacity-0'}`}>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-[hsl(var(--accent))] font-medium hover:gap-3 transition-all"
          >
            Read all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestBlogPosts;
