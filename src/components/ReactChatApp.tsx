
import React from 'react';
import { ReactChatHeader } from './ReactChatHeader';
import { ReactChatMessages } from './ReactChatMessages';
import { ReactChatInput } from './ReactChatInput';
import { ReactChatSidebar } from './ReactChatSidebar';
import { SidebarProvider } from '@/components/ui/pure-sidebar';
import './ReactChatApp.css';

export function ReactChatApp() {
  return (
    <SidebarProvider>
      <div className="react-chat-app">
        <ReactChatSidebar />
        <div className="react-chat-main">
          <ReactChatHeader />
          <ReactChatMessages />
          <ReactChatInput />
        </div>
      </div>
    </SidebarProvider>
  );
}
