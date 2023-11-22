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

  const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.vgomes.co/</loc>
    </url>
    <url>
        <loc>https://www.vgomes.co/art</loc>
    </url>
    <url>
        <loc>https://www.vgomes.co/blog</loc>
    </url>
    ${posts.map(slug => `
    <url>
        <loc>${`https://www.vgomes.co/blog/${slug}`}</loc>
    </url>
    `).join('')}
</urlset>
  `;

  fs.writeFileSync(path.join(__dirname, '../public', 'sitemap.xml'), sitemap);
}

generateSitemap();