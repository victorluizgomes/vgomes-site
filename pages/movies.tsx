import Head from "next/head";
import Image from "next/image";
import { GetStaticProps } from "next";
import React, { useState, useEffect, useRef } from "react";

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 10;

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
  isLiked: boolean;
}

interface FavoriteMovie {
  title: string;
  year: string;
  tmdbId: number;
  posterUrl: string | null;
  tagline: string | null;
}

interface RatingBucket {
  label: string;
  count: number;
}

interface Stats {
  totalCount: number;
  avgRating: number;
  fiveStarCount: number;
  rewatchCount: number;
  likedCount: number;
  ratingDistribution: RatingBucket[];
}

interface Props {
  movies: Movie[];
  favorites: FavoriteMovie[];
  stats: Stats;
}

// ─── Favorite Movies Config ───────────────────────────────────────────────────
// TMDB IDs for the all-time favorites. Poster images fetched at build time via
// TMDB_API_KEY env var — set it in .env.local for local dev.
const FAVORITE_MOVIES_CONFIG = [
  { title: "Troy", year: "2004", tmdbId: 652 },
  { title: "Interstellar", year: "2014", tmdbId: 157336 },
  { title: "Knives Out", year: "2019", tmdbId: 546554 },
  { title: "American Psycho", year: "2000", tmdbId: 1359 },
] as const;

// ─── RSS Parser ───────────────────────────────────────────────────────────────

