"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { RetellWebClient } from "retell-client-js-sdk";

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
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const retellClientRef = useRef<RetellWebClient | null>(null);
  const getRetellClient = () => {
    if (!retellClientRef.current) retellClientRef.current = new RetellWebClient();
    return retellClientRef.current;
  };

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
            content:
              "Bonjour ! Je suis l'assistant Wama Med. Comment puis-je vous aider avec votre coordination médicale aujourd'hui ?",
          },
        ]);
        return data.chat_id;
      }
    } catch {
      // Fallback
    }
    return null;
  }, [chatId]);

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
          content:
            "Je ne peux pas me connecter pour le moment. Appelez-nous au +212 522 000 000.",
        },
      ]);
      setIsSending(false);
      return;
    }

    try {
      const res = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: id, content: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: data.content || "Je n'ai pas pu répondre. Veuillez réessayer.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: "Une erreur est survenue. Contactez-nous au +212 522 000 000.",
        },
      ]);
    }
    setIsSending(false);
  }, [input, isSending, ensureChatSession]);

  const startVoiceCall = useCallback(async () => {
    setVoiceState("connecting");
    try {
      const res = await fetch("/api/retell/create-call", { method: "POST" });
      const { access_token } = await res.json();
      const client = getRetellClient();
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
    getRetellClient().stopCall();
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
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Assistant Wama Med
          </p>
          <p className="text-brass text-xs">Disponible 24h/24</p>
        </div>
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="text-cream/50 hover:text-cream text-lg leading-none transition-colors"
              aria-label="Fermer l'assistant"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-dark flex-shrink-0" role="tablist" aria-label="Mode de contact">
        {(["chat", "voice"] as Tab[]).map((tab) => (
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
            {tab === "chat" ? "Chat" : "Voix"}
          </button>
        ))}
      </div>

      {/* Chat Tab */}
      {activeTab === "chat" && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.length === 0 && (
              <p className="text-ink/40 text-sm text-center py-4">
                Posez votre question sur la coordination médicale.
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
                        Voir le lien →
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
                placeholder="Votre question..."
                className="flex-1 bg-stone rounded-full px-4 py-2 text-sm text-ink placeholder-ink/30 outline-none focus:ring-1 focus:ring-teal/40 border border-stone-dark"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isSending}
                className="bg-teal disabled:opacity-40 hover:bg-teal-light text-cream text-sm font-medium px-4 py-2 rounded-full transition-colors"
                aria-label="Envoyer"
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
              className="text-ink font-bold mb-1"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              {voiceState === "idle" && "Parlez à notre assistant"}
              {voiceState === "connecting" && "Connexion en cours..."}
              {voiceState === "active" && "En communication"}
              {voiceState === "ending" && "Fin d'appel..."}
            </p>
            <p className="text-ink/50 text-sm">
              {voiceState === "idle" &&
                "Notre assistant répond en français 24h/24"}
              {voiceState === "active" &&
                "Parlez normalement — l'assistant vous écoute"}
            </p>
          </div>
          {voiceState === "idle" && (
            <button
              onClick={startVoiceCall}
              className="w-full bg-teal hover:bg-teal-light text-cream font-semibold py-3 rounded-full transition-colors"
            >
              Démarrer l'appel
            </button>
          )}
          {voiceState === "active" && (
            <button
              onClick={endVoiceCall}
              className="w-full bg-red-500/80 hover:bg-red-500 text-white font-semibold py-3 rounded-full transition-colors"
            >
              Terminer l'appel
            </button>
          )}
          {(voiceState === "connecting" || voiceState === "ending") && (
            <div className="w-full bg-ink/10 py-3 rounded-full text-center text-ink/40 text-sm">
              Veuillez patienter...
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
  const [isOpen, setIsOpen] = useState(false);

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

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center text-xl hover:scale-110 ${
          isOpen
            ? "bg-ink/80 text-cream"
            : "bg-teal hover:bg-teal-light text-cream"
        }`}
        aria-label={isOpen ? "Fermer l'assistant" : "Ouvrir l'assistant Wama Med"}
      >
        <span aria-hidden="true">{isOpen ? "×" : "💬"}</span>
      </button>
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
