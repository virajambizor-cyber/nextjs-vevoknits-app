"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ ok: null, msg: "" });

  function update(key, value) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function validate() {
    if (!form.email.trim()) return "Please enter your email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return "Enter a valid email.";
    if (!form.password.trim()) return "Please enter your password.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    return null;
  }

  // Helper to parse JSON safely and fallback to text
  async function parseResponse(res) {
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      return res.json();
    } else {
      // return text for debug/friendly error message
      const text = await res.text();
      return { _nonJson: true, text };
    }
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
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email.trim(), password: form.password }),
      });

      const data = await parseResponse(res);

      if (res.ok) {
        setStatus({ ok: true, msg: data?.message || "Login successful." });
        // Optionally redirect to dashboard or admin page:
        // router.push('/dashboard');
      } else {
        // handle non-json server pages (HTML error)
        if (data && data._nonJson) {
          // show a friendly short snippet of the HTML/text
          const snippet = data.text.replace(/\s+/g, " ").slice(0, 400);
          setStatus({
            ok: false,
            msg: `Server error (non-JSON response). ${snippet ? "Snippet: " + snippet : ""}`,
          });
        } else {
          setStatus({ ok: false, msg: data?.error || "Login failed. Try again." });
        }
      }
    } catch (err) {
      console.error("Login submit error:", err);
      setStatus({ ok: false, msg: "Network error. Try again later." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-14">
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-6" aria-label="Login Form">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full border rounded-md p-3"
              placeholder="you@company.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="w-full border rounded-md p-3"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div aria-live="polite" className="text-sm">
              {status.ok === true && <p className="text-green-600">{status.msg}</p>}
              {status.ok === false && <p className="text-red-600">{status.msg}</p>}
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Forgot password? Implement a reset flow or contact <strong>sales@vevoknits.com</strong>.
          </p>
        </form>
      </div>
    </main>
  );
}
