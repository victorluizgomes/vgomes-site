import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { formatDate } from "./[slug]";

export interface BlogProps {
  posts: any[];
}

export default function Blog(props: BlogProps) {
  return (
    <main className="flex flex-col items-center justify-between">
      <Head>
        <title>Victor Gomes | Blog</title>
        <meta name="description" content="Victor Gomes dev blog, Where I write about my developer journey and sometimes a few technical tutorials." />
      </Head>
      <div className="max-w-3xl">
        <section>
            <div className="text-center mx-2 my-12 sm:my-20">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight">
                    Victor Gomes - Blog
                </h1>
                <p className="text-sm sm:text-base mt-6 px-2 leading-loose text-center">
                  Where I write about my developer journey and sometimes a few technical tutorials.
                </p>
            </div>
        </section>
        <ul className="px-6 md:px-24 pb-6">
            {props.posts.map((post) => (
            <li key={post.slug} className="my-3">
                <Link href={`/blog/${post.slug}`}>
                    <div className="flex flex-col p-4 md:p-6 text-left border border-gold-yellow/70 hover:bg-gold-yellow/10 rounded-md">
                        <span className="text-neutral-600 text-sm md:text-base pb-1">{formatDate(post.frontmatter.date)}</span>
                        <h2 className="font-bold text-xl md:text-2xl text-neutral-800 pb-4">{post.frontmatter.title}</h2>
                        <p className="text-sm md:text-base text-neutral-700">{post.frontmatter.description}</p>
                        <span className="mt-2 flex w-full justify-end text-sm md:text-base text-[#ab6945]">Read more</span>
                    </div>
                </Link>
            </li>
            ))}
        </ul>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  // Get files from the posts directory
  const files = fs.readdirSync(path.join("posts"));

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
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
