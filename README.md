
# vgomes-site

vgomes.co personal site in Next.js React

## Technologies used
- React
- Typescript
- HTML
- CSS
- Tailwind
- Figma for Design

## Notes on Changes

Originally site was built with React and NX.
But over time I realized there was no need for a NX monorepo
Also realized SEO with React was hard, and Next.js is much better for that,
so the site was re-built with Next.js and I added a Blog.

Another interesting change was that my art used to be hosted in Firebase.
But I learned that it was overly engineering when these images won't change much.
I am now directly pushing the art images to the repo and makes handling them much easier.

## Notes on SEO

- scripts/generate-sitemap.js generates the sitemap dynamically for my blog posts on `npm run build`
- robots.txt does not disallow any pages, and points to the sitemap.
- all main pages have a unique `<title></title>` and `<meta description />`

## Plans for the Future

- Projects tab
- UI Improvements
- Dark mode
- Lots more blog posts
- Maybe a fun Web Game?

