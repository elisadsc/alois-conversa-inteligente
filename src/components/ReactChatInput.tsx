
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { ReactButton } from './ui/ReactButton';
import { ReactTextarea } from './ui/ReactTextarea';
import './ReactChatInput.css';

export function ReactChatInput() {
  const [input, setInput] = useState("");
  const { addMessage, isLoading } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    addMessage(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="react-chat-input">
      <div className="react-chat-input-container">
        <ReactTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua pergunta aqui..."
          disabled={isLoading}
        />
        <ReactButton
          type="submit"
          size="icon"
          disabled={!input.trim() || isLoading}
          aria-label="Enviar mensagem"
        >
          <SendIcon />
        </ReactButton>
      </div>
    </form>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m22 2-7 20-4-9-9-4Z"/>
      <path d="M22 2 11 13"/>
    </svg>
  );
}
