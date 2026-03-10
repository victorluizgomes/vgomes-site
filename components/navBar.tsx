import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export interface NavBarProps {}

// Desktop nav item with pill highlight
const NavItem: React.FC<{ href: string; label: string; isActive: boolean }> = ({
  href,
  label,
  isActive,
}) => {
  return (
    <li>
      <Link
        href={href}
        className={`
          relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full
          ${isActive 
            ? "text-[hsl(var(--background))] bg-[hsl(var(--accent))]" 
            : "text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--foreground))]"
          }
        `}
      >
        {label}
      </Link>
    </li>
  );
};

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navItems = [
    { href: "/", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/art", label: "Art" },
    { href: "/movies", label: "Movies" },
  ];

  return (
    <>
      {/* DESKTOP - Floating Pill Nav */}
      <nav
        className={`
          hidden sm:flex fixed top-4 left-1/2 -translate-x-1/2 z-50
          rounded-full px-2 py-2 items-center gap-1
          transition-all duration-300
          ${scrolled 
            ? "bg-[hsl(var(--surface)/0.95)] backdrop-blur-xl border border-[hsl(var(--accent)/0.1)] shadow-lg shadow-black/20" 
            : "bg-[hsl(var(--surface)/0.8)] backdrop-blur-xl border border-[hsl(var(--border)/0.5)]"
          }
        `}
      >
        <ul className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              isActive={
                item.label === "About"
                  ? router.pathname === item.href
                  : router.pathname.startsWith(item.href)
              }
            />
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
              : "bg-[hsl(var(--surface)/0.9)] backdrop-blur-xl border border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
            }
          `}
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
                isActive={
                  item.label === "About"
                    ? router.pathname === item.href
                    : router.pathname.startsWith(item.href)
                }
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
