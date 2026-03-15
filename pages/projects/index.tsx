import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export interface ProjectsProps {
  projectPosts: {
    slug: string;
    frontmatter: {
      title: string;
      description: string;
      date: string;
      tags?: string[];
    };
  }[];
}

function formatDate(dateString: string): string {
  if (dateString.split("-").length === 1) return dateString;
  const [year, month, day] = dateString.split("-").map((num) => parseInt(num, 10));
  const date = new Date(year, month - 1, day || 1);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    timeZone: "America/New_York",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function getYear(dateString: string): string {
  return dateString.split("-")[0];
}

export default function Projects(props: ProjectsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <Head>
        <title>Projects | Victor Gomes</title>
        <meta
          name="description"
          content="Victor Gomes' projects — personal experiments, professional work, and creative builds at the intersection of code and craft."
        />
      </Head>

      <div className="max-w-4xl mx-auto px-6">
        {/* Page Header */}
        <header className={`mb-16 ${mounted ? 'fade-in-up' : 'opacity-0'}`}>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-[hsl(var(--foreground))] mb-4">
            Projects
            <span className="text-[hsl(var(--accent-projects))]">.</span>
          </h1>
          <div className="h-1 w-16 bg-[hsl(var(--accent-projects))] mb-6" />
          <p className="text-[hsl(var(--text-secondary))] text-lg max-w-2xl">
            Personal projects, experiments, and professional work — all built with the same
            obsession over craft, code, and creativity.
          </p>
        </header>

        {/* Projects List */}
        <div className="divide-y divide-[hsl(var(--border))]">
          {props.projectPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/projects/${post.slug}`}
              className={`
                group flex flex-col md:flex-row md:items-start gap-4 py-8 row-hover px-4 -mx-4
                ${mounted ? 'fade-in-up' : 'opacity-0'}
              `}
              style={{ animationDelay: `${(index + 1) * 50}ms` }}
            >
              {/* Year */}
              <span className="font-mono text-sm text-[hsl(var(--text-secondary))] md:w-20 shrink-0">
                {getYear(post.frontmatter.date)}
              </span>

              {/* Content */}
              <div className="flex-1">
                <h2 className="font-display text-xl md:text-2xl text-[hsl(var(--foreground))] mb-2 group-hover:text-[hsl(var(--accent-projects))] transition-colors">
                  {post.frontmatter.title}
                </h2>
                <p className="text-[hsl(var(--text-secondary))] text-sm md:text-base mb-3">
                  {post.frontmatter.description}
                </p>

                {/* Tags */}
                {post.frontmatter.tags && (
                  <div className="flex flex-wrap gap-2">
                    {post.frontmatter.tags.slice(0, 4).map((tag: string) => (
                      <span
                        key={tag}
                        className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{
                          color: "hsl(var(--accent-projects))",
                          background: "hsl(var(--accent-projects) / 0.1)",
                          border: "1px solid hsl(var(--accent-projects) / 0.2)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Arrow */}
              <ArrowRight className="w-5 h-5 text-[hsl(var(--text-secondary))] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 hidden md:block mt-1" />
            </Link>
          ))}
        </div>

        {props.projectPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[hsl(var(--text-secondary))]">
              No projects found. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const projectsDir = path.join(process.cwd(), "project-posts");
  let projects: { slug: string; frontmatter: any }[] = [];

  try {
    const files = fs.readdirSync(projectsDir);
    projects = files.map((filename) => {
      const slug = filename.replace(".md", "");
      const markdownWithMeta = fs.readFileSync(
        path.join(projectsDir, filename),
        "utf-8"
      );
      const { data: frontmatter } = matter(markdownWithMeta);

      return {
        slug,
        frontmatter,
      };
    });

    projects.sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
  } catch (error) {
    console.log("Project posts directory not found");
  }

  return {
    props: {
      projectPosts: projects,
    },
  };
}
