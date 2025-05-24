
import React, { useRef, useEffect } from 'react';
import { useChat, Message, MessageResponse } from '@/contexts/ChatContext';
import { ReactButton } from './ui/ReactButton';
import { ReactAlertDialog } from './ui/ReactAlertDialog';
import { ReactRatingForm } from './ReactRatingForm';
import './ReactChatMessages.css';

export function ReactChatMessages() {
  const { 
    messages, 
    isLoading, 
    selectResponse, 
    selectedResponse,
    evaluatingResponse,
    confirmResponseSelection
  } = useChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="react-chat-messages">
      {messages.length === 0 && (
        <div className="react-chat-welcome">
          <div className="react-chat-welcome-content">
            <h2>Bem-vindo ao ALOIS CHAT</h2>
            <p>
              Faça uma pergunta para começar uma conversa e receber respostas de dois modelos diferentes.
            </p>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <div key={message.id} className="react-message-group">
          {/* Mensagem do usuário */}
          {message.type === 'user' && (
            <div className="react-message react-user-message">
              <p>{message.content}</p>
            </div>
          )}

          {/* Carregando */}
          {message.type === 'user' && !message.responses && isLoading && (
            <div className="react-message react-assistant-message react-loading">
              <div className="react-loading-indicator"></div>
              <p className="react-loading-text">Gerando resposta...</p>
            </div>
          )}

          {/* Respostas do assistente */}
          {message.responses && message.responses.length > 0 && (
            <div className="react-responses-container">
              {message.responses.some(r => r.evaluated) ? (
                // Mostrar apenas a resposta selecionada e avaliada
                message.responses
                  .filter(response => response.selected && response.evaluated)
                  .map(response => (
                    <div key={response.id} className="react-message react-assistant-message">
                      <p>{response.content}</p>
                      <div className="react-message-footer">
                        Resposta registrada
                      </div>
                    </div>
                  ))
              ) : (
                // Mostrar ambas as respostas e permitir a seleção
                <>
                  <h3 className="react-responses-title">Escolha a melhor resposta:</h3>
                  <div className="react-responses-grid">
                    {message.responses.map((response) => (
                      <ReactResponseCard
                        key={response.id}
                        response={response}
                        onClick={() => selectResponse(message.id, response.id)}
                        isSelected={selectedResponse?.id === response.id}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Dialog de confirmação de seleção */}
      <ReactAlertDialog 
        open={!!selectedResponse} 
        onOpenChange={(isOpen) => !isOpen && confirmResponseSelection(false)}
        title="Confirmar seleção"
        description="Tem certeza que esta é a melhor resposta para você?"
        onConfirm={() => confirmResponseSelection(true)}
        onCancel={() => confirmResponseSelection(false)}
      />

      {/* Formulário de avaliação */}
      {evaluatingResponse && (
        <ReactRatingForm response={evaluatingResponse} />
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

interface ReactResponseCardProps {
  response: MessageResponse;
  onClick: () => void;
  isSelected: boolean;
}

function ReactResponseCard({ response, onClick, isSelected }: ReactResponseCardProps) {
  return (
    <div
      className={`react-response-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="react-response-model">
        Modelo: {response.model === 'model1' ? 'A' : 'B'}
      </div>
      <p className="react-response-content">{response.content}</p>
      <ReactButton
        variant="ghost"
        className="react-response-button"
        onClick={onClick}
      >
        {isSelected ? "Selecionado" : "Selecionar esta resposta"}
      </ReactButton>
    </div>
  );
}
