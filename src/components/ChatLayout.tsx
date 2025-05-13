
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export function ChatLayout() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}
