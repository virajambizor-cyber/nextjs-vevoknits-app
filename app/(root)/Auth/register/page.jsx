// app/register/page.jsx
"use client";

import { useState } from "react";

/**
 * Validate GSTIN (basic pattern).
 * GSTIN is 15 characters: 2 digits (state) + 10-char PAN + 1 char entity + 'Z' + 1 checksum
 * This is a common validation pattern; still allow uppercase/lowercase and trim.
 */
function validateGST(gst) {
  if (!gst) return false;
  const re = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/i;
  return re.test(gst.trim());
}

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    mobile: "",
    gst: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ ok: null, msg: "" });

  function update(k, v) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.mobile.trim()) return "Please enter mobile number.";
    // basic mobile check (10 digits)
    if (!/^\d{10}$/.test(form.mobile.trim())) return "Enter a valid 10-digit mobile number.";
    if (!form.email.trim()) return "Please enter an email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "Enter a valid email.";
    if (!form.gst.trim()) return "Please enter GST number.";
    if (!validateGST(form.gst.trim())) return "Enter a valid GST number (format mismatch).";
    if (!form.message.trim()) return "Please add a short message about your requirement.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ ok: null, msg: "" });

    const err = validate();
    if (err) {
      setStatus({ ok: false, msg: err });
      return;
    }

    setLoading(true);

    try {
      // normalise payload: trim and uppercase GST
      const payload = {
        name: form.name.trim(),
        company: form.company.trim(),
        mobile: form.mobile.trim(),
        gst: form.gst.trim().toUpperCase(),
        email: form.email.trim(),
        message: form.message.trim(),
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // If response is JSON content-type, parse JSON safely.
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (res.ok) {
          setStatus({ ok: true, msg: "Registration submitted successfully. We'll be in touch soon." });
          setForm({ name: "", company: "", mobile: "", gst: "", email: "", message: "" });
        } else {
          // server returned JSON with an error
          setStatus({ ok: false, msg: data?.error || data?.message || "Server error. Try again later." });
        }
      } else {
        // Not JSON — read text so we can show useful info instead of crashing on res.json()
        const text = await res.text();
        // Common cause: Next returned an HTML error page (404/500) — show a friendly message
        const snippet = text.replace(/\s+/g, " ").slice(0, 400);
        console.error("Non-JSON response from /api/register:", snippet);
        setStatus({
          ok: false,
          msg:
            "Unexpected server response. It looks like the API route is not available or returned HTML. " +
            "Please confirm the API route exists at /app/api/register/route.js and the server is configured. " +
            "Details were logged to the console.",
        });
      }
    } catch (err) {
      console.error("submit error", err);
      setStatus({ ok: false, msg: "Network error. Try again later." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <h1 className="text-3xl font-bold mb-6">Register as Reseller / Partner</h1>

        {/* layout: horizontal on md+, stacked on mobile */}
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 md:grid-cols-[1fr_1fr] items-start"
          aria-label="Register Form"
        >
          {/* left column: fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full border rounded-md p-3"
                placeholder="Your full name"
                required
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                className="w-full border rounded-md p-3"
                placeholder="Company / Brand name"
                required
                autoComplete="organization"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
              <input
                type="tel"
                value={form.mobile}
                onChange={(e) => {
                  // keep digits only, max 10 digits
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  update("mobile", digits);
                }}
                className="w-full border rounded-md p-3"
                placeholder="10-digit mobile"
                required
                inputMode="numeric"
                autoComplete="tel"
              />
            </div>
          </div>

          {/* right column: GST, Email, Message, Submit */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GST Number *</label>
              <input
                type="text"
                value={form.gst}
                onChange={(e) => update("gst", e.target.value.toUpperCase().trim())}
                className="w-full border rounded-md p-3"
                placeholder="15-character GSTIN (e.g. 27ABCDE1234F1Z5)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full border rounded-md p-3"
                placeholder="name@company.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Message *</label>
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="w-full border rounded-md p-3 min-h-[110px]"
                placeholder="Tell us what you need — product types, quantities, timeline..."
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Registration"}
              </button>

              <div aria-live="polite" className="text-sm">
                {status.ok === true && <p className="text-green-600">{status.msg}</p>}
                {status.ok === false && <p className="text-red-600">{status.msg}</p>}
              </div>
            </div>
          </div>
        </form>

        <p className="mt-8 text-xs text-gray-500">
          By submitting you agree to be contacted by VevoKnits Garments. We will never share your data without permission.
        </p>
      </div>
    </main>
  );
}
