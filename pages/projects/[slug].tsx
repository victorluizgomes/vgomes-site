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

export interface ProjectPostProps {
  frontmatter: {
    title: string;
    description: string;
    date: string;
    tags?: string[];
    link?: string;
  };
  content: string;
  slug: string;
}

export function formatDate(dateString: string): string {
  if (dateString.split("-").length === 1) return dateString;
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

export default function ProjectPost(props: ProjectPostProps) {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <Head>
        <title>{props.frontmatter.title} | Victor Gomes</title>
        <meta name="description" content={props.frontmatter.description} />
        <meta property="og:title" content={props.frontmatter.title} />
        <meta property="og:description" content={props.frontmatter.description} />
        <meta property="og:type" content="article" />
      </Head>

      <article className="max-w-3xl mx-auto px-6">
        {/* Back Navigation */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <span className="accent-pill mb-4 inline-block">
            Project
          </span>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-[hsl(var(--foreground))] leading-tight mb-6">
            {props.frontmatter.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-[hsl(var(--text-secondary))] mb-6">
            <span className="font-mono text-sm">
              {formatDate(props.frontmatter.date)}
            </span>
            {props.frontmatter.link && (
              <>
                <span className="text-[hsl(var(--border))]">•</span>
                <a 
                  href={props.frontmatter.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm text-[hsl(var(--accent))] hover:underline"
                >
                  View Live
                </a>
              </>
            )}
          </div>
          
          {/* Tags */}
          {props.frontmatter.tags && (
            <div className="flex flex-wrap gap-2 mb-8">
              {props.frontmatter.tags.map((tag: string) => (
                <span key={tag} className="accent-pill">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="h-px bg-[hsl(var(--border))]" />
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
          color: hsl(var(--accent));
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .prose a:hover {
          border-bottom-color: hsl(var(--accent));
        }
        .prose strong {
          color: hsl(var(--foreground));
        }
        .prose blockquote {
          border-left: 4px solid hsl(var(--accent));
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: hsl(var(--text-secondary));
        }
        .prose code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9em;
          padding: 0.2em 0.4em;
          background: hsl(var(--surface));
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
  const projectsDir = path.join(process.cwd(), "project-posts");
  let paths: { params: { slug: string } }[] = [];

  try {
    const files = fs.readdirSync(projectsDir);
    paths = files.map((filename) => ({
      params: {
        slug: filename.replace(".md", ""),
      },
    }));
  } catch (error) {
    console.log("Project posts directory not found");
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: { params: { slug: string } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("project-posts", slug + ".md"),
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
