
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ReactChatApp } from './components/ReactChatApp';
import { ChatProvider } from './contexts/ChatContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ChatProvider>
          <ReactChatApp />
        </ChatProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
