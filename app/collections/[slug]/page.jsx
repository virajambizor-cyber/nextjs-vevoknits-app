"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import products from "@/data/products.json";

/* ---------- small helpers ---------- */
function toColorSlug(color) {
  if (!color) return "";
  return String(color).toLowerCase().replace(/\s+/g, "-");
}
function ensureLeadingSlash(path) {
  if (!path) return null;
  const p = String(path).trim();
  if (!p) return null;
  return p.startsWith("/") ? p : `/${p}`;
}
function encodeSeg(s) {
  if (!s) return "";
  return encodeURIComponent(String(s).trim());
}
function joinUrlParts(...parts) {
  const segs = parts
    .map((p) => String(p || "").trim().replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .map(encodeSeg);
  if (segs.length === 0) return null;
  return "/" + segs.join("/");
}

/* ---------- ProductCard: resolves a working thumbnail URL before rendering Image ---------- */
function ProductCard({ product }) {
  const hasColors = product.folder && Array.isArray(product.colors) && product.colors.length > 0;
  const firstColor = hasColors ? product.colors[0] : null;
  const side = "front"; // we want the front image for the thumbnail

  // Build candidate filenames & URLs (ordered)
  const candidateUrls = useMemo(() => {
    if (!hasColors) {
      const ensured = ensureLeadingSlash(product.image);
      return ensured ? [ensured] : [];
    }
    if (!product.folder || !firstColor) return [];

    const suffix = side === "front" ? "-1.png" : "-b.png";
    const raw = String(firstColor).trim();
    const slug = toColorSlug(firstColor);

    const filenames = [
      `${slug}${suffix}`,
      `${raw}${suffix}`,
      // some of your files include a space before the dash: "BLACK -1.png"
      `${raw} ${suffix.replace("-", "-")}`,
      `${raw.toUpperCase()}${suffix}`,
      `${raw.toUpperCase()} ${suffix.replace("-", "-")}`,
      `${raw.toLowerCase()}${suffix}`,
      `${raw.toLowerCase()} ${suffix.replace("-", "-")}`,
      `${raw.replace(/\s+/g, "-")}${suffix}`,
      `${raw.replace(/\s+/g, "-").toLowerCase()}${suffix}`,
    ];

    const colorFolderCandidates = [raw, raw.toUpperCase(), raw.toLowerCase(), slug].filter(Boolean);

    const urls = [];
    for (const cf of colorFolderCandidates) {
      for (const fn of filenames) {
        const url = joinUrlParts("assets", "Products", product.folder, cf, fn);
        if (url) urls.push(url);
      }
    }

    // dedupe while keeping order
    return Array.from(new Set(urls));
  }, [product, hasColors, firstColor]);

  // resolvedSrc is set to the first candidate that responds OK
  const [resolvedSrc, setResolvedSrc] = useState(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function findWorkingUrl() {
      setResolvedSrc(null);
      setChecking(true);

      // If there are no candidates (and product.image exists), use that as fallback
      if ((!candidateUrls || candidateUrls.length === 0) && product.image) {
        setResolvedSrc(ensureLeadingSlash(product.image));
        setChecking(false);
        return;
      }

      for (const url of candidateUrls) {
        if (cancelled) break;
        try {
          // HEAD is quick and doesn't download body
          const res = await fetch(url, { method: "HEAD", signal: controller.signal });
          if (res.ok) {
            if (cancelled) break;
            setResolvedSrc(url);
            setChecking(false);
            return;
          }
        } catch (err) {
          // likely 404 or aborted — continue to next candidate
          // console.debug('HEAD failed for', url, err);
        }
      }

      // nothing found — fall back to product.image if available
      if (!cancelled) {
        if (product.image) setResolvedSrc(ensureLeadingSlash(product.image));
        setChecking(false);
      }
    }

    findWorkingUrl();

    return () => {
      cancelled = true;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateUrls, product.image]);

  // Render placeholder while checking / nothing found
  return (
    <Link href={`/products/${product.slug}`} className="block">
      <div className="rounded-2xl border overflow-hidden shadow-sm bg-white">
        <div className="relative w-full h-0 pt-[110%]">
          {resolvedSrc ? (
            <Image
              src={resolvedSrc}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
              {checking ? "Loading…" : "No image"}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-medium">{product.name}</h3>
        </div>
      </div>
    </Link>
  );
}

/* ---------- Collection page component ---------- */
export default function CollectionPage({ params }) {
  const { collection } = params;
  // filter products by collection (adjust if your data uses different prop)
  const list = products.filter((p) => p.collection === collection);

  useEffect(() => {
    console.group("[Collection Debug]");
    console.log("collection:", collection);
    console.log("items:", list.map((p) => p.slug));
    console.groupEnd();
  }, [collection, list]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">{collection?.charAt(0).toUpperCase() + collection?.slice(1) || "Collection"}</h1>
      <p className="text-gray-600 mb-8">Premium quality {collection} in various GSM and styles.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
  