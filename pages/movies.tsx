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
  const escaped = tag.replace(":", "\\:");
  const match = xml.match(new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)<\\/${escaped}>`, "i"));
  if (!match) return "";
  return match[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim();
}

function parseLetterboxdRSS(xml: string): Movie[] {
  const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

  return itemMatches.slice(0, 5).map((itemXml) => {
    const description = extractTag(itemXml, "description");

    const posterMatch = description.match(/src="([^"]+)"/);
    const posterUrl = posterMatch ? posterMatch[1] : "";

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

    const ratingStr =
      extractTag(itemXml, "letterboxd:rating") ||
      extractTag(itemXml, "letterboxd:memberRating");
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

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];
  return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
}

// Renders rating as filled/empty stars — no fraction characters
function StarRow({ rating }: { rating: number }) {
  if (!rating) return null;
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {/* Full stars */}
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f${i}`} style={{ color: "hsl(var(--accent-secondary))", fontSize: "1em", lineHeight: 1 }}>★</span>
      ))}
      {/* Half star: two overlapping stars, right half clipped */}
      {half && (
        <span style={{ position: "relative", display: "inline-block", width: "1em", lineHeight: 1 }}>
          {/* Empty background */}
          <span style={{ color: "hsl(var(--accent-secondary) / 0.25)", fontSize: "1em", lineHeight: 1 }}>★</span>
          {/* Filled half — clip-path removes right 50% of the glyph */}
          <span style={{
            position: "absolute",
            left: 0,
            top: 0,
            clipPath: "inset(0 50% 0 0)",
            color: "hsl(var(--accent-secondary))",
            fontSize: "1em",
            lineHeight: 1,
          }}>★</span>
        </span>
      )}
      {/* Empty stars */}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e${i}`} style={{ color: "hsl(var(--accent-secondary) / 0.25)", fontSize: "1em", lineHeight: 1 }}>★</span>
      ))}
    </span>
  );
}

// ─── Movie Card ───────────────────────────────────────────────────────────────

function MovieCard({ movie, index }: { movie: Movie; index: number }) {
  return (
    <a
      href={movie.link}
      target="_blank"
      rel="noreferrer"
      className="group relative flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl transition-all duration-300 overflow-hidden"
      style={{
        background: "hsl(var(--surface) / 0.45)",
        border: "1px solid hsl(var(--border))",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {/* Backdrop index number */}
      <span
        className="absolute right-4 top-1/2 -translate-y-1/2 font-display font-bold select-none pointer-events-none leading-none"
        style={{
          fontSize: "clamp(5rem, 12vw, 9rem)",
          color: "hsl(var(--accent-secondary) / 0.06)",
          lineHeight: 1,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px hsl(var(--accent-secondary) / 0.45)" }}
      />

      {/* Poster */}
      <div
        className="relative flex-shrink-0 rounded-xl overflow-hidden"
        style={{ width: "clamp(72px, 16vw, 120px)", aspectRatio: "2/3" }}
      >
        {movie.posterUrl ? (
          <Image
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
            fill
            className="object-cover"
            sizes="120px"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "hsl(var(--surface))" }}
          >
            <span style={{ color: "hsl(var(--text-secondary))", fontSize: "1.5rem" }}>🎬</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 relative z-10 flex flex-col justify-between py-0.5">
        <div>
          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3
              className="font-display font-bold text-[hsl(var(--foreground))] leading-tight"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)" }}
            >
              {movie.title}
            </h3>

            {/* Rating */}
            <div className="flex-shrink-0 text-base sm:text-lg leading-none pt-0.5">
              <StarRow rating={movie.rating} />
            </div>
          </div>

          {/* Meta: year · date · rewatch */}
          <p
            className="font-mono mb-3"
            style={{ fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)", color: "hsl(var(--text-secondary))" }}
          >
            {movie.year}
            {movie.watchedDate && (
              <>
                <span className="mx-1.5" style={{ color: "hsl(var(--accent-secondary) / 0.5)" }}>·</span>
                {formatDate(movie.watchedDate)}
              </>
            )}
            {movie.isRewatch && (
              <>
                <span className="mx-1.5" style={{ color: "hsl(var(--accent-secondary) / 0.5)" }}>·</span>
                <span style={{ color: "hsl(var(--accent-secondary) / 0.75)" }}>rewatch</span>
              </>
            )}
          </p>

          {/* Review */}
          {movie.reviewText && (
            <p
              className="leading-relaxed line-clamp-3 sm:line-clamp-none"
              style={{
                fontSize: "clamp(0.78rem, 1.6vw, 0.875rem)",
                color: "hsl(var(--text-secondary))",
              }}
            >
              {movie.reviewText}
            </p>
          )}
        </div>

        {/* CTA */}
        <div
          className="mt-3 inline-flex items-center gap-1 font-mono text-xs transition-all duration-200 group-hover:gap-2 w-fit"
          style={{ color: "hsl(var(--accent-secondary))" }}
        >
          View on Letterboxd →
        </div>
      </div>
    </a>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div
      className="flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl animate-pulse"
      style={{ background: "hsl(var(--surface) / 0.45)", border: "1px solid hsl(var(--border))" }}
    >
      <div
        className="flex-shrink-0 rounded-xl"
        style={{ width: "clamp(72px, 16vw, 120px)", aspectRatio: "2/3", background: "hsl(var(--surface))" }}
      />
      <div className="flex-1 flex flex-col gap-3 py-1">
        <div className="h-5 rounded" style={{ background: "hsl(var(--surface))", width: "60%" }} />
        <div className="h-3 rounded" style={{ background: "hsl(var(--surface))", width: "35%" }} />
        <div className="h-3 rounded" style={{ background: "hsl(var(--surface))", width: "90%" }} />
        <div className="h-3 rounded" style={{ background: "hsl(var(--surface))", width: "75%" }} />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface Props {
  movies: Movie[];
}

export default function MoviesPage({ movies }: Props) {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <Head>
        <title>Movies | Victor Gomes</title>
        <meta
          name="description"
          content="Victor Gomes' latest movie reviews from Letterboxd. Every film logged, every film reviewed."
        />
      </Head>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <header className="mb-12 fade-in-up">
          <p
            className="text-sm font-mono tracking-widest uppercase mb-4 inline-flex items-center gap-2"
            style={{ color: "hsl(var(--accent-secondary))" }}
          >
            <span>◆</span> Recently Watched
          </p>
          <h1
            className="font-display font-bold text-[hsl(var(--foreground))] mb-5"
            style={{
              fontSize: "clamp(3rem, 9vw, 6rem)",
              letterSpacing: "-0.03em",
              lineHeight: 0.92,
            }}
          >
            Movies
            <span style={{ color: "hsl(var(--accent-secondary))" }}>.</span>
          </h1>
          <p className="text-[hsl(var(--text-secondary))] text-base sm:text-lg max-w-lg leading-relaxed">
            Movies have always had a hold on me. I log and review everything I watch on{" "}
            <a
              href="https://letterboxd.com/vgomes"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 transition-colors"
              style={{ color: "hsl(var(--accent-secondary))" }}
            >
              Letterboxd
            </a>{" "}
            — no exceptions. Here&apos;s what I&apos;ve been watching lately and what I thought.
          </p>
        </header>

        {/* Divider */}
        <div
          className="mb-8 h-px"
          style={{ background: "linear-gradient(to right, hsl(var(--accent-secondary) / 0.6), transparent)" }}
        />

        {/* Movie list */}
        <div className="flex flex-col gap-4">
          {movies.length === 0
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
            : movies.map((movie, i) => (
                <div
                  key={movie.link}
                  className="fade-in-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <MovieCard movie={movie} index={i} />
                </div>
              ))}
        </div>

        {/* Footer */}
        <div
          className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0 fade-in-up"
          style={{ animationDelay: "500ms" }}
        >
          <a
            href="https://letterboxd.com/vgomes"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm transition-all hover:gap-3"
            style={{ color: "hsl(var(--accent-secondary))" }}
          >
            View my full Letterboxd profile →
          </a>
          {movies.length > 0 && (
            <p
              className="font-mono text-xs"
              style={{ color: "hsl(var(--text-secondary))" }}
            >
              {movies.length} recent reviews
            </p>
          )}
        </div>
      </div>
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
