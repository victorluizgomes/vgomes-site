import { Menu } from "lucide-react";
import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export interface NavBarProps {}

// Child component for desktop navigation items
const NavItem: React.FC<{ href: string; label: string; isActive: boolean }> = ({
  href,
  label,
  isActive,
}) => {
  return (
    <li
      className={`${
        isActive ? "border-b-2 !border-b-gold-yellow pb-0" : "hover:pb-0"
      } ${
        styles["nav-animation"]
      } hover:border-b-gold-yellow hover:border-b-2 pb-1`}
    >
      <Link
        href={href}
        className="cursor-pointer text-regular sm:text-lg font-bold"
      >
        {label}
      </Link>
    </li>
  );
};

// Child component for mobile navigation items
const MobileNavItem: React.FC<{
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ href, label, isActive, onClick }) => {
  return (
    <li
      className={`${
        isActive ? "bg-[#e8ba7439]" : ""
      } border-b border-[#ebebe6]`}
    >
      <Link
        href={href}
        className="block p-3 text-regular font-bold text-center"
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Define the navigation items
  const navItems = [
    { href: "/", label: "About" },
    { href: "/art", label: "Art" },
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
    { href: "/movies", label: "Movies" },
  ];

  return (
    <>
      {/* MOBILE */}
      <nav
        className={`flex sm:hidden fixed p-1 bg-[#FCFCF8] w-full z-20 border-b border-[#ebebe6]`}
      >
        <button onClick={toggleMenu} className="p-[.4rem] rounded-md">
          <Menu />
        </button>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-[200px] bg-[#FCFCF8] shadow-lg border rounded-md border-[#ebebe6]">
            <ul className="flex flex-col">
              {navItems.map((item) => (
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
                />
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* DESKTOP */}
      <nav className={`hidden sm:flex ${styles["container"]}`}>
        <ul className="flex flex-row py-3 sm:py-6 gap-6 sm:gap-12">
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
    </>
  );
}

export default NavBar;
