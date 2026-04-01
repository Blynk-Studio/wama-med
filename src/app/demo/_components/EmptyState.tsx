"use client";

import { Inbox } from "lucide-react";

export function EmptyState({ message = "Aucun element a afficher" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-2xl bg-stone/60 flex items-center justify-center mb-3">
        <Inbox size={24} className="text-[var(--demo-muted)]" />
      </div>
      <p className="text-sm text-[var(--demo-muted)]">{message}</p>
    </div>
  );
}
