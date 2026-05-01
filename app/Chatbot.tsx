"use client";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const STARTER_PROMPTS = [
  "Explain a concept simply",
  "Write me a short poem",
  "Help me debug some code",
  "Summarize a topic for me",
];

const MODELS = [
  { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
  { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro" },
];

type Message = { role: "user" | "assistant"; content: string };
type Conversation = { id: string; title: string; messages: Message[] };

function createConversation(): Conversation {
  return { id: Date.now().toString(), title: "New chat", messages: [] };
}

export default function Chatbot() {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    return [createConversation()];
  });
  const [activeId, setActiveId] = useState<string>(() => conversations[0].id);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(MODELS[0].id);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ready, setReady] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("chatbot-conversations");
      if (saved) {
        const parsed = JSON.parse(saved);
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
    localStorage.setItem("chatbot-conversations", JSON.stringify(conversations));
  }, [conversations, ready]);

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];
  const messages = active?.messages ?? [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
    console.log("sendMessage called with:", text);
    if (!text.trim() || loading) {
      console.log("blocked — empty or loading");
      return;
    }

    const currentId = active.id;
    const userMessage: Message = { role: "user", content: text };
    const updated = [...messages, userMessage];
    updateMessages(currentId, updated);
    setInput("");
    setLoading(true);

    const withAssistant = [...updated, { role: "assistant" as const, content: "" }];
    updateMessages(currentId, withAssistant);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated, model }),
      });

      console.log("API response status:", res.status);

      if (!res.ok) {
        const err = await res.text();
        console.error("API error:", err);
        setLoading(false);
        return;
      }

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
            const token = parsed.choices?.[0]?.delta?.content ?? "";
            accumulated += token;
            setConversations((prev) =>
              prev.map((c) => {
                if (c.id !== currentId) return c;
                const msgs = [...c.messages];
                msgs[msgs.length - 1] = { role: "assistant", content: accumulated };
                return { ...c, messages: msgs };
              })
            );
          } catch {}
        }
      }
    } catch (e) {
      console.error("Fetch failed:", e);
    }

    setLoading(false);
  }

  async function regenerate() {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    const idx = messages.lastIndexOf(lastUser);
    updateMessages(active.id, messages.slice(0, idx));
    await sendMessage(lastUser.content);
  }

  function copyMessage(content: string, index: number) {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  }

  function exportChat() {
    const text = messages.map((m) => `${m.role === "user" ? "You" : "Assistant"}: ${m.content}`).join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${active.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function newChat() {
    const c = createConversation();
    setConversations((prev) => [c, ...prev]);
    setActiveId(c.id);
  }

  function deleteConversation(id: string) {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (filtered.length === 0) {
        const c = createConversation();
        setActiveId(c.id);
        return [c];
      }
      if (id === activeId) setActiveId(filtered[0].id);
      return filtered;
    });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex h-screen bg-taupe-400 font-sans">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-60 flex-shrink-0 bg-taupe-600 border-r border-gray-200 flex flex-col">
          <div className="p-3 border-b border-gray-100">
            <button onClick={newChat} className="w-full text-sm text-gray-300 border border-gray-300 rounded-xl px-3 py-2 hover:bg-taupe-500 transition-colors text-left">
              + New chat
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
            {conversations.map((c) => (
              <div
                key={c.id}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer text-sm transition-colors ${c.id === activeId ? "bg-taupe-200 text-taupe-900" : "text-gray-500 hover:bg-gray-50"}`}
                onClick={() => setActiveId(c.id)}
              >
                <span className="truncate flex-1">{c.title}</span>
                <button onClick={(e) => { e.stopPropagation(); deleteConversation(c.id); }} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 ml-1 text-xs">✕</button>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-100">
            <select value={model} onChange={(e) => setModel(e.target.value)} className="w-full text-xs text-taupe-600 border border-gray-200 rounded-lg px-2 py-1.5 bg-taupe-200 focus:outline-none">
              {MODELS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center gap-2 px-4 py-3 bg-taupe-700 border-b border-taupe-400">
          <button onClick={() => setSidebarOpen((v) => !v)} className="text-taupe-200 hover:text-taupe-600 text-lg w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">☰</button>
          <span className="w-2 h-2 rounded-full bg-pink-200 ml-1"></span>
          <span className="text-sm font-medium text-white truncate">{active?.title}</span>
          {messages.length > 0 && <button onClick={exportChat} className="ml-auto text-xs text-taupe-200 hover:text-taupe-600 border border-gray-200 rounded-lg px-2.5 py-1 hover:bg-gray-50 transition-colors">Export</button>}
          {messages.length > 0 && <button onClick={() => updateMessages(active.id, [])} className="text-xs text-taupe-200 hover:text-taupe-600 border border-gray-200 rounded-lg px-2.5 py-1 hover:bg-gray-50 transition-colors">Clear</button>}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-4 max-w-2xl w-full mx-auto">
          {messages.length === 0 && (
            <div className="mt-16 flex flex-col items-center gap-4">
              <p className="text-sm text-taupe-400">Start a conversation below.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {STARTER_PROMPTS.map((p) => (
                  <button key={p} onClick={() => sendMessage(p)} className="text-xs text-taupe-700 border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-white hover:border-gray-300 transition-colors">{p}</button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`group flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="relative max-w-[70%]">
                <div className={`px-4 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-white border border-gray-200 rounded-2xl rounded-br-sm text-taupe-800" : "bg-gray-100 border border-gray-200 rounded-2xl rounded-bl-sm text-taupe-800"}`}>
                  {m.role === "assistant"
                    ? <ReactMarkdown className="prose prose-sm max-w-none prose-p:my-1 prose-pre:bg-taupe-800 prose-pre:text-taupe-100 prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:rounded">{m.content}</ReactMarkdown>
                    : m.content}
                </div>
                <button onClick={() => copyMessage(m.content, i)} className="absolute -bottom-5 right-0 opacity-0 group-hover:opacity-100 text-xs text-taupe-400 hover:text-gray-600 transition-opacity">
                  {copiedIndex === i ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-taupe-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-gray-200 bg-white px-5 py-4">
          {messages.length > 1 && !loading && (
            <div className="max-w-2xl mx-auto mb-2 flex justify-end">
              <button onClick={regenerate} className="text-xs text-taupe-400 hover:text-taupe-600 transition-colors">↺ Regenerate</button>
            </div>
          )}
          <div className="flex gap-3 max-w-2xl mx-auto items-end">
            <div className="relative flex-1">
              <textarea
                className="w-full resize-none bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-sm text-taupe-800 placeholder-taupe-400 focus:outline-none focus:border-gray-400 max-h-32"
                rows={1}
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <span className="absolute bottom-2.5 right-3 text-xs text-taupe-300">{input.length}</span>
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-full bg-taupe-900 flex items-center justify-center disabled:opacity-40 hover:bg-taupe-700 transition-colors flex-shrink-0"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}