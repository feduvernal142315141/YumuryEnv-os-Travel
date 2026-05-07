"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  Zap,
  Heart,
  MapPin,
  Package,
  Star,
  Clock,
} from "lucide-react";
import { matanzasMunicipalities } from "@/lib/mock-data/municipalities";

const ease = [0.16, 1, 0.3, 1] as const;

const values = [
  {
    icon: Shield,
    title: "Confianza",
    desc: "Tu pedido es sagrado. Lo cuidamos como si fuera nuestro.",
    color: "bg-brand-green-50 text-brand-green dark:bg-brand-green-900/20",
  },
  {
    icon: Eye,
    title: "Transparencia",
    desc: "Tracking con fotos en cada etapa. Sin sorpresas, sin excusas.",
    color: "bg-brand-yellow-50 text-brand-yellow-deep dark:bg-brand-yellow/10",
  },
  {
    icon: Zap,
    title: "Rapidez",
    desc: "Express en 3-5 días. Marítimo para lo grande. Siempre a tiempo.",
    color: "bg-brand-orange-50 text-brand-orange dark:bg-brand-orange/10",
  },
  {
    icon: Heart,
    title: "Cuidado",
    desc: "Empacamos con amor. Cada paquete lleva un pedacito de ti.",
    color: "bg-brand-red-50 text-brand-red dark:bg-brand-red/10",
  },
];

const team = [
  { name: "Ana Rodríguez", role: "Fundadora & CEO", location: "Miami", avatar: "👩🏻‍💼" },
  { name: "Carlos Hernández", role: "Dir. Logística", location: "Miami", avatar: "👨🏽‍💼" },
  { name: "Yanelis Pérez", role: "Atención al Cliente", location: "Miami", avatar: "👩🏽" },
  { name: "Roberto Díaz", role: "Coord. Entregas", location: "Matanzas", avatar: "👨🏻" },
  { name: "Lisandra Gómez", role: "Operaciones Cuba", location: "Matanzas", avatar: "👩🏽‍🔧" },
  { name: "Miguel Ángel Santos", role: "Desarrollo", location: "Miami", avatar: "👨🏻‍💻" },
];

const stats = [
  { value: "10,000+", label: "pedidos entregados", icon: Package },
  { value: "14", label: "municipios", icon: MapPin },
  { value: "4.9★", label: "valoración", icon: Star },
  { value: "24/7", label: "soporte", icon: Clock },
];

export default function SobreNosotrosPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(21,128,61,0.3), rgba(234,138,28,0.15), transparent)",
          }}
        />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-display-lg md:text-display-xl"
          >
            Conectamos familias entre{" "}
            <span className="text-gradient-brand">Miami y Matanzas</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className="mt-4 text-body-lg text-foreground-secondary"
          >
            Porque la distancia no debería ser un obstáculo para cuidar a los
            tuyos.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            <h2 className="text-h2">Nuestra misión</h2>
            <div className="mt-6 space-y-4 text-body-lg text-foreground-secondary leading-relaxed">
              <p>
                Yumury nació porque sabemos lo que significa estar lejos de tu
                familia. Cada domingo sin el cafecito con mamá, cada cumpleaños
                por videollamada, cada apagón sin poder hacer nada.
              </p>
              <p>
                Decidimos cambiarlo. Creamos un puente entre Miami y Matanzas
                — no solo un servicio de envíos, sino una forma de decir
                &ldquo;estoy aquí, aunque no estoy ahí.&rdquo;
              </p>
              <p>
                Cada paquete que enviamos lleva más que productos. Lleva el
                cariño de alguien que extraña, la preocupación de un hijo, el
                amor de una madre. Y eso lo cuidamos como si fuera nuestro.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
          >
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                alt="Familia compartiendo juntos"
                width={600}
                height={450}
                className="h-auto w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background-secondary py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-center"
          >
            <h2 className="text-h2">Nuestros valores</h2>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${v.color}`}
                >
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-h5">{v.title}</h3>
                <p className="mt-2 text-sm text-foreground-secondary">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Matanzas */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-center"
          >
            <h2 className="text-h2">Por qué Matanzas</h2>
            <p className="mt-2 text-foreground-secondary">
              Desde el Yumurí hasta Varadero. Conocemos cada municipio.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7"
          >
            {matanzasMunicipalities.map((m) => (
              <div
                key={m.value}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="truncate font-medium">{m.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-background-secondary py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-center"
          >
            <h2 className="text-h2">Nuestro equipo</h2>
            <p className="mt-2 text-foreground-secondary">
              Un equipo en dos orillas, unido por una misión.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card p-5 text-center"
              >
                <span className="text-4xl">{member.avatar}</span>
                <h4 className="mt-3 text-sm font-bold text-foreground">
                  {member.name}
                </h4>
                <p className="mt-0.5 text-xs text-foreground-secondary">
                  {member.role}
                </p>
                <p className="mt-1 text-xs text-primary font-medium">
                  {member.location}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-center"
          >
            <h2 className="text-h2">En números</h2>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <stat.icon className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-3 text-display-lg text-gradient-brand">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-foreground-secondary">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
