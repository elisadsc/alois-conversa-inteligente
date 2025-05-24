
import React, { useState } from 'react';
import { ReactChatHeader } from './ReactChatHeader';
import { ReactChatSidebar } from './ReactChatSidebar';
import { ReactChatMessages } from './ReactChatMessages';
import { ReactChatInput } from './ReactChatInput';
import './ReactChatLayout.css';

export function ReactChatLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="react-chat-layout">
      <ReactChatHeader onToggleSidebar={toggleSidebar} />
      <div className="react-chat-content">
        {sidebarOpen && (
          <div className="react-chat-sidebar-container">
            <ReactChatSidebar />
          </div>
        )}
        <div className="react-chat-main-content">
          <ReactChatMessages />
          <ReactChatInput />
        </div>
      </div>
    </div>
  );
}
