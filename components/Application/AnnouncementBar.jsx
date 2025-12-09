"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/**
 * Props
 * - messages: string[]
 * - fbUrl?: string
 * - igUrl?: string
 * - auto?: boolean
 * - intervalMs?: number         // time each message stays (default 4500)
 * - transitionMs?: number       // animation duration (default 450)
 * - variant?: "slide" | "fade"  // animation type
 * - dismissible?: boolean
 * - storageKey?: string
 */
export default function AnnouncementBar({
  messages = [],
  fbUrl = "#",
  igUrl = "#",
  auto = true,
  intervalMs = 4500,
  transitionMs = 450,
  variant = "slide",
  dismissible = false,
  storageKey = "announcementBar:dismissed",
}) {
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [animKey, setAnimKey] = useState(0); // forces re-animation on index change
  const wrapRef = useRef(null);

  // reduced motion
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  }, []);

  // read dismiss
  useEffect(() => {
    if (!dismissible) return;
    try {
      const v = localStorage.getItem(storageKey);
      if (v === "1") setHidden(true);
    } catch {}
  }, [dismissible, storageKey]);

  // auto-rotate (pause on hover)
  useEffect(() => {
    if (!auto || reducedMotion || messages.length <= 1) return;
    const el = wrapRef.current;
    if (!el) return;

    let timer = setInterval(handleNext, intervalMs);

    const stop = () => { clearInterval(timer); timer = null; };
    const start = () => { if (!timer) timer = setInterval(handleNext, intervalMs); };

    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", start);

    return () => {
      stop();
      el.removeEventListener("mouseenter", stop);
      el.removeEventListener("mouseleave", start);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, intervalMs, reducedMotion, messages.length]);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleNext = () => {
    setIndex((i) => (i + 1) % messages.length);
    setAnimKey((k) => k + 1);
  };
  const handlePrev = () => {
    setIndex((i) => (i - 1 + messages.length) % messages.length);
    setAnimKey((k) => k + 1);
  };

  if (hidden || !messages.length) return null;

  // animation styles
  const fadeStyle = reducedMotion
    ? {}
    : { transition: `opacity ${transitionMs}ms ease`, opacity: 1 };

  const slideStyle = reducedMotion
    ? {}
    : {
        animation: `ab-slide-in ${transitionMs}ms ease`,
      };

  return (
    <div
      ref={wrapRef}
      className="w-full bg-[#1f232b] text-white text-[13px] sm:text-sm"
      role="region"
      aria-label="Site announcements"
    >
      {/* simple keyframes for slide */}
      <style jsx>{`
        @keyframes ab-slide-in {
          from { transform: translateY(12px); opacity: 0 }
          to   { transform: translateY(0); opacity: 1 }
        }
      `}</style>

      <div className="mx-auto max-w-screen-2xl px-3 sm:px-6">
        <div className="h-10 sm:h-12 flex items-center justify-between gap-3">
          {/* Left socials */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={fbUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-white/40 hover:border-white/70 transition"
            >
              <FaFacebookF className="w-3.5 h-3.5" />
            </a>
            <a
              href={igUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center justify-center w-6 h-6 rounded-md border border-white/40 hover:border-white/70 transition"
            >
              <FaInstagram className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Center message + arrows */}
          <div className="flex items-center gap-1 sm:gap-2 min-w-0 grow justify-center">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous announcement"
              className="p-1.5 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 shrink-0"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            <div className="relative overflow-hidden max-w-[72vw] sm:max-w-[60vw] text-center">
              <div
                key={animKey}
                className="px-2 whitespace-nowrap"
                style={variant === "slide" ? slideStyle : fadeStyle}
              >
                <span className="text-white/90">{messages[index]}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next announcement"
              className="p-1.5 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 shrink-0"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right spacer or dismiss */}
          {dismissible ? (
            <button
              type="button"
              aria-label="Dismiss announcement"
              className="text-white/70 hover:text-white/95 px-2 shrink-0"
              onClick={() => {
                setHidden(true);
                try { localStorage.setItem(storageKey, "1"); } catch {}
              }}
            >
              ×
            </button>
          ) : (
            <div className="w-[18px]" aria-hidden />
          )}
        </div>
      </div>
    </div>
  );
}
