"use client";

import { motion } from "framer-motion";
import { X, Copy, MessageCircle, Mail, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

type Props = {
  publicTrackingId: string;
  recipientAlias: string;
  onClose: () => void;
};

export function ShareTrackingButton({ publicTrackingId, recipientAlias, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const trackingUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/tracking/${publicTrackingId}`;

  const whatsappMessage = encodeURIComponent(
    `¡Hola! Te envié un paquete desde Yumury. Sigue el envío aquí: ${trackingUrl}`
  );

  const emailSubject = encodeURIComponent("Tu paquete de Yumury está en camino");
  const emailBody = encodeURIComponent(
    `¡Hola ${recipientAlias}!\n\nTe envié un paquete. Puedes seguir el envío aquí:\n${trackingUrl}\n\nUn abrazo.`
  );

  const copyLink = async () => {
    await navigator.clipboard.writeText(trackingUrl);
    setCopied(true);
    toast.success("Link copiado ✓");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Compartir tracking</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-card-hover transition-colors"
          >
            <X className="h-4 w-4 text-foreground-muted" />
          </button>
        </div>

        <p className="mb-5 text-sm text-foreground-secondary">
          Comparte el link para que {recipientAlias} pueda ver el estado del envío.
        </p>

        <div className="space-y-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card-hover"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <MessageCircle className="h-4 w-4 text-green-600" />
            </div>
            Compartir por WhatsApp
          </a>

          {/* Email */}
          <a
            href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
            className="flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card-hover"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Mail className="h-4 w-4 text-blue-600" />
            </div>
            Enviar por email
          </a>

          {/* Copy link */}
          <button
            onClick={copyLink}
            className="flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card-hover"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
              {copied ? (
                <Check className="h-4 w-4 text-brand-green" />
              ) : (
                <Copy className="h-4 w-4 text-purple-600" />
              )}
            </div>
            {copied ? "¡Copiado!" : "Copiar link"}
          </button>
        </div>

        {/* URL preview */}
        <div className="mt-4 rounded-lg bg-background-secondary px-3 py-2">
          <p className="truncate text-xs text-foreground-muted font-mono">{trackingUrl}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
