"use client";

import { cn } from "@/lib/utils";
import type { YumiMessage as YumiMessageType } from "@/types";
import { Sparkles } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { YumiProductEmbed } from "./YumiProductEmbed";

type Props = {
  message: YumiMessageType;
  onSuggestionClick?: (text: string) => void;
};

export function YumiMessage({ message, onSuggestionClick }: Props) {
  const isUser = message.role === "user";
  const time = format(new Date(message.timestamp), "HH:mm", { locale: es });

  // Parse **bold** in text
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%]">
          <div className="rounded-2xl rounded-br-md bg-primary/10 px-4 py-2.5">
            <p className="text-sm text-foreground whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
          <p className="mt-1 text-right text-[10px] text-foreground-muted">{time}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-yellow to-brand-orange">
        <Sparkles className="h-3.5 w-3.5 text-white" />
      </div>
      <div className="max-w-[85%]">
        <div className="rounded-2xl rounded-bl-md border border-border bg-card px-4 py-2.5">
          <p className="text-sm text-foreground-secondary whitespace-pre-wrap leading-relaxed">
            {renderText(message.content)}
          </p>
        </div>

        {/* Product embeds */}
        {message.productSlugs && message.productSlugs.length > 0 && (
          <div className="mt-2 flex flex-col gap-1.5 overflow-x-auto">
            {message.productSlugs.map((slug) => (
              <YumiProductEmbed key={slug} slug={slug} name={slug.replace(/-/g, " ")} />
            ))}
          </div>
        )}

        {/* Combo embeds */}
        {message.comboSlugs && message.comboSlugs.length > 0 && (
          <div className="mt-2 flex flex-col gap-1.5">
            {message.comboSlugs.map((slug) => (
              <YumiProductEmbed key={slug} slug={slug} name={slug.replace(/-/g, " ")} />
            ))}
          </div>
        )}

        {/* Suggestions */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onSuggestionClick?.(suggestion)}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground-secondary transition-all hover:bg-primary/5 hover:border-primary/30 hover:text-primary"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <p className="mt-1 text-[10px] text-foreground-muted">{time}</p>
      </div>
    </div>
  );
}
