---
title: 'How to build a SEO ready Next.js Blog using Markdown'
date: '2023-11-26'
description: 'Learn from a step-by-step guide how to build a simple markdown blog using Next.js, ready with SEO.'
---

I have been wanting to build a blog for awhile, I have heard of the wonders of blogs for site discoverability with Search Engine Optimization. I always thought it would be hard to build, or that I would need to use something like Wordpress. One weekend I finally watched a few videos, read some articles and worked with ChatGPT to learn, it wasn't that bad. So in this article, I will show you all the steps I took to build this blog, so that you can have a working blog in no time.

## Setting Up Your Next.js Blog

### Step 1: Setup the Folder Structure for Blog Posts

Organize your blog posts in a specific directory within your project. A common approach is to use a `posts` directory within the `public` or a dedicated content directory.

```markdown
- /pages
  - /blog
    - index.tsx (or .js)
    - [slug].tsx (or .js)
- /posts
  - my-first-post.md
  - my-second-post.md
  - ...
```

Each Markdown file in the `posts` directory represents a blog post. The file name can be used as the URL slug for the blog post.

### Step 2: Reading Markdown Files

To read and parse Markdown files, we will use the libraries `remark` and `gray-matter`. These libraries allow you to parse the Markdown content and also extract metadata (like title, date, etc.) defined at the top of each Markdown file.

**Install the dependencies**
```sh
npm install gray-matter remark remark-html
```

### Step 3: Writing Your Blog List Page

**in `pages/blog/index.tsx`**

```typescript
import Head from "next/head";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function BlogIndex({ posts }) {
  return (
    <div>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="Where I write about my thoughts and ideas." />
      </Head>
      <h1>Blog</h1>
      {/* TODO: You can add other info and styling to the blog list here */}
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <a>{post.frontmatter.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  // Get files from the posts directory
  const files = fs.readdirSync(path.join('posts'));

  // Get slug and frontmatter from posts
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  // Sort posts by date
  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );

  return {
    props: {
      posts,
    },
  };
}
```

### Step 4: Processing the Individual Blog Posts

**in `pages/blog/[slug].tsx`**

This page will display the content of an individual blog post.

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Head from 'next/head';
// Create your styles file if you haven't
import styles from "../../styles/blog.module.css";

export default function BlogPost({ frontmatter, content, slug }) {
  return (
    <div>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
      </Head>
      <article>
        <h1>{frontmatter.title}</h1>
        {/* TODO: You can add other info and styling to the top of your blog here */}
        <div
            className={styles.markdown}
            dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  // Get filenames from the posts directory
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);

  // Convert markdown into HTML string
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      frontmatter,
      content: contentHtml,
      slug,
    },
  };
}
```

### Step 5: Create Your First Blog Post

Each Markdown file should have metadata at the top followed by the content of the post.

```markdown
---
title: 'My First Post'
date: '2023-11-26'
description: 'This is my first post!'
---

This is the content of my first post.
```

### Step 6: Create Basic Styling for Your Markdown

You may have noticed we are importing styles from `blog.module.css` in . Lets create that file.

```css
/* Styling for the markdown Blog Posts */
/* Use of the .markdown prefix is required
to keep the classes in scope of the blog posts */

.markdown * {
  color: #222;
}

.markdown h1 {
  font-size: 2em;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
}

.markdown h2 {
  font-size: 1.75em;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.markdown h3 {
  font-size: 1.5em;
  margin-top: 1rem;
  margin-bottom: .75rem;
}

.markdown h4 {
  font-size: 1.25em;
  margin-top: .75rem;
  margin-bottom: .5rem;
}

.markdown h5 {
  font-size: 1.1em;
  margin-top: .5rem;
  margin-bottom: .25rem;
}

.markdown p {
  font-size: 1em;
  line-height: 1.6;
  margin: .5rem 0;
}

.markdown hr {
    border-color: #ddd;
    margin: 1.75rem 0;
}

.markdown ul {
    list-style-type: disc;
    padding-left: 1.5em;
}

.markdown ol {
    list-style-type: decimal;
    padding-left: 1.5em;
}

.markdown li {
    margin-bottom: 0.5em;
}

.markdown blockquote {
  border-left: 4px solid #ccc;
  margin-left: 0;
  padding-left: 1em;
  color: #444;
}

.markdown a {
    color: #2c25aa;
    text-decoration: underline;
}

.markdown code {
  background-color: #DDD;
  padding: 0 1px;
}

.markdown pre {
  padding: .4rem .4rem .4rem .6rem;
  border-radius: 5px;
  background-color: #EEE;
  max-width: 100%;
  overflow-x: auto;
}

.markdown pre > code {
  background-color: unset;
}
```

Since your Markdown content is rendered into HTML and set via `dangerouslySetInnerHTML`, the styles you defined in your CSS files will be applied to these elements.

Modify the styles to your taste and add more as you need them.

## Setting Up SEO

### Create a `robots.txt` in the `public` Folder

`robots.txt` is used to instruct web crawlers about the pages you want or don't want to be crawled and indexed.
It typically contains rules for search engine bots, like disallowing access to certain directories or specifying the location of the sitemap. An example would be:

```markdown
User-agent: *
Allow: /admin/
Sitemap: https://www.yourdomain.com/sitemap.xml
```

After deploying your site test it by visiting `https://www.yourdomain.com/robots.txt`.

### Dynamically Generate your Sitemap

A sitemap is an XML file that lists all important pages of your website, making it easier for search engines to crawl them.

Edit with any other routes/pages you have so they are crawled by search engines.

Example Script `scripts/generate-sitemap.js`

```javascript
const fs = require('fs');
const path = require('path');

// Function to get slugs from markdown files in the posts/ directory
function getBlogPostSlugs() {
  const postsDir = path.join(__dirname, '../posts');
  return fs.readdirSync(postsDir)
    .filter(filename => filename.endsWith('.md'))
    .map(filename => filename.replace('.md', ''));
}

async function generateSitemap() {
  const posts = getBlogPostSlugs();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.yourdomain.com/</loc>
    </url>
    <url>
        <loc>https://www.yourdomain.com/blog</loc>
    </url>
    ${posts.map(slug => `
    <url>
        <loc>${`https://www.yourdomain.com/blog/${slug}`}</loc>
    </url>
    `).join('')}
</urlset>
  `;

  fs.writeFileSync(path.join(__dirname, '../public', 'sitemap.xml'), sitemap);
}

generateSitemap();
```

- The `getBlogPostSlugs` function reads the filenames from the `posts/` directory, filters out non-markdown files, and maps the filenames to slugs by removing the `.md` extension.

- The `generateSitemap` function creates a sitemap string, including URLs for your home, art, and blog list pages, along with dynamically generated URLs for each blog post.

- Finally, the sitemap is written to `public/sitemap.xml`.

**Integrate the script with your build process in `package.json`**

```sh
"scripts": {
  "build": "node scripts/generate-sitemap.js && next build"
}
```

### Google Search Console

After deploying your site with the sitemap, use Google Search Console to submit your sitemap URL. Google will report if there are any issues found.

Also if it has been some time and your page is not yet indexed by Google when you search, you can manually request indexing for that page or route.

---

Congrats! You now have a blog post and you should be able to search your blogs once Google Indexes your site with the new `sitemap.xml`.

If you enjoyed this tutorial, I would appreciate if you bookmarked [My Blog List](https://www.vgomes.co/blog). Thanks!