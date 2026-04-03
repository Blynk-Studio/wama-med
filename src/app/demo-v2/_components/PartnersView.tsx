"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Hotel,
  Car,
  Stethoscope,
  Star,
  Phone,
  MapPin,
  Briefcase,
} from "lucide-react";
import { useV2Data } from "../_hooks/use-v2-data";
import type { PartnerType, PartnerStatus } from "../_lib/types";
import { getPartnerColor } from "../_lib/utils";
import { Badge } from "./Badge";

const TYPE_CONFIG: Record<
  PartnerType,
  { label: string; icon: typeof Building2 }
> = {
  clinic: { label: "Clinic", icon: Building2 },
  hotel: { label: "Hotel", icon: Hotel },
  transport: { label: "Transport", icon: Car },
  doctor: { label: "Doctor", icon: Stethoscope },
};

const STATUS_LABELS: Record<PartnerStatus, string> = {
  active: "Active",
  review: "Under Review",
  inactive: "Inactive",
};

/* ─── Stagger ─── */
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function PartnersView() {
  const { partners } = useV2Data();

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-fraunces text-3xl md:text-4xl font-bold text-ink tracking-tight mb-2">
          Partners
        </h1>
        <p className="text-base text-ink-soft/60">
          Clinics, doctors, hotels, and transport services
        </p>
      </div>

      {/* Partner grid */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {partners.map((partner) => {
          const typeConfig = TYPE_CONFIG[partner.type];
          const Icon = typeConfig.icon;
          const statusColor = getPartnerColor(partner.status);

          return (
            <motion.div
              key={partner.id}
              variants={cardVariants}
              className="v2-card p-6"
            >
              {/* Type icon + name */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-teal/8 flex items-center justify-center flex-shrink-0">
                  <Icon
                    className="w-6 h-6 text-teal"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-ink truncate">
                    {partner.name}
                  </h3>
                  <span className="text-xs text-ink-soft/70 font-medium">
                    {typeConfig.label}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-2 text-sm text-ink-soft/70">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>{partner.city}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-ink-soft/70">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>{partner.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-ink-soft/70">
                  <Briefcase className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>
                    {partner.activeCases} active case
                    {partner.activeCases !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Footer: rating + status */}
              <div className="flex items-center justify-between pt-3 border-t border-[rgba(28,20,16,0.05)]">
                <div className="flex items-center gap-1">
                  <Star
                    className="w-3.5 h-3.5 text-brass"
                    fill="#B8903A"
                    strokeWidth={0}
                  />
                  <span className="text-xs font-semibold text-ink-soft/70">
                    {partner.rating}
                  </span>
                </div>
                <Badge
                  label={STATUS_LABELS[partner.status]}
                  color={statusColor.text}
                  bg={statusColor.bg}
                  dot
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
