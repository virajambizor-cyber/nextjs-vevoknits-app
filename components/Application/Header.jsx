"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FiSearch,
  FiShoppingBag,
  FiChevronDown,
  FiMenu,
  FiX,
} from "react-icons/fi";

/* ---------------- NAV DATA ---------------- */

const NAV = {
  products: {
    label: "Products",
    items: [
      {
        label: "Polo T-Shirts",
        href: "/collections/polo",
        children: [
          { label: "Fling Polo Premium", href: "/collections/polo" },
          { label: "Hayati Polo Premium", href: "/collections/polo" },
          { label: "Mexmy Polo T-Shirts", href: "/collections/polo" },
          { label: "Axroo Cotton Polo", href: "/collections/polo" },
        ],
      },
      {
        label: "Hoodies",
        href: "/collections/hoodies",
        children: [
          { label: "Muskox Premium Hoody", href: "/collections/hoodies" },
        ],
      },
      {
        label: "Round Neck T-Shirts",
        href: "/collections/round-neck",
        children: [
          { label: "Hayati 160GSM", href: "/collections/round-neck" },
          { label: "Hayati Premium 180GSM", href: "/collections/round-neck" },
        ],
      },
      { label: "Sample Products Set", href: "/collections/sample-set" },
    ],
  },
};

const POLICIES = {
  label: "Policy",
  items: [
    { label: "Privacy Policy", href: "/policies/privacy" },
    { label: "Terms & Conditions", href: "/policies/terms" },
    { label: "Shipping & Returns", href: "/policies/shipping-returns" },
    { label: "About Us", href: "/policies/about" },
    { label: "Cookie Policy", href: "/policies/cookies" },
    { label: "FAQ", href: "/policies/faq" },
  ],
};

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

