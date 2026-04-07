# vgomes-site — Claude Context

Personal portfolio site for Victor Gomes (victorluizgomes@gmail.com).
Live at **vgomes.co** · Linear project: **"Re-do design of vgomes.co"** (team: Victor Gomes Space)

---

## Dev Setup

- **Runtime:** Bun (`~/.bun/bin/bun`) — Node.js is available but Bun is preferred
- **Framework:** Next.js 14 (Pages Router), TypeScript, Tailwind CSS v3
- **Start dev server:** `~/.bun/bin/bun run dev` → http://localhost:3000
- **Type check:** `~/.bun/bin/bun x tsc --noEmit`
- **Install deps:** `~/.bun/bin/bun install`
- **preview tool launch config:** `/Users/vgomes/Gitrepos/vgomes-site/.claude/launch.json`
  uses full binary path `/Users/vgomes/.bun/bin/bun` because the preview tool doesn't load `.zshrc`
- **Git branch:** `main` (neon-redesign has been merged — all work goes to main)

---

## Design System

### Vibe
Dark editorial — think Linear.app meets a film magazine. Premium, minimal, intentional.
**90/10 rule:** 90% dark/neutral, 10% accent. Accents should never feel overused.
Subtle noise grain overlay adds texture depth throughout.

### Color Palette (`styles/global.css` `:root`)
| Variable | Value | Use |
|---|---|---|
| `--background` | `#080A0F` | Page background (near-black) |
| `--surface` | `#0F1117` | Card/panel backgrounds |
| `--surface-elevated` | `#161B27` | Hovered cards, elevated surfaces |
| `--border` | `#1E2535` | Borders, dividers |
| `--foreground` | `#E8EDF5` | Primary text |
| `--text-secondary` | `#6B7A99` | Muted/meta text |
| `--accent` | `#64FFDA` | **Electric Mint** — primary accent, About/home only |
| `--accent-secondary` | `#FF6B6B` | **Coral Red** — Movies page accent |
| `--accent-tertiary` | `#C084FC` | **Soft Violet** — Art page accent |
| `--accent-blog` | `#4DB8FF` | **Neon Blue** — Blog page accent |
| `--accent-projects` | `#26C17E` | **Emerald Green** — Projects page accent |

### Per-Page Accent Colors
Each page has a designated accent color that flows through section labels, icons, highlights, and the navbar active pill:
- `/` (home/about) → **mint** (`--accent`)
- `/projects` → **emerald green** (`--accent-projects`)
- `/blog` → **neon blue** (`--accent-blog`)
- `/art` → **violet** (`--accent-tertiary`)
- `/movies` → **coral red** (`--accent-secondary`)

The navbar sliding indicator automatically picks up the right color via `getRouteAccent()` in `components/navBar.tsx`.

### Typography
| Role | Font | Class/Usage |
|---|---|---|
| Display / Headings | **Clash Display** | `font-display` or `h1–h6` |
| Body | **DM Sans** | Default body font |
| Mono / Labels / Code | **JetBrains Mono** | `font-mono` |

Heading style: `letter-spacing: -0.03em`, tight `line-height` (~0.92 for hero).
Hero font size pattern: `clamp(3rem, 9vw, 7rem)`.

### Section Label Pattern
All section labels use the `.section-label` CSS class:
```tsx
<p className="section-label">Section Name</p>
```
This automatically prepends a `◆` diamond (via `::before`), uses JetBrains Mono, uppercase, electric mint color, and `inline-flex align-items: center` for vertical alignment.
The `◆` has `transform: translateY(-1px)` to compensate for JetBrains Mono's baseline offset.

To override the color for a specific page (e.g. Movies uses coral red), write the label manually:
```tsx
<p className="text-sm font-mono tracking-widest uppercase inline-flex items-center gap-2"
   style={{ color: "hsl(var(--accent-secondary))" }}>
  <span>◆</span> Section Name
</p>
```

