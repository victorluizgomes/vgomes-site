npm install highlight.js
npm install remark-rehype rehype-highlight rehype-raw rehype-stringify

1. Include Highlight.js Styles
highlight.js comes with various style themes. You can include one of these styles in your project to style the highlighted code.

## Include via CSS in _app.js

javascript
Copy code
// In pages/_app.js
import 'highlight.js/styles/default.css'; // or another style of your choice

// ... rest of your _app.js ...

### Choose your theme in highlight.js examples

[https://highlightjs.org/examples]

Import the theme you chose in _app.js or the Blog post slug
Example:
import 'highlight.js/styles/github-dark.css'; // or another style of your choice

## In your Blog [slug].js add to getStaticProps

import { remark } from 'remark';
import html from 'remark-html';
import highlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';

export async function getStaticProps({ params: { slug } }) {
  // ... existing code ...

  const processedContent = await remark()
    .use(html)
    .use(remarkRehype, { allowDangerousHtml: true }) // To pass HTML to rehype
    .use(rehypeRaw) // To parse the raw HTML
    .use(highlight) // Apply syntax highlighting
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  // ... existing code ...
}

## Test and make sure you don't have any conflicting styles

review your previous styles for your Blog CSS and make sure they don't overwrite highlight.js theme styles unless you want to.

## And that is all, now you have code highlighting