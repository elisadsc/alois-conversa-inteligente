
import React from 'react';
import './ReactTextarea.css';

interface ReactTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function ReactTextarea({ className = '', ...props }: ReactTextareaProps) {
  return (
    <textarea 
      className={`react-textarea ${className}`.trim()} 
      {...props} 
    />
  );
}
