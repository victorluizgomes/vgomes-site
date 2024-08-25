import { Menu } from "lucide-react";
import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export interface NavBarProps {}

export function NavBar(props: NavBarProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* MOBILE */}
      <nav
        className={`flex sm:hidden fixed p-1 bg-[#FCFCF8] w-full z-20 border-b border-[#ebebe6]`}
      >
        <button onClick={toggleMenu} className=" p-[.4rem] rounded-md">
          <Menu />
        </button>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-[200px] bg-[#FCFCF8] shadow-lg border rounded-md border-[#ebebe6]">
            <ul className="flex flex-col">
              <li
                className={`${
                  router.pathname === "/" ? "bg-[#e8ba7439]" : ""
                } border-b border-[#ebebe6]`}
              >
                <Link
                  href="/"
                  className="block p-3 text-regular font-bold text-center"
                  onClick={toggleMenu}
                >
                  About
                </Link>
              </li>
              <li
                className={`${
                  router.pathname.startsWith("/art") ? "bg-[#e8ba7439]" : ""
                } border-b border-[#ebebe6]`}
              >
                <Link
                  href="/art"
                  className="block p-3 text-regular font-bold text-center"
                  onClick={toggleMenu}
                >
                  Art
                </Link>
              </li>
              <li
                className={`${
                  router.pathname.startsWith("/blog") ? "bg-[#e8ba7439]" : ""
                } border-b border-[#ebebe6]`}
              >
                <Link
                  href="/blog"
                  className="block p-3 text-regular font-bold text-center"
                  onClick={toggleMenu}
                >
                  Blog
                </Link>
              </li>
              <li
                className={`${
                  router.pathname.startsWith("/projects") ? "bg-[#e8ba7439]" : ""
                } border-b border-[#ebebe6]`}
              >
                <Link
                  href="/projects"
                  className="block p-3 text-regular font-bold text-center"
                  onClick={toggleMenu}
                >
                  Projects
                </Link>
              </li>
              <li
                className={`${
                  router.pathname.startsWith("/movies") ? "bg-[#e8ba7439]" : ""
                } border-b border-[#ebebe6]`}
              >
                <Link
                  href="/movies"
                  className="block p-3 text-regular font-bold text-center"
                  onClick={toggleMenu}
                >
                  Movies
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
      {/* DESKTOP */}
      <nav className={`hidden sm:flex ${styles["container"]}`}>
        <ul className="flex flex-row py-3 sm:py-6 gap-6 sm:gap-12">
          <li
            className={`${
              router.pathname === "/"
                ? "border-b-2 !border-b-gold-yellow pb-0"
                : "hover:pb-0"
            } ${
              styles["nav-animation"]
            } hover:border-b-gold-yellow hover:border-b-2 pb-1`}
          >
            <Link
              href="/"
              className="cursor-pointer text-regular sm:text-lg font-bold"
            >
              About
            </Link>
          </li>
          <li
            className={`${
              router.pathname.startsWith("/art")
                ? "border-b-2 !border-b-gold-yellow pb-0"
                : "hover:pb-0"
            } ${
              styles["nav-animation"]
            } hover:border-b-gold-yellow hover:border-b-2 pb-1`}
          >
            <Link
              href="/art"
              className="cursor-pointer text-regular sm:text-lg font-bold"
            >
              Art
            </Link>
          </li>
          <li
            className={`${
              router.pathname.startsWith("/blog")
                ? "border-b-2 !border-b-gold-yellow pb-0"
                : "hover:pb-0"
            } ${
              styles["nav-animation"]
            } hover:border-b-gold-yellow hover:border-b-2 pb-1`}
          >
            <Link
              href="/blog"
              className="cursor-pointer text-regular sm:text-lg font-bold"
            >
              Blog
            </Link>
          </li>
          <li
            className={`${
              router.pathname.startsWith("/projects")
                ? "border-b-2 !border-b-gold-yellow pb-0"
                : "hover:pb-0"
            } ${
              styles["nav-animation"]
            } hover:border-b-gold-yellow hover:border-b-2 pb-1`}
          >
            <Link
              href="/projects"
              className="cursor-pointer text-regular sm:text-lg font-bold"
            >
              Projects
            </Link>
          </li>
          <li
            className={`${
              router.pathname.startsWith("/movies")
                ? "border-b-2 !border-b-gold-yellow pb-0"
                : "hover:pb-0"
            } ${
              styles["nav-animation"]
            } hover:border-b-gold-yellow hover:border-b-2 pb-1`}
          >
            <Link
              href="/movies"
              className="cursor-pointer text-regular sm:text-lg font-bold"
            >
              Movies
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
