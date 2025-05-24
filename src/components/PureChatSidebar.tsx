
import { MessageSquare, Plus, Trash2, Edit3 } from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/pure-sidebar";
import { useChat } from "@/contexts/ChatContext";

export function PureChatSidebar() {
  const { 
    chats, 
    currentChatId, 
    createChat, 
    selectChat, 
    deleteChat,
    renameChatTitle,
    timeFilter,
    setTimeFilter 
  } = useChat();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const handleEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setNewTitle(currentTitle);
  };

  const handleSaveEdit = (id: string) => {
    if (newTitle.trim() !== '') {
      renameChatTitle(id, newTitle.trim());
    }
    setEditingId(null);
    setNewTitle("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewTitle("");
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <Sidebar side="left" className="chat-sidebar">
      <SidebarHeader>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          padding: "8px"
        }}>
          <h2 style={{ 
            fontSize: "16px", 
            fontWeight: "600",
            color: "var(--sidebar-foreground)"
          }}>
            Histórico de Chats
          </h2>
          <button
            onClick={createChat}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "var(--sidebar-primary)",
              color: "var(--sidebar-primary-foreground)",
              cursor: "pointer",
              transition: "opacity 150ms ease-in-out"
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
            onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
            title="Novo Chat"
          >
            <Plus style={{ width: "16px", height: "16px" }} />
          </button>
        </div>
        
        {/* Filtros de tempo */}
        <div style={{ padding: "0 8px" }}>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            style={{
              width: "100%",
              padding: "6px 8px",
              borderRadius: "4px",
              border: "1px solid var(--sidebar-border)",
              backgroundColor: "var(--sidebar-background)",
              color: "var(--sidebar-foreground)",
              fontSize: "14px"
            }}
          >
            <option value="all">Todos os períodos</option>
            <option value="today">Hoje</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mês</option>
          </select>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Conversas Recentes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.length === 0 ? (
                <div style={{ 
                  padding: "16px", 
                  textAlign: "center",
                  color: "var(--sidebar-muted-foreground)",
                  fontSize: "14px"
                }}>
                  Nenhuma conversa encontrada
                </div>
              ) : (
                chats.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center",
                      gap: "4px",
                      width: "100%"
                    }}>
                      <SidebarMenuButton
                        isActive={currentChatId === chat.id}
                        onClick={() => selectChat(chat.id)}
                        style={{ flex: 1, justifyContent: "flex-start" }}
                      >
                        <MessageSquare style={{ width: "16px", height: "16px" }} />
                        {editingId === chat.id ? (
                          <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, chat.id)}
                            onBlur={() => handleCancelEdit()}
                            autoFocus
                            style={{
                              background: "var(--sidebar-background)",
                              border: "1px solid var(--sidebar-border)",
                              borderRadius: "2px",
                              padding: "2px 4px",
                              fontSize: "14px",
                              color: "var(--sidebar-foreground)",
                              width: "100%"
                            }}
                          />
                        ) : (
                          <span style={{ 
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                          }}>
                            {chat.name}
                          </span>
                        )}
                      </SidebarMenuButton>
                      
                      {editingId !== chat.id && (
                        <div style={{ display: "flex", gap: "2px" }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(chat.id, chat.name);
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "24px",
                              height: "24px",
                              borderRadius: "4px",
                              border: "none",
                              backgroundColor: "transparent",
                              color: "var(--sidebar-muted-foreground)",
                              cursor: "pointer",
                              transition: "background-color 150ms ease-in-out"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "var(--sidebar-accent)"}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                            title="Editar título"
                          >
                            <Edit3 style={{ width: "12px", height: "12px" }} />
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteChat(chat.id);
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "24px",
                              height: "24px",
                              borderRadius: "4px",
                              border: "none",
                              backgroundColor: "transparent",
                              color: "var(--sidebar-muted-foreground)",
                              cursor: "pointer",
                              transition: "background-color 150ms ease-in-out"
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = "#fee2e2";
                              e.currentTarget.style.color = "#dc2626";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                              e.currentTarget.style.color = "var(--sidebar-muted-foreground)";
                            }}
                            title="Excluir conversa"
                          >
                            <Trash2 style={{ width: "12px", height: "12px" }} />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div style={{ 
                      fontSize: "12px",
                      color: "var(--sidebar-muted-foreground)",
                      marginLeft: "24px",
                      marginTop: "2px"
                    }}>
                      {chat.messages.length} mensagens
                    </div>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
