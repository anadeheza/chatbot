"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ChatContextType = {
    open: boolean;
    setOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
    pendingMessage: string | null;
    setPendingMessage: (msg: string | null) => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: ReactNode}) {
    const [open, setOpen] = useState(false);
    const [pendingMessage, setPendingMessage] = useState<string | null>(null);
    return (
        <ChatContext.Provider value={{ open, setOpen, pendingMessage, setPendingMessage }}>
            {children}
        </ChatContext.Provider>
  );
}

export function useChat() {
    const ctx = useContext(ChatContext);
    if(!ctx) throw new Error("useChat must be inside ChatProvider");
    return ctx;
}