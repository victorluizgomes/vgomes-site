import Head from "next/head";
import ArtGallery from "../components/art/artGallery";
import { useEffect, useState } from "react";

export default function Art() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <Head>
        <title>Art | Victor Gomes</title>
        <meta
          name="description"
          content="Discover Victor Gomes' art portfolio - digital illustrations, pixel art, generative code art, paintings, and drawings. A fusion of creativity and imagination."
        />
      </Head>

      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <header className={`mb-16 ${mounted ? 'fade-in-up' : 'opacity-0'}`}>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-[hsl(var(--foreground))] mb-4">
            Art
            <span className="text-[hsl(var(--accent-tertiary))]">.</span>
          </h1>
          <div className="h-1 w-16 bg-[hsl(var(--accent-tertiary))] mb-6" />
          <p className="text-[hsl(var(--text-secondary))] text-lg max-w-2xl">
            Drawing since childhood. Creating with code. From pixel art and digital illustrations 
            to generative experiments, art has always been at the heart of what I do.
          </p>
        </header>

        {/* Gallery */}
        <ArtGallery />
      </div>
    </main>
  );
}
