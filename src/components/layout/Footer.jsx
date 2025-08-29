import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.mainFooter}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h4>Sahara at Sea</h4>
          <p>A journal of a semester around the world.</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Navigation</h4>
          <nav className={styles.footerNav}>
            <Link href="/">Home</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/route">The Route</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
        <div className={styles.footerSection}>
          <h4>Community</h4>
          <nav className={styles.footerNav}>
            <Link href="/message-wall">Message Wall</Link>
            <Link href="/glossary">Ship Lingo</Link>
          </nav>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2025 Sahara Smith. All rights reserved.</p>
        <p>Built with Next.js & Supabase</p>
      </div>
    </footer>
  );
}