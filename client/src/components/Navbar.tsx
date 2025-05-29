"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "../styles/Navbar.module.css";

const NAV_ITEMS = [
  { label: "conferences", href: "/conferences" },
  { label: "coworking", href: "/coworking" },
  { label: "community", href: "/community" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={styles.navbar}
      style={{
        boxShadow: scrolled ? "0 2px 6px rgba(0,0,0,0.4)" : "none",
      }}
    >
      {/* logo */}
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/small-logo.svg" alt="logo" width={32} height={32} />
        </Link>
      </div>

      {/* navigation links */}
      <div className={styles.links}>
        {NAV_ITEMS.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`${styles.link} ${styles[label]} ${
                isActive ? styles.active : ""
              }`}
            >
              {label}
            </Link>
          );
        })}

        {/* profile icon */}
        <Link href="/profile" className={styles.profile}>
          <Image src="/profile.svg" alt="profile" width={32} height={32} />
        </Link>
      </div>
    </nav>
  );
}
