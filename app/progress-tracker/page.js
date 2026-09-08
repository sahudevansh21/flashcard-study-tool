"use client";

import { useState, useEffect } from 'react';
import { getDecks } from '../../lib/client-storage';

export default function ProgressTrackerPage() {
  const [decks, setDecks] = useState([]);
  const [overallProgress, setOverallProgress] = useState({
    totalCards: 0,
    learnedCards: 0,
    toReviewCards: 0,
    masteryPercentage: 0,
  });

  useEffect(() => {
    const loadedDecks = getDecks();
    setDecks(loadedDecks);
    calculateOverallProgress(loadedDecks);
  }, []);

  const calculateOverallProgress = (allDecks) => {
    let total = 0;
    let learned = 0;
    let toReview = 0;

    allDecks.forEach(deck => {
      total += deck.cards.length;
      deck.cards.forEach(card => {
        if (card.learned) {
          learned++;
        } else {
          toReview++;
        }
      });
    });

    const masteryPercentage = total === 0 ? 0 : (learned / total) * 100;

    setOverallProgress({
      totalCards: total,
      learnedCards: learned,
      toReviewCards: toReview,
      masteryPercentage: masteryPercentage,
    });
  };

  return (
    <div className="container progress-tracker-page">
      <h1 className="gradient-text">Your Learning Progress</h1>
      <p>Track your mastery across all your flashcard decks.</p>

      <div className="glass-card" style={{marginBottom: '2rem'}}>
        <h2>Overall Progress</h2>
        {overallProgress.totalCards === 0 ? (
          <p className="no-content-message">No cards found. Create decks and study to see your progress!</p>
        ) : (
          <div className="progress-stats">
            <p>Total Cards: <span className="value">{overallProgress.totalCards}</span></p>
            <p>Cards Mastered: <span className="value" style={{color: 'var(--accent-cyan)'}}>{overallProgress.learnedCards}</span></p>
            <p>Cards for Review: <span className="value" style={{color: 'var(--accent-purple)'}}>{overallProgress.toReviewCards}</span></p>
            <p>Mastery Rate: <span className="value gradient-text" style={{fontWeight: 'bold'}}>{overallProgress.masteryPercentage.toFixed(2)}%</span></p>
            <div className="progress-bar-container" style={{marginTop: '1.5rem'}}>
                <div className="progress-bar-fill" style={{ width: `${overallProgress.masteryPercentage}%` }}></div>
            </div>
          </div>
        )}
      </div>

      <div className="glass-card">
        <h2>Progress by Deck</h2>
        {decks.length === 0 ? (
          <p className="no-content-message">No decks to display progress for.</p>
        ) : (
          <div className="progress-grid">
            {decks.map(deck => {
              const deckTotal = deck.cards.length;
              const deckLearned = deck.cards.filter(card => card.learned).length;
              const deckToReview = deck.cards.filter(card => !card.learned).length;
              const deckMastery = deckTotal === 0 ? 0 : (deckLearned / deckTotal) * 100;

              return (
                <div key={deck.id} className="glass-card progress-card">
                  <h3>{deck.name}</h3>
                  <div className="progress-stats">
                    <p>Cards: <span className="value">{deckTotal}</span></p>
                    <p>Mastered: <span className="value" style={{color: 'var(--accent-cyan)'}}>{deckLearned}</span></p>
                    <p>Review: <span className="value" style={{color: 'var(--accent-purple)'}}>{deckToReview}</span></p>
                    <p>Mastery: <span className="value gradient-text">{deckMastery.toFixed(2)}%</span></p>
                    <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: `${deckMastery}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
