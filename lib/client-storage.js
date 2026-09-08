export const getDecks = () => {
  if (typeof window === 'undefined') {
    return [];
  }
  const decksJson = localStorage.getItem('flashcardDecks');
  if (decksJson) {
    return JSON.parse(decksJson);
  } else {
    const initialDecks = initializeDecks();
    saveDecks(initialDecks);
    return initialDecks;
  }
};

export const saveDecks = (decks) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('flashcardDecks', JSON.stringify(decks));
  }
};

const initializeDecks = () => {
  return [
    {
      id: 'deck-1',
      name: 'Frontend Basics',
      cards: [
        { id: 'card-1-1', front: 'What is React?', back: 'A JavaScript library for building user interfaces.', learned: false },
        { id: 'card-1-2', front: 'What is Next.js?', back: 'A React framework for building full-stack web applications.', learned: false },
        { id: 'card-1-3', front: 'Purpose of `useEffect` hook?', back: 'Perform side effects in function components (data fetching, subscriptions, manually changing the DOM).', learned: false },
        { id: 'card-1-4', front: 'What is JSX?', back: 'A syntax extension for JavaScript, used with React to describe UI.', learned: false }
      ],
    },
    {
      id: 'deck-2',
      name: 'Science Trivia',
      cards: [
        { id: 'card-2-1', front: 'What is the chemical symbol for water?', back: 'H2O', learned: false },
        { id: 'card-2-2', front: 'What planet is known as the Red Planet?', back: 'Mars', learned: false },
        { id: 'card-2-3', front: 'What is the largest organ in the human body?', back: 'Skin', learned: false }
      ],
    },
  ];
};
