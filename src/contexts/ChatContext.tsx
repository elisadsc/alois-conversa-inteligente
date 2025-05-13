
import { createContext, useContext, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export type MessageType = 'user' | 'assistant';
export type ModelType = 'model1' | 'model2';

export interface FeedbackRating {
  coherence: number;
  clarity: number;
  relevance: number;
  usefulness: number;
  trustworthiness: number;
  comment?: string;
}

export interface MessageResponse {
  id: string;
  content: string;
  model: ModelType;
  selected?: boolean;
  evaluated?: boolean;
  feedback?: FeedbackRating;
}

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  responses?: MessageResponse[];
}

export interface TimeFilter {
  label: string;
  value: string;
}

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  selectedResponse: MessageResponse | null;
  evaluatingResponse: MessageResponse | null;
  timeFilter: string;
  timeFilters: TimeFilter[];
  addMessage: (content: string) => void;
  selectResponse: (messageId: string, responseId: string) => void;
  confirmResponseSelection: (confirmed: boolean) => void;
  submitEvaluation: (messageId: string, responseId: string, feedback: FeedbackRating) => void;
  setTimeFilter: (filter: string) => void;
  resetEvaluation: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Respostas simuladas
const generateResponses = (messageId: string, query: string): MessageResponse[] => {
  const responseContent1 = `Esta é a primeira resposta gerada pelo modelo 1 para sua pergunta: "${query}". Em um sistema real, esta seria uma resposta completa do modelo de IA.`;
  const responseContent2 = `Esta é a segunda resposta, alternativa, gerada pelo modelo 2 para: "${query}". Esta resposta seria diferente da primeira para oferecer perspectivas variadas.`;
  
  return [
    { id: `${messageId}-response-1`, content: responseContent1, model: 'model1' },
    { id: `${messageId}-response-2`, content: responseContent2, model: 'model2' }
  ];
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedResponse, setSelectedResponse] = useState<MessageResponse | null>(null);
  const [evaluatingResponse, setEvaluatingResponse] = useState<MessageResponse | null>(null);
  const [timeFilter, setTimeFilter] = useState<string>('all');
  const { toast } = useToast();
  
  const timeFilters: TimeFilter[] = [
    { label: 'Todas', value: 'all' },
    { label: 'Hoje', value: 'today' },
    { label: 'Ontem', value: 'yesterday' },
    { label: 'Esta Semana', value: 'thisWeek' },
    { label: 'Este Mês', value: 'thisMonth' },
  ];

  const addMessage = (content: string) => {
    const newMessageId = `message-${Date.now()}`;
    const newMessage: Message = {
      id: newMessageId,
      content,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsLoading(true);

    // Simulando um delay de resposta do chatbot
    setTimeout(() => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const messageIndex = updatedMessages.findIndex((msg) => msg.id === newMessageId);
        
        if (messageIndex !== -1) {
          updatedMessages[messageIndex] = {
            ...updatedMessages[messageIndex],
            responses: generateResponses(newMessageId, content)
          };
        }
        
        return updatedMessages;
      });
      setIsLoading(false);
    }, 1500);
  };

  const selectResponse = (messageId: string, responseId: string) => {
    const message = messages.find((msg) => msg.id === messageId);
    if (!message || !message.responses) return;

    const response = message.responses.find((res) => res.id === responseId);
    if (!response) return;
    
    setSelectedResponse(response);
  };

  const confirmResponseSelection = (confirmed: boolean) => {
    if (!confirmed || !selectedResponse) {
      setSelectedResponse(null);
      return;
    }

    setEvaluatingResponse(selectedResponse);
    setSelectedResponse(null);
  };

  const submitEvaluation = (messageId: string, responseId: string, feedback: FeedbackRating) => {
    setMessages((prevMessages) => {
      return prevMessages.map((message) => {
        if (message.id !== messageId) return message;

        const updatedResponses = message.responses?.map((response) => {
          if (response.id === responseId) {
            return {
              ...response,
              selected: true,
              evaluated: true,
              feedback
            };
          } else {
            return {
              ...response,
              selected: false
            };
          }
        });

        return {
          ...message,
          responses: updatedResponses
        };
      });
    });

    toast({
      title: "Avaliação enviada",
      description: "Sua avaliação foi registrada com sucesso.",
    });

    setEvaluatingResponse(null);
  };

  const resetEvaluation = () => {
    setEvaluatingResponse(null);
    setSelectedResponse(null);
  };

  const value = {
    messages,
    isLoading,
    selectedResponse,
    evaluatingResponse,
    timeFilter,
    timeFilters,
    addMessage,
    selectResponse,
    confirmResponseSelection,
    submitEvaluation,
    setTimeFilter,
    resetEvaluation
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat deve ser usado dentro de um ChatProvider');
  }
  return context;
};
