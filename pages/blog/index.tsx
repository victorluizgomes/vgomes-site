import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export interface BlogProps {
  posts: {
    slug: string;
    frontmatter: {
      title: string;
      description: string;
      date: string;
      category?: string;
    };
  }[];
}

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map((num) => parseInt(num, 10));
  const date = new Date(year, month - 1, day || 1);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: day ? "2-digit" : undefined,
    timeZone: "America/New_York",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export default function Blog(props: BlogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <Head>
        <title>Blog | Victor Gomes</title>
        <meta
          name="description"
          content="Victor Gomes' blog — technical deep-dives, front-end engineering insights, tutorials, and the occasional personal thought."
        />
        <link rel="canonical" href="https://www.vgomes.co/blog" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Blog | Victor Gomes" key="og:title" />
        <meta property="og:description" content="Victor Gomes' blog — technical deep-dives, front-end engineering insights, tutorials, and the occasional personal thought." key="og:description" />
        <meta property="og:url" content="https://www.vgomes.co/blog" key="og:url" />
      </Head>

      <div className="max-w-4xl mx-auto px-6">
        {/* Page Header */}
        <header className={`mb-16 ${mounted ? 'fade-in-up' : 'opacity-0'}`}>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-[hsl(var(--foreground))] mb-4">
            Blog
            <span className="text-[hsl(var(--accent-blog))]">.</span>
          </h1>
          <div className="h-1 w-16 bg-[hsl(var(--accent-blog))] mb-6" />
          <p className="text-[hsl(var(--text-secondary))] text-lg max-w-2xl">
            Technical deep-dives, honest thoughts on the front-end engineering journey, and
            tutorials from things I&apos;m building. The occasional personal rant may also appear.
          </p>
        </header>

        {/* Blog Posts List */}
        <div className="divide-y divide-[hsl(var(--border))]">
          {props.posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`
                group flex flex-col md:flex-row md:items-start gap-4 py-8 row-hover px-4 -mx-4
                ${mounted ? 'fade-in-up' : 'opacity-0'}
              `}
              style={{ animationDelay: `${(index + 1) * 50}ms` }}
            >
              {/* Date */}
              <span className="font-mono text-sm text-[hsl(var(--text-secondary))] md:w-28 shrink-0">
                {formatDate(post.frontmatter.date)}
              </span>

              {/* Content */}
              <div className="flex-1">
                <h2 className="font-display text-xl md:text-2xl text-[hsl(var(--foreground))] mb-2 group-hover:text-[hsl(var(--accent-blog))] transition-colors">
                  {post.frontmatter.title}
                </h2>
                <p className="text-[hsl(var(--text-secondary))] text-sm md:text-base">
                  {post.frontmatter.description}
                </p>
                
                {/* Category */}
                {post.frontmatter.category && (
                  <span
                    className="inline-block mt-3 font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{
                      color: "hsl(var(--accent-blog))",
                      background: "hsl(var(--accent-blog) / 0.1)",
                      border: "1px solid hsl(var(--accent-blog) / 0.2)",
                    }}
                  >
                    {post.frontmatter.category}
                  </span>
                )}
              </div>

              {/* Arrow */}
              <ArrowRight className="w-5 h-5 text-[hsl(var(--text-secondary))] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 hidden md:block mt-1" />
            </Link>
          ))}
        </div>

        {props.posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[hsl(var(--text-secondary))]">
              No blog posts found. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), "posts");
  let posts: { slug: string; frontmatter: any }[] = [];

  try {
    const files = fs.readdirSync(postsDir);
    posts = files.map((filename) => {
      const slug = filename.replace(".md", "");
      const markdownWithMeta = fs.readFileSync(
        path.join(postsDir, filename),
        "utf-8"
      );
      const { data: frontmatter } = matter(markdownWithMeta);

      return {
        slug,
        frontmatter,
      };
    });

    posts.sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
  } catch (error) {
    console.log("Posts directory not found");
  }

  return {
    props: {
      posts,
    },
  };
}