### Reusable CSS Classes (`styles/global.css`)
| Class | Purpose |
|---|---|
| `.section-label` | `◆ LABEL` in mint mono caps |
| `.stat-chip` | Glassmorphism pill tag with `◆` prefix (used on hero) |
| `.glass-card` | Surface card with hover elevation |
| `.accent-pill` | Small mint tag/badge |
| `.btn-primary` | Filled mint CTA button |
| `.btn-ghost` | Ghost border button |
| `.aurora-blob` + `.aurora-blob-1/2/3/4` | Animated background blobs for hero |
| `.noise-overlay` | SVG grain texture overlay |
| `.fade-in-up` | Entrance animation (CSS keyframe) |
| `.stagger-1` through `.stagger-6` | Animation delay steps |
| `.text-gradient` | Mint → violet diagonal text gradient |
| `.animated-underline` | Hover underline sweep effect |
| `.row-hover` | List row hover background effect |
| `.scrollbar-hide` | Hides scrollbar on overflow-x containers (cross-browser) |
| `.media-fade-in` | 150ms opacity fade for lightbox media transitions |
| `.scale-in` | Scale + fade entrance for masonry grid cards |
| `.card-lift` | translateY(-4px) lift on hover for cards |

---

## Art Gallery (`pages/art.tsx`, `components/art/`)

### artGallery.tsx — Masonry Grid
- Uses CSS `columns-1 sm:columns-2 lg:columns-3` (pure CSS multi-column, no JS masonry library)
- Each card uses `break-inside-avoid` to prevent column splits
- **Natural aspect ratios with CLS prevention:** Each artwork in `artworks.json` has `width`/`height` (images) or `coverWidth`/`coverHeight` (video covers). Cards use `<Image width={art.width} height={art.height} className="w-full h-auto" />` — Next.js reserves the correct space before load (no CLS) while displaying the full artwork uncropped.
- Video cards show a poster image + play icon overlay; on hover the actual `<video>` fades in and autoplays (muted). Triggered by `onMouseEnter`/`onMouseLeave` on the video element.
- Category filter: `all | digital | drawing | painting | pixel | generative` — data comes from `model/artworks.json`
- `isLoading` state adds `opacity-50` during category switch with a 1.5s max timeout as fallback

### expandedArt.tsx — Lightbox
- Full-screen modal with keyboard nav (← →) and close (Esc / click backdrop)
- **Critical:** Both `<Image>` and `<video>` elements must have `key={currArt.link}`. Without `key`, React reuses the DOM element and the browser shows the previous media source when navigating quickly (stale media bug).
- Lightbox images use `media-fade-in` CSS class for a smooth 150ms fade when navigating between pieces.

### artTeaser.tsx — Home Page Strip
- Horizontal scroll strip of 4 curated artworks: Tentacle Portrait (digital), Fallen Angel (drawing), Purple Moonbird (pixel), Lucid Paths Unrevealed (generative)
- **Alignment pattern:** Strip div is placed inside `max-w-6xl mx-auto` (NO `px-6` on the wrapper, NO `overflow:hidden`), with `pl-6` on the inner flex row. This aligns the first card with page content while allowing natural right overflow for scrolling. A trailing `<div className="flex-shrink-0 w-6" />` spacer prevents the last card from touching the right edge.
- Uses `IntersectionObserver` + `fade-in-up` / `stagger-*` CSS classes for scroll-triggered entrance animations.
- All accents use `--accent-tertiary` (violet), matching the art page.
- Image `quality={90}` — default 75 looks blurry for artwork.

---

## File Structure

```
pages/
  index.tsx          — Home (hero + about snapshot + featured projects + art teaser + blog)
  art.tsx            — Art gallery with filter tabs + lightbox
  movies.tsx         — Movies page (Letterboxd RSS, getStaticProps, ISR 1h)
  blog/
    index.tsx        — Blog list
    [slug].tsx       — Blog post detail
  projects/
    index.tsx        — Projects list
    [slug].tsx       — Project detail

components/
  navBar.tsx         — Floating pill nav (sliding indicator, route-aware accent colors)
  footer.tsx         — Site footer
  home/
    heroSection.tsx  — Full-screen hero with aurora background, profile photo, stat chips
    aboutSnapshot.tsx — Skills marquee + about pull quote
    featuredProjects.tsx
    latestBlogPosts.tsx
    featuredArticles.tsx  — 2×2 grid of external press/article cards (static data, mint accent)
    artTeaser.tsx
  art/
    artGallery.tsx   — Masonry grid
    expandedArt.tsx  — Lightbox

styles/
  global.css         — CSS variables, design tokens, reusable component classes, animations
  *.module.css       — Legacy module CSS files (some pages still reference these)
```

---

## Navbar (`components/navBar.tsx`)

