
import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useChat, TimeFilter } from '@/contexts/ChatContext';
import { ReactButton } from './ui/ReactButton';
import { ReactDropdown } from './ui/ReactDropdown';
import { ReactDialog } from './ui/ReactDialog';
import './ReactChatHeader.css';

export function ReactChatHeader() {
  const { theme, toggleTheme } = useTheme();
  const { timeFilters, setTimeFilter } = useChat();
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <header className="react-chat-header">
        <h1 className="react-chat-title">
          ALOIS CHAT
        </h1>
        <div className="react-chat-header-actions">
          <ReactButton
            variant="ghost"
            size="icon"
            onClick={() => setInfoOpen(true)}
            aria-label="Informações"
          >
            <InfoIcon />
          </ReactButton>
          
          <ReactButton
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Modo escuro" : "Modo claro"}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </ReactButton>
          
          <ReactDropdown
            trigger={
              <ReactButton variant="ghost" size="icon" aria-label="Histórico">
                <HistoryIcon />
              </ReactButton>
            }
          >
            {timeFilters.map((filter: TimeFilter) => (
              <div 
                key={filter.value}
                className="react-dropdown-item"
                onClick={() => setTimeFilter(filter.value)}
              >
                {filter.label}
              </div>
            ))}
          </ReactDropdown>
        </div>
      </header>

      <ReactDialog 
        open={infoOpen} 
        onOpenChange={setInfoOpen}
        title="Como usar o ALOIS CHAT"
      >
        <div className="react-dialog-content">
          <p>Bem-vindo(a) ao ALOIS CHAT, seu assistente inteligente de conversação.</p>
          
          <h3>Como usar:</h3>
          <ol>
            <li>Digite sua pergunta na caixa de mensagem e envie.</li>
            <li>Você receberá duas respostas diferentes de nossos modelos de IA.</li>
            <li>Selecione a resposta que você considera melhor.</li>
            <li>Confirme sua escolha quando solicitado.</li>
            <li>Avalie a resposta escolhida usando os critérios fornecidos.</li>
            <li>Suas avaliações nos ajudam a melhorar continuamente!</li>
          </ol>
          
          <h3>Funcionalidades:</h3>
          <ul>
            <li>Alterne entre modo claro e escuro com o botão de lua/sol.</li>
            <li>Filtre seu histórico de interações pelo período usando o botão de histórico.</li>
            <li>Acesse estas instruções a qualquer momento clicando no ícone de informação.</li>
          </ul>
        </div>
      </ReactDialog>
    </>
  );
}

// Icon components
function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2"/>
      <path d="M12 21v2"/>
      <path d="M4.22 4.22l1.42 1.42"/>
      <path d="M18.36 18.36l1.42 1.42"/>
      <path d="M1 12h2"/>
      <path d="M21 12h2"/>
      <path d="M4.22 19.78l1.42-1.42"/>
      <path d="M18.36 5.64l1.42-1.42"/>
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
      <path d="M12 7v5l4 2"/>
    </svg>
  );
}
