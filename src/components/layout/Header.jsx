'use client'
import { useState } from 'react';
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Link href="/" onClick={() => setIsNavOpen(false)}>
            Sahara at Sea
          </Link>
        </div>

        <nav className={styles.desktopNav}>
          <Link href="/journal">Journal</Link>
          <Link href="/message-wall">Message Wall</Link>
          <Link href="/about">About</Link>
        </nav>

        <button
          className={styles.hamburger}
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </div>

      {isNavOpen && (
        <nav className={styles.mobileNav}>
          <Link href="/journal" onClick={() => setIsNavOpen(false)}>Journal</Link>
          <Link href="/route" onClick={() => setIsNavOpen(false)}>The Route</Link>
          <Link href="/about" onClick={() => setIsNavOpen(false)}>About</Link>
          <Link href="/message-wall" onClick={() => setIsNavOpen(false)}>Message Wall</Link>
          <Link href="/glossary" onClick={() => setIsNavOpen(false)}>Ship Lingo</Link>
        </nav>
      )}
    </header>
  );
}
