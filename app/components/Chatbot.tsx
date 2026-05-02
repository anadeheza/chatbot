"use client";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useChat } from "./ChatContext"

const STARTER_PROMPTS = [
  "Substitute butter in a recipe",
  "What can I make with chicken & rice?",
  "How do I fix over-salted soup?",
  "Suggest a 20-minute dinner",
];

const MODELS = [
  { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
  { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro" },
];

const SYSTEM_PROMPT =
  "You are Basil, a friendly and knowledgeable AI chef assistant. You help users with cooking questions: recipe ideas, ingredient substitutions, techniques, flavor pairings, dietary adaptations, and kitchen tips. Keep answers practical, warm, and encouraging. Use emojis occasionally to keep the tone fun.";

// ── Types ────────────────────────────────────────────
type Message = { role: "user" | "assistant"; content: string };
type Conversation = { id: string; title: string; messages: Message[] };

function createConversation(): Conversation {
  return { id: Date.now().toString(), title: "New chat", messages: [] };
}

export default function Chatbot() {
  const { open, setOpen, pendingMessage, setPendingMessage } = useChat();
  const [conversations, setConversations] = useState<Conversation[]>(() => [createConversation()]);
  const [activeId, setActiveId] = useState<string>(() => conversations[0].id);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(MODELS[0].id);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("basil-conversations");
      if (saved) {
        const parsed: Conversation[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setConversations(parsed);
          setActiveId(parsed[0].id);
        }
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("basil-conversations", JSON.stringify(conversations));
  }, [conversations, ready]);

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];
  const messages: Message[] = active?.messages ?? [];

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    if(pendingMessage && open) {
      sendMessage(pendingMessage);
      setPendingMessage(null);
    }
  }, [pendingMessage, open]);

  function updateMessages(id: string, msgs: Message[]) {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const title = msgs.find((m) => m.role === "user")?.content.slice(0, 32) || "New chat";
        return { ...c, messages: msgs, title };
      })
    );
  }

  async function sendMessage(overrideInput?: string) {
    const text = overrideInput ?? input;
    if (!text.trim() || loading) return;

    const currentId = active.id;
    const userMessage: Message = { role: "user", content: text };
    const updated: Message[] = [...messages, userMessage];
    updateMessages(currentId, updated);
    setInput("");
    setLoading(true);

    const withAssistant: Message[] = [...updated, { role: "assistant", content: "" }];
    updateMessages(currentId, withAssistant);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated, model, systemPrompt: SYSTEM_PROMPT }),
      });

      if (!res.ok) { setLoading(false); return; }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((l) => l.startsWith("data:"));
        for (const line of lines) {
          const json = line.replace("data: ", "").trim();
          if (!json || json === "[DONE]") continue;
          try {
            const parsed = JSON.parse(json);
            const token: string = parsed.choices?.[0]?.delta?.content ?? "";
            accumulated += token;
            setConversations((prev) =>
              prev.map((c) => {
                if (c.id !== currentId) return c;
                const msgs: Message[] = [...c.messages];
                msgs[msgs.length - 1] = { role: "assistant", content: accumulated };
                return { ...c, messages: msgs };
              })
            );
          } catch {}
        }
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  function newChat() {
    const c = createConversation();
    setConversations((prev) => [c, ...prev]);
    setActiveId(c.id);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function copyMessage(content: string, index: number) {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="chat-fab"
        aria-label={open ? "Close chef assistant" : "Open chef assistant"}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <span style={{ fontSize: "22px" }}>👨‍🍳</span>
        )}
        {!open && <span className="fab-label">Ask Chefsito</span>}
      </button>

      {/* Chat panel */}
      <div className={`chat-panel ${open ? "chat-panel--open" : ""}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <span className="chat-avatar">👨‍🍳</span>
            <div>
              <div className="chat-header-name">Chef Basil</div>
              <div className="chat-header-status">
                <span className="status-dot" />
                AI Cooking Assistant
              </div>
            </div>
          </div>
          <div className="chat-header-actions">
            <button onClick={newChat} className="icon-btn" title="New chat">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <button onClick={() => setOpen(false)} className="icon-btn" title="Close">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages chat-scroll">
          {messages.length === 0 && (
            <div className="chat-empty">
              <p className="chat-empty-title">Hi! I&apos;m Chefsito 🌿</p>
              <p className="chat-empty-sub">Ask me anything about cooking — recipes, substitutions, techniques, you name it, i do it.</p>
              <div className="starter-grid">
                {STARTER_PROMPTS.map((p) => (
                  <button key={p} onClick={() => sendMessage(p)} className="starter-btn">{p}</button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`msg-row ${m.role === "user" ? "msg-row--user" : "msg-row--assistant"}`}>
              <div className="msg-bubble-wrap">
                <div className={`msg-bubble ${m.role === "user" ? "msg-bubble--user" : "msg-bubble--assistant"}`}>
                  {m.role === "assistant"
                    ? <ReactMarkdown className="prose prose-sm max-w-none prose-p:my-1 prose-pre:bg-stone-800 prose-pre:text-amber-100 prose-code:text-amber-700 prose-code:bg-amber-50 prose-code:px-1 prose-code:rounded">{m.content}</ReactMarkdown>
                    : m.content}
                </div>
                <button onClick={() => copyMessage(m.content, i)} className="copy-btn">
                  {copiedIndex === i ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </div>
          ))}

          {loading && (
            <div className="msg-row msg-row--assistant">
              <div className="msg-bubble msg-bubble--assistant">
                <div className="typing-dots">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="typing-dot" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <select value={model} onChange={(e) => setModel(e.target.value)} className="model-select">
            {MODELS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
          <div className="input-row">
            <textarea
              className="chat-textarea"
              rows={1}
              placeholder="Ask Chefsito..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="send-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}