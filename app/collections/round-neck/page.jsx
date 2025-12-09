"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import products from "@/data/products.json";

/* Helpers */
function toColorSlug(color) {
  return String(color || "").toLowerCase().replace(/\s+/g, "-");
}
function ensureLeadingSlash(p) {
  if (!p) return null;
  const s = String(p).trim();
  return s.startsWith("/") ? s : `/${s}`;
}
function encodeSeg(s) {
  return encodeURIComponent(String(s || "").trim());
}
function joinUrlParts(...parts) {
  const segs = parts
    .map((p) => String(p || "").trim().replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .map(encodeSeg);
  if (!segs.length) return null;
  return "/" + segs.join("/");
}

/* Build candidate thumbnail URLs for a product (first-color front image preferred) */
function buildCandidateThumbUrls(product) {
  const candidates = [];

  // 1) If product has explicit image property, try it first
  if (product.image) {
    const img = ensureLeadingSlash(product.image);
    if (img) candidates.push(img);
  }

  // 2) If product has folder + colors, try first color variants
  if (product.folder && Array.isArray(product.colors) && product.colors.length) {
    const color = String(product.colors[0] || "").trim();
    const slug = toColorSlug(color);
    const suffix = "-1.png"; // front

    const filenameVariants = [
      `${slug}${suffix}`,                 // slug-1.png
      `${color}${suffix}`,                // "Black-1.png" or "Black -1.png" (maybe no)
      `${color} ${suffix.replace("-", "-")}`, // "Black -1.png" (space before dash)
      `${color.toUpperCase()}${suffix}`,
      `${color.toLowerCase()}${suffix}`,
      `${color.replace(/\s+/g, "-")}${suffix}`,
      `${color.replace(/\s+/g, "-").toLowerCase()}${suffix}`,
    ];

    // try several folder name variations (your folders appear UPPERCASE)
    const colorFolderCandidates = [
      color,
      color.toUpperCase(),
      color.toLowerCase(),
      slug
    ].filter(Boolean);

    for (const cf of colorFolderCandidates) {
      for (const fn of filenameVariants) {
        const url = joinUrlParts("assets", "Products", product.folder, cf, fn);
        if (url) candidates.push(url);
      }
    }
  }

  // de-duplicate while keeping order
  return Array.from(new Set(candidates));
}

/* Product Card that resolves a working thumbnail before rendering */
function ProductCard({ product }) {
  const candidates = useMemo(() => buildCandidateThumbUrls(product), [product]);
  const [thumb, setThumb] = useState(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function resolveThumb() {
      setThumb(null);
      setChecking(true);

      // try HEAD for each candidate URL, first ok wins
      for (const url of candidates) {
        if (cancelled) break;
        try {
          // HEAD is quick and doesn't download body
          const res = await fetch(url, { method: "HEAD", signal: controller.signal });
          if (res.ok) {
            if (cancelled) return;
            setThumb(url);
            setChecking(false);
            console.debug("[thumb] resolved", product.slug, url);
            return;
          }
        } catch (err) {
          // continue to next candidate
          // console.debug("HEAD failed", url, err);
        }
      }

      // none found — if candidates included fallback product.image it may be last; otherwise thumb remains null
      setChecking(false);
      console.warn("[thumb] no working thumbnail found for", product.slug, "tried:", candidates);
    }

    if (candidates.length > 0) resolveThumb();
    else setChecking(false);

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [candidates, product.slug]);

  return (
    <Link href={`/products/${product.slug}`} className="block">
      <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
        <div className="relative w-full h-60 bg-white">
          {thumb ? (
            <Image
              src={thumb}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              {checking ? "Loading…" : "No image"}
            </div>
          )}
        </div>

        <div className="p-4">
          <h2 className="font-semibold text-lg">{product.name}</h2>
        </div>
      </div>
    </Link>
  );
}

/* Main collection component */
export default function RoundNeckCollection() {
  const rneck = products.filter((p) => p.collection === "round-neck");

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="text-4xl font-bold mb-6">Round Neck T-Shirts</h1>
      <p className="text-gray-600 mb-10">Soft & comfortable round-neck blank T-Shirts.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {rneck.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
