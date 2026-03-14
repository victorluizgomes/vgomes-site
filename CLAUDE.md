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
- **Git branch:** `v0/victorluizgomes-dfde7ebc`

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
| `--accent` | `#64FFDA` | **Electric Mint** — primary accent, used on About/Projects/Blog |
| `--accent-secondary` | `#FF6B6B` | **Coral Red** — Movies page accent |
| `--accent-tertiary` | `#C084FC` | **Soft Violet** — Art page accent |

### Per-Page Accent Colors
Each page has a designated accent color that flows through section labels, icons, highlights, and the navbar active pill:
- `/` `/projects` `/blog` → **mint** (`--accent`)
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
    artTeaser.tsx
    latestBlogPosts.tsx
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

- Fetches Letterboxd RSS at `https://letterboxd.com/vgomes/rss/` server-side via `getStaticProps` (ISR: revalidate every hour)
- Custom XML parser (`extractTag`, `parseLetterboxdRSS`) — no external XML library, uses regex + CDATA stripping
- Layout: vertical editorial list, each card = poster (left) + title/year/date/rating/review (right)
- Star ratings rendered as CSS-clipped `★` glyphs (filled/half/empty) — no fraction Unicode characters
- Letterboxd image domain `a.ltrbxd.com` is allowed in `next.config.js`
- All accents use `--accent-secondary` (coral red)

---

## Hero Section (`components/home/heroSection.tsx`)

- Aurora animated background: 4 absolute-positioned blur blobs (`.aurora-blob-1/2/3/4`) with `transform: translate()` keyframe animations
- Profile photo: `padding: 2px` wrapper with `conic-gradient` border + inner `overflow: hidden` div
- Stat chips (Coinbase, Atlanta GA, 5+ yrs) positioned to the **left** of the photo, hidden on mobile (`hidden lg:block`)
- Scroll indicator hidden on mobile (`hidden lg:flex`)
- Role tag uses `section-label` class + `mx-auto lg:mx-0` for centering

---

## Data Sources

- **Blog posts:** Markdown files (parsed via gray-matter + remark)
- **Art:** Firebase or static data (see `model/art.interface.tsx`, `model/constants.tsx`)
- **Movies:** Letterboxd RSS feed — `https://letterboxd.com/vgomes/rss/`
- **Projects:** Markdown files similar to blog

---

## Linear Task Management

Connected via Linear MCP. Check open tasks with:
```
list issues in project "Re-do design of vgomes.co"
```
Current open issues include VIC-17 (copy updates), VIC-19 (scroll animations), VIC-20 (art page masonry), VIC-22 (projects/blog editorial layout), VIC-23 (Framer Motion transitions).

**Note:** Framer Motion is NOT yet installed. VIC-23 covers adding it. When doing animation work, use CSS transitions/keyframes or `IntersectionObserver` until Framer Motion is added.

---

## Key Decisions & Gotchas

- **CSS unicode escapes in content:** Use the literal character `'◆'` not `'\u25C6'` — the latter is JS syntax and will render as text in CSS
- **Bun full path required** in launch.json and any spawn contexts — the preview tool doesn't load `.zshrc`
- **`◆` vertical alignment:** JetBrains Mono has a baseline offset; all `::before` diamond pseudo-elements need `transform: translateY(-1px)` to visually center with adjacent text
- **Image domains:** `a.ltrbxd.com` is configured in `next.config.js` for Letterboxd poster images
- **`prefers-reduced-motion`:** Aurora blob animations are disabled when the user has reduced motion enabled (handled in `global.css`)
- **Stat chips overflow:** All hero chips are positioned to the **left** of the photo (negative left offsets), not the right — right-side chips clipped the viewport at 1280px
