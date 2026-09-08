"use client";

import { useState } from 'react';

export default function Flashcard({ front, back }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="study-card-container" onClick={handleFlip}>
      <div className={`study-card ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="card-face card-front">
          <p>{front}</p>
        </div>
        <div className="card-face card-back">
          <p>{back}</p>
        </div>
      </div>
    </div>
  );
}
