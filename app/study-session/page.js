"use client";

import { useState, useEffect } from 'react';
import Flashcard from '../../components/Flashcard';
import { getDecks, saveDecks } from '../../lib/client-storage';

export default function StudySessionPage() {
  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState('');
  const [currentDeck, setCurrentDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [sessionStats, setSessionStats] = useState({ total: 0, learned: 0, toReview: 0 });

  useEffect(() => {
    const loadedDecks = getDecks();
    setDecks(loadedDecks);
    if (loadedDecks.length > 0) {
      setSelectedDeckId(loadedDecks[0].id);
    }
  }, []);

  useEffect(() => {
    if (selectedDeckId && decks.length > 0) {
      const deckToStudy = decks.find((d) => d.id === selectedDeckId);
      if (deckToStudy) {
        // Reset session state when deck changes
        setCurrentDeck({ ...deckToStudy, cards: [...deckToStudy.cards].sort(() => Math.random() - 0.5) }); // Shuffle cards
        setCurrentCardIndex(0);
        setShowResults(false);
        setSessionStats({ total: deckToStudy.cards.length, learned: 0, toReview: 0 });
      }
    }
  }, [selectedDeckId, decks]);

  const handleMarkCard = (learned) => {
    if (!currentDeck || currentDeck.cards.length === 0) return;

    const updatedCard = { ...currentDeck.cards[currentCardIndex], learned };
    const updatedCardsInSession = currentDeck.cards.map((card, idx) =>
      idx === currentCardIndex ? updatedCard : card
    );

    // Update the original decks array as well for persistence
    const updatedGlobalDecks = decks.map(d =>
      d.id === selectedDeckId
        ? { ...d, cards: d.cards.map(card => card.id === updatedCard.id ? updatedCard : card) }
        : d
    );
    setDecks(updatedGlobalDecks);
    saveDecks(updatedGlobalDecks);

    // Update session stats based on *this* card's outcome
    setSessionStats(prevStats => ({
      ...prevStats,
      learned: learned ? prevStats.learned + 1 : prevStats.learned,
      toReview: !learned ? prevStats.toReview + 1 : prevStats.toReview,
    }));

    nextCard();
  };

  const nextCard = () => {
    if (currentCardIndex < currentDeck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartSession = () => {
    if (currentDeck) {
      setCurrentDeck({ ...currentDeck, cards: [...currentDeck.cards].sort(() => Math.random() - 0.5) }); // Re-shuffle
      setCurrentCardIndex(0);
      setShowResults(false);
      setSessionStats({ total: currentDeck.cards.length, learned: 0, toReview: 0 });
    }
  };

  const progress = currentDeck && currentDeck.cards.length > 0
    ? ((currentCardIndex + (showResults ? 1 : 0)) / currentDeck.cards.length) * 100
    : 0;

  return (
    <div className="container study-session-page">
      <h1 className="gradient-text">Study Session</h1>
      <p>Select a deck and start memorizing!</p>

      <div className="session-controls glass-card">
        <div className="form-group" style={{ minWidth: '200px' }}>
          <label htmlFor="deckSelect">Choose a Deck:</label>
          <select
            id="deckSelect"
            value={selectedDeckId}
            onChange={(e) => setSelectedDeckId(e.target.value)}
          >
            {decks.length === 0 ? (
              <option value="">No decks available</option>
            ) : (
              decks.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.name} ({deck.cards.length} cards)
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {currentDeck && currentDeck.cards.length > 0 && !showResults && (
        <>
          <p className="text-muted">Card {currentCardIndex + 1} of {currentDeck.cards.length}</p>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <Flashcard
            front={currentDeck.cards[currentCardIndex].front}
            back={currentDeck.cards[currentCardIndex].back}
          />
          <div className="card-navigation">
            <button onClick={() => handleMarkCard(true)} className="button primary-button">
              I Knew This!
            </button>
            <button onClick={() => handleMarkCard(false)} className="button secondary-button">
              Needs Review
            </button>
          </div>
        </>
      )}

      {currentDeck && currentDeck.cards.length === 0 && (
        <div className="no-content-message glass-card">
          <p>This deck has no cards. Please add some cards in "My Decks" page.</p>
        </div>
      )}

      {!currentDeck && decks.length > 0 && (
        <div className="no-content-message glass-card">
          <p>Please select a deck to start your study session.</p>
        </div>
      )}

      {decks.length === 0 && (
         <div className="no-content-message glass-card">
            <p>No decks available. Go to "My Decks" to create some!</p>
        </div>
      )}

      {showResults && currentDeck && (
        <div className="study-results glass-card">
          <h2 className="gradient-text">Session Complete!</h2>
          <p>You&apos;ve completed the study session for &quot;{currentDeck.name}&quot;.</p>
          <p>Total cards: {sessionStats.total}</p>
          <p>Cards you knew: <span style={{color: 'var(--accent-cyan)', fontWeight: 'bold'}}>{sessionStats.learned}</span></p>
          <p>Cards to review: <span style={{color: 'var(--accent-purple)', fontWeight: 'bold'}}>{sessionStats.toReview}</span></p>
          <button onClick={restartSession} className="button primary-button" style={{ marginTop: '1.5rem' }}>
            Study Again
          </button>
        </div>
      )}
    </div>
  );
}
