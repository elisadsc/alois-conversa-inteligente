
import { Info, Moon, Sun, History } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChat, TimeFilter } from "@/contexts/ChatContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export function ChatHeader() {
  const { theme, toggleTheme } = useTheme();
  const { timeFilters, setTimeFilter } = useChat();
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 bg-background border-b border-border flex items-center justify-between p-4">
        <h1 className="font-bold text-xl text-white bg-gradient-to-r from-alois-purple to-alois-dark-purple px-3 py-1 rounded-md">
          ALOIS CHAT
        </h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setInfoOpen(true)}
            aria-label="Informações"
          >
            <Info className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Modo escuro" : "Modo claro"}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Histórico">
                <History className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {timeFilters.map((filter: TimeFilter) => (
                <DropdownMenuItem 
                  key={filter.value}
                  onClick={() => setTimeFilter(filter.value)}
                >
                  {filter.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Como usar o ALOIS CHAT</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-left">
            <p>Bem-vindo(a) ao ALOIS CHAT, seu assistente inteligente de conversação.</p>
            
            <h3 className="font-medium">Como usar:</h3>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Digite sua pergunta na caixa de mensagem e envie.</li>
              <li>Você receberá duas respostas diferentes de nossos modelos de IA.</li>
              <li>Selecione a resposta que você considera melhor.</li>
              <li>Confirme sua escolha quando solicitado.</li>
              <li>Avalie a resposta escolhida usando os critérios fornecidos.</li>
              <li>Suas avaliações nos ajudam a melhorar continuamente!</li>
            </ol>
            
            <h3 className="font-medium">Funcionalidades:</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li>Alterne entre modo claro e escuro com o botão de lua/sol.</li>
              <li>Filtre seu histórico de interações pelo período usando o botão de histórico.</li>
              <li>Acesse estas instruções a qualquer momento clicando no ícone de informação.</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
