import Head from 'next/head';
import HeroSection from '../components/home/heroSection';
import AboutSnapshot from '../components/home/aboutSnapshot';
import FeaturedProjects from '../components/home/featuredProjects';
import LatestBlogPosts from '../components/home/latestBlogPosts';
import ArtTeaser from '../components/home/artTeaser';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface HomeProps {
  latestPosts: {
    title: string;
    date: string;
    slug: string;
  }[];
}

export default function Home({ latestPosts }: HomeProps) {
  return (
    <>
      <Head>
        <title>Victor Gomes | Front-end Engineer & Creative Technologist</title>
        <meta 
          name="description" 
          content="Victor Gomes - Senior Front-end Engineer at Coinbase, creative technologist, and digital artist. Building exceptional digital experiences at the intersection of code and creativity." 
        />
        <meta property="og:title" content="Victor Gomes | Front-end Engineer & Creative Technologist" />
        <meta property="og:description" content="Senior Front-end Engineer at Coinbase, creative technologist, and digital artist based in Atlanta." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
      <HeroSection />
      <AboutSnapshot />
      <FeaturedProjects />
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

  return {
    props: {
      latestPosts,
    },
  };
}
