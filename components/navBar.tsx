import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";

export interface NavBarProps {}

const navItems = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/art", label: "Art" },
  { href: "/movies", label: "Movies" },
];

// Mobile nav item
const MobileNavItem: React.FC<{
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  index: number;
}> = ({ href, label, isActive, onClick, index }) => {
  return (
    <li
      className="fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Link
        href={href}
        className={`
          block py-4 text-3xl font-display font-semibold text-center transition-colors duration-200
          ${isActive
            ? "text-[hsl(var(--accent))]"
            : "text-[hsl(var(--foreground))] hover:text-[hsl(var(--accent))]"
          }
        `}
        onClick={onClick}
      >
        {label}
      </Link>
    </li>
  );
};

export function NavBar(props: NavBarProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [indicatorReady, setIndicatorReady] = useState(false);
  const ulRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Update sliding indicator position on route change
  useEffect(() => {
    const activeItem = navItems.find((item) =>
      item.label === "About"
        ? router.pathname === item.href
        : router.pathname.startsWith(item.href)
    );
    if (!activeItem) return;

    const updateIndicator = () => {
      const el = itemRefs.current[activeItem.href];
      const ul = ulRef.current;
      if (!el || !ul) return;

      const ulRect = ul.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicatorStyle({
        left: elRect.left - ulRect.left,
        width: elRect.width,
      });
      setIndicatorReady(true);
    };

    updateIndicator();
    // Small delay to catch any layout shifts on hydration
    const t = setTimeout(updateIndicator, 50);
    return () => clearTimeout(t);
  }, [router.pathname]);

  const isActive = (item: { href: string; label: string }) =>
    item.label === "About"
      ? router.pathname === item.href
      : router.pathname.startsWith(item.href);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* DESKTOP - Floating Pill Nav */}
      <nav
        className="hidden sm:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full items-center transition-all duration-300"
        style={{
          background: scrolled ? "rgba(15, 17, 23, 0.80)" : "rgba(15, 17, 23, 0.55)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <ul ref={ulRef} className="relative flex items-center gap-1 p-1">
          {/* Sliding active indicator */}
          {indicatorReady && (
            <span
              className="absolute top-1 bottom-1 rounded-full bg-[hsl(var(--accent))] pointer-events-none"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                transition: "left 220ms cubic-bezier(0.4, 0, 0.2, 1), width 160ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          )}

          {navItems.map((item) => (
            <li
              key={item.href}
              ref={(el) => {
                itemRefs.current[item.href] = el;
              }}
            >
              <Link
                href={item.href}
                className={`relative z-10 block px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  isActive(item)
                    ? "text-[hsl(var(--background))]"
                    : "text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--foreground))]"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* MOBILE - Hamburger Button */}
      <nav className="flex sm:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleMenu}
          className={`
            p-3 rounded-full transition-all duration-300
            ${menuOpen
              ? "bg-[hsl(var(--accent))] text-[hsl(var(--background))]"
              : "text-[hsl(var(--foreground))]"
            }
          `}
          style={
            !menuOpen
              ? {
                  background: "rgba(15, 17, 23, 0.75)",
                  backdropFilter: "blur(20px) saturate(160%)",
                  WebkitBackdropFilter: "blur(20px) saturate(160%)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }
              : undefined
          }
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative w-6 h-6">
            <X
              className={`absolute inset-0 transition-all duration-300 ${
                menuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
              }`}
              size={24}
            />
            <Menu
              className={`absolute inset-0 transition-all duration-300 ${
                menuOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
              }`}
              size={24}
            />
          </div>
        </button>
      </nav>

      {/* MOBILE - Full Screen Menu Overlay */}
      <div
        className={`
          sm:hidden fixed inset-0 z-40
          bg-[hsl(var(--background)/0.98)] backdrop-blur-2xl
          transition-all duration-300 ease-out
          ${menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }
        `}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <ul className="flex flex-col items-center gap-2">
            {navItems.map((item, index) => (
              <MobileNavItem
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={isActive(item)}
                onClick={toggleMenu}
                index={index}
              />
            ))}
          </ul>

          {/* Social links in mobile menu */}
          <div className="mt-12 flex gap-6 text-[hsl(var(--text-secondary))]">
            <a
              href="https://x.com/vgomes_tech"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[hsl(var(--accent))] transition-colors"
            >
              X
            </a>
            <a
              href="https://instagram.com/coolcodeguy"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[hsl(var(--accent))] transition-colors"
            >
              IG
            </a>
            <a
              href="https://github.com/victorluizgomes"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[hsl(var(--accent))] transition-colors"
            >
              GH
            </a>
            <a
              href="https://www.linkedin.com/in/victorluizgomes/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[hsl(var(--accent))] transition-colors"
            >
              LN
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
