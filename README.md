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

- Add images to Blog and Projects posts
- Use Letterboxd API to display my reviews and favorite movies [letterboxd APIs](https://api-docs.letterboxd.com/#operation-GET-member_id_log-entry-tags)
  - letterboxd embed example: [embed example](https://letterboxd-embed.timcieplowski.com/)
  - Hopefully use the letterboxd api to get more cool info on my reviews and other statistics added to my /movies tab
- Make so we can upload an image through mobile or more easily manage the artworks in the site somehow. Options:
  - Use a cloud storage service like Google Drive or Dropbox that has mobile apps with automatic upload features.
  - Set up a webhook or GitHub Action that triggers when files are added to your cloud storage, automatically pulling them into your repo.
  - Alternatively, use a Git client on your phone (like Working Copy for iOS) to commit and push directly from your device.

### Long Term

- Enhancements to Blog posts (images, tags, featured)
- Maybe some simple fun web games

### Done Items

- Projects tab
- Automate uploading artworks to art tab
- Update the way I am displaying the artworks to be left to right first instead of each column (only relevant for desktop with multiple columns)
- Optimize arts loading, right now we get a loading spinner, but still on scrolling all artworks will flash sometimes and looks buggy.
- Make art works loading into a placeholder grey square instead of loading progress indicator

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
