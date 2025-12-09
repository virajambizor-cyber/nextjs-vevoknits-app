// app/reviews/page.jsx
"use client";

import Link from "next/link";
import { useMemo } from "react";

const WHATSAPP_URL = "https://wa.me/918710000817?text=Hi%2C%20I%20would%20like%20to%20share%20a%20review%20or%20ask%20about%20an%20order.";
const EMAIL_URL = "mailto:sales@vevoknits.com?subject=Review%20/Order%20Enquiry";

const REVIEWS = [
  {
    id: 1,
    name: "Studio Kreate",
    location: "Hyderabad",
    date: "06/11/2024",
    rating: 5,
    title: "Perfect for DTG printing",
    text:
      "We used the blanks for a DTG run — minimal bleeding and very good hand-feel. Consistent across the whole lot.",
  },
  {
    id: 2,
    name: "Ananya S.",
    location: "Bengaluru",
    date: "12/10/2024",
    rating: 5,
    title: "Excellent fabric & fit",
    text:
      "Ordered polos for our college fest – quality was superb and sizing was consistent. The prints came out great. Delivery on time too!",
  },
  {
    id: 3,
    name: "Rahul P.",
    location: "Mumbai",
    date: "02/09/2024",
    rating: 4,
    title: "Very good for bulk orders",
    text:
      "Great value for bulk. Colours were accurate. Customer support helped with size chart. Would reorder.",
  },
  {
    id: 4,
    name: "Priya R.",
    location: "Pune",
    date: "20/08/2024",
    rating: 4,
    title: "Good quality, slight delay",
    text:
      "Quality was great but there was a small delivery delay. Support resolved it quickly and offered alternatives.",
  },
  {
    id: 5,
    name: "Maya R.",
    location: "Kolkata",
    date: "05/06/2024",
    rating: 5,
    title: "Fantastic handfeel & finish",
    text:
      "The fabric handfeel is great and the finishing details (stitching, neck tape) are premium. Perfect for premium merch.",
  },
  {
    id: 6,
    name: "Karthik M.",
    location: "Chennai",
    date: "22/05/2024",
    rating: 5,
    title: "Consistent sizing across batches",
    text:
      "We distributed sample runs and got consistently sized blanks. Makes bulk production easier—no surprises between batches.",
  },
  // you can add more reviews here as needed
];

function Stars({ value, size = 14 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="inline-flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={"f" + i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
          <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.56L19.336 24 12 20.201 4.664 24l1.636-8.69L.6 9.75l7.732-1.732z" />
        </svg>
      ))}
      {half && (
        <svg width={size} height={size} viewBox="0 0 24 24" className="text-amber-400">
          <defs>
            <linearGradient id="g">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.56L19.336 24 12 20.201 4.664 24l1.636-8.69L.6 9.75l7.732-1.732z" fill="url(#g)" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={"e" + i} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-amber-400">
          <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.56L19.336 24 12 20.201 4.664 24l1.636-8.69L.6 9.75l7.732-1.732z" strokeWidth="1" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const average = useMemo(() => {
    const sum = REVIEWS.reduce((s, r) => s + r.rating, 0);
    return (sum / REVIEWS.length).toFixed(1);
  }, []);

  return (
    <main className="min-h-screen bg-[#FBF4EE]">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Heading + filters row */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* left: heading */}
            <div className="text-left md:text-left w-full md:w-1/2">
              {/* center heading on small screens */}
              <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-2 text-center md:text-left">Customer Reviews</h1>
              <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto md:mx-0 text-center md:text-left">
                Read what brands, creators and resellers say about our blanks.
              </p>
            </div>

            {/* right: average + filters */}
            <div className="w-full md:w-auto flex items-center justify-center md:justify-end gap-4">
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 shadow-sm">
                <div className="text-xl font-bold">{average}</div>
                <div className="hidden sm:block">
                  <Stars value={Math.round(+average * 10) / 10} size={14} />
                  <div className="text-xs text-gray-400"> {REVIEWS.length} reviews</div>
                </div>
              </div>

              {/* lightweight filter placeholders (non-functional) */}
              <div className="flex gap-2">
                <select className="rounded-full border px-3 py-2 bg-white text-sm">
                  <option>All ratings</option>
                  <option>5 stars</option>
                  <option>4+ stars</option>
                </select>

                <select className="rounded-full border px-3 py-2 bg-white text-sm">
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        {/* Reviews grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <article key={r.id} className="bg-white rounded-2xl p-5 shadow-sm border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm font-semibold">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.location} • {r.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Stars value={r.rating} />
                    <div className="text-sm text-gray-600">{r.rating}.0</div>
                  </div>
                </div>

                <h3 className="font-semibold mb-2">{r.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{r.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA panel */}
        <aside className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h2 className="text-xl font-semibold mb-2">Want to leave a review or ask about an order?</h2>
              <p className="text-gray-600">We’d love to hear from you — testimonials help other creators choose the right blanks.</p>
            </div>

            {/* Buttons column: on mobile center below text; on desktop vertically centered */}
            <div className="flex flex-col sm:flex-row items-center gap-3 md:items-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#11A85A] text-white font-semibold whitespace-nowrap min-w-[180px] text-sm shadow hover:opacity-95"
                aria-label="Message on WhatsApp"
              >
                Message on WhatsApp
              </a>

              <a
                href={EMAIL_URL}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 bg-white text-black font-semibold whitespace-nowrap min-w-[140px] text-sm hover:bg-gray-50"
                aria-label="Send an Email"
              >
                Send an Email
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white font-semibold whitespace-nowrap min-w-[140px] text-sm hover:opacity-95"
                aria-label="Contact Page"
              >
                Contact Page
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
