import { NextRequest, NextResponse } from "next/server";
import { normalizeLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export async function POST(request: NextRequest) {
  const { name, email, phone, country, message, locale: rawLocale } =
    await request.json();
  const locale = normalizeLocale(rawLocale);
  const errors = getDictionary(locale).shared.apiErrors;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: errors.contactMissingFields },
      { status: 400 }
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  const clientEmail = process.env.CLIENT_EMAIL ?? "contact@wamamed.com";

  if (!apiKey) {
    return NextResponse.json(
      { error: errors.contactServiceUnavailable },
      { status: 500 }
    );
  }

  const subject =
    locale === "fr"
      ? `Nouveau dossier de ${name} — WaMa Med`
      : `New case from ${name} — WaMa Med`;

  const labels =
    locale === "fr"
      ? {
          heading: "Nouvelle demande de coordination médicale",
          name: "Nom",
          email: "Email",
          phone: "Téléphone",
          country: "Pays",
          message: "Message",
          notProvided: "Non renseigné",
        }
      : {
          heading: "New medical coordination request",
          name: "Name",
          email: "Email",
          phone: "Phone",
          country: "Country",
          message: "Message",
          notProvided: "Not provided",
        };

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "WaMa Med — Site Web", email: "noreply@blynk.studio" },
      to: [{ email: clientEmail, name: "WaMa Med" }],
      replyTo: { email, name },
      subject,
      htmlContent: `
        <h2>${labels.heading}</h2>
        <p><strong>${labels.name}:</strong> ${name}</p>
        <p><strong>${labels.email}:</strong> ${email}</p>
        <p><strong>${labels.phone}:</strong> ${phone ?? labels.notProvided}</p>
        <p><strong>${labels.country}:</strong> ${country ?? labels.notProvided}</p>
        <hr />
        <p><strong>${labels.message}:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: errors.contactSendError },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
