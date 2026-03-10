import Head from "next/head";
import { useEffect, useState } from "react";
import { Film } from "lucide-react";

export default function MoviesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const fetchLetterboxdContent = async () => {
      try {
        const response = await fetch(
          "https://lb-embed-content.bokonon.dev?username=vgomes"
        );
        const data = await response.text();
        const container = document.getElementById("letterboxd-embed-wrapper-tc");
        if (container) {
          container.innerHTML = data;
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Letterboxd content:", error);
        setIsLoading(false);
      }
    };

    fetchLetterboxdContent();
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <Head>
        <title>Movies | Victor Gomes</title>
        <meta
          name="description"
          content="Victor Gomes' latest movie reviews from Letterboxd. Discover what I've been watching and my thoughts on cinema."
        />
      </Head>

      <div className="max-w-4xl mx-auto px-6">
        {/* Page Header */}
        <header className={`mb-16 ${mounted ? 'fade-in-up' : 'opacity-0'}`}>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-[hsl(var(--foreground))] mb-4">
            Movies
            <span className="text-[hsl(var(--accent-secondary))]">.</span>
          </h1>
          <div className="h-1 w-16 bg-[hsl(var(--accent-secondary))] mb-6" />
          <p className="text-[hsl(var(--text-secondary))] text-lg max-w-2xl">
            I have always loved movies. I use Letterboxd to track and review everything I watch. 
            Here are my latest reviews.
          </p>
        </header>

        {/* Recently Watched Section */}
        <section className={`${mounted ? 'fade-in-up stagger-2' : 'opacity-0'}`}>
          <div className="flex items-center gap-3 mb-8">
            <Film className="w-5 h-5 text-[hsl(var(--accent-secondary))]" />
            <span className="section-label" style={{ color: 'hsl(var(--accent-secondary))' }}>
              Recently Watched
            </span>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[2/3] rounded-xl bg-[hsl(var(--surface))] animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Letterboxd Content Container */}
          <div 
            id="letterboxd-embed-wrapper-tc"
            className={`letterboxd-dark-theme ${isLoading ? 'hidden' : ''}`}
          />
        </section>

        {/* Letterboxd Link */}
        <div className={`mt-12 ${mounted ? 'fade-in-up stagger-4' : 'opacity-0'}`}>
          <a
            href="https://letterboxd.com/vgomes"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[hsl(var(--accent-secondary))] font-medium hover:gap-3 transition-all"
          >
            View my full Letterboxd profile
            <span className="text-lg">&rarr;</span>
          </a>
        </div>
      </div>

      {/* Custom Letterboxd Embed Styling */}
      <style jsx global>{`
        .letterboxd-dark-theme {
          --lb-bg: transparent;
          --lb-text: hsl(var(--foreground));
          --lb-text-muted: hsl(var(--text-secondary));
          --lb-border: hsl(var(--border));
          --lb-accent: hsl(var(--accent-secondary));
        }

        #letterboxd-embed-wrapper-tc {
          color: hsl(var(--foreground));
        }

        #letterboxd-embed-wrapper-tc * {
          color: inherit;
        }

        #letterboxd-embed-wrapper-tc a {
          color: hsl(var(--accent-secondary)) !important;
          text-decoration: none;
        }

        #letterboxd-embed-wrapper-tc a:hover {
          text-decoration: underline;
        }

        #letterboxd-embed-wrapper-tc img {
          border-radius: 0.75rem;
          transition: transform 0.2s ease;
        }

        #letterboxd-embed-wrapper-tc img:hover {
          transform: scale(1.02);
        }

        /* Override any background colors */
        #letterboxd-embed-wrapper-tc > * {
          background: transparent !important;
        }

        /* Style the film cards */
        #letterboxd-embed-wrapper-tc .poster-container,
        #letterboxd-embed-wrapper-tc .film-poster {
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid hsl(var(--border));
        }

        /* Style any ratings */
        #letterboxd-embed-wrapper-tc .rating {
          color: hsl(var(--accent-secondary)) !important;
        }

        /* Style date/metadata text */
        #letterboxd-embed-wrapper-tc .date,
        #letterboxd-embed-wrapper-tc .metadata,
        #letterboxd-embed-wrapper-tc small {
          color: hsl(var(--text-secondary)) !important;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
        }
      `}</style>
    </main>
  );
}
