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

## Notes on SEO

- scripts/generate-sitemap.js generates the sitemap dynamically for my blog posts on `npm run build`
- robots.txt does not disallow any pages, and points to the sitemap.
- all main pages have a unique `<title></title>` and `<meta description />`

## 🚀 Plans for the Future (To-Dos)

This is mostly for myself to know what I can work on whenever I pick this up. 🤷

### Short Term

- Automate uploading artworks to art tab
- Optimize arts loading, right now we get a loading spinner, but still on scrolling all artworks will flash sometimes and looks buggy
- Carrousel with latest blog posts in about page

### Long Term

- Projects tab
- UI Improvements
- Dark mode
- Lots more blog posts
- Maybe a fun Web Game?

## Notes to self on adding artworks (to be automated more):

1. Use terminal alias that I setup for converting from HEIC to jpeg and image resizing:

- `heic` (Docs: https://github.com/victorluizgomes/heic-image-converter)
- `img-re` (Docs: https://github.com/victorluizgomes/image-resizer)

2. Then paste the image in `public/art/` folder, in the appropriate category.
3. Add artwork details in `model/artworks.json` in the appropriate category.
4. Build with `npm run build` then run the app to see changes.

Note: When adding videos, need to add a cover image as well, it can be low quality.
