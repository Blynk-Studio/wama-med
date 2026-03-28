import { NextResponse } from "next/server";

export async function POST() {
  const agentId = process.env.NEXT_PUBLIC_RETELL_CHAT_AGENT_ID;
  const apiKey = process.env.RETELL_API_KEY;

  if (!agentId || !apiKey) {
    return NextResponse.json(
      { error: "Configuration chat manquante" },
      { status: 500 }
    );
  }

  const res = await fetch("https://api.retellai.com/create-chat", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ agent_id: agentId }),
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: res.status });
  }

  return NextResponse.json({ chat_id: data.chat_id });
}
