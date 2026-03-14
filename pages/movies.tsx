import Head from "next/head";
import Image from "next/image";
import { GetStaticProps } from "next";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Movie {
  title: string;
  year: string;
  rating: number;
  watchedDate: string;
  posterUrl: string;
  reviewText: string;
  link: string;
  isRewatch: boolean;
}

// ─── RSS Parser ───────────────────────────────────────────────────────────────

function extractTag(xml: string, tag: string): string {
  // Handle namespaced tags like letterboxd:filmTitle
  const escaped = tag.replace(":", "\\:");
  const match = xml.match(new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)<\\/${escaped}>`, "i"));
  if (!match) return "";
  // Strip CDATA wrappers
  return match[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim();
}

function parseLetterboxdRSS(xml: string): Movie[] {
  const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

  return itemMatches.slice(0, 5).map((itemXml) => {
    const description = extractTag(itemXml, "description");

    // Pull poster URL from <img src="..."> inside description
    const posterMatch = description.match(/src="([^"]+)"/);
    const posterUrl = posterMatch ? posterMatch[1] : "";

    // Strip all HTML tags to get plain review text
    const reviewText = description
      .replace(/<img[^>]*\/?>/gi, "")
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&#039;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    const ratingStr = extractTag(itemXml, "letterboxd:rating") || extractTag(itemXml, "letterboxd:memberRating");
    const rating = parseFloat(ratingStr) || 0;

    return {
      title: extractTag(itemXml, "letterboxd:filmTitle"),
      year: extractTag(itemXml, "letterboxd:filmYear"),
      rating,
      watchedDate: extractTag(itemXml, "letterboxd:watchedDate"),
      posterUrl,
      reviewText,
      link: extractTag(itemXml, "link"),
      isRewatch: extractTag(itemXml, "letterboxd:rewatch").toLowerCase() === "yes",
    };
  });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatStars(rating: number): string {
  if (!rating) return "";
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return "★".repeat(full) + (half ? "½" : "");
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
}

// ─── Components ───────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <span
      className="font-mono tracking-wider"
      style={{ color: "hsl(var(--accent))" }}
      aria-label={`${rating} out of 5 stars`}
    >
      {formatStars(rating)}
    </span>
  );
}

function FeaturedCard({ movie }: { movie: Movie }) {
  return (
    <a
      href={movie.link}
      target="_blank"
      rel="noreferrer"
      className="group relative flex-shrink-0 overflow-hidden rounded-2xl block"
      style={{ width: "clamp(200px, 28vw, 320px)", aspectRatio: "2/3" }}
    >
      {/* Poster */}
      <Image
        src={movie.posterUrl}
        alt={`${movie.title} poster`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="320px"
        priority
      />

      {/* Gradient overlay — heavier at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(8,10,15,0.98) 0%, rgba(8,10,15,0.6) 50%, rgba(8,10,15,0.1) 100%)",
        }}
      />

      {/* Accent glow border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1.5px hsl(var(--accent) / 0.6)" }}
      />

      {/* Top bar: date + rewatch badge */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <span
          className="font-mono text-xs px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(8,10,15,0.7)",
            backdropFilter: "blur(8px)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {formatDate(movie.watchedDate)}
        </span>
        {movie.isRewatch && (
          <span
            className="font-mono text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "hsl(var(--accent) / 0.15)",
              color: "hsl(var(--accent))",
              border: "1px solid hsl(var(--accent) / 0.3)",
            }}
          >
            rewatch
          </span>
        )}
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        {/* Rating */}
        <div className="text-lg mb-1">
          <StarRating rating={movie.rating} />
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-white leading-tight mb-0.5"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
        >
          {movie.title}
        </h3>

        {/* Year */}
        <p className="font-mono text-xs mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
          {movie.year}
        </p>

        {/* Review — always visible on featured card */}
        {movie.reviewText && (
          <p
            className="text-sm leading-relaxed line-clamp-4"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {movie.reviewText}
          </p>
        )}

        {/* View on Letterboxd */}
        <div
          className="mt-3 inline-flex items-center gap-1 font-mono text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0"
          style={{ color: "hsl(var(--accent))" }}
        >
          View on Letterboxd →
        </div>
      </div>
    </a>
  );
}

function MovieCard({ movie, index }: { movie: Movie; index: number }) {
  return (
    <a
      href={movie.link}
      target="_blank"
      rel="noreferrer"
      className="group relative flex-shrink-0 overflow-hidden rounded-xl block"
      style={{
        width: "clamp(130px, 15vw, 190px)",
        aspectRatio: "2/3",
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Poster */}
      <Image
        src={movie.posterUrl}
        alt={`${movie.title} poster`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="190px"
      />

      {/* Default gradient overlay */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(8,10,15,0.97) 0%, rgba(8,10,15,0.3) 55%, transparent 100%)",
        }}
      />

      {/* Hover overlay (darker, to show review) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(8,10,15,0.98) 0%, rgba(8,10,15,0.8) 60%, rgba(8,10,15,0.3) 100%)",
        }}
      />

      {/* Accent glow border on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1.5px hsl(var(--accent) / 0.5)" }}
      />

      {/* Date stamp top-right */}
      <div className="absolute top-2.5 right-2.5">
        <span
          className="font-mono text-[10px]"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {formatDate(movie.watchedDate)}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-3">
        {/* Rating */}
        <div className="text-sm mb-0.5">
          <StarRating rating={movie.rating} />
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-white leading-tight text-sm mb-0.5"
        >
          {movie.title}
        </h3>

        {/* Year */}
        <p
          className="font-mono text-[10px] mb-2"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {movie.year}
          {movie.isRewatch && (
            <span style={{ color: "hsl(var(--accent) / 0.7)" }}> · rewatch</span>
          )}
        </p>

        {/* Review — slides in on hover */}
        {movie.reviewText && (
          <p
            className="text-[11px] leading-relaxed line-clamp-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {movie.reviewText}
          </p>
        )}
      </div>
    </a>
  );
}

// ─── Film Strip Decoration ────────────────────────────────────────────────────

function FilmStripBar() {
  return (
    <div className="flex items-center gap-0 mb-10 opacity-30 overflow-hidden select-none" aria-hidden="true">
      {Array.from({ length: 32 }).map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0"
          style={{
            width: 24,
            height: 16,
            margin: "0 3px",
            border: "1.5px solid hsl(var(--accent))",
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface Props {
  movies: Movie[];
}

export default function MoviesPage({ movies }: Props) {
  const featured = movies[0];
  const rest = movies.slice(1);

  return (
    <main className="min-h-screen pt-24 pb-20 overflow-x-hidden">
      <Head>
        <title>Movies | Victor Gomes</title>
        <meta
          name="description"
          content="Victor Gomes' latest movie reviews from Letterboxd. Discover what I've been watching and my thoughts on cinema."
        />
      </Head>

      <div className="max-w-screen-xl mx-auto px-6">
        {/* Page Header */}
        <header className="mb-12 fade-in-up">
          <p className="section-label mb-4">Recently Watched</p>
          <h1
            className="font-display font-bold text-[hsl(var(--foreground))] mb-4"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", letterSpacing: "-0.03em", lineHeight: 0.92 }}
          >
            Movies
            <span style={{ color: "hsl(var(--accent-secondary))" }}>.</span>
          </h1>
          <p className="text-[hsl(var(--text-secondary))] text-lg max-w-lg">
            I have always loved movies. I use{" "}
            <a
              href="https://letterboxd.com/vgomes"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-[hsl(var(--accent))] transition-colors"
            >
              Letterboxd
            </a>{" "}
            to track and review everything I watch.
          </p>
        </header>

        {/* Film strip accent */}
        <FilmStripBar />

        {/* Movie Cards — horizontal strip */}
        {movies.length === 0 ? (
          // Skeleton / empty state
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 rounded-2xl animate-pulse"
                style={{
                  width: i === 0 ? "clamp(200px, 28vw, 320px)" : "clamp(130px, 15vw, 190px)",
                  aspectRatio: "2/3",
                  background: "hsl(var(--surface))",
                }}
              />
            ))}
          </div>
        ) : (
          <div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Featured card — first/latest */}
            {featured && (
              <div className="snap-start flex-shrink-0 fade-in-up" style={{ animationDelay: "0ms" }}>
                <FeaturedCard movie={featured} />
              </div>
            )}

            {/* Remaining 4 cards */}
            {rest.map((movie, i) => (
              <div key={movie.link} className="snap-start flex-shrink-0 fade-in-up" style={{ animationDelay: `${(i + 1) * 80}ms` }}>
                <MovieCard movie={movie} index={i} />
              </div>
            ))}
          </div>
        )}

        {/* Bottom row: Letterboxd link */}
        <div className="mt-12 flex items-center justify-between fade-in-up" style={{ animationDelay: "500ms" }}>
          <a
            href="https://letterboxd.com/vgomes"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm transition-all hover:gap-3"
            style={{ color: "hsl(var(--accent-secondary))" }}
          >
            View my full Letterboxd profile →
          </a>
          <p className="font-mono text-xs" style={{ color: "hsl(var(--text-secondary))" }}>
            {movies.length} recent reviews
          </p>
        </div>
      </div>

      {/* Hide scrollbar for WebKit */}
      <style jsx global>{`
        .snap-x::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}

// ─── Data Fetching ────────────────────────────────────────────────────────────

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const res = await fetch("https://letterboxd.com/vgomes/rss/", {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; vgomes-site/1.0)" },
    });

    if (!res.ok) {
      console.error("Failed to fetch Letterboxd RSS:", res.status);
      return { props: { movies: [] }, revalidate: 60 };
    }

    const xml = await res.text();
    const movies = parseLetterboxdRSS(xml);
    return { props: { movies }, revalidate: 3600 };
  } catch (err) {
    console.error("Error fetching Letterboxd RSS:", err);
    return { props: { movies: [] }, revalidate: 60 };
  }
};
