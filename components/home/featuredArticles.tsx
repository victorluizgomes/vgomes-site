import { ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ARTICLES = [
  {
    source: "Built In",
    tag: "Spotlight",
    title: "Companies Grounded in Powerful Missions",
    description:
      "Featured alongside Coinbase in Built In's spotlight on purpose-driven companies building meaningful products at scale.",
    url: "https://builtin.com/articles/these-13-companies-are-grounded-powerful-missions-and-theyre-hiring#Coinbase",
  },
  {
    source: "BlackRock",
    tag: "Feature",
    title: "Social Impact Codeathon 2021",
    description:
      "Selected to participate in BlackRock's annual Social Impact Codeathon, building technology solutions for organisations addressing societal challenges.",
    url: "https://careers.blackrock.com/blog-social-impact-codeathon-2021",
  },
  {
    source: "UArizona News",
    tag: "Research",
    title: "Googly Eyes Bridge the Gap Between Virtual and Actual Reality",
    description:
      "VR research at the University of Arizona exploring how simulated eye contact affects social presence and immersion in virtual environments.",
    url: "https://sbs.arizona.edu/news/googly-eyes-bridge-gap-between-virtual-and-actual-reality",
  },
  {
    source: "Lua Labs",
    tag: "Studio",
    title: "Lua Labs - Web3 Development Studio",
    description:
      "Co-founded Lua Labs, a Web3 development studio building NFT platforms, blockchain integrations, and decentralised applications at the intersection of design and emerging crypto technology.",
    url: "https://lualabs.xyz/",
  },
];

const PUBLICATION = {
  source: "ACM / UArizona",
  tag: "Conference Paper",
  title: "Googly Eyes: Exploring Effects of Displaying Users' Eyes Outward on an HMD",
  abstract:
    "Head-mounted displays in VR occlude the upper face of wearing users, reducing nonverbal communication cues toward outside users. We discuss Googly Eyes, a high-fidelity prototype that displays an illustration of the HMD-wearing user's eyes in real-time in front of the headset. Through a between-subjects user study comparing Googly Eyes against a baseline HMD experience, we explore the effects on non-HMD users in a collaborative asymmetric co-located task.",
  url: "https://experts.arizona.edu/en/publications/googly-eyes-exploring-effects-of-displaying-users-eyes-outward-on/",
};

export function FeaturedArticles() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className={`mb-12 md:mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <p className="section-label">In The Press</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-[hsl(var(--foreground))]">
            Featured Articles
          </h2>
        </div>

        {/* Articles Grid — 2×2 on md+, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {ARTICLES.map((article, index) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group relative glass-card p-6 md:p-8 flex flex-col gap-4 card-lift overflow-hidden
                ${isVisible ? 'fade-in-up' : 'opacity-0'}
              `}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Mint corner accent line */}
              <span
                className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: "hsl(var(--accent))" }}
                aria-hidden="true"
              />

              {/* Source + tag row */}
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-xs tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{
                    color: "hsl(var(--accent))",
                    background: "hsl(var(--accent) / 0.1)",
                    border: "1px solid hsl(var(--accent) / 0.2)",
                  }}
                >
                  {article.source}
                </span>
                <span className="font-mono text-xs text-[hsl(var(--text-secondary))] tracking-widest uppercase">
                  {article.tag}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-display text-lg md:text-xl text-[hsl(var(--foreground))] leading-snug group-hover:text-[hsl(var(--accent))] transition-colors"
              >
                {article.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[hsl(var(--text-secondary))] leading-relaxed flex-1">
                {article.description}
              </p>

              {/* Read link */}
              <div className="flex items-center gap-1.5 mt-auto pt-2">
                <span
                  className="text-sm font-mono group-hover:gap-2 transition-all"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  Read article
                </span>
                <ExternalLink
                  className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  style={{ color: "hsl(var(--accent))" }}
                />
              </div>
            </a>
          ))}
        </div>

        {/* Featured Publication — full-width horizontal card */}
        <a
          href={PUBLICATION.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group relative glass-card mt-5 md:mt-6 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 card-lift overflow-hidden
            ${isVisible ? 'fade-in-up' : 'opacity-0'}
          `}
          style={{ animationDelay: '500ms' }}
        >
          {/* Mint corner accent line */}
          <span
            className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
            style={{ background: "hsl(var(--accent))" }}
            aria-hidden="true"
          />

          {/* Left — metadata column */}
          <div className="flex md:flex-col md:justify-between md:w-48 md:flex-shrink-0 gap-4 md:gap-0">
            <div className="flex flex-col gap-2">
              <span
                className="font-mono text-xs tracking-widest uppercase px-2.5 py-1 rounded-full self-start"
                style={{
                  color: "hsl(var(--accent))",
                  background: "hsl(var(--accent) / 0.1)",
                  border: "1px solid hsl(var(--accent) / 0.2)",
                }}
              >
                {PUBLICATION.source}
              </span>
              <span className="font-mono text-xs text-[hsl(var(--text-secondary))] tracking-widest uppercase">
                {PUBLICATION.tag}
              </span>
            </div>
            <div className="flex items-center gap-1.5 md:mt-auto">
              <span
                className="text-sm font-mono"
                style={{ color: "hsl(var(--accent))" }}
              >
                Read paper
              </span>
              <ExternalLink
                className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                style={{ color: "hsl(var(--accent))" }}
              />
            </div>
          </div>

          {/* Divider */}
          <div
            className="hidden md:block w-px self-stretch flex-shrink-0"
            style={{ background: "hsl(var(--border))" }}
            aria-hidden="true"
          />

          {/* Right — content */}
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            <h3 className="font-display text-lg md:text-xl text-[hsl(var(--foreground))] leading-snug group-hover:text-[hsl(var(--accent))] transition-colors">
              {PUBLICATION.title}
            </h3>
            <p className="text-sm text-[hsl(var(--text-secondary))] leading-relaxed italic border-l-2 pl-4" style={{ borderColor: "hsl(var(--accent) / 0.3)" }}>
              {PUBLICATION.abstract}
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}

export default FeaturedArticles;
