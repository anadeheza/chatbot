import { ChatProvider } from "./components/ChatContext";
import Chatbot from "./components/Chatbot";
import Hero from "./components/Hero";
import Recipes from "./components/Recipes";

export default function Page() {
  return (
    <ChatProvider>
        <Hero />
        <Recipes />
        <Chatbot />
    </ChatProvider>
  );
}