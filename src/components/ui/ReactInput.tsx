
import React from 'react';
import './ReactInput.css';

interface ReactInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function ReactInput({ className = '', ...props }: ReactInputProps) {
  return (
    <input 
      className={`react-input ${className}`.trim()} 
      {...props} 
    />
  );
}
