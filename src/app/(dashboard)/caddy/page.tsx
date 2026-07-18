"use client";

import { useChat } from "ai/react";
import { Bot, Send, User, Sparkles, ShieldAlert, FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

const SUGGESTIONS = [
  { icon: ShieldAlert, text: "Analizar Term Sheet" },
  { icon: FileText, text: "Plantilla de NDA" },
  { icon: TrendingUp, text: "Estrategia Pre-Seed" },
];

export default function CaddyPage() {
  const { messages, append, isLoading } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    append({ role: "user", content: input });
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSuggestionClick = (text: string) => {
    setInput(text);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#040814] pt-4 px-4 pb-20 sm:pb-4">
      <div className="max-w-3xl w-full mx-auto flex flex-col h-full bg-slate-900/30 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-white font-bold">Swyng Caddy</h2>
              <p className="text-primary text-xs font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> IA Copilot (Premium)
              </p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <Bot className="w-16 h-16 text-slate-700 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Tu Abogado y Asesor de Bolsillo</h3>
              <p className="text-slate-400 mb-8 max-w-sm">
                Sube un contrato, pregúntame sobre term sheets o pídeme consejo para tu próxima ronda de inversión.
              </p>
              
              <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
                {SUGGESTIONS.map((s, i) => (
                  <Card 
                    key={i}
                    onClick={() => handleSuggestionClick(s.text)}
                    className="bg-slate-900/50 border-slate-800 hover:border-primary/50 cursor-pointer transition-colors p-3 flex items-center gap-3"
                  >
                    <s.icon className="w-5 h-5 text-slate-400 group-hover:text-primary" />
                    <span className="text-slate-300 font-medium text-sm">{s.text}</span>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((m) => (
                <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'user' ? 'bg-slate-800' : 'bg-primary/20 border border-primary/50'}`}>
                    {m.role === 'user' ? <User className="w-5 h-5 text-slate-300" /> : <Bot className="w-5 h-5 text-primary" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl p-4 ${m.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-slate-900/80 border border-slate-800 text-slate-300 rounded-tl-none'}`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/20 border border-primary/50">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl rounded-tl-none p-4 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-950/50 border-t border-slate-800">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregúntale a Caddy sobre contratos o startups..."
              className="bg-slate-900 border-slate-800 text-white h-12 focus-visible:ring-primary rounded-full px-5"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground p-0 flex-shrink-0">
              <Send className="w-5 h-5" />
            </Button>
          </form>
          <p className="text-[10px] text-center text-slate-500 mt-3 font-medium">
            Swyng Caddy puede cometer errores. Considera verificar la información legal.
          </p>
        </div>

      </div>
    </div>
  );
}
