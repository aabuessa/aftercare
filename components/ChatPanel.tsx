"use client";

import { FormEvent, useState } from "react";
import { PaperPlaneRight } from "@phosphor-icons/react/dist/ssr";
import { ThreadItem } from "@/lib/types";
import ChatBubble from "./ChatBubble";
import EscalationCard from "./EscalationCard";

export default function ChatPanel({
  items,
  onSend,
  isLoading,
}: {
  items: ThreadItem[];
  onSend: (message: string) => void;
  isLoading: boolean;
}) {
  const [draft, setDraft] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setDraft("");
  }

  return (
    <section className="flex h-full flex-col rounded-2xl bg-mint/50 p-4 shadow-soft sm:p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Check-In</h2>
        <p className="text-xs font-medium text-muted-foreground">AfterCare Companion &middot; AI care assistant</p>
      </div>
      <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
        {items.map((item, index) => (
          <div key={item.id} style={{ animationDelay: `${Math.min(index, 6) * 40}ms` }}>
            {item.kind === "bubble" ? (
              <ChatBubble message={item.message} />
            ) : (
              <EscalationCard result={item.result} date={item.date} />
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="animate-enter-up rounded-2xl bg-surface px-4 py-3 text-sm text-muted-foreground shadow-soft">
              Reviewing your update…
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="How are you feeling today?"
          disabled={isLoading}
          className="flex-1 rounded-lg border border-border bg-surface px-4 py-2 text-sm outline-none transition-shadow focus:shadow-soft disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-transform active:scale-[0.97] disabled:opacity-60"
        >
          <PaperPlaneRight size={18} weight="fill" />
        </button>
      </form>
    </section>
  );
}
