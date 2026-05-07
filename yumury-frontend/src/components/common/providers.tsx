"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "./query-provider";
import { YumiButton } from "@/components/yumi/YumiButton";
import { YumiChatPanel } from "@/components/yumi/YumiChatPanel";

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
  timeZone?: string;
};

export function Providers({ children, locale, messages, timeZone }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
        <QueryProvider>
          <TooltipProvider delayDuration={150}>
            {children}
            <YumiButton />
            <YumiChatPanel />
            <Toaster />
          </TooltipProvider>
        </QueryProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
