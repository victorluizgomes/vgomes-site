# 👨‍💻 Victor Gomes personal site README (vgomes.co)

vgomes.co personal site built with Next.js React

## Technologies used

- React
- Next.js
- Typescript
- HTML
- CSS
- Tailwind
- Figma for Design

## Notes on Changes over time

- Originally site was built with React and NX.
  But over time I realized there was no need for a NX monorepo
  Also realized SEO with React was hard, and Next.js is much better for that,
  so the site was re-built with Next.js and I added a Blog.

- Another interesting change was that my art used to be hosted in Firebase.
  But I learned that it was overly engineering when these images won't change much.
  I am now directly pushing the art images to the repo and makes handling them much easier.

- Made so nav bar becomes sticky at the top on scroll, but more importantly the different art categories in the art tab also become sticky on scroll. They become sticky to the bottom on mobile 😎 and top on desktop.

- Made a script that automates my artwork uploading, by converting image from HEIC to Jpeg, resizing it, adding the metadata to a JSON and moving it to the correct category.

## Notes on SEO

- scripts/generate-sitemap.js generates the sitemap dynamically for my blog posts on `npm run build`
- robots.txt does not disallow any pages, and points to the sitemap.
- all main pages have a unique `<title></title>` and `<meta description />`

## 🚀 Plans for the Future (To-Dos)

This is mostly for myself to know what I can work on whenever I pick this up. 🤷

### Short Term

- Add Highlights/Featured default tab of artworks which will display all my favorite curated works of art (from all categories) — **VIC-38**
- Add featured/cover image to Blog and Projects posts (not in-content — frontmatter `featuredImage` field) — **VIC-39**
- Mobile artwork upload workflow via cloud storage + GitHub Action — **VIC-40**

### Long Term

- Light/Dark mode toggle — **VIC-41**
- Lots more blog posts
- Blog enhancements: tags, filtering, featured post highlight — **VIC-42**
- Interactive web game or Easter egg — **VIC-43**
- Maybe complete redesign? _(in progress as `neon-redesign` branch)_

### Done Items

- Projects tab
- Automate uploading artworks to art tab
- Update the way I am displaying the artworks to be left to right first instead of each column (only relevant for desktop with multiple columns)
- Optimize arts loading, right now we get a loading spinner, but still on scrolling all artworks will flash sometimes and looks buggy.
- Make art works loading into a placeholder grey square instead of loading progress indicator
- Display Letterboxd reviews and recently watched movies — implemented via public RSS feed (`https://letterboxd.com/<username>/rss/`), no API access needed. The official Letterboxd API requires application/approval and excludes personal projects.
- Carousel with latest blog posts on home/about page — implemented as `latestBlogPosts` section in the neon-redesign

## Notes to self on adding artworks:

Firstly add the image file as is to `temp/` folder in the root of the repo.

Then Use `npm run optimize` to convert images from HEIC to Jpeg and optimize it to under 500 kb.
It will also ask in a CLI what name you want to save it in the JSON as well as which category the artwork is.

Make sure to not commit the files in temp/ folder and delete them after.

Note: Videos still need to be added manually together with its cover image

### Old method _(Deprecated)_:

1. Use terminal alias that I setup for converting from HEIC to jpeg and image resizing:

- `heic` (Docs: https://github.com/victorluizgomes/heic-image-converter)
- `img-re` (Docs: https://github.com/victorluizgomes/image-resizer)

2. Then paste the image in `public/art/` folder, in the appropriate category.
3. Add artwork details in `model/artworks.json` in the appropriate category.
4. Build with `npm run build` then run the app to see changes.

Note: When adding videos, need to add a cover image as well, it can be low quality.
