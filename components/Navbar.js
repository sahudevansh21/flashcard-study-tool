"use client";

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">
        Flashcards
      </Link>
      <div className="navbar-nav">
        <Link href="/">Home</Link>
        <Link href="/my-decks">My Decks</Link>
        <Link href="/study-session">Study Session</Link>
        <Link href="/progress-tracker">Progress</Link>
      </div>
    </nav>
  );
}
