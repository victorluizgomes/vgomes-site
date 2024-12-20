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
import styles from "../../styles/BlogPost.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export interface ProjectPostProps {
  frontmatter: any;
  content: any;
  slug: any;
}

export function formatDate(dateString: string): string {
  // if just year, return year
  if (dateString.split("-").length === 1) return dateString;

  const [year, month, day] = dateString
    .split("-")
    .map((num) => parseInt(num, 10));
  const date = new Date(year, month - 1, day);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "America/New_York",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export default function ProjectPost(props: ProjectPostProps) {
  return (
    <div>
      <Head>
        <title>{props.frontmatter.title}</title>
        <meta name="description" content={props.frontmatter.description} />
        {/* TODO: Add other SEO relevant tags */}
      </Head>
      <article className="flex flex-col items-center justify-between pb-6">
        <div className="w-full max-w-4xl px-4 md:px-6 mt-3 md:mt-6">
          <Link
            href="/projects"
            className="cursor-pointer hover:bg-neutral-100 w-fit items-center flex gap-3"
          >
            <FontAwesomeIcon
              className="text-neutral-600 h-4 w-4"
              icon={faArrowLeft}
            />
            <span className="text-neutral-600">Go back to projects</span>
          </Link>
          <h1 className="text-neutral-900 mt-6 sm:mt-8 mb-4 text-3xl md:text-4xl lg:text-5xl leading-tight">
            {props.frontmatter.title}
          </h1>
          <div>
            <p className="text-neutral-700 mb-8 text-sm sm:text-md">
              {formatDate(props.frontmatter.date)}
            </p>
            <hr className="pb-4 border-neutral-300" />
          </div>
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
  const files = fs.readdirSync(path.join("project-posts"));
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
    path.join("project-posts", slug + ".md"),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);

  // Convert markdown into HTML string
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
