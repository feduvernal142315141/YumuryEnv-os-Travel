"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ease = [0.16, 1, 0.3, 1] as const;

const channels = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+1 (786) 555-0123",
    desc: "Respuesta inmediata",
    href: "https://wa.me/17865550123",
    color: "bg-brand-green-50 text-brand-green dark:bg-brand-green-900/20",
  },
  {
    icon: Mail,
    title: "Email",
    value: "hola@yumuryenvios.com",
    desc: "Respuesta en 24h",
    href: "mailto:hola@yumuryenvios.com",
    color: "bg-brand-yellow-50 text-brand-yellow-deep dark:bg-brand-yellow/10",
  },
  {
    icon: Phone,
    title: "Teléfono",
    value: "+1 (786) 555-0100",
    desc: "Lun-Vie 9am-6pm",
    href: "tel:+17865550100",
    color: "bg-brand-orange-50 text-brand-orange dark:bg-brand-orange/10",
  },
];

export default function ContactoPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "pedido",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Mensaje enviado. Te responderemos pronto.");
    setFormState({ name: "", email: "", subject: "pedido", message: "" });
    setSending(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="text-center"
      >
        <h1 className="text-h1 md:text-display-lg">Contacto</h1>
        <p className="mt-2 text-body-lg text-foreground-secondary">
          Estamos aquí para ayudarte
        </p>
      </motion.div>

      {/* Contact channels */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {channels.map((ch, i) => (
          <motion.a
            key={ch.title}
            href={ch.href}
            target={ch.href.startsWith("http") ? "_blank" : undefined}
            rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease, delay: i * 0.08 }}
            className="group rounded-2xl border border-border bg-card p-6 text-center transition-all hover:shadow-lg hover:scale-[1.02]"
          >
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${ch.color}`}
            >
              <ch.icon className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-h5">{ch.title}</h3>
            <p className="mt-1 text-sm font-medium text-primary">{ch.value}</p>
            <p className="mt-1 text-xs text-foreground-muted">{ch.desc}</p>
          </motion.a>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <h2 className="text-h3">Envíanos un mensaje</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, name: e.target.value }))
                  }
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, email: e.target.value }))
                  }
                  className="mt-1.5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Asunto</Label>
              <select
                id="subject"
                value={formState.subject}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, subject: e.target.value }))
                }
                className="mt-1.5 w-full rounded-xl border border-input-border bg-input px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="pedido">Pedido</option>
                <option value="tracking">Tracking</option>
                <option value="producto">Producto</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <Label htmlFor="message">Mensaje</Label>
              <textarea
                id="message"
                required
                rows={5}
                value={formState.message}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, message: e.target.value }))
                }
                className="mt-1.5 w-full rounded-xl border border-input-border bg-input px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            <Button type="submit" disabled={sending} className="w-full sm:w-auto">
              <Send className="h-4 w-4" />
              {sending ? "Enviando..." : "Enviar mensaje"}
            </Button>
          </form>
        </motion.div>

        {/* Info sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="space-y-6"
        >
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-h6">Dirección</h3>
            </div>
            <p className="mt-2 text-sm text-foreground-secondary">
              1234 SW 8th Street
              <br />
              Miami, FL 33135
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-h6">Horario</h3>
            </div>
            <p className="mt-2 text-sm text-foreground-secondary">
              Lunes a Viernes
              <br />
              9:00 AM - 6:00 PM EST
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
