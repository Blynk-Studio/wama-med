"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocaleDictionary } from "@/components/ui/LocaleProvider";

type Tab = "chat" | "voice";
type VoiceState = "idle" | "connecting" | "active" | "ending";

interface Message {
  role: "user" | "agent";
  content: string;
}

function AIWidgetPanel({
  isOpen,
  onClose,
  className,
}: {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("voice");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const retellClientRef = useRef<any>(null);
  const { locale, dictionary } = useLocaleDictionary();
  const assistant = dictionary.assistant;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, []);

  useEffect(() => {
    if (messages.length > 1) scrollToBottom();
  }, [messages, scrollToBottom]);

  const ensureChatSession = useCallback(async (): Promise<string | null> => {
    if (chatId) return chatId;
    try {
      const res = await fetch("/api/chat/start", { method: "POST" });
      const data = await res.json();
      if (data.chat_id) {
        setChatId(data.chat_id);
        setMessages([
          {
            role: "agent",
            content: assistant.greeting,
          },
        ]);
        return data.chat_id;
      }
    } catch {
      // Fallback
    }
    return null;
  }, [assistant.greeting, chatId]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isSending) return;
    const userMsg = input.trim();
    setInput("");
    setIsSending(true);

    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);

    const id = await ensureChatSession();
    if (!id) {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: assistant.unavailable,
        },
      ]);
      setIsSending(false);
      return;
    }

    try {
      const res = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: id, content: userMsg, locale }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: data.content || assistant.responseError,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: assistant.sendError,
        },
      ]);
    }
    setIsSending(false);
  }, [assistant.responseError, assistant.sendError, assistant.unavailable, ensureChatSession, input, isSending, locale]);

  const startVoiceCall = useCallback(async () => {
    setVoiceState("connecting");
    try {
      const res = await fetch("/api/retell/create-call", { method: "POST" });
      const { access_token } = await res.json();
      // Dynamic import — keeps the 110KB Retell SDK off the critical path
      if (!retellClientRef.current) {
        const { RetellWebClient } = await import("retell-client-js-sdk");
        retellClientRef.current = new RetellWebClient();
      }
      const client = retellClientRef.current;
      await client.startCall({
        accessToken: access_token,
        sampleRate: 24000,
      });
      setVoiceState("active");
      client.on("call_ended", () => setVoiceState("idle"));
    } catch {
      setVoiceState("idle");
    }
  }, []);

  const endVoiceCall = useCallback(async () => {
    setVoiceState("ending");
    retellClientRef.current?.stopCall();
    setTimeout(() => setVoiceState("idle"), 500);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className={`bg-cream rounded-2xl shadow-2xl shadow-teal/20 border border-stone-dark flex flex-col overflow-hidden ${className ?? ""}`}
      style={{ maxHeight: "80vh" }}
    >
      {/* Header */}
      <div className="bg-teal px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div>
          <p
            className="text-cream text-sm font-bold"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {assistant.headerTitle}
          </p>
          <p className="text-brass text-xs">{assistant.availability}</p>
        </div>
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="text-cream/50 hover:text-cream text-lg leading-none transition-colors"
              aria-label={assistant.closeAria}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-dark flex-shrink-0" role="tablist" aria-label={assistant.tabAria}>
        {(["voice", "chat"] as Tab[]).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "text-teal border-b-2 border-teal"
                : "text-ink/40 hover:text-ink/60"
            }`}
          >
            <span aria-hidden="true">{tab === "chat" ? "💬" : "🎙"}</span>{" "}
            {tab === "chat" ? assistant.tabs.chat : assistant.tabs.voice}
          </button>
        ))}
      </div>

      {/* Chat Tab */}
      {activeTab === "chat" && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.length === 0 && (
              <p className="text-ink/40 text-sm text-center py-4">
                {assistant.emptyChat}
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-teal text-cream"
                      : "bg-stone-dark text-ink"
                  }`}
                  style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
                >
                  {msg.content.split(/(https?:\/\/[^\s]+)/g).map((part, idx) =>
                    /^https?:\/\//.test(part) ? (
                      <a
                        key={idx}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline opacity-80 hover:opacity-100"
                      >
                        {assistant.linkLabel}
                      </a>
                    ) : (
                      part
                    )
                  )}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="bg-stone-dark text-ink/50 text-sm px-3.5 py-2.5 rounded-2xl">
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: "0ms" }}>·</span>
                    <span className="animate-bounce" style={{ animationDelay: "150ms" }}>·</span>
                    <span className="animate-bounce" style={{ animationDelay: "300ms" }}>·</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-stone-dark flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder={assistant.inputPlaceholder}
                className="flex-1 bg-stone rounded-full px-4 py-2 text-sm text-ink placeholder-ink/30 outline-none focus:ring-1 focus:ring-teal/40 border border-stone-dark"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isSending}
                className="bg-teal disabled:opacity-40 hover:bg-teal-light text-cream text-sm font-medium px-4 py-2 rounded-full transition-colors"
                aria-label={assistant.sendAria}
              >
                →
              </button>
            </div>
          </div>
        </>
      )}

      {/* Voice Tab */}
      {activeTab === "voice" && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-300 ${
              voiceState === "active"
                ? "bg-brass/20 border-2 border-brass animate-pulse"
                : "bg-teal/10 border-2 border-teal/20"
            }`}
            aria-hidden="true"
          >
            🎙
          </div>
          <div className="text-center">
            <p
              className="text-ink font-semibold mb-1"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {voiceState === "idle" && assistant.voice.idleTitle}
              {voiceState === "connecting" && assistant.voice.connectingTitle}
              {voiceState === "active" && assistant.voice.activeTitle}
              {voiceState === "ending" && assistant.voice.endingTitle}
            </p>
            <p className="text-ink/50 text-sm">
              {voiceState === "idle" && assistant.voice.idleDescription}
              {voiceState === "active" && assistant.voice.activeDescription}
            </p>
          </div>
          {voiceState === "idle" && (
            <button
              onClick={startVoiceCall}
              className="w-full bg-teal hover:bg-teal-light text-cream font-semibold py-3 rounded-full transition-colors"
            >
              {assistant.voice.startCall}
            </button>
          )}
          {voiceState === "active" && (
            <button
              onClick={endVoiceCall}
              className="w-full bg-red-500/80 hover:bg-red-500 text-white font-semibold py-3 rounded-full transition-colors"
            >
              {assistant.voice.endCall}
            </button>
          )}
          {(voiceState === "connecting" || voiceState === "ending") && (
            <div className="w-full bg-ink/10 py-3 rounded-full text-center text-ink/40 text-sm">
              {assistant.voice.waiting}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Floating Widget Button + Panel (Placement 1)
   ────────────────────────────────────────────────────────── */
export function AIWidget() {
  const { dictionary } = useLocaleDictionary();
  const [isOpen, setIsOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [labelDismissed, setLabelDismissed] = useState(false);

  useEffect(() => {
    if (isOpen || labelDismissed) return;
    const timer = setTimeout(() => setShowLabel(true), 2000);
    return () => clearTimeout(timer);
  }, [isOpen, labelDismissed]);

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowLabel(false);
      setLabelDismissed(true);
    }
  };

  return (
    <>
      {/* Floating Panel — mobile full width, desktop 380px */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 left-4 sm:left-auto sm:w-[380px] z-50"
          style={{ maxHeight: "80vh" }}
        >
          <AIWidgetPanel
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            className="w-full h-full"
          />
        </div>
      )}

      {/* "Discutez maintenant" pill label */}
      {showLabel && !isOpen && (
        <div
          className="fixed bottom-7 right-[5.25rem] z-50 animate-[fadeSlideIn_0.4s_ease-out_forwards]"
        >
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold shadow-lg whitespace-nowrap"
            style={{
              background: "#FFFFFF",
              color: "#1C1410",
              border: "1px solid rgba(23,59,99,0.15)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--color-brass)" }}
            />
            {dictionary.assistant.label}
          </span>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleClick}
        className={`fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center text-xl hover:scale-110 ${
          isOpen
            ? "bg-ink/80 text-cream"
            : "bg-teal hover:bg-teal-light text-cream"
        }`}
        aria-label={isOpen ? dictionary.assistant.closeAria : dictionary.assistant.openAria}
      >
        <span aria-hidden="true">{isOpen ? "×" : "💬"}</span>
        {/* Pulsing green live indicator */}
        {!isOpen && (
          <span
            className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-teal"
            style={{ background: "var(--color-brass)" }}
          >
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "var(--color-brass)", opacity: 0.5 }}
            />
          </span>
        )}
      </button>

      {/* Keyframe for label fade-slide-in */}
      <style jsx global>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

/* ──────────────────────────────────────────────────────────
   Inline Panel (Placement 2 — homepage, Placement 3 — contact)
   ────────────────────────────────────────────────────────── */
export function AIWidgetInline() {
  return (
    <div className="w-full max-w-sm mx-auto sm:max-w-none">
      <AIWidgetPanel isOpen={true} className="w-full" />
    </div>
  );
}
