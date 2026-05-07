"use client";

import { cn } from "@/lib/utils";
import type { TrackingEvent } from "@/types";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import {
  Check,
  Clock,
  Package,
  Truck,
  Shield,
  MapPin,
  Warehouse,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import { TrackingPhotos } from "./TrackingPhotos";

const STATUS_ICONS: Record<string, React.ElementType> = {
  pending: Clock,
  confirmed: CheckCircle2,
  preparing: Package,
  shipped: Truck,
  "in-customs": Shield,
  "in-warehouse": Warehouse,
  "out-for-delivery": MapPin,
  delivered: CheckCircle2,
};

type Props = {
  events: TrackingEvent[];
};

export function TrackingTimeline({ events }: Props) {
  const [lightboxPhoto, setLightboxPhoto] = useState<{
    url: string;
    caption?: string;
  } | null>(null);

  return (
    <>
      <div className="relative ml-2 sm:ml-0">
        {events.map((event, i) => (
          <TimelineEvent
            key={event.id}
            event={event}
            index={i}
            isLast={i === events.length - 1}
            onPhotoClick={(url, caption) => setLightboxPhoto({ url, caption })}
          />
        ))}
      </div>

      {lightboxPhoto && (
        <TrackingPhotos
          photos={[{ url: lightboxPhoto.url, caption: lightboxPhoto.caption }]}
          onClose={() => setLightboxPhoto(null)}
        />
      )}
    </>
  );
}

function TimelineEvent({
  event,
  index,
  isLast,
  onPhotoClick,
}: {
  event: TrackingEvent;
  index: number;
  isLast: boolean;
  onPhotoClick: (url: string, caption?: string) => void;
}) {
  const Icon = STATUS_ICONS[event.status] || Clock;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-4 pb-8 last:pb-0"
    >
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-[23px] top-12 bottom-0 w-0.5">
          <div
            className={cn(
              "h-full w-full",
              event.isCompleted
                ? "bg-brand-green"
                : "border-l-2 border-dashed border-border"
            )}
          />
        </div>
      )}

      {/* Circle */}
      <div className="relative z-10 shrink-0">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            event.isCompleted && !event.isCurrent &&
              "bg-brand-green text-white",
            event.isCurrent &&
              "bg-brand-green text-white ring-4 ring-brand-green/20",
            !event.isCompleted && !event.isCurrent &&
              "border-2 border-dashed border-border bg-card text-foreground-muted"
          )}
        >
          {event.isCompleted && !event.isCurrent ? (
            <Check className="h-5 w-5" />
          ) : (
            <Icon className="h-5 w-5" />
          )}
        </div>

        {/* Pulse animation for current */}
        {event.isCurrent && (
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-green/30" />
        )}
      </div>

      {/* Event card */}
      <div className="flex-1 min-w-0 pt-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4
              className={cn(
                "text-sm font-semibold",
                event.isCurrent ? "text-brand-green" : "text-foreground"
              )}
            >
              {event.title}
            </h4>
            <p className="mt-0.5 text-sm text-foreground-secondary">
              {event.description}
            </p>
          </div>
          {event.estimated && (
            <span className="shrink-0 rounded-full bg-foreground/5 px-2 py-0.5 text-xs text-foreground-muted">
              Estimado
            </span>
          )}
        </div>

        <p className="mt-1.5 text-xs text-foreground-muted">
          {event.location} ·{" "}
          {format(new Date(event.timestamp), "d MMM HH:mm", { locale: es })}
        </p>

        {/* Photo */}
        {event.photo && (
          <button
            onClick={() => onPhotoClick(event.photo!, event.photoCaption)}
            className="mt-3 group relative overflow-hidden rounded-lg border border-border"
          >
            <img
              src={event.photo}
              alt={event.photoCaption || "Foto del envío"}
              className="h-20 w-28 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
              <ImageIcon className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        )}
        {event.photo && event.photoCaption && (
          <p className="mt-1 text-xs italic text-foreground-muted">
            {event.photoCaption}
          </p>
        )}
      </div>
    </motion.div>
  );
}