function extractTag(xml: string, tag: string): string {
  const escaped = tag.replace(":", "\\:");
  const match = xml.match(new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)<\\/${escaped}>`, "i"));
  if (!match) return "";
  return match[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim();
}

function parseLetterboxdRSS(xml: string): Movie[] {
  const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

  return itemMatches.slice(0, 50).map((itemXml) => {
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
      title: decodeHtmlEntities(extractTag(itemXml, "letterboxd:filmTitle")),
      year: extractTag(itemXml, "letterboxd:filmYear"),
      rating,
      watchedDate: extractTag(itemXml, "letterboxd:watchedDate"),
      posterUrl,
      reviewText,
      link: extractTag(itemXml, "link"),
      isRewatch: extractTag(itemXml, "letterboxd:rewatch").toLowerCase() === "yes",
      isLiked: extractTag(itemXml, "letterboxd:memberLike").toLowerCase() === "yes",
    };
  });
}

// ─── Stats Computation ────────────────────────────────────────────────────────

function computeStats(movies: Movie[]): Stats {
  const rated = movies.filter((m) => m.rating > 0);
  const avgRating =
    rated.length > 0
      ? rated.reduce((sum, m) => sum + m.rating, 0) / rated.length
      : 0;

  const RATING_VALUES = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
  const ratingDistribution: RatingBucket[] = RATING_VALUES.map((val) => ({
    label: val.toFixed(1),
    count: movies.filter((m) => m.rating === val).length,
  }));

  return {
    totalCount: movies.length,
    avgRating: Math.round(avgRating * 10) / 10,
    fiveStarCount: movies.filter((m) => m.rating === 5.0).length,
    rewatchCount: movies.filter((m) => m.isRewatch).length,
    likedCount: movies.filter((m) => m.isLiked).length,
    ratingDistribution,
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
}

// Every star slot — full, half, empty — uses the same fixed width so spacing
// is perfectly uniform regardless of the natural character advance width.
const STAR_SLOT: React.CSSProperties = {
  display: "inline-block",
  width: "0.85em",
  textAlign: "center",
  lineHeight: 1,
  fontSize: "1em",
  flexShrink: 0,
};

function StarRow({ rating }: { rating: number }) {
  if (!rating) return null;
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <span
      className="inline-flex items-center"
      style={{ gap: "3px" }}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f${i}`} style={{ ...STAR_SLOT, color: "hsl(var(--accent-secondary))" }}>★</span>
      ))}
      {/* Half star: two overlapping stars, right half clipped */}
      {half && (
        <span style={{ ...STAR_SLOT, position: "relative" }}>
          {/* Empty background */}
          <span style={{ color: "hsl(var(--accent-secondary) / 0.25)", fontSize: "1em", lineHeight: 1 }}>★</span>
          {/* Filled half — clip-path removes right 50% of the glyph */}
          <span style={{
            position: "absolute",
            left: 0,
            top: 0,
            clipPath: "inset(0 50% 0 0)",
            color: "hsl(var(--accent-secondary))",
            lineHeight: 1,
          }}>★</span>
        </span>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e${i}`} style={{ ...STAR_SLOT, color: "hsl(var(--accent-secondary) / 0.25)" }}>★</span>
      ))}
    </span>
  );
}

// ─── Favorite Card ────────────────────────────────────────────────────────────

function FavoriteCard({ movie }: { movie: FavoriteMovie }) {
  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: "hsl(var(--surface) / 0.5)",
        border: "1px solid hsl(var(--border))",
      }}
    >
      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
        style={{ boxShadow: "inset 0 0 0 1px hsl(var(--accent-secondary) / 0.6)" }}
      />

      {/* Poster */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "2/3" }}>
        {movie.posterUrl ? (
          <Image
            src={movie.posterUrl}
            alt={`${movie.title} (${movie.year}) poster`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3"
            style={{ background: "hsl(var(--surface-elevated))" }}
          >
            <span style={{ fontSize: "2.5rem" }}>🎬</span>
            <span
              className="font-mono text-xs text-center px-3 leading-tight"
              style={{ color: "hsl(var(--text-secondary))" }}
            >
              {movie.title}
            </span>
          </div>
        )}
        {/* Bottom gradient overlay for legibility */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "45%",
            background: "linear-gradient(to top, hsl(var(--surface) / 0.98) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Info below poster */}
      <div className="px-3 pb-3 pt-2 relative z-10">
        <p
          className="font-display font-bold leading-tight text-[hsl(var(--foreground))] mb-0.5"
          style={{ fontSize: "clamp(0.78rem, 1.8vw, 0.92rem)" }}
        >
          {movie.title}
        </p>
        <p className="font-mono text-xs" style={{ color: "hsl(var(--text-secondary))" }}>
          {movie.year}
        </p>
      </div>
    </div>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────────────

function StatsSection({ stats }: { stats: Stats }) {
  const maxCount = Math.max(...stats.ratingDistribution.map((b) => b.count), 1);

  const statItems = [
    {
      label: "avg rating",
      value: stats.avgRating > 0 ? `${stats.avgRating}` : "—",
      suffix: stats.avgRating > 0 ? "★" : "",
    },
    {
      label: "perfect scores",
      value: String(stats.fiveStarCount),
      suffix: " ★★★★★",
    },
    {
      label: "rewatches",
      value: String(stats.rewatchCount),
      suffix: "",
    },
    {
      label: "liked",
      value: String(stats.likedCount),
      suffix: " ♥",
    },
  ];

  return (
    <section className="mb-14 fade-in-up" style={{ animationDelay: "100ms" }}>
      {/* Section label */}
      <p
        className="text-sm font-mono tracking-widest uppercase mb-6 inline-flex items-center gap-2"
        style={{ color: "hsl(var(--accent-secondary))" }}
      >
        <span style={{ transform: "translateY(-1px)", display: "inline-block" }}>◆</span>{" "}
        Watching Stats (last 50 reviews)
      </p>

      {/* Stat chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {statItems.map(({ label, value, suffix }) => (
          <div
            key={label}
            className="rounded-xl p-4 flex flex-col gap-1.5"
            style={{
              background: "hsl(var(--surface) / 0.45)",
              border: "1px solid hsl(var(--border))",
            }}
          >
            <span
              className="font-display font-bold leading-none"
              style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "hsl(var(--foreground))" }}
            >
              {value}
              <span style={{ color: "hsl(var(--accent-secondary))", fontSize: "0.8em" }}>
                {suffix}
              </span>
            </span>
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "hsl(var(--text-secondary))" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Rating distribution histogram */}
      <div
        className="rounded-xl p-4 sm:p-5"
        style={{
          background: "hsl(var(--surface) / 0.45)",
          border: "1px solid hsl(var(--border))",
        }}
      >
        <p
          className="font-mono text-xs uppercase tracking-widest mb-4"
          style={{ color: "hsl(var(--text-secondary))" }}
        >
          Rating Distribution
        </p>
        <div className="flex items-end gap-1 sm:gap-1.5" style={{ height: "52px" }}>
          {stats.ratingDistribution.map(({ label, count }) => (
            <div key={label} className="flex-1 flex flex-col items-center justify-end">
              <div
                className="w-full rounded-t-sm"
                style={{
                  height: count > 0 ? `${Math.max(4, (count / maxCount) * 48)}px` : "3px",
                  background: count > 0 ? "hsl(var(--accent-secondary))" : "hsl(var(--border))",
                  opacity: count > 0 ? 0.5 + (count / maxCount) * 0.5 : 0.4,
                  transition: "height 0.5s ease",
                }}
              />
            </div>
          ))}
        </div>
        {/* X-axis: every other label for space */}
        <div className="flex gap-1 sm:gap-1.5 mt-2">
          {stats.ratingDistribution.map(({ label }, i) => (
            <div key={label} className="flex-1 text-center">
              {i % 2 === 0 && (
                <span
                  className="font-mono"
                  style={{ fontSize: "0.55rem", color: "hsl(var(--text-secondary) / 0.55)" }}
                >
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footnote */}
      <p
        className="mt-2.5 font-mono"
        style={{ fontSize: "0.65rem", color: "hsl(var(--text-secondary) / 0.45)" }}
      >
        * Based on last {stats.totalCount} diary entries from the Letterboxd RSS feed
      </p>
    </section>
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

      {/* Poster — natural 2:3 aspect ratio, never stretched */}
      <div
        className="flex-shrink-0 rounded-xl overflow-hidden"
        style={{ width: "clamp(72px, 16vw, 120px)", alignSelf: "flex-start" }}
      >
        {movie.posterUrl ? (
          <Image
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
            width={150}
            height={225}
            className="w-full h-auto block"
            sizes="120px"
          />
        ) : (
          <div
            className="flex items-center justify-center rounded-xl"
            style={{ aspectRatio: "2/3", background: "hsl(var(--surface))" }}
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

            <div className="flex-shrink-0 text-base sm:text-lg leading-none flex items-center gap-2">
              {movie.isLiked && (
                <span
                  style={{ ...STAR_SLOT, color: "hsl(var(--accent-secondary))" }}
                  title="Liked"
                >
                  ♥
                </span>
              )}
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

// ─── Scroll Loading Indicator ─────────────────────────────────────────────────

function LoadingDots() {
  return (
    <div className="flex justify-center items-center gap-1.5 py-10">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{
            background: "hsl(var(--accent-secondary) / 0.5)",
            animationDelay: `${i * 200}ms`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MoviesPage({ movies, favorites, stats }: Props) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const visibleMovies = movies.slice(0, visibleCount);
  const hasMore = visibleCount < movies.length;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, movies.length));
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, movies.length]);

  return (
    <main className="min-h-screen pt-24 pb-20">
      <Head>
        <title>Movies | Victor Gomes</title>
        <meta
          name="description"
          content="Victor Gomes' movie diary — latest reviews from Letterboxd, all-time favorites, and watching stats."
        />
      </Head>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <header className="mb-12 fade-in-up">
          <p
            className="text-sm font-mono tracking-widest uppercase mb-4 inline-flex items-center gap-2"
            style={{ color: "hsl(var(--accent-secondary))" }}
          >
            <span>◆</span> Film Diary
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
            — no exceptions.
          </p>
        </header>

        {/* ── All-Time Favorites ─────────────────────────────────────────────── */}
        <section className="mb-14 fade-in-up" style={{ animationDelay: "60ms" }}>
          <p
            className="text-sm font-mono tracking-widest uppercase mb-6 inline-flex items-center gap-2"
            style={{ color: "hsl(var(--accent-secondary))" }}
          >
            <span style={{ transform: "translateY(-1px)", display: "inline-block" }}>◆</span>{" "}
            All-Time Favorites
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {favorites.map((fav) => (
              <FavoriteCard key={fav.title} movie={fav} />
            ))}
          </div>
        </section>

        {/* ── Watching Stats ────────────────────────────────────────────────── */}
        <StatsSection stats={stats} />

        {/* Divider */}
        <div
          className="mb-10 h-px"
          style={{
            background:
              "linear-gradient(to right, hsl(var(--accent-secondary) / 0.6), transparent)",
          }}
        />

        {/* ── Recent Reviews ────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <p
              className="text-sm font-mono tracking-widest uppercase inline-flex items-center gap-2"
              style={{ color: "hsl(var(--accent-secondary))" }}
            >
              <span style={{ transform: "translateY(-1px)", display: "inline-block" }}>◆</span>{" "}
              Recent Reviews
            </p>
            {movies.length > 0 && (
              <span
                className="font-mono text-xs"
                style={{ color: "hsl(var(--text-secondary))" }}
              >
                {visibleCount} of {movies.length}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {movies.length === 0
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl animate-pulse"
                    style={{
                      background: "hsl(var(--surface) / 0.45)",
                      border: "1px solid hsl(var(--border))",
                    }}
                  >
                    <div
                      className="flex-shrink-0 rounded-xl"
                      style={{
                        width: "clamp(72px, 16vw, 120px)",
                        aspectRatio: "2/3",
                        background: "hsl(var(--surface))",
                      }}
                    />
                    <div className="flex-1 flex flex-col gap-3 py-1">
                      <div className="h-5 rounded" style={{ background: "hsl(var(--surface))", width: "60%" }} />
                      <div className="h-3 rounded" style={{ background: "hsl(var(--surface))", width: "35%" }} />
                      <div className="h-3 rounded" style={{ background: "hsl(var(--surface))", width: "90%" }} />
                      <div className="h-3 rounded" style={{ background: "hsl(var(--surface))", width: "75%" }} />
                    </div>
                  </div>
                ))
              : visibleMovies.map((movie, i) => (
                  <div
                    key={movie.link}
                    className="fade-in-up"
                    style={{ animationDelay: `${(i % LOAD_MORE_COUNT) * 60}ms` }}
                  >
                    <MovieCard movie={movie} index={i} />
                  </div>
                ))}
          </div>

          {/* Infinite scroll sentinel */}
          {hasMore && (
            <div ref={sentinelRef}>
              <LoadingDots />
            </div>
          )}
        </section>

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
          {!hasMore && movies.length > 0 && (
            <p className="font-mono text-xs" style={{ color: "hsl(var(--text-secondary))" }}>
              all {movies.length} reviews shown
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

// ─── Data Fetching ────────────────────────────────────────────────────────────

export const getStaticProps: GetStaticProps<Props> = async () => {
  // ── Letterboxd RSS ──────────────────────────────────────────────────────────
  let movies: Movie[] = [];
  try {
    const res = await fetch("https://letterboxd.com/vgomes/rss/", {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; vgomes-site/1.0)" },
    });
    if (res.ok) {
      const xml = await res.text();
      movies = parseLetterboxdRSS(xml);
    } else {
      console.error("Failed to fetch Letterboxd RSS:", res.status);
    }
  } catch (err) {
    console.error("Error fetching Letterboxd RSS:", err);
  }

  // ── Stats ───────────────────────────────────────────────────────────────────
  const stats = computeStats(movies);

  // ── TMDB Favorites ──────────────────────────────────────────────────────────
  // Set TMDB_API_KEY in .env.local to enable poster images for favorites.
  // Get a free key at https://www.themoviedb.org/settings/api
  const tmdbKey = process.env.TMDB_API_KEY;

  const favorites: FavoriteMovie[] = await Promise.all(
    FAVORITE_MOVIES_CONFIG.map(async ({ title, year, tmdbId }) => {
      if (!tmdbKey) {
        return { title, year, tmdbId, posterUrl: null, tagline: null };
      }
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${tmdbKey}`,
          { headers: { "User-Agent": "Mozilla/5.0 (compatible; vgomes-site/1.0)" } }
        );
        if (!res.ok) return { title, year, tmdbId, posterUrl: null, tagline: null };
        const data = await res.json();
        return {
          title,
          year,
          tmdbId,
          posterUrl: data.poster_path
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : null,
          tagline: (data.tagline as string) || null,
        };
      } catch {
        return { title, year, tmdbId, posterUrl: null, tagline: null };
      }
    })
  );

  return {
    props: { movies, favorites, stats },
    revalidate: 3600,
  };
};
