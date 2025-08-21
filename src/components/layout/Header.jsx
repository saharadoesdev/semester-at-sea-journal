import Link from 'next/link';
import './Header.css';

export default function Header() {
  return (
    <header className="main-header">
      <div className="logo">
        <Link href="/">Sahara at Sea</Link>
      </div>
      <nav>
        <Link href="/journal">The Voyage</Link>
        <Link href="/message-wall">Message Wall</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}