import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Head from "next/head";
import styles from "../../styles/BlogPost.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export interface BlogPostProps {
  frontmatter: any;
  content: any;
  slug: any;
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
}

export default function BlogPost(props: BlogPostProps) {
  return (
    <div>
      <Head>
        <title>{props.frontmatter.title}</title>
        <meta name="description" content={props.frontmatter.description} />
        {/* TODO: Add other SEO relevant tags */}
      </Head>
      <article className="flex flex-col items-center justify-between pb-6">
        <div className="max-w-4xl px-6 mt-6">
          <Link
            href="/blog"
            className="cursor-pointer w-fit items-center flex gap-3"
          >
            <FontAwesomeIcon className="text-neutral-600 h-4 w-4" icon={faArrowLeft} />
            <span className="text-neutral-600">Go back to blogs</span>
          </Link>
          <h1 className="text-neutral-900 mt-8 mb-4 text-5xl leading-tight">
            {props.frontmatter.title}
          </h1>
          <p className="text-neutral-700 mb-12">
            {formatDate(props.frontmatter.date)}
          </p>
          <div
            className={styles.markdown}
            dangerouslySetInnerHTML={{ __html: props.content }}
          />
        </div>
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  // Get filenames from the posts directory
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
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
