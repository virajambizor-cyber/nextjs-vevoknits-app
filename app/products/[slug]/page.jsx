"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import products from "@/data/products.json";

/* ---------- Utilities ---------- */
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

function encodeSegment(segment) {
  if (!segment) return "";
  return encodeURIComponent(String(segment).trim());
}

function joinUrlParts(...parts) {
  const segs = parts
    .map((p) => String(p || "").trim().replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .map((s) => encodeSegment(s));
  if (segs.length === 0) return null;
  return "/" + segs.join("/");
}

/* ---------- Config ---------- */
const WHATSAPP_URL =
  "https://wa.me/918710000817?text=Hi%2C%20I%20would%20like%20a%20bulk%20quote%20for%20your%20products.";

// Folder you keep the catalog PDFs in (under public/)
const CATALOG_BASE_PATH = "/assets/Cataloge";

/*
  Map of product.slug -> filename as it appears in your Finder.
  I used the filenames from the screenshot you shared.
  The code will also try a few normalized variants automatically.
*/
const catalogFileMap = {
  "fling-polo-premium": "FLING POLO ( PREMIUM).pdf",
  "hayati-polo-premium": "HAYATI POLO PREMIUM .pdf",
  "mexmy-polo": "MEXMY POLO.pdf",
  "axroo-cotton-polo": "AXROO COTTON POLO P…NAL.pdf",
  "muskox-premium-hoody": "MUSKOX HOODIES .pdf",
  "hayati-160gsm": "HAYATI 160 GSM .pdf",
  "hayati-180gsm": "HAYATI PREMIUM 180 GSM .pdf",
};

/* ---------- Component ---------- */
export default function ProductPage({ params }) {
  const { slug } = params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold">Product not found</h1>
      </div>
    );
  }

  const hasColors =
    product.folder && Array.isArray(product.colors) && product.colors.length > 0;

  const [selectedColor, setSelectedColor] = useState(
    hasColors ? product.colors[0] : null
  );
  const [side, setSide] = useState("front");
  const [checkingCatalog, setCheckingCatalog] = useState(false);

  // Build main image path safely
  const buildMainImage = () => {
    if (hasColors && selectedColor && product.folder) {
      const colorSlug = toColorSlug(selectedColor);
      if (!colorSlug) return null;
      const fileName = side === "front" ? `${colorSlug}-1.png` : `${colorSlug}-b.png`;
      return joinUrlParts("assets", "Products", product.folder, colorSlug, fileName);
    }

    if (product.image) {
      return ensureLeadingSlash(product.image);
    }

    return null;
  };

  const mainImageSrc = buildMainImage();
  const safeMainImageSrc =
    typeof mainImageSrc === "string" && mainImageSrc.trim().length > 0
      ? mainImageSrc.trim()
      : null;

  const catalogFileNameRaw = catalogFileMap[product.slug] || null;

  // Build a candidate URL from a filename (filename must be exactly as on disk)
  const makeCatalogUrl = (filename) =>
    filename ? ensureLeadingSlash(`${CATALOG_BASE_PATH}/${encodeSegment(filename)}`) : null;

  // Create a set of filename variants to try when the exact name returns 404.
  // This will attempt a few sensible normalizations (trim spaces, remove stray space before .pdf, normalize parentheses).
  function generateFilenameVariants(rawFilename) {
    if (!rawFilename) return [];
    const variants = new Set();

    const original = String(rawFilename);
    variants.add(original);

    const trimmed = original.replace(/\s+/g, " ").trim(); // collapse multiple spaces, trim ends
    variants.add(trimmed);

    // remove space before .pdf, if present
    variants.add(trimmed.replace(/ \.pdf$/i, ".pdf"));

    // normalize parentheses spacing: "( PREMIUM)" -> "(PREMIUM)"
    variants.add(trimmed.replace(/\(\s*([^)]*?)\s*\)/g, "($1)"));

    // normalized + remove space before dot
    variants.add(trimmed.replace(/\(\s*([^)]*?)\s*\)/g, "($1)").replace(/ \.pdf$/i, ".pdf"));

    return Array.from(variants);
  }

  // Try to download catalog: HEAD -> if ok programmatic click to download
  async function downloadCatalog(ev) {
    ev?.preventDefault?.();

    // if user has no mapping at all
    if (!catalogFileNameRaw) {
      alert("Catalog not available for this product.");
      return;
    }

    setCheckingCatalog(true);

    const tried = [];
    try {
      const variants = generateFilenameVariants(catalogFileNameRaw);

      // try each variant until we find one that returns ok for HEAD
      for (const v of variants) {
        const url = makeCatalogUrl(v);
        if (!url) continue;
        tried.push(url);
        try {
          // HEAD request on same-origin file - quick check for existence
          const res = await fetch(url, { method: "HEAD" });
          if (res.ok) {
            // trigger download
            const a = document.createElement("a");
            a.href = url;
            // set download attribute to the raw filename so downloaded file keeps a readable name
            a.setAttribute("download", v);
            document.body.appendChild(a);
            a.click();
            a.remove();
            setCheckingCatalog(false);
            console.info("[Catalog] Download started:", url);
            return;
          } else {
            console.debug("[Catalog] HEAD not OK", res.status, url);
          }
        } catch (headErr) {
          // fetch HEAD failed for this variant; continue to next
          console.debug("[Catalog] HEAD request error for", url, headErr);
        }
      }

      // if we reach here, none of the variants returned ok
      console.warn("[Catalog] Tried these URLs and none were found:", tried);
      alert(
        "Catalog file wasn't found on the server. Check that the PDF exists in public/assets/Cataloge with the exact filename."
      );
    } catch (err) {
      console.error("Error checking/downloading catalog:", err);
      alert("Could not download the catalog. Check console for details.");
    } finally {
      setCheckingCatalog(false);
    }
  }

  // Debug info: useful while testing
  useEffect(() => {
    console.group("[ProductPage Debug]");
    console.log("slug:", slug);
    console.log("product.folder:", product.folder);
    console.log("product.image:", product.image);
    console.log("hasColors:", hasColors);
    console.log("selectedColor:", selectedColor);
    console.log("side:", side);
    console.log("computed mainImageSrc:", mainImageSrc);
    console.log("safeMainImageSrc:", safeMainImageSrc);
    console.log("catalogFileNameRaw:", catalogFileNameRaw);
    console.log("candidate variants:", generateFilenameVariants(catalogFileNameRaw));
    console.groupEnd();
  }, [slug, product, hasColors, selectedColor, side, mainImageSrc, safeMainImageSrc, catalogFileNameRaw]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] items-start relative">

        {/* LEFT image col - make container non-interactive so it won't block clicks */}
        <div className="relative z-0 pointer-events-none">
          <div className="w-full border rounded-2xl overflow-hidden shadow-sm bg-white">
            <div className="relative w-full pt-[110%]">
              {safeMainImageSrc ? (
                <Image
                  src={safeMainImageSrc}
                  alt={product.name || "Product image"}
                  fill
                  className="object-contain pointer-events-auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-white pointer-events-none">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mb-2" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 19h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 11l2 2 4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="text-sm">Image not available</div>
                </div>
              )}
            </div>
          </div>

          {hasColors && (
            // <<< MINIMAL FIX: allow buttons to receive pointer events while keeping image area non-interactive
            <div className="mt-4 flex gap-2 pointer-events-auto">
              <button
                type="button"
                onClick={() => setSide("front")}
                className={`px-3 py-1 text-sm rounded-full border ${
                  side === "front"
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                Front
              </button>

              <button
                type="button"
                onClick={() => setSide("back")}
                className={`px-3 py-1 text-sm rounded-full border ${
                  side === "back"
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                Back
              </button>
            </div>
          )}
        </div>

        {/* RIGHT interactive column */}
        <div className="relative z-20 pointer-events-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>

          <p className="text-gray-600 mb-6">
            Premium blank apparel for your brand. Customize with printing or embroidery.
          </p>

          {hasColors && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold mb-2 tracking-wide uppercase text-gray-700">Available Colours</h2>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    type="button"
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 text-xs md:text-sm rounded-full border ${
                      selectedColor === color
                        ? "bg-black text-white border-black"
                        : "border-gray-300 text-gray-800 hover:border-black"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-sm font-semibold mb-2 tracking-wide uppercase text-gray-700">Product Details</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Premium cotton fabric</li>
              <li>Perfect for custom branding</li>
              <li>Bulk order pricing available</li>
              <li>Minimum Order Quantity (MOQ): 10 pieces</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-900"
            >
              Get Bulk Quote
            </a>

            <button
              onClick={downloadCatalog}
              disabled={checkingCatalog}
              className={`w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-full border text-sm font-semibold hover:border-black ${
                !catalogFileNameRaw ? "cursor-not-allowed text-gray-400 border-gray-300" : "border-gray-400"
              }`}
            >
              {checkingCatalog ? "Checking..." : "Download Catalogue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
