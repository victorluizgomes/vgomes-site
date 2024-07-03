import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export interface NavBarProps {}

export function NavBar(props: NavBarProps) {
  const router = useRouter();

  return (
    <nav className={styles["container"]}>
      <ul className="flex flex-row py-3 sm:py-6 gap-8 sm:gap-12">
        <li
          className={`${
            router.pathname === "/"
              ? "border-b-2 !border-b-gold-yellow pb-0"
              : "hover:pb-0"
          } ${
            styles["nav-animation"]
          } hover:border-b-gold-yellow hover:border-b-2 pb-1`}
        >
          <Link href="/" className="cursor-pointer text-regular sm:text-lg font-bold">
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
          <Link href="/art" className="cursor-pointer text-regular sm:text-lg font-bold">
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
          <Link href="/blog" className="cursor-pointer text-regular sm:text-lg font-bold">
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
