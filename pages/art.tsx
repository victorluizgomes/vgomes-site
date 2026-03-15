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
          content="Victor Gomes' art portfolio — pixel art, digital illustrations, drawings, and generative experiments. Art for art's sake."
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
          <blockquote className="text-[hsl(var(--text-secondary))] text-lg max-w-2xl italic leading-relaxed">
            &ldquo;Every child is an artist. The problem is how to remain an artist once we grow up.&rdquo;
            <cite className="block mt-2 text-sm font-mono not-italic" style={{ color: 'hsl(var(--accent-tertiary))' }}>
              — Pablo Picasso
            </cite>
          </blockquote>
          <p
            className="mt-4 text-xs font-mono tracking-[0.35em] uppercase"
            style={{ color: 'hsl(var(--accent-tertiary) / 0.5)' }}
          >
            ars gratia artis
          </p>
        </header>

        {/* Gallery */}
        <ArtGallery />
      </div>
    </main>
  );
}
