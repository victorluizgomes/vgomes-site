import {
  X_TWITTER_URL,
  INSTAGRAM_URL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "../model/constants";
import { useState } from "react";
import { Check, Copy, Github, Linkedin } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/",         label: "About",    accent: "--accent"          },
  { href: "/projects", label: "Projects", accent: "--accent-projects" },
  { href: "/blog",     label: "Blog",     accent: "--accent-blog"     },
  { href: "/art",      label: "Art",      accent: "--accent-tertiary" },
  { href: "/movies",   label: "Movies",   accent: "--accent-secondary"},
];

function FooterNavLink({ href, label, accent }: { href: string; label: string; accent: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ color: hovered ? `hsl(var(${accent}))` : undefined }}
      className="text-sm font-mono tracking-wide text-[hsl(var(--text-secondary))] transition-colors duration-150"
    >
      {label}
    </Link>
  );
}

export interface FooterProps {}

export function Footer(props: FooterProps) {
  const [copied, setCopied] = useState(false);
  const email = "vgomescontact@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email");
    }
  };

  return (
    <footer className="py-16 md:py-24 border-t border-[hsl(var(--border))]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Email */}
          <div>
            <p className="text-sm text-[hsl(var(--text-secondary))] mb-2">
              Say Hello
            </p>
            <button
              onClick={handleCopyEmail}
              className="group flex items-center gap-3 text-xl md:text-2xl font-display text-[hsl(var(--foreground))] hover:text-[hsl(var(--accent))] transition-colors"
            >
              {email}
              <span className="p-2 rounded-lg bg-[hsl(var(--surface))] border border-[hsl(var(--border))] group-hover:border-[hsl(var(--accent)/0.3)] transition-colors">
                {copied ? (
                  <Check className="w-4 h-4 text-[hsl(var(--accent))]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </span>
            </button>
            {copied && (
              <p className="text-sm text-[hsl(var(--accent))] mt-2 font-mono">
                Copied to clipboard!
              </p>
            )}
          </div>

          {/* Social Links */}
          <div className="flex gap-5">
            <a
              href={X_TWITTER_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors"
            >
              <Github size={18} aria-hidden="true" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors"
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Nav Links */}
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-8 gap-y-3 mb-12">
          {NAV_LINKS.map((item) => (
            <FooterNavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* Divider */}
        <div className="h-px bg-[hsl(var(--border))] mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-mono text-[hsl(var(--text-secondary))]">
            &copy; Victor Gomes {new Date().getFullYear()}
          </p>
          <p className="text-sm text-[hsl(var(--text-muted))]">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
