
import React from 'react';
import { ReactButton } from './ReactButton';
import './ReactAlertDialog.css';

interface ReactAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

export function ReactAlertDialog({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  onConfirm, 
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = 'default'
}: ReactAlertDialogProps) {
  if (!open) return null;

  return (
    <div className="react-alert-overlay" onClick={() => onOpenChange(false)}>
      <div className="react-alert-content" onClick={(e) => e.stopPropagation()}>
        <div className="react-alert-header">
          <h2 className="react-alert-title">{title}</h2>
          <p className="react-alert-description">{description}</p>
        </div>
        <div className="react-alert-footer">
          <ReactButton variant="outline" onClick={onCancel}>
            {cancelText}
          </ReactButton>
          <ReactButton 
            variant={variant === 'destructive' ? 'destructive' : 'default'} 
            onClick={onConfirm}
          >
            {confirmText}
          </ReactButton>
        </div>
      </div>
    </div>
  );
}
