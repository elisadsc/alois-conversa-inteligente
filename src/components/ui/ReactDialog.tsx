
import React from 'react';
import './ReactDialog.css';

interface ReactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export function ReactDialog({ open, onOpenChange, title, children }: ReactDialogProps) {
  if (!open) return null;

  return (
    <div className="react-dialog-overlay" onClick={() => onOpenChange(false)}>
      <div className="react-dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="react-dialog-header">
          <h2 className="react-dialog-title">{title}</h2>
          <button 
            className="react-dialog-close"
            onClick={() => onOpenChange(false)}
            aria-label="Fechar"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="react-dialog-body">
          {children}
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18"/>
      <path d="M6 6l12 12"/>
    </svg>
  );
}
