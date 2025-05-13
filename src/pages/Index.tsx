
import { ChatLayout } from "@/components/ChatLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ChatProvider } from "@/contexts/ChatContext";

const Index = () => {
  return (
    <ThemeProvider>
      <ChatProvider>
        <ChatLayout />
      </ChatProvider>
    </ThemeProvider>
  );
};

export default Index;