- **Desktop:** floating pill, centered top, glassmorphism (`rgba(15,17,23,0.55)` → `0.80` on scroll)
- **Sliding indicator:** single `<span>` absolutely positioned under the active `<li>`, CSS-transitioned with `cubic-bezier(0.4, 0, 0.2, 1)` — iOS tab bar feel
- **Route-aware accent:** `getRouteAccent(pathname)` maps routes to CSS variable; indicator background, mobile active text, and hamburger open-state all use it
- **Mobile:** hamburger → full-screen overlay with large display font links + social links

---

## Movies Page (`pages/movies.tsx`)

### Data sources
- **Letterboxd RSS** — `https://letterboxd.com/vgomes/rss/` — fetched server-side in `getStaticProps` (ISR: revalidate every hour). Parsed with a custom regex-based XML parser (`extractTag`, `parseLetterboxdRSS`) — no external XML library. Capped at the **50 most recent diary entries** (RSS only returns ~50 anyway; entries beyond that may be lists, not films).
- **TMDB API** — used only for the All-Time Favorites poster images, fetched at build time in `getStaticProps`. Endpoint: `https://api.themoviedb.org/3/movie/{tmdbId}?api_key=KEY`. Returns `poster_path` → full URL `https://image.tmdb.org/t/p/w500{poster_path}`. The domain `image.tmdb.org` is allowed in `next.config.js`.

### TMDB API key setup
- **Env var:** `TMDB_API_KEY` — set in `.env.local` (already gitignored). Get a free key at https://www.themoviedb.org/settings/api (use the **API Key (v3 auth)** string, not the Bearer token).
- Vercel: add `TMDB_API_KEY` as an environment variable in the project settings.
- **Graceful fallback:** if `TMDB_API_KEY` is not set, favorites render without posters (shows a 🎬 placeholder). The page still works fully — no error thrown.
- **Do not commit the key.** `.env.local` is gitignored.

### All-Time Favorites config
Hardcoded in `FAVORITE_MOVIES_CONFIG` at the top of `movies.tsx`:
```ts
const FAVORITE_MOVIES_CONFIG = [
  { title: "Troy",           year: "2004", tmdbId: 652    },
  { title: "Interstellar",   year: "2014", tmdbId: 157336 },
  { title: "Knives Out",     year: "2019", tmdbId: 546554 },
  { title: "American Psycho",year: "2000", tmdbId: 1359   },
] as const;
```
To change a favorite: update the array and the matching TMDB ID. Look up IDs at https://www.themoviedb.org (the numeric ID is in the movie's URL, e.g. `/movie/652-troy`).

### RSS parser details
- `extractTag(xml, tag)` — regex extracts content between `<tag>…</tag>`, strips CDATA wrappers.
- Fields read per `<item>`: `letterboxd:filmTitle`, `letterboxd:filmYear`, `letterboxd:rating` (or `letterboxd:memberRating` as fallback), `letterboxd:watchedDate`, `letterboxd:rewatch`, `letterboxd:memberLike`.
- Poster URL is extracted from the `<description>` HTML `<img src="…">` attribute.
- Review text is extracted from `<description>` by stripping the `<img>` tag and all other HTML.
- **HTML entities in RSS:** titles and review text contain encoded entities (`&#039;`, `&amp;`, `&quot;`, etc.). The `decodeHtmlEntities()` helper is applied to the title field. The review text pipeline also manually replaces the most common ones inline.

### Star rating rendering
Ratings are `0.5` increments (0–5). The `StarRow` component renders `★` glyphs:
- **`STAR_SLOT` constant** (`React.CSSProperties`) gives every star character (full, half, empty) identical fixed width (`0.85em`) so horizontal spacing is perfectly uniform regardless of font advance width:
  ```ts
  const STAR_SLOT: React.CSSProperties = {
    display: "inline-block", width: "0.85em", textAlign: "center",
    lineHeight: 1, fontSize: "1em", flexShrink: 0,
  };
  ```
- **Half star:** two overlapping `★` glyphs — dim background star + coral filled star clipped with `clipPath: "inset(0 50% 0 0)"`. This is more reliable than `overflow:hidden + width:50%` (which can clip unevenly on subpixel layouts).
- **Heart icon (♥):** rendered with the same `STAR_SLOT` dimensions so it aligns visually with stars. Separated from stars by `gap-2` (8px) on the wrapper div.

