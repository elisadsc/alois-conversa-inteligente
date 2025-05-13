
import { useChat, Message, MessageResponse } from "@/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";
import { RatingForm } from "./RatingForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export function ChatMessages() {
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
    <div className="flex-1 overflow-y-auto py-4 px-4 mt-16 mb-20">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Bem-vindo ao ALOIS CHAT</h2>
            <p className="text-muted-foreground">
              Faça uma pergunta para começar uma conversa e receber respostas de dois modelos diferentes.
            </p>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <div key={message.id} className="mb-6">
          {/* Mensagem do usuário */}
          {message.type === 'user' && (
            <div className="message-container user-message ml-auto max-w-3xl">
              <p>{message.content}</p>
            </div>
          )}

          {/* Carregando */}
          {message.type === 'user' && !message.responses && isLoading && (
            <div className="message-container assistant-message max-w-3xl flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-alois-purple animate-pulse"></div>
              <p className="loading-dots">Gerando resposta</p>
            </div>
          )}

          {/* Respostas do assistente */}
          {message.responses && message.responses.length > 0 && (
            <div className="space-y-4">
              {message.responses.some(r => r.evaluated) ? (
                // Mostrar apenas a resposta selecionada e avaliada
                message.responses
                  .filter(response => response.selected && response.evaluated)
                  .map(response => (
                    <div key={response.id} className="message-container assistant-message max-w-3xl">
                      <p>{response.content}</p>
                      <div className="text-xs text-muted-foreground mt-2 italic">
                        Resposta registrada
                      </div>
                    </div>
                  ))
              ) : (
                // Mostrar ambas as respostas e permitir a seleção
                <>
                  <h3 className="text-sm text-muted-foreground">Escolha a melhor resposta:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {message.responses.map((response) => (
                      <ResponseCard
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
      <AlertDialog 
        open={!!selectedResponse} 
        onOpenChange={(isOpen) => !isOpen && confirmResponseSelection(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar seleção</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que esta é a melhor resposta para você?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => confirmResponseSelection(true)}>
              Sim, avaliar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Formulário de avaliação */}
      {evaluatingResponse && (
        <RatingForm 
          response={evaluatingResponse} 
        />
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

interface ResponseCardProps {
  response: MessageResponse;
  onClick: () => void;
  isSelected: boolean;
}

function ResponseCard({ response, onClick, isSelected }: ResponseCardProps) {
  return (
    <div
      className={`border rounded-lg p-4 transition-all cursor-pointer ${
        isSelected
          ? "border-alois-purple bg-primary/5"
          : "hover:border-alois-purple/50 hover:bg-primary/5"
      }`}
      onClick={onClick}
    >
      <div className="font-medium text-xs text-muted-foreground mb-2">
        Modelo: {response.model === 'model1' ? 'A' : 'B'}
      </div>
      <p className="text-sm">{response.content}</p>
      <Button
        variant="ghost"
        className="mt-3 w-full border border-border hover:bg-primary/10 hover:text-primary"
        onClick={onClick}
      >
        {isSelected ? "Selecionado" : "Selecionar esta resposta"}
      </Button>
    </div>
  );
}
