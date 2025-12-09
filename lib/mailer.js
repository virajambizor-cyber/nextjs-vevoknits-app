import nodemailer from "nodemailer";

function bool(v) { return String(v || "").toLowerCase() === "true"; }

export function getTransport() {
  // Prefer Gmail service if EMAIL is a gmail address
  if ((process.env.NODEMAILER_EMAIL || "").toLowerCase().includes("@gmail.com")) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        // MUST be a Gmail App Password (16 chars), not your login password
        pass: process.env.NODEMAILER_PASSWORD,
      },
      // Helps on some networks
      tls: { ciphers: "TLSv1.2" },
    });
  }

  // Generic SMTP (uses your exact env keys)
  const port = Number(process.env.NODEMAILER_PORT || 587);
  return nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,     // e.g. smtp.gmail.com / sandbox.smtp.mailtrap.io
    port,
    secure: port === 465,                  // true for 465, false for 587/25
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
    tls: { ciphers: "TLSv1.2" },
    // Force IPv4 if your system prefers ::1 and fails:
    family: 4,
  });
}

export async function sendMail({ to, subject, text, html }) {
  const transporter = getTransport();
  // Optional debugging while you test:
  // transporter.set('proxy_socks_module', true);
  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.NODEMAILER_EMAIL,
    to,
    subject,
    text,
    html,
  });
  return info;
}
