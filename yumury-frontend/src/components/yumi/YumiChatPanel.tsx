"use client";

import { cn } from "@/lib/utils";
import { useUIStore } from "@/lib/stores/ui-store";
import { useYumiChat } from "@/lib/hooks/use-yumi-chat";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Sparkles, X, RotateCcw, SendHorizontal } from "lucide-react";
import { YumiMessage } from "./YumiMessage";
import { YumiTypingIndicator } from "./YumiTypingIndicator";

const INITIAL_SUGGESTIONS = [
  "Tengo $80 para mi mamá",
  "Necesito algo para los apagones",
  "Mi tía es diabética",
  "Quiero enviar una moto",
];

export function YumiChatPanel() {
  const yumiOpen = useUIStore((s) => s.yumiOpen);
  const setYumiOpen = useUIStore((s) => s.setYumiOpen);
  const { messages, sendMessage, reset, isTyping } = useYumiChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isTyping) return;
    setInput("");
    sendMessage(text);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (text: string) => {
    sendMessage(text);
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  // Get suggestions from last assistant message or use initial
  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === "assistant");
  const suggestions =
    messages.length === 0
      ? INITIAL_SUGGESTIONS
      : lastAssistantMsg?.suggestions || [];

  return (
    <AnimatePresence>
      {yumiOpen && (
        <>
          {/* Backdrop (mobile) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setYumiOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 sm:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed right-0 top-0 z-50 flex h-full flex-col bg-background border-l border-border shadow-xl",
              "w-full sm:w-[420px]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-yellow to-brand-orange">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Yumi</h3>
                  <p className="text-[11px] text-foreground-muted">Tu asistente para enviar</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={reset}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-card-hover hover:text-foreground"
                  title="Nueva conversación"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setYumiOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-card-hover hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-yellow/20 to-brand-orange/20 mb-4">
                    <Sparkles className="h-7 w-7 text-brand-orange" />
                  </div>
                  <p className="text-sm text-foreground-secondary leading-relaxed max-w-[280px]">
                    ¡Hola! Soy Yumi 👋 Te ayudo a armar el envío perfecto para
                    tu familia en Matanzas. ¿Qué necesitas hoy?
                  </p>
                </div>
              )}

              {messages.map((msg) => (
                <YumiMessage
                  key={msg.id}
                  message={msg}
                  onSuggestionClick={handleSuggestionClick}
                />
              ))}

              {isTyping && <YumiTypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && !isTyping && (
              <div className="border-t border-border px-4 py-2">
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestionClick(s)}
                      className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground-secondary transition-all hover:bg-primary/5 hover:border-primary/30 hover:text-primary whitespace-nowrap"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border px-4 py-3">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleTextareaInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe tu mensaje..."
                  rows={1}
                  className="flex-1 resize-none rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/50 max-h-[120px]"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all",
                    input.trim() && !isTyping
                      ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                      : "bg-foreground/5 text-foreground-muted"
                  )}
                >
                  <SendHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
