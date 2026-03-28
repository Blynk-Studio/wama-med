import { NextResponse } from "next/server";

export async function POST() {
  const agentId = process.env.NEXT_PUBLIC_RETELL_AGENT_ID;
  const apiKey = process.env.RETELL_API_KEY;

  if (!agentId || !apiKey) {
    return NextResponse.json(
      { error: "Retell configuration manquante" },
      { status: 500 }
    );
  }

  const res = await fetch("https://api.retellai.com/v2/create-web-call", {
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

  return NextResponse.json({ access_token: data.access_token });
}