export default function Header({ logoSrc = "/Images/untitled.svg" }) {
  const [openProducts, setOpenProducts] = useState(false);
  const [openPolicies, setOpenPolicies] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const productsRef = useRef(null);
  const policiesRef = useRef(null);
  const hoverTimer = useRef(null);

  const openWithDelay = (setter) => {
    clearTimeout(hoverTimer.current);
    setter(true);
  };

  const closeWithDelay = (setter) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setter(false), 120);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (productsRef.current && !productsRef.current.contains(e.target)) {
        setOpenProducts(false);
      }
      if (policiesRef.current && !policiesRef.current.contains(e.target)) {
        setOpenPolicies(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  /* --------------------- DESKTOP MENUS ------------------------- */

  const DesktopProductsMenu = () => (
    <div
      className="relative"
      ref={productsRef}
      onMouseEnter={() => openWithDelay(setOpenProducts)}
      onMouseLeave={() => closeWithDelay(setOpenProducts)}
    >
      <button className="inline-flex items-center gap-1 px-2.5 py-2 text-sm font-semibold hover:text-black/80">
        Products
        <FiChevronDown
          className={cx("transition-transform", openProducts && "rotate-180")}
        />
      </button>

      <div
        className={cx(
          "absolute left-0 top-full z-30 w-[760px] rounded-lg border bg-white shadow-xl transition-all",
          openProducts
            ? "opacity-100 visible translate-y-2"
            : "opacity-0 invisible -translate-y-1"
        )}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-5 pt-3">
          {NAV.products.items.map((cat) => {
            const hasChildren = !!cat.children?.length;

            return (
              <div key={cat.label}>
                {hasChildren ? (
                  <span className="font-bold text-gray-900 mb-2 inline-block">
                    {cat.label}
                  </span>
                ) : (
                  <Link
                    href={cat.href}
                    onClick={() => setOpenProducts(false)}
                    className="font-bold text-gray-900 hover:underline mb-2 inline-block"
                  >
                    {cat.label}
                  </Link>
                )}

                {hasChildren && (
                  <ul className="space-y-1">
                    {cat.children.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={sub.href}
                          onClick={() => setOpenProducts(false)}
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const DesktopPoliciesMenu = () => (
    <div
      className="relative"
      ref={policiesRef}
      onMouseEnter={() => openWithDelay(setOpenPolicies)}
      onMouseLeave={() => closeWithDelay(setOpenPolicies)}
    >
      <button className="inline-flex items-center gap-1 px-2.5 py-2 text-sm font-semibold hover:text-black/80">
        {POLICIES.label}
        <FiChevronDown
          className={cx("transition-transform", openPolicies && "rotate-180")}
        />
      </button>

      <div
        className={cx(
          "absolute left-0 top-full z-30 w-[520px] rounded-lg border bg-white shadow-xl transition-all",
          openPolicies
            ? "opacity-100 visible translate-y-2"
            : "opacity-0 invisible -translate-y-1"
        )}
      >
        <div className="grid grid-cols-2 gap-6 p-5 pt-3">
          {POLICIES.items.map((p) => (
            <Link
              key={p.label}
              href={p.href}
              onClick={() => setOpenPolicies(false)}
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  /* --------------------- MOBILE MENU ------------------------- */

  const MobileAccordion = () => (
    <div className="lg:hidden">
      <div className="border-t">

        {/* Products */}
        <details className="group border-b">
          <summary className="px-4 py-3 font-semibold flex justify-between cursor-pointer">
            Products
            <FiChevronDown className="transition-transform group-open:rotate-180" />
          </summary>

          <div className="px-4 pb-3 space-y-3">
            {NAV.products.items.map((cat) => {
              const hasChildren = !!cat.children?.length;

              if (!hasChildren) {
                return (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-semibold py-1"
                  >
                    {cat.label}
                  </Link>
                );
              }

              return (
                <details key={cat.label} className="group">
                  <summary className="py-2 flex justify-between cursor-pointer text-sm font-semibold">
                    {cat.label}
                    <FiChevronDown className="transition-transform group-open:rotate-180" />
                  </summary>

                  <ul className="pl-4 space-y-2">
                    {cat.children.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm text-gray-600 block"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              );
            })}
          </div>
        </details>

        <Link
          href="/start-your-brand"
          onClick={() => setMobileOpen(false)}
          className="block px-4 py-3 border-b font-semibold hover:bg-gray-50"
        >
          Start Your Brand
        </Link>

        <Link
          href="/reviews"
          onClick={() => setMobileOpen(false)}
          className="block px-4 py-3 border-b font-semibold hover:bg-gray-50"
        >
          Reviews
        </Link>

        <Link
          href="/Auth/register"
          onClick={() => setMobileOpen(false)}
          className="block px-4 py-3 border-b font-semibold hover:bg-gray-50"
        >
          Reseller Registration
        </Link>

        {/* Policies - FIXED: render as a vertical list with spacing so items don't collapse */}
        <details className="group border-b">
          <summary className="px-4 py-3 font-semibold flex justify-between cursor-pointer">
            {POLICIES.label}
            <FiChevronDown className="transition-transform group-open:rotate-180" />
          </summary>

          <div className="px-4 pb-3">
            <ul className="flex flex-col gap-2">
              {POLICIES.items.map((p) => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm text-gray-600 hover:text-gray-900 px-2 py-1"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </details>

        <Link
          href="/contact"
          onClick={() => setMobileOpen(false)}
          className="block px-4 py-3 border-b font-semibold hover:bg-gray-50"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );

  /* --------------------- HEADER WRAPPER ------------------------- */

  return (
    <header className="sticky top-0 bg-white/95 border-b backdrop-blur z-40 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">

        {/* DESKTOP */}
        <div className="hidden lg:flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logoSrc}
              alt="Vevo Knits Garments"
              width={100}
              height={40}
              className="h-auto"
            />
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-5">
            <DesktopProductsMenu />
            <Link href="/start-your-brand" className="font-semibold hover:text-black/80">
              Start Your Brand
            </Link>
            <Link href="/reviews" className="font-semibold hover:text-black/80">
              Reviews
            </Link>
            <Link href="/Auth/register" className="font-semibold hover:text-black/80">
              Reseller Registration
            </Link>
            <DesktopPoliciesMenu />
            <Link href="/contact" className="font-semibold hover:text-black/80">
              Contact Us
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <FiSearch size={18} />
            </button>
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-md">
              <FiShoppingBag size={18} />
            </Link>
          </div>
        </div>

        {/* MOBILE */}
        <div className="lg:hidden h-16 flex items-center justify-between">

          <button
            className="p-2 hover:bg-gray-100 rounded-md"
            onClick={() => setMobileOpen((s) => !s)}
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image src={logoSrc} width={70} height={30} alt="Logo" />
          </Link>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <FiSearch size={18} />
            </button>
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-md">
              <FiShoppingBag size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={cx(
          "lg:hidden overflow-hidden border-t bg-white transition-[max-height]",
          mobileOpen ? "max-h-[80vh]" : "max-h-0"
        )}
      >
        <MobileAccordion />
      </div>
    </header>
  );
}
