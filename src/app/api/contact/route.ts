import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, email, phone, country, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Champs requis manquants" },
      { status: 400 }
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  const clientEmail = process.env.CLIENT_EMAIL ?? "contact@wamamed.com";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Service email non configuré" },
      { status: 500 }
    );
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Wama Med — Site Web", email: "noreply@blynk.studio" },
      to: [{ email: clientEmail, name: "Wama Med" }],
      replyTo: { email, name },
      subject: `Nouveau dossier de ${name} — Wama Med`,
      htmlContent: `
        <h2>Nouvelle demande de coordination médicale</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone ?? "Non renseigné"}</p>
        <p><strong>Pays :</strong> ${country ?? "Non renseigné"}</p>
        <hr />
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
