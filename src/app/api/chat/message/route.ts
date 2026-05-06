import { NextRequest, NextResponse } from "next/server";
import { normalizeLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export async function POST(request: NextRequest) {
  const { chat_id, content, locale: rawLocale } = await request.json();
  const apiKey = process.env.RETELL_API_KEY;
  const locale = normalizeLocale(rawLocale);
  const errors = getDictionary(locale).shared.apiErrors;

  if (!chat_id || !content || !apiKey) {
    return NextResponse.json(
      { error: errors.chatMissingParams },
      { status: 400 }
    );
  }

  const res = await fetch("https://api.retellai.com/create-chat-completion", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chat_id, content }),
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: res.status });
  }

  const agentMsg = data.messages?.find(
    (m: { role: string }) => m.role === "agent"
  );
  return NextResponse.json({
    content:
      agentMsg?.content ??
      data.messages?.[0]?.content ??
      errors.chatFallback,
  });
}
