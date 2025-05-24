import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { ReactButton } from './ui/ReactButton';
import { ReactInput } from './ui/ReactInput';
import { ReactAlertDialog } from './ui/ReactAlertDialog';
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from '@/components/ui/pure-sidebar';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import './ReactChatSidebar.css';

export function ReactChatSidebar() {
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
      <Sidebar collapsible="icon" className="react-chat-sidebar">
        <SidebarHeader>
          <div className="react-sidebar-header">
            <h2>Conversas</h2>
            <ReactButton 
              variant="ghost" 
              size="icon"
              onClick={createChat}
              title="Novo chat"
              aria-label="Criar novo chat"
            >
              <PlusIcon />
            </ReactButton>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <div className="react-sidebar-content">
            {chats.map(chat => (
              <div key={chat.id} className="react-chat-item">
                {editingChatId === chat.id ? (
                  <div className="react-chat-edit">
                    <ReactInput
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
                      autoFocus
                    />
                    <ReactButton 
                      size="sm" 
                      onClick={() => handleEditSubmit(chat.id)}
                    >
                      Salvar
                    </ReactButton>
                  </div>
                ) : (
                  <div 
                    className={`react-chat-button ${chat.id === currentChatId ? 'active' : ''}`}
                    onClick={() => selectChat(chat.id)}
                    title={format(new Date(chat.createdAt), "dd 'de' MMMM, yyyy", { locale: pt })}
                  >
                    <div className="react-chat-info">
                      <MessageSquareIcon />
                      <span>{chat.name}</span>
                    </div>
                    <div className="react-chat-actions">
                      <ReactButton 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(chat.id, chat.name);
                        }}
                      >
                        <EditIcon />
                      </ReactButton>
                      <ReactButton 
                        variant="ghost" 
                        size="icon" 
                        className="react-delete-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(chat.id);
                        }}
                      >
                        <TrashIcon />
                      </ReactButton>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </SidebarContent>
        
        <SidebarFooter>
          <ReactButton 
            variant="outline" 
            className="react-new-chat-button"
            onClick={createChat}
          >
            <MessageSquarePlusIcon />
            Iniciar nova conversa
          </ReactButton>
        </SidebarFooter>
      </Sidebar>

      <ReactAlertDialog 
        open={!!chatToDelete} 
        onOpenChange={(open) => !open && setChatToDelete(null)}
        title="Excluir conversa"
        description="Tem certeza que deseja excluir esta conversa? Esta ação não pode ser desfeita."
        onConfirm={confirmDelete}
        onCancel={() => setChatToDelete(null)}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="destructive"
      />
    </>
  );
}

// Icon components
function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14"/>
      <path d="M12 5v14"/>
    </svg>
  );
}

function MessageSquareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
      <path d="m15 5 4 4"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18"/>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
  );
}

function MessageSquarePlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      <path d="M12 7v6"/>
      <path d="M9 10h6"/>
    </svg>
  );
}
