const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://www.vgomes.co';

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function formatDate(dateStr) {
  if (!dateStr) return getToday();
  try {
    return new Date(dateStr).toISOString().split('T')[0];
  } catch {
    return getToday();
  }
}

function getBlogPosts() {
  const postsDir = path.join(__dirname, '../posts');
  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace('.md', '');
      const content = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
      const { data } = matter(content);
      return { slug, lastmod: formatDate(data.date) };
    });
}

function getProjectPosts() {
  const dir = path.join(__dirname, '../project-posts');
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace('.md', '');
      const content = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data } = matter(content);
      return { slug, lastmod: formatDate(data.date) };
    });
}

function urlEntry(loc, lastmod, changefreq, priority) {
  return `    <url>
        <loc>${loc}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>`;
}

function generateSitemap() {
  const today = getToday();
  const blogPosts = getBlogPosts();
  const projectPosts = getProjectPosts();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <!-- Core pages -->
${urlEntry(`${SITE_URL}/`, today, 'weekly', '1.0')}
${urlEntry(`${SITE_URL}/projects`, today, 'monthly', '0.8')}
${urlEntry(`${SITE_URL}/blog`, today, 'weekly', '0.8')}
${urlEntry(`${SITE_URL}/art`, today, 'monthly', '0.6')}
${urlEntry(`${SITE_URL}/movies`, today, 'weekly', '0.5')}

    <!-- Blog posts -->
${blogPosts.map(p => urlEntry(`${SITE_URL}/blog/${p.slug}`, p.lastmod, 'yearly', '0.7')).join('\n')}

    <!-- Project posts -->
${projectPosts.map(p => urlEntry(`${SITE_URL}/projects/${p.slug}`, p.lastmod, 'yearly', '0.7')).join('\n')}

</urlset>`;

  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log(`Sitemap generated: ${blogPosts.length} blog posts, ${projectPosts.length} project posts.`);
}

generateSitemap();
