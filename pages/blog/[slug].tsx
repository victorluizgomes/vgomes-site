import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import highlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import Head from "next/head";
import "highlight.js/styles/github-dark.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface BlogPostProps {
  frontmatter: {
    title: string;
    description: string;
    date: string;
    tags?: string[];
  };
  content: string;
  slug: string;
}

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map((num) => parseInt(num, 10));
  const date = new Date(year, month - 1, day || 1);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: day ? "2-digit" : undefined,
    timeZone: "America/New_York",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const plainText = content.replace(/<[^>]+>/g, " ");
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

const SITE_URL = "https://www.vgomes.co";

export default function BlogPost(props: BlogPostProps) {
  const pageTitle = `${props.frontmatter.title} | Victor Gomes`;
  const canonicalUrl = `${SITE_URL}/blog/${props.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: props.frontmatter.title,
    description: props.frontmatter.description,
    url: canonicalUrl,
    datePublished: props.frontmatter.date,
    dateModified: props.frontmatter.date,
    author: {
      "@type": "Person",
      name: "Victor Gomes",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Victor Gomes",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={props.frontmatter.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={props.frontmatter.title} key="og:title" />
        <meta property="og:description" content={props.frontmatter.description} key="og:description" />
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:url" content={canonicalUrl} key="og:url" />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} key="og:image" />
        <meta property="article:author" content="Victor Gomes" />
        <meta property="article:published_time" content={props.frontmatter.date} />

        {/* Twitter */}
        <meta property="twitter:title" content={props.frontmatter.title} key="twitter:title" />
        <meta property="twitter:description" content={props.frontmatter.description} key="twitter:description" />
        <meta property="twitter:url" content={canonicalUrl} key="twitter:url" />
        <meta property="twitter:image" content={`${SITE_URL}/og-image.jpg`} key="twitter:image" />

        {/* Article structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>

      <article className="max-w-3xl mx-auto px-6">
        {/* Back Navigation */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent-blog))] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          {props.frontmatter.tags && props.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {props.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{
                    color: "hsl(var(--accent-blog))",
                    background: "hsl(var(--accent-blog) / 0.1)",
                    border: "1px solid hsl(var(--accent-blog) / 0.2)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-[hsl(var(--foreground))] leading-tight mb-6">
            {props.frontmatter.title}
          </h1>
          <div className="flex items-center gap-4 text-[hsl(var(--text-secondary))]">
            <span className="font-mono text-sm">
              {formatDate(props.frontmatter.date)}
            </span>
            <span className="text-[hsl(var(--border))]">•</span>
            <span className="font-mono text-sm">
              {estimateReadTime(props.content)} min read
            </span>
          </div>
          <div className="h-px bg-[hsl(var(--border))] mt-8" />
        </header>

        {/* Article Content */}
        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </article>

      {/* Prose styling for dark theme */}
      <style jsx global>{`
        .prose {
          color: hsl(var(--text-secondary));
        }
        .prose h1,
        .prose h2,
        .prose h3,
        .prose h4,
        .prose h5,
        .prose h6 {
          font-family: 'Clash Display', sans-serif;
          color: hsl(var(--foreground));
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        .prose h2 {
          font-size: 1.75rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .prose h3 {
          font-size: 1.5rem;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .prose p {
          line-height: 1.8;
          margin: 1.25rem 0;
        }
        .prose a {
          color: hsl(var(--accent-blog));
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .prose a:hover {
          border-bottom-color: hsl(var(--accent-blog));
        }
        .prose strong {
          color: hsl(var(--foreground));
        }
        .prose blockquote {
          border-left: 4px solid hsl(var(--accent-blog));
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: hsl(var(--text-secondary));
        }
        .prose code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85em;
          padding: 0.2em 0.5em;
          background: hsl(var(--accent-blog) / 0.1);
          color: hsl(var(--accent-blog));
          border: 1px solid hsl(var(--accent-blog) / 0.2);
          border-radius: 0.25rem;
        }
        .prose pre {
          background: hsl(var(--surface)) !important;
          border: 1px solid hsl(var(--border));
          border-radius: 0.75rem;
          padding: 1.25rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .prose pre code {
          background: transparent;
          padding: 0;
          font-size: 0.875rem;
        }
        .prose ul,
        .prose ol {
          padding-left: 1.5rem;
          margin: 1rem 0;
        }
        .prose li {
          margin: 0.5rem 0;
        }
        .prose ul {
          list-style-type: disc;
        }
        .prose ol {
          list-style-type: decimal;
        }
        .prose hr {
          border-color: hsl(var(--border));
          margin: 2.5rem 0;
        }
        .prose img {
          border-radius: 0.75rem;
          margin: 2rem auto;
        }
      `}</style>
    </div>
  );
}

export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), "posts");
  let paths: { params: { slug: string } }[] = [];

  try {
    const files = fs.readdirSync(postsDir);
    paths = files.map((filename) => ({
      params: {
        slug: filename.replace(".md", ""),
      },
    }));
  } catch (error) {
    console.log("Posts directory not found");
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: { params: { slug: string } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);

  const processedContent = await remark()
    .use(html)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(highlight)
    .use(rehypeStringify)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      frontmatter,
      content: contentHtml,
      slug,
    },
  };
}
