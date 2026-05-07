"use client";

import { useState, useCallback, useEffect } from "react";
import { nanoid } from "nanoid";
import type { YumiMessage } from "@/types";
import { findYumiResponse, yumiFallback } from "@/lib/mock-data/yumi-responses";

const STORAGE_KEY = "yumury-yumi-chat";

function loadMessages(): YumiMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMessages(messages: YumiMessage[]) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export function useYumiChat() {
  const [messages, setMessages] = useState<YumiMessage[]>(loadMessages);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    const userMsg: YumiMessage = {
      id: nanoid(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate thinking delay
    const delay = 800 + Math.random() * 700;
    await new Promise((r) => setTimeout(r, delay));

    const pattern = findYumiResponse(text);
    const response = pattern?.response;

    const text2 = response?.text || yumiFallback.text;
    const followUp = response && "followUp" in response ? response.followUp : undefined;
    const products = response && "products" in response ? response.products : undefined;
    const combos = response && "combos" in response ? response.combos : undefined;
    const suggestions = response?.suggestions || yumiFallback.suggestions;

    const assistantMsg: YumiMessage = {
      id: nanoid(),
      role: "assistant",
      content: text2 + (followUp ? `\n\n${followUp}` : ""),
      timestamp: new Date().toISOString(),
      productSlugs: products,
      comboSlugs: combos,
      suggestions,
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
  }, []);

  const reset = useCallback(() => {
    setMessages([]);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  return { messages, sendMessage, reset, isTyping };
}
