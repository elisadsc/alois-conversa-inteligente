
import React from 'react';
import './ReactLikertScale.css';

interface ReactLikertScaleProps {
  value: number;
  onChange: (value: number) => void;
}

export function ReactLikertScale({ value, onChange }: ReactLikertScaleProps) {
  return (
    <div className="react-likert-scale">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          className={`react-likert-button ${value === rating ? 'active' : ''}`}
          aria-label={`Avaliação ${rating} de 5`}
        >
          {rating}
        </button>
      ))}
    </div>
  );
}
