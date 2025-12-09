// app/contact/page.jsx
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success"|"error", message: "" }

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);

    // simple client validation
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", message: "Please fill name, email and message." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Thanks — your message was sent." });
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        const json = await res.json().catch(() => ({}));
        setStatus({
          type: "error",
          message: json?.error || "Could not send message. Try again later.",
        });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Network error. Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <section className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">
            Contact Us
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            We're here to help you build better blanks.
          </h1>
        </div>
      </section>

      {/* CONTACT + FORM */}
      <section className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-12">
        {/* LEFT – Contact Details */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Visit Us</h2>

          <p className="text-gray-700 font-medium mb-2">Vevoknits Garments</p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            #63, MVS Building (Opp. BMTC),<br />
            K.H (Double Road), ShanthiNagar Main Road,<br />
            Bangalore – 560027
          </p>

          <p className="text-gray-600 mb-2">
            <strong>Business Hours:</strong> Mon–Sat, 10:00–18:00 IST
          </p>

          <p className="text-gray-700 mb-2">
            <strong>WhatsApp:</strong>{" "}
            <a
              href="https://wa.me/918710000817"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              +91 87100 00817
            </a>
          </p>

          <p className="text-gray-700">
            <strong>Email:</strong>{" "}
            <a href="mailto:sales@vevoknits.com" className="underline">
              sales@vevoknits.com
            </a>
          </p>
        </div>

        {/* RIGHT – Contact Form */}
        <div className="bg-white border rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Send us a message</h3>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="text-sm text-gray-600">Your Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Phone (optional)</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="+91 80xxxx xxxx"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-5 py-2.5 rounded-full bg-black text-white font-semibold hover:bg-gray-900"
            >
              {loading ? "Sending..." : "Submit"}
            </button>

            {status && (
              <div
                role="status"
                className={`mt-3 text-sm ${
                  status.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {status.message}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* MAP (Google Maps iframe embed) */}
      <section className="border-t bg-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="w-full h-72 sm:h-96 rounded-xl overflow-hidden shadow-sm">
            {/* Replace the query below if you prefer a different pin/place.
                This uses your provided address to center the map. */}
            <iframe
              title="Vevoknits Garments - Map"
              className="w-full h-full border-0"
              loading="lazy"
              src={
                "https://www.google.com/maps?q=Vevoknits+Garments+%2363+MVS+Building+Bangalore&output=embed"
              }
            />
          </div>
        </div>
      </section>
    </main>
  );
}
