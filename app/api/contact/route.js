// app/api/contact/route.js
import nodemailer from "nodemailer";

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function envInfo() {
  // Return which env names are present (do not print secrets)
  return {
    foundSMTP_HOST: !!(process.env.SMTP_HOST || process.env.NODEMAILER_HOST),
    foundSMTP_PORT: !!(process.env.SMTP_PORT || process.env.NODEMAILER_PORT),
    foundSMTP_USER: !!(process.env.SMTP_USER || process.env.NODEMAILER_EMAIL || process.env.NODEMAILER_USER),
    foundSMTP_PASS: !!(process.env.SMTP_PASS || process.env.NODEMAILER_PASSWORD || process.env.NODEMAILER_PASS),
    foundVEVOK_TO: !!(process.env.VEVOKNITS_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  };
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      console.error("[/api/contact] invalid JSON body");
      return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const { name, email, phone = "", message } = body;
    if (!name || !email || !message) {
      console.warn("[/api/contact] missing fields:", { name, email, message });
      return new Response(JSON.stringify({ error: "Please provide name, email and message." }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Accept either SMTP_* or NODEMAILER_* env var names (your .env can use either)
    const SMTP_HOST = process.env.SMTP_HOST || process.env.NODEMAILER_HOST;
    const SMTP_PORT = process.env.SMTP_PORT || process.env.NODEMAILER_PORT;
    const SMTP_USER = process.env.SMTP_USER || process.env.NODEMAILER_EMAIL || process.env.NODEMAILER_USER;
    const SMTP_PASS = process.env.SMTP_PASS || process.env.NODEMAILER_PASSWORD || process.env.NODEMAILER_PASS;

    const VEVOKNITS_TO_EMAIL =
      process.env.VEVOKNITS_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "vevoknits@gmail.com";

    // quick diagnostic log (no secrets) to terminal
    console.info("[/api/contact] env presence:", envInfo());

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.error("[/api/contact] SMTP not configured. Missing env vars.");
      return new Response(JSON.stringify({ error: "Email server not configured on server." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const portNum = Number(SMTP_PORT) || 587;
    const secure = portNum === 465;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: portNum,
      secure,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // verify SMTP connection quickly (useful during development)
    try {
      await transporter.verify();
      console.info("[/api/contact] SMTP verify: OK");
    } catch (verifyErr) {
      console.error("[/api/contact] SMTP verify failed:", verifyErr && verifyErr.message ? verifyErr.message : verifyErr);
      return new Response(JSON.stringify({ error: "SMTP connection failed. Check server logs." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const html = `
      <h3>New contact form submission</h3>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `;

    const info = await transporter.sendMail({
      from: `"Website Contact" <${SMTP_USER}>`,
      to: VEVOKNITS_TO_EMAIL,
      subject: `Contact form: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
      html,
    });

    console.info(`[/api/contact] email sent: ${info.messageId} -> ${VEVOKNITS_TO_EMAIL}`);

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[/api/contact] unexpected error:", err && err.stack ? err.stack : err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
