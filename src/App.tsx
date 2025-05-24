import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ChatLayout } from "@/components/ChatLayout";
import { PureChatSidebar } from "@/components/PureChatSidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/pure-sidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
          <PureChatSidebar />
          <SidebarInset>
            <div style={{ display: "flex", alignItems: "center", padding: "8px 16px", borderBottom: "1px solid var(--sidebar-border)" }}>
              <SidebarTrigger />
            </div>
            <ChatLayout />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
