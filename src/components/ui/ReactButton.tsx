
import React from 'react';
import './ReactButton.css';

interface ReactButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}

export function ReactButton({ 
  variant = 'default', 
  size = 'default', 
  className = '', 
  children, 
  ...props 
}: ReactButtonProps) {
  const buttonClass = `react-button react-button-${variant} react-button-${size} ${className}`.trim();
  
  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}
