"use client";
import React from "react";

export default function Footer({ logoSrc, logoAlt = "Brand logo" }) {
  const now = new Date().getFullYear();
  const linkClass = "text-black hover:opacity-70 transition-opacity duration-150";

  return (
    <footer className="w-full">
      <div
        className="w-full px-6 sm:px-10 lg:px-20 py-10 lg:py-14 rounded-t-3xl"
        style={{ backgroundColor: "#FFF6F1", borderTop: "1px solid #EFE7E2" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* GRID LAYOUT */}
          <div
            className="
              grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8
              place-items-center md:place-items-start
              text-center md:text-left
            "
          >
            {/* LOGO + TAGLINE */}
            <div className="md:col-span-3 flex flex-col items-center md:items-start">
              <img
                src={logoSrc}
                alt={logoAlt}
                className="h-4 md:h-6 w-auto object-contain mb-4 md:mb-6"
              />
              <p className="text-sm md:text-[15px]" style={{ color: "#1C2A44" }}>
                Premium blanks • DTG • Screen Print • Embroidery • Labelling
              </p>
            </div>

            {/* CALL SUPPORT + POLICIES */}
            <div className="md:col-span-3 flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold" style={{ color: "#14233F" }}>
                Call Support
              </h3>
              <p className="mt-1 text-sm" style={{ color: "#34405A" }}>
                Mon–Sat, 10:00–18:00 IST
              </p>

              <ul className="mt-4 space-y-2 text-base">
                {[
                  "+91 80503 66666",
                  "+91 80504 66666",
                  "+91 80505 66666",
                  "+91 94810 72110",
                ].map((n) => (
                  <li key={n}>
                    <a href={`tel:${n.replace(/\s+/g, "")}`} className={linkClass}>
                      {n}
                    </a>
                  </li>
                ))}
              </ul>

              {/* POLICIES SECTION */}
              <div className="mt-6">
                <h4 className="text-base font-semibold mb-2" style={{ color: "#14233F" }}>
                  Policies
                </h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <a href="/policies/privacy" className={linkClass}>
                    Privacy Policy
                  </a>
                  <a href="/policies/terms" className={linkClass}>
                    Terms & Conditions
                  </a>
                  <a href="/policies/shipping-returns" className={linkClass}>
                    Shipping & Returns
                  </a>
                  <a href="/policies/refund" className={linkClass}>
                    Refund Policy
                  </a>
                  <a href="/policies/cookies" className={linkClass}>
                    Cookie Policy
                  </a>
                  <a href="/faq" className={linkClass}>
                    FAQ
                  </a>
                </div>
              </div>
            </div>

            {/* EMAIL SECTION */}
            <div className="md:col-span-3 flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold" style={{ color: "#14233F" }}>
                Email
              </h3>
              <p className="mt-1 text-sm" style={{ color: "#34405A" }}>
                We reply within 24–48 hours
              </p>
              <a
                href="mailto:sales@vevoknits.com"
                className={`mt-4 inline-block break-all text-base ${linkClass}`}
              >
                sales@vevoknits.com
              </a>
            </div>

            {/* VISIT US SECTION */}
            <div className="md:col-span-3 flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold" style={{ color: "#14233F" }}>
                Visit Us
              </h3>
              <div
                className="mt-3 space-y-2 text-sm md:text-[15px]"
                style={{ color: "#1C2A44" }}
              >
                <p className="font-medium">Vevoknits Garments</p>
                <p>
                  #63, MVS Building (Opp. BMTC),<br />
                  K.H (Double Road), ShanthiNagar Main Road,<br />
                  Bangalore – 560027
                </p>
                <p className="text-sm" style={{ color: "#34405A" }}>
                  Business Hours: Mon–Sat, 10:00–18:00 IST
                </p>
                <p>
                  WhatsApp:{" "}
                  <a
                    href="https://wa.me/918710000817"
                    target="_blank"
                    rel="noreferrer"
                    className={linkClass}
                  >
                    +91 87100 00817
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:sales@vevoknits.com" className={linkClass}>
                    sales@vevoknits.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="mt-8 border-t" style={{ borderColor: "#EDE4DE" }} />

          {/* BOTTOM BAR */}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-sm text-black">
              © {now} Vevoknits Powered by{" "}
              <a
                href="https://ambizor.com/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold hover:opacity-70 text-black"
              >
                Ambizor
              </a>
              . All rights reserved.
            </p>

            {/* LOGIN / REGISTER BUTTONS */}
            <div className="flex items-center gap-3 text-sm">
              <a
                href="/Auth/register"
                className="px-5 py-2 rounded-md bg-black text-white text-sm font-medium hover:opacity-80 transition-all duration-200"
              >
                Get Quate
              </a>
              <a
                href="/Auth/register"
                className="px-5 py-2 rounded-md bg-black text-white text-sm font-medium hover:opacity-80 transition-all duration-200"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
