import Link from "next/link";
import Head from "next/head";
import { ArrowLeft } from "lucide-react";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Victor Gomes</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center px-6">
        <div className="text-center max-w-md">
          {/* 404 Display */}
          <h1 className="font-display text-8xl md:text-9xl font-bold text-[hsl(var(--foreground))] mb-4">
            404
            <span className="text-[hsl(var(--accent))]">.</span>
          </h1>
          
          <h2 className="font-display text-2xl md:text-3xl text-[hsl(var(--foreground))] mb-4">
            Page Not Found
          </h2>
          
          <p className="text-[hsl(var(--text-secondary))] mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          
          {/* Back Home Link */}
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
