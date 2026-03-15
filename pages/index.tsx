import Head from 'next/head';
import HeroSection from '../components/home/heroSection';
import AboutSnapshot from '../components/home/aboutSnapshot';
import FeaturedProjects from '../components/home/featuredProjects';
import LatestBlogPosts from '../components/home/latestBlogPosts';
import ArtTeaser from '../components/home/artTeaser';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface FeaturedProject {
  title: string;
  description: string;
  tags?: string[];
  date: string;
  slug: string;
}

interface HomeProps {
  latestPosts: {
    title: string;
    date: string;
    slug: string;
  }[];
  featuredProjects: FeaturedProject[];
}

const SITE_URL = "https://www.vgomes.co";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Victor Gomes",
  url: SITE_URL,
  jobTitle: "Front-end Software Engineer",
  description:
    "Senior Front-end Software Engineer at Coinbase with 6+ years of experience building web and mobile experiences.",
  worksFor: {
    "@type": "Organization",
    name: "Coinbase",
    url: "https://www.coinbase.com",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Arizona",
  },
  sameAs: [
    "https://github.com/victorluizgomes",
    "https://www.linkedin.com/in/victorluizgomes/",
    "https://x.com/vgomes_tech",
    "https://instagram.com/coolcodeguy",
  ],
  image: `${SITE_URL}/profile-picture-2024.jpeg`,
  email: "vgomescontact@gmail.com",
};

export default function Home({ latestPosts, featuredProjects }: HomeProps) {
  const title = "Victor Gomes | Front-end Software Engineer";
  const description =
    "Victor Gomes — Senior Front-end Software Engineer at Coinbase with 6+ years experience. Building fast, polished web & mobile products. Based in Atlanta.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="Victor Gomes, front-end software engineer, frontend engineer, Coinbase, React, TypeScript, web development, Atlanta"
        />
        <link rel="canonical" href={SITE_URL} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:description" content={description} key="og:description" />
        <meta property="og:url" content={SITE_URL} key="og:url" />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} key="og:image" />

        {/* Twitter */}
        <meta property="twitter:title" content={title} key="twitter:title" />
        <meta property="twitter:description" content={description} key="twitter:description" />
        <meta property="twitter:url" content={SITE_URL} key="twitter:url" />
        <meta property="twitter:image" content={`${SITE_URL}/og-image.jpg`} key="twitter:image" />

        {/* Person structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </Head>

      <HeroSection />
      <AboutSnapshot />
      <FeaturedProjects projects={featuredProjects} />
      <LatestBlogPosts posts={latestPosts} />
      <ArtTeaser />
    </>
  );
}

export async function getStaticProps() {
  // Get latest 3 blog posts
  const postsDirectory = path.join(process.cwd(), 'posts');
  let latestPosts: { title: string; date: string; slug: string }[] = [];

  try {
    const files = fs.readdirSync(postsDirectory);
    const posts = files.map((filename) => {
      const slug = filename.replace('.md', '');
      const markdownWithMeta = fs.readFileSync(
        path.join(postsDirectory, filename),
        'utf-8'
      );
      const { data: frontmatter } = matter(markdownWithMeta);

      return {
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || '',
      };
    });

    // Sort by date and take latest 3
    latestPosts = posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  } catch (error) {
    // If posts directory doesn't exist, use empty array
    console.log('Posts directory not found, using defaults');
  }

  // Get featured projects from project-posts directory
  const projectsDirectory = path.join(process.cwd(), 'project-posts');
  let featuredProjects: { title: string; description: string; tags?: string[]; date: string; slug: string }[] = [];

  try {
    const files = fs.readdirSync(projectsDirectory);
    const projects = files.map((filename) => {
      const slug = filename.replace('.md', '');
      const markdownWithMeta = fs.readFileSync(
        path.join(projectsDirectory, filename),
        'utf-8'
      );
      const { data: frontmatter } = matter(markdownWithMeta);

      return {
        slug,
        title: frontmatter.title || slug,
        description: frontmatter.description || '',
        tags: frontmatter.tags || [],
        date: frontmatter.date || '',
      };
    });

    // Sort by date (most recent first) and take top 3
    featuredProjects = projects
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  } catch (error) {
    console.log('Project posts directory not found');
  }

  return {
    props: {
      latestPosts,
      featuredProjects,
    },
  };
}
