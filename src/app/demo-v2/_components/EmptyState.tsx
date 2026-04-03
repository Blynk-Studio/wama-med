"use client";

import { Inbox } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = "Nothing here yet",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-2xl bg-stone/60 flex items-center justify-center mb-4">
        <Inbox className="w-5 h-5 text-ink-soft/40" strokeWidth={1.5} />
      </div>
      <p className="text-sm text-ink-soft/50 font-medium">{message}</p>
    </div>
  );
}