### Infinite scroll
- `INITIAL_COUNT = 10`, `LOAD_MORE_COUNT = 10` — all 50 movies are passed as props; the component progressively reveals them.
- An `IntersectionObserver` watches a sentinel `<div>` at the bottom of the list (`rootMargin: "300px"`) and increments `visibleCount` by 10 whenever it enters the viewport.
- No additional network fetches — data is all pre-loaded in props.

### Watching Stats
Computed in `getStaticProps` via `computeStats(movies)` and passed as the `stats` prop:
- `avgRating` — mean of all rated entries (rounded to 1 decimal)
- `fiveStarCount` — entries with `rating === 5.0` (perfect scores)
- `rewatchCount` — entries where `letterboxd:rewatch === "yes"`
- `likedCount` — entries where `letterboxd:memberLike === "yes"`
- `ratingDistribution` — array of 10 buckets (0.5–5.0), each with a `count` — rendered as a bar chart histogram

### Layout
- Vertical editorial list, each card = poster left + title / year / date / rating / review right
- Poster uses `width={150} height={225}` with `className="w-full h-auto"` for natural 2:3 aspect ratio without stretching (never use `fill` on movie list posters — `fill` causes stretching when review text makes the card taller than the poster)
- All accents use `--accent-secondary` (coral red)

---

## Hero Section (`components/home/heroSection.tsx`)

- Aurora animated background: 4 absolute-positioned blur blobs (`.aurora-blob-1/2/3/4`) with `transform: translate()` keyframe animations
- Profile photo: `padding: 2px` wrapper with `conic-gradient` border + inner `overflow: hidden` div
- Stat chips (Coinbase, University of Arizona Grad, 6+ yrs experience) positioned to the **left** of the photo, hidden on mobile (`hidden lg:block`)
- Scroll indicator hidden on mobile (`hidden lg:flex`)
- Role tag uses `section-label` class + `mx-auto lg:mx-0` for centering; current text: `"Front-end Software Engineer."` (no "Artist" — creative side is shown via content, not role tag)

---

## Data Sources

- **Blog posts:** Markdown files (parsed via gray-matter + remark). Frontmatter fields: `title`, `date`, `description`, `tags?: string[]`. The `tags` array renders as multiple pills on both the blog list (`pages/blog/index.tsx`) and the post detail (`pages/blog/[slug].tsx`). Do NOT use a `category` field — it is no longer supported; use `tags` instead. Tags in use: `Productivity`, `AI`, `Career`, `Side Projects`, `Tutorial`, `Tools`, `Next.js`, `SEO`, `HTML`.
- **Art:** Static JSON at `model/artworks.json` — array of category objects, each keyed by category name (e.g. `[{ "digital": [...] }, { "drawing": [...] }]`). Each artwork has `link`, `name`, `isVideo?`, and optionally `cover` (poster image for videos). See `model/art.interface.tsx` for the `ArtPropertiesInterface` type.
- **Movies:** Letterboxd RSS feed — `https://letterboxd.com/vgomes/rss/` (capped at 50 entries). Favorites poster images fetched from TMDB API at build time using `TMDB_API_KEY` env var (see Movies Page section for setup).
- **Projects:** Markdown files in `project-posts/` directory. Frontmatter: `title`, `date`, `description`, `tags[]`, `featured`. The home page `getStaticProps` reads these to populate `FeaturedProjects` (top 3 by date). The `FeaturedProjects` component accepts `projects` as props — do NOT hardcode projects in the component.

---

## Linear Task Management

Connected via Linear MCP. Check open tasks with:
```
list issues in project "Re-do design of vgomes.co"
```
Remaining open issues include VIC-19 (scroll animations), VIC-22 (projects/blog editorial layout), VIC-23 (Framer Motion transitions).

**Completed:** VIC-17 (copy updates), VIC-25 (art teaser real artwork), VIC-28 (lightbox stale media bug), VIC-29 (masonry CLS), VIC-21 (movies page redesign), VIC-24 (navbar refinement), VIC-33 (video click opens lightbox), VIC-36 (featured projects from real posts), VIC-37 (per-route accent colors), VIC-34 (art masonry natural aspect ratios), VIC-30 (SEO audit), VIC-44 (movies page — favorites, stats, infinite scroll, TMDB posters, star/entity fixes), VIC-46 (movies footer mobile layout + half-star clip-path fix), VIC-27 (art gallery curation), VIC-47 (featured articles section — 2×2 card grid on homepage), VIC-26 (project posts content + screenshots — all four posts fully written with tech stack, highlights, and headless Chrome screenshots).

