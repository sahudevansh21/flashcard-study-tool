import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={`container home-page ${inter.className}`}>
      <h1 className="gradient-text">Flashcard Study Tool</h1>
      <p className="subtitle">Master new information efficiently.</p>

      <section className="intro-section">
        <h2>The Problem: Memorization & Tracking</h2>
        <p>
          Students and lifelong learners often find it difficult to effectively memorize new information and track their learning progress across various subjects. Traditional physical flashcards are cumbersome to manage, and it's hard to prioritize which topics need more focused review.
        </p>
      </section>

      <section className="intro-section">
        <h2>Our Solution: Personalized & Efficient Study</h2>
        <p>
          This website provides an interactive platform for users to create, organize, and study custom flashcard decks for any subject. It helps users track their mastery by marking cards as learned or needing review, allowing for a personalized and efficient study experience, all managed client-side in the browser.
        </p>
      </section>

      <div className="cta-buttons">
        <Link href="/my-decks" className="button primary-button">
          Get Started - Create Your Decks
        </Link>
        <Link href="/study-session" className="button secondary-button">
          Start Studying
        </Link>
      </div>
    </div>
  );
}
