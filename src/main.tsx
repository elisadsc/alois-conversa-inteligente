
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SidebarProvider } from "@/components/ui/sidebar"
import { ChatProvider } from "@/contexts/ChatContext"

createRoot(document.getElementById("root")!).render(
  <SidebarProvider>
    <ChatProvider>
      <App />
    </ChatProvider>
  </SidebarProvider>
);
