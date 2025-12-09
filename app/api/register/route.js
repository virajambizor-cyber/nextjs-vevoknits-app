// app/api/register/route.js
import nodemailer from "nodemailer";

/**
 * Basic GSTIN validation (India) - case insensitive.
 * Pattern explanation (simplified):
 *  - 2 digits (state code)
 *  - 5 letters (PAN part)
 *  - 4 digits
 *  - 1 letter
 *  - 1 alnum/entity code
 *  - "Z"
 *  - 1 checksum char (alnum)
 */
const GST_REGEX =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/i;

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  try {
    // Ensure JSON body
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return jsonResponse(
        { error: "Expected application/json content type." },
        400
      );
    }

    let body;
    try {
      body = await req.json();
    } catch (err) {
      console.error("[register] invalid JSON body:", err);
      return jsonResponse({ error: "Invalid JSON body." }, 400);
    }

    const { name, company, mobile, gst, email, message } = body || {};

    // Basic validation
    if (!name || String(name).trim().length < 2) {
      return jsonResponse({ error: "Name is required." }, 400);
    }
    if (!mobile || !/^\+?\d{7,15}$/.test(String(mobile).trim())) {
      // accept digits with optional leading +
      return jsonResponse(
        { error: "Valid mobile number is required (7-15 digits)." },
        400
      );
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(String(email).trim())) {
      return jsonResponse({ error: "Valid email is required." }, 400);
    }
    if (!company || String(company).trim().length < 1) {
      return jsonResponse({ error: "Company name is required." }, 400);
    }
    if (!gst || !GST_REGEX.test(String(gst).trim())) {
      return jsonResponse({ error: "Invalid GST number format." }, 400);
    }
    if (!message || String(message).trim().length < 3) {
      return jsonResponse({ error: "Message is required." }, 400);
    }

    // Build email content
    const safe = (v) =>
      String(v || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const htmlBody = `
      <h2>New Register Request</h2>
      <table cellpadding="6" cellspacing="0" border="0">
        <tr><td><strong>Name:</strong></td><td>${safe(name)}</td></tr>
        <tr><td><strong>Company:</strong></td><td>${safe(company)}</td></tr>
        <tr><td><strong>Mobile:</strong></td><td>${safe(mobile)}</td></tr>
        <tr><td><strong>GST:</strong></td><td>${safe(gst)}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${safe(email)}</td></tr>
        <tr><td valign="top"><strong>Message:</strong></td><td>${safe(message).replace(/\n/g, "<br/>")}</td></tr>
      </table>
      <p>Received at: ${new Date().toISOString()}</p>
    `;

    const textBody = `
New Register Request

Name: ${name}
Company: ${company}
Mobile: ${mobile}
GST: ${gst}
Email: ${email}

Message:
${message}

Received at: ${new Date().toISOString()}
`;

    // Read SMTP config from env
    const {
      NODEMAILER_HOST,
      NODEMAILER_PORT,
      NODEMAILER_EMAIL,
      NODEMAILER_PASSWORD,
    } = process.env;

    if (!NODEMAILER_HOST || !NODEMAILER_PORT || !NODEMAILER_EMAIL || !NODEMAILER_PASSWORD) {
      console.error("[register] missing NODEMAILER env vars", {
        NODEMAILER_HOST,
        NODEMAILER_PORT,
        NODEMAILER_EMAIL,
        hasPassword: !!NODEMAILER_PASSWORD,
      });
      return jsonResponse(
        { error: "Email server is not configured on the server." },
        500
      );
    }

    const transporter = nodemailer.createTransport({
      host: NODEMAILER_HOST,
      port: Number(NODEMAILER_PORT),
      secure: Number(NODEMAILER_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASSWORD,
      },
      tls: {
        // accept self-signed / dev certs (optional). remove in production if not needed.
        rejectUnauthorized: false,
      },
    });

    // send the mail
    const mailOptions = {
      from: `"Website Register" <${NODEMAILER_EMAIL}>`,
      to: NODEMAILER_EMAIL, // deliver to same inbox; change if you want other recipients
      subject: `New Register Request — ${safe(name)} (${safe(company)})`,
      text: textBody,
      html: htmlBody,
    };

    let info;
    try {
      info = await transporter.sendMail(mailOptions);
    } catch (mailErr) {
      console.error("[register] nodemailer send error:", mailErr);
      // If nodemailer throws, return a 502 or 500
      return jsonResponse(
        { error: "Failed to send email. Check email server configuration." },
        502
      );
    }

    // return success
    console.info("[register] email sent:", info?.messageId || info);
    return jsonResponse({ success: true, message: "Submitted successfully." }, 200);
  } catch (err) {
    // Last-resort failure - always return JSON
    console.error("[register] unexpected error:", err);
    return jsonResponse({ error: "Internal server error." }, 500);
  }
}
