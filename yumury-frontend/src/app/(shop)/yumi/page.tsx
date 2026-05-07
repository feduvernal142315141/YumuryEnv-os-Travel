"use client";

import { useYumiChat } from "@/lib/hooks/use-yumi-chat";
import { YumiMessage } from "@/components/yumi/YumiMessage";
import { YumiTypingIndicator } from "@/components/yumi/YumiTypingIndicator";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Sparkles, SendHorizontal, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const INITIAL_SUGGESTIONS = [
  "Tengo $80 para mi mamá",
  "Necesito algo para los apagones",
  "Mi tía es diabética",
  "Combo familiar para 4 personas",
  "Quiero enviar una moto",
  "¿Cuánto demora el envío?",
];

export default function YumiPage() {
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

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === "assistant");
  const suggestions =
    messages.length === 0
      ? INITIAL_SUGGESTIONS
      : lastAssistantMsg?.suggestions || [];

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Link href="/" className="text-foreground-muted hover:text-foreground transition-colors sm:hidden">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-yellow to-brand-orange">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-base font-semibold text-foreground">Yumi</h1>
          <p className="text-xs text-foreground-muted">Tu asistente para enviar a Matanzas</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-12 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-yellow/20 to-brand-orange/20 mb-5">
              <Sparkles className="h-9 w-9 text-brand-orange" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">¡Hola! Soy Yumi 👋</h2>
            <p className="text-sm text-foreground-secondary max-w-sm leading-relaxed">
              Te ayudo a armar el envío perfecto para tu familia en Matanzas.
              Cuéntame qué necesitas y te recomiendo productos, combos y la mejor opción de envío.
            </p>
          </motion.div>
        )}

        {messages.map((msg) => (
          <YumiMessage
            key={msg.id}
            message={msg}
            onSuggestionClick={(text) => sendMessage(text)}
          />
        ))}

        {isTyping && <YumiTypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && !isTyping && (
        <div className="border-t border-border px-4 py-2">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="shrink-0 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground-secondary transition-all hover:bg-primary/5 hover:border-primary/30 hover:text-primary whitespace-nowrap"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..."
            rows={1}
            className="flex-1 resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/50 max-h-[120px]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all",
              input.trim() && !isTyping
                ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                : "bg-foreground/5 text-foreground-muted"
            )}
          >
            <SendHorizontal className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
