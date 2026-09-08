"use client";

import { useState, useEffect } from 'react';
import { getDecks, saveDecks } from '../../lib/client-storage';
import { v4 as uuidv4 } from 'uuid';

// Helper to generate unique IDs, if not using a library
// function generateId() { return Math.random().toString(36).substring(2, 9); }

export default function MyDecksPage() {
  const [decks, setDecks] = useState([]);
  const [newDeckName, setNewDeckName] = useState('');
  const [selectedDeckId, setSelectedDeckId] = useState(null);
  const [newCardFront, setNewCardFront] = useState('');
  const [newCardBack, setNewCardBack] = useState('');

  useEffect(() => {
    setDecks(getDecks());
  }, []);

  useEffect(() => {
    if (decks.length > 0) {
      saveDecks(decks);
    }
  }, [decks]);

  const handleCreateDeck = (e) => {
    e.preventDefault();
    if (newDeckName.trim()) {
      const newDeck = { id: uuidv4(), name: newDeckName, cards: [] };
      setDecks([...decks, newDeck]);
      setNewDeckName('');
      setSelectedDeckId(newDeck.id); // Automatically select new deck
    }
  };

  const handleDeleteDeck = (id) => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      const updatedDecks = decks.filter((deck) => deck.id !== id);
      setDecks(updatedDecks);
      if (selectedDeckId === id) {
        setSelectedDeckId(null);
      }
    }
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (selectedDeckId && newCardFront.trim() && newCardBack.trim()) {
      const updatedDecks = decks.map((deck) => {
        if (deck.id === selectedDeckId) {
          return {
            ...deck,
            cards: [...deck.cards, { id: uuidv4(), front: newCardFront, back: newCardBack, learned: false }],
          };
        }
        return deck;
      });
      setDecks(updatedDecks);
      setNewCardFront('');
      setNewCardBack('');
    }
  };

  const selectedDeck = decks.find((deck) => deck.id === selectedDeckId);

  return (
    <div className="container my-decks-page">
      <h1 className="gradient-text">My Flashcard Decks</h1>
      <p>Create new decks, add flashcards, and manage your study material.</p>

      <div className="glass-card create-deck-form">
        <h2>Create New Deck</h2>
        <form onSubmit={handleCreateDeck} className="form-group">
          <label htmlFor="newDeckName">Deck Name:</label>
          <input
            type="text"
            id="newDeckName"
            value={newDeckName}
            onChange={(e) => setNewDeckName(e.target.value)}
            placeholder="e.g., JavaScript Fundamentals"
            required
          />
          <button type="submit" className="button primary-button" style={{ marginTop: '1rem' }}>
            Create Deck
          </button>
        </form>
      </div>

      <div className="glass-card" style={{ marginTop: '2rem' }}>
        <h2>Your Decks</h2>
        {decks.length === 0 ? (
          <p className="no-content-message">No decks created yet. Start by creating a new one!</p>
        ) : (
          <div className="deck-list">
            {decks.map((deck) => (
              <div key={deck.id} className="glass-card deck-item">
                <div className="deck-item-info">
                  <h3>{deck.name} ({deck.cards.length} cards)</h3>
                  <p>ID: {deck.id.substring(0, 8)}...</p>
                </div>
                <div className="deck-item-actions">
                  <button
                    onClick={() => setSelectedDeckId(deck.id)}
                    className="button secondary-button"
                    style={{ backgroundColor: selectedDeckId === deck.id ? 'rgba(var(--accent-blue-rgb), 0.2)' : 'transparent' }}
                  >
                    {selectedDeckId === deck.id ? 'Selected' : 'Select'}
                  </button>
                  <button onClick={() => handleDeleteDeck(deck.id)} className="button danger-button">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedDeck && (
        <div className="glass-card add-card-form" style={{ marginTop: '2rem' }}>
          <h2>Add Card to &quot;{selectedDeck.name}&quot;</h2>
          <form onSubmit={handleAddCard}>
            <div className="form-group">
              <label htmlFor="cardFront">Front of Card:</label>
              <textarea
                id="cardFront"
                value={newCardFront}
                onChange={(e) => setNewCardFront(e.target.value)}
                placeholder="Question or term"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="cardBack">Back of Card:</label>
              <textarea
                id="cardBack"
                value={newCardBack}
                onChange={(e) => setNewCardBack(e.target.value)}
                placeholder="Answer or definition"
                required
              ></textarea>
            </div>
            <button type="submit" className="button primary-button">
              Add Card
            </button>
          </form>

          <h3 style={{ marginTop: '2rem', color: 'var(--accent-cyan)' }}>Cards in &quot;{selectedDeck.name}&quot;:</h3>
          {selectedDeck.cards.length === 0 ? (
            <p className="no-content-message">No cards in this deck yet. Add some above!</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {selectedDeck.cards.map((card, index) => (
                <li key={card.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', marginBottom: '0.8rem' }}>
                  <span>{index + 1}. {card.front.substring(0, 50)}...</span>
                  <span>{card.back.substring(0, 50)}...</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
