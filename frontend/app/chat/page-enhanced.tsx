"use client";
import { useState, useRef, useEffect } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import FloatingActionButton from "@/components/FloatingActionButton";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "👋 Hello! I'm BenAI, your assistant for Bennett University. I can help you with:\n\n• Professor information (cabin locations, office hours, phone numbers)\n• Campus locations (hostels, food spots, sports facilities)\n• Academic calendar (exam dates, holidays, deadlines)\n• Events and university information\n\nWhat would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showQuickActions, setShowQuickActions] = useState(false);

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

  const clearChat = () => {
    setMessages([{
      role: "assistant",
      text: "👋 Chat cleared! Ready for new questions."
    }]);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 h-[calc(100vh-120px)] flex flex-col relative">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Header */}
      <div className="card-enhanced p-8 text-center animate-slide-in-down glass-primary">
        <h1 className="text-4xl font-bold text-gradient mb-3">🤖 AI Assistant</h1>
        <p className="text-gray-300 text-lg blur-in">Your intelligent companion for Bennett University</p>
      </div>

      {/* Chat Container */}
      <div className="card p-0 overflow-hidden flex flex-col flex-1 animate-scale-in shadow-2xl glass-primary" style={{ minHeight: "400px" }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-transparent">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} expand-in`} style={{ animationDelay: `${i * 0.05}s` }}>
              <div className={`max-w-[80%] group ${
                m.role === "user" 
                  ? "message-user hover:shadow-xl" 
                  : "message-assistant hover:bg-white/8"
              } hover:scale-105 transition-all duration-300`}>
                <div className="flex items-start gap-3">
                  {m.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg animate-float hover:animate-glow transition-all">
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
            <div className="flex justify-start expand-in">
              <div className="message-assistant flex items-center gap-2 glass-primary px-5 py-3 rounded-3xl">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: "0s" }}></div>
                  <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
                <span className="text-sm text-gray-400 ml-2">AI is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && !loading && (
          <div className="px-6 pb-6 border-t border-white/5 bg-gradient-to-t from-white/5 to-transparent">
            <div className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-widest">💡 Try asking:</div>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setInput(q)}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/40 hover:to-purple-500/40 border border-indigo-500/30 text-xs text-indigo-200 hover:text-indigo-100 transition-all duration-300 transform hover:scale-110 hover-slide-right active:scale-95"
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
              className="input flex-1 focus:shadow-xl focus:shadow-indigo-500/30 btn-micro" 
              placeholder="Ask about professors, campus locations, events..." 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === "Enter" && send()}
              disabled={loading}
            />
            <button 
              className="btn-primary px-6 hover:shadow-xl hover:shadow-indigo-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all btn-micro icon-spin"
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

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <FloatingActionButton
          icon="🗑️"
          label="Clear Chat"
          onClick={clearChat}
          className="hover:shadow-xl hover:shadow-red-500/30"
        />
      </div>
    </div>
  );
}