**Note:** Framer Motion is NOT yet installed. VIC-23 covers adding it. When doing animation work, use CSS transitions/keyframes or `IntersectionObserver` until Framer Motion is added.

---

## Key Decisions & Gotchas

- **Art page header:** Uses a Picasso blockquote ("Every child is an artist...") instead of a plain description, with `ars gratia artis` (art for art's sake) as a small mono label underneath. Both are styled with `--accent-tertiary`. Do not replace with a plain prose description.
- **CSS unicode escapes in content:** Use the literal character `'◆'` not `'\u25C6'` — the latter is JS syntax and will render as text in CSS
- **Bun full path required** in launch.json and any spawn contexts — the preview tool doesn't load `.zshrc`
- **`◆` vertical alignment:** JetBrains Mono has a baseline offset; all `::before` diamond pseudo-elements need `transform: translateY(-1px)` to visually center with adjacent text
- **Image domains:** `a.ltrbxd.com` is configured in `next.config.js` for Letterboxd poster images
- **`prefers-reduced-motion`:** Aurora blob animations are disabled when the user has reduced motion enabled (handled in `global.css`)
- **Stat chips overflow:** All hero chips are positioned to the **left** of the photo (negative left offsets), not the right — right-side chips clipped the viewport at 1280px
- **No styled-jsx in components:** Next.js 14 with the SWC compiler (used by Bun) does NOT support `<style jsx>` inline style blocks without the styled-jsx Babel plugin. Using `<style jsx>` will cause a cryptic "Unexpected token" parse error at the first JSX element below it. Always use `global.css`, Tailwind classes, or inline `style={{}}` props instead.
- **Stale Next.js build cache:** If the dev server shows a compilation error that references old file content (different comments, old line numbers), the `.next/` cache has a stale compiled version. Fix: stop the server, `rm -rf .next`, restart. This happens when a file had a mid-edit syntax error during a hot reload.
- **Horizontal scroll strip alignment:** To align a scrollable strip's first item with the page container without cutting off the right overflow — place the strip div inside `max-w-6xl mx-auto` (no `px-6`, no `overflow:hidden` on the wrapper), add `pl-6` directly on the inner `flex` row, and add a `<div className="flex-shrink-0 w-6" />` spacer as the last flex child for right-edge breathing room.
- **Avoid `100vw` for container math:** `100vw` includes the scrollbar width (~15px on most desktop OSes), causing off-by-~7px alignment when computing `(100vw - max-width) / 2`. Use the container's natural positioning instead.
- **React `key` on media elements:** When a `<video>` or `<Image>` src changes (e.g. lightbox navigation), add `key={src}` to force React to unmount and remount the DOM element. Without it, the browser reuses the element and may show or play the previous media source.
- **Image quality for artwork:** Next.js `<Image>` defaults to `quality={75}`, which produces visible compression artifacts on detailed artwork and photography. Use `quality={90}` for art showcase images.
- **Worktree launch.json:** When working in a git worktree (`.claude/worktrees/<name>/`), the worktree's own `.claude/launch.json` must `cd` to the worktree path, not the main repo path. The preview tool resolves the launch config relative to the worktree but executes it fresh without inheriting the working directory.
- **Worktree launch.json — shell wrapper for cd:** `next dev` has no `--cwd` flag, so to run the dev server from a worktree directory use `/bin/sh` as `runtimeExecutable` with `["-c", "cd <worktree-path> && /Users/vgomes/.nvm/versions/node/v18.19.0/bin/node /Users/vgomes/Gitrepos/vgomes-site/node_modules/.bin/next dev"]` as `runtimeArgs`. This is the correct pattern for any CLI that lacks a working-directory flag. Use the full NVM node path — the preview tool shell does not load `.zshrc` so `node` is not on PATH. `.nvmrc` specifies v18; the binary lives at `/Users/vgomes/.nvm/versions/node/v18.19.0/bin/node`.
- **`autoPort: true` in launch.json:** Add `"autoPort": true` alongside `"port"` so the preview tool can pick a free port when the configured one (e.g. 3000) is already occupied by another dev server. Without this the tool errors instead of starting.
- **Headless Chrome for external site screenshots:** To take screenshots of external sites and save them directly to the repo (e.g. for project post images), use: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --screenshot=output.png --window-size=1400,900 --hide-scrollbars --virtual-time-budget=5000 <url>`. The `--virtual-time-budget=5000` gives JS time to render before capture. Multiple sites can be captured in parallel with `&` + `wait`. Output is a PNG at the given path.
- **Art masonry image dimensions:** `artworks.json` stores `width`/`height` for every image and `coverWidth`/`coverHeight` for every video cover. To add a new artwork, run `sips -g pixelWidth -g pixelHeight <file>` (macOS) or use the project's `sharp` dependency to get dimensions, then add them to the JSON. Without dimensions, the component falls back to 1200×1600 (portrait).
- **Natural aspect ratio vs `fill`:** Use `<Image width={w} height={h} className="w-full h-auto" />` when you want the image to render at its true aspect ratio. Use `fill` + fixed aspect-ratio container only when you want a uniform grid with cropping.
- **Art masonry video click:** Video cards in the masonry grid have `onMouseEnter`/`onMouseLeave` for hover-preview, but these do NOT block click events. The parent div's `onClick` must allow all art types (not guard with `!art.isVideo`) to open the lightbox. The lightbox (`expandedArt.tsx`) supports both images and videos with `controls autoPlay muted`.
- **`.accent-pill` is always mint:** The `.accent-pill` CSS class hard-codes `--accent` (mint). For pages using different accent colors (blog, projects, art, movies), render the pill manually with inline `style` to match the page accent. See `pages/projects/index.tsx` for the emerald pill pattern.
- **Section labels with non-mint accent:** The `.section-label` CSS class is always mint. For non-mint sections, render manually: `<p className="text-sm font-mono tracking-widest uppercase inline-flex items-center gap-2" style={{ color: "hsl(var(--accent-X))" }}><span style={{ transform: "translateY(-1px)", display: "inline-block" }}>◆</span> Label</p>`. Used in `featuredProjects.tsx` (emerald) and `latestBlogPosts.tsx` (blue).
- **Bun `ERR_ENCODING_INVALID_ENCODED_DATA` in dev:** Bun's stricter `TextDecoder` throws `Invalid byte sequence` / `ERR_ENCODING_INVALID_ENCODED_DATA` inside `pages.runtime.dev.js` on every request in some environments. This is a Bun + Next.js 14 incompatibility — it does NOT affect production (Vercel uses Node). Workaround for local preview: use Node directly in `launch.json` → `node /Users/vgomes/Gitrepos/vgomes-site/node_modules/.bin/next dev`. node_modules live only in the main repo root, not in each worktree.
- **TMDB API key is v3 API Key, not Bearer token:** TMDB provides two credentials — "API Key (v3 auth)" and "API Read Access Token (v4 auth)". The movies page uses the v3 API key as a `?api_key=` query parameter. Do NOT use the Bearer token here. Key is stored in `.env.local` as `TMDB_API_KEY` and must also be set in Vercel environment variables for production builds.
- **TMDB env var must be in the worktree's `.env.local`:** When running a dev server from a git worktree (`.claude/worktrees/<name>/`), Next.js looks for `.env.local` relative to the CWD (the worktree dir), not the main repo root. Copy it: `cp /path/to/repo/.env.local /path/to/worktree/.env.local`. The worktree `.env.local` is gitignored automatically because `.env*.local` is in `.gitignore`.
- **`STAR_SLOT` pattern for uniform star sizing:** When rendering `★` glyphs for ratings, apply a fixed-width wrapper to every slot (full, half, empty) so horizontal spacing is identical regardless of font advance width. See `movies.tsx` `STAR_SLOT` constant. Without this, character-width variance causes uneven star spacing.
- **Half-star with `clipPath`:** Use `clipPath: "inset(0 50% 0 0)"` on an absolutely-positioned overlay star to show only the left half filled. More reliable than `overflow:hidden + width:50%` which can clip unevenly on subpixel-rendered layouts.
- **HTML entities in Letterboxd RSS:** RSS content includes encoded HTML entities (`&#039;` for apostrophes, `&amp;`, `&quot;`, etc.) in both title fields and review text. Always run title strings through `decodeHtmlEntities()`. Review text has inline replacements in the parser. Never display raw RSS strings without decoding.
- **Movie poster `fill` vs natural size:** On editorial list cards where card height is driven by review text, use `<Image width={150} height={225} className="w-full h-auto" />` with `alignSelf: "flex-start"` on the container. Never use `fill` + `aspectRatio` on these cards — `fill` stretches the poster to match the card's full height when a long review makes it tall.
- **Infinite scroll without extra fetches:** For paginated-style reveals of already-loaded data, pass all items as props and use `useState(initialCount)` + `IntersectionObserver` on a sentinel div. No API calls needed — just slice `items.slice(0, visibleCount)` on render.
- **FeaturedArticles component:** `components/home/featuredArticles.tsx` — static 2×2 grid of external press cards. Data is hardcoded as `ARTICLES` array (no props needed). Uses mint (`--accent`) since it lives on the home page. Each card has a top-border sweep animation on hover, source pill badge, category label, display-font title, and an `<ExternalLink>` icon. Section background alternates with `bg-[hsl(var(--surface))]` to complement LatestBlogPosts (surface) before it and ArtTeaser (default) after it. To add/change articles, edit the `ARTICLES` array at the top of the file.
- **Homepage section order:** HeroSection → AboutSnapshot → FeaturedProjects → LatestBlogPosts → FeaturedArticles → ArtTeaser.

---

## SEO Architecture

Primary keywords: **"Victor Gomes"** and **"front-end software engineer"**.

### Per-page SEO pattern
Every page should have: `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<meta name="robots" content="index, follow">`, and overrides for `og:title`, `og:description`, `og:url` (using Next.js `key` prop to override `_document.tsx` defaults).

### `_document.tsx` — site-wide defaults
Provides fallback OG/Twitter tags for any page that doesn't override them. All defaults use `key` props so per-page `<Head>` blocks can override. Fontshare (`api.fontshare.com`) preconnect is declared here alongside Google Fonts preconnect.

### Structured data (JSON-LD)
- **Homepage** (`pages/index.tsx`): `Person` schema — name, `givenName`, `familyName`, jobTitle, worksFor (Coinbase), alumniOf (U of A), sameAs social links, image. Defined as a module-level const `personSchema`. `givenName`/`familyName` help Google disambiguate from other people named "Victor Gomes".
- **Blog posts** (`pages/blog/[slug].tsx`): `BlogPosting` schema — headline, author, datePublished, mainEntityOfPage. Built inside the component from frontmatter.
- Social URLs live in `model/constants.tsx` — use those as the source of truth for `sameAs` links.

### `public/sitemap.xml`
**Auto-generated** by `scripts/generate-sitemap.js` on every Vercel build (build script: `node scripts/generate-sitemap.js && next build`). Do NOT hand-edit `public/sitemap.xml` — changes will be overwritten on the next build. To change sitemap behavior, edit the script.
- Core pages use today's build date as `lastmod`
- Blog posts use the `date` frontmatter field from each `.md` file as `lastmod`
- Project posts use the `date` frontmatter field from each `.md` file as `lastmod`
- All entries include `changefreq` and `priority` hints

### `public/robots.txt`
`Allow: /` with `Sitemap:` pointer — no paths blocked.

### OG image
`public/og-image.jpg` — 1200×630 social share image. Generated once by `node scripts/generate-og-image.js` (uses `sharp` + the profile photo at `public/profile-picture-2024.jpeg`). Re-run this script if branding changes. The script is NOT part of the build — the image is committed to the repo.

### "Victor Gomes" name SEO notes
- A major site redesign causes a temporary ranking drop (1–4 weeks) as Google re-evaluates. Recovery is expected without any changes.
- **Most impactful action:** Submit `https://www.vgomes.co/` to **Google Search Console** → URL Inspection → Request Indexing after any major redesign or content change.
- **Backlinks are the biggest lever.** LinkedIn profile, GitHub profile, and any other platform profiles should link back to `vgomes.co`. The `sameAs` JSON-LD array already lists these as authoritative identity signals.
- Resharing the site URL on LinkedIn/X after a redesign generates social engagement signals which trigger faster re-crawls.

---

## Working with Worktrees

The Claude Code worktree workflow creates isolated branches under `.claude/worktrees/`. Key notes:
- Each worktree gets its own `.claude/launch.json` — update it to point at the worktree directory
- `neon-redesign` has been merged into `main`. All feature work now branches from `main` and merges back via PR.
- `main` is the live production branch
