
import { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { 
  Edit, 
  MessageSquarePlus, 
  TrashIcon, 
  MessageSquare, 
  Plus 
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ChatSidebar() {
  const { 
    chats, 
    currentChatId, 
    createChat, 
    selectChat, 
    deleteChat,
    renameChatTitle
  } = useChat();

  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [newChatTitle, setNewChatTitle] = useState<string>('');
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);

  const handleEditClick = (chatId: string, currentName: string) => {
    setEditingChatId(chatId);
    setNewChatTitle(currentName);
  };

  const handleEditSubmit = (chatId: string) => {
    if (newChatTitle.trim() !== '') {
      renameChatTitle(chatId, newChatTitle);
    }
    setEditingChatId(null);
  };

  const handleDeleteClick = (chatId: string) => {
    setChatToDelete(chatId);
  };

  const confirmDelete = () => {
    if (chatToDelete) {
      deleteChat(chatToDelete);
      setChatToDelete(null);
    }
  };

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-semibold">Conversas</h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={createChat}
              title="Novo chat"
              aria-label="Criar novo chat"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {chats.map(chat => (
                  <SidebarMenuItem key={chat.id}>
                    {editingChatId === chat.id ? (
                      <div className="flex items-center space-x-2 py-1 px-2">
                        <Input
                          value={newChatTitle}
                          onChange={(e) => setNewChatTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleEditSubmit(chat.id);
                            } else if (e.key === 'Escape') {
                              e.preventDefault();
                              setEditingChatId(null);
                            }
                          }}
                          className="h-8 text-sm"
                          autoFocus
                        />
                        <Button 
                          size="sm" 
                          className="h-8 px-2" 
                          onClick={() => handleEditSubmit(chat.id)}
                        >
                          Salvar
                        </Button>
                      </div>
                    ) : (
                      <SidebarMenuButton
                        isActive={chat.id === currentChatId}
                        onClick={() => selectChat(chat.id)}
                        className="justify-between group"
                        tooltip={format(new Date(chat.createdAt), "dd 'de' MMMM, yyyy", { locale: pt })}
                      >
                        <div className="flex items-center">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span className="truncate">{chat.name}</span>
                        </div>
                        <div className="hidden group-hover:flex items-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(chat.id, chat.name);
                            }}
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(chat.id);
                            }}
                          >
                            <TrashIcon className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={createChat}
          >
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            Iniciar nova conversa
          </Button>
        </SidebarFooter>
      </Sidebar>

      <AlertDialog open={!!chatToDelete} onOpenChange={(open) => !open && setChatToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir conversa</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta conversa? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
