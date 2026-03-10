import {
  X_TWITTER_URL,
  INSTAGRAM_URL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "../model/constants";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

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
          <div className="flex gap-6">
            <a
              href={X_TWITTER_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors"
            >
              <span className="font-medium">X</span>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors"
            >
              <span className="font-medium">IG</span>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors"
            >
              <span className="font-medium">GH</span>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors"
            >
              <span className="font-medium">LN</span>
            </a>
          </div>
        </div>

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
