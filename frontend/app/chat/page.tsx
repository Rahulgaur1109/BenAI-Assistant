"use client";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hello. I am BenAI, your assistant for Bennett University. I can help you with:\n\n• Professor information (cabin locations, office hours, phone numbers)\n• Campus locations (hostels, food spots, sports facilities)\n• Academic calendar (exam dates, holidays, deadlines)\n• Events and university information\n\nWhat would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const newMsgs = [...messages, { role: "user", text: input } as Msg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    
    try {
      const res = await fetch("/api/proxy/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json().catch(() => ({}));
      const reply = data?.reply || data?.message || "Sorry, something went wrong.";
      setMessages([...newMsgs, { role: "assistant", text: reply }]);
    } catch (error) {
      setMessages([...newMsgs, { role: "assistant", text: "Sorry, I'm having trouble connecting. Please try again." }]);
    }
    
    setLoading(false);
  }

  const quickQuestions = [
    "Where is Mr. Ravikant Tyagi's Cabin?",
    "Show me Computer Science professors",
    "Where is the tuck shop?",
    "When is the next exam?",
    "Where can I find the gym?"
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="card-enhanced p-8 text-center animate-slide-in-down">
        <h1 className="text-4xl font-bold gradient-text mb-3">AI Assistant</h1>
        <p className="text-gray-300 text-lg">Your intelligent companion for Bennett University</p>
      </div>

      {/* Chat Container */}
      <div className="card p-0 overflow-hidden flex flex-col flex-1 animate-scale-in shadow-2xl" style={{ minHeight: "400px" }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-transparent">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-slide-in-up`}>
              <div className={`max-w-[80%] ${
                m.role === "user" 
                  ? "message-user" 
                  : "message-assistant"
              }`}>
                <div className="flex items-start gap-3">
                  {m.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg animate-float">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap leading-relaxed text-sm">{m.text}</div>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-slide-in-up">
              <div className="message-assistant flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: "0s" }}></div>
                  <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
                <span className="text-sm text-gray-400">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && !loading && (
          <div className="px-6 pb-6 border-t border-white/5 bg-gradient-to-t from-white/5 to-transparent">
            <div className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wide">Suggested questions</div>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setInput(q)}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/40 hover:to-purple-500/40 border border-indigo-500/30 text-xs text-indigo-200 hover:text-indigo-100 transition-all duration-300 transform hover:scale-105"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-5 border-t border-white/10 bg-gradient-to-t from-white/5 to-transparent">
          <div className="chat-input-wrapper flex gap-3">
            <input 
              className="input flex-1 focus:shadow-xl focus:shadow-indigo-500/30" 
              placeholder="Ask about professors, campus locations, events..." 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === "Enter" && send()}
              disabled={loading}
            />
            <button 
              className="btn-primary px-6 hover:shadow-xl hover:shadow-indigo-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              onClick={send}
              disabled={loading}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
