// app/about/page.jsx

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <section className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">
            About Us
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Premium blanks, built for brands that take details seriously.
          </h1>
          <p className="text-gray-600 max-w-2xl">
            We create high–quality blank apparel that lets your brand, artwork,
            or message sit at the centre. From fabric selection to final
            finishing, every piece is made to look good, feel better, and last
            longer.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="max-w-6xl mx-auto px-4 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Our story
            </h2>
            <p className="text-gray-600 mb-4">
              We started with a simple frustration — it was hard to find
              premium-quality blank apparel that actually felt good, fit well,
              and could stand up to real-world use. Most options were either too
              basic, too flimsy, or inconsistent from batch to batch.
            </p>
            <p className="text-gray-600 mb-4">
              So we decided to build our own line of blanks: thoughtfully
              designed, size-consistent, and ready for printing or embroidery.
              Today, we work with creators, brands, agencies, and businesses who
              want clean, elevated blanks that match the quality of their work.
            </p>
            <p className="text-gray-600">
              Every product we launch is tested, refined, and reworked until it
              passes our own “would we wear this every day?” test. If the
              answer&apos;s no, it doesn&apos;t go into production.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white border shadow-sm p-5">
              <p className="text-xs font-semibold tracking-wide uppercase text-gray-500 mb-2">
                For brands & creators
              </p>
              <p className="text-sm text-gray-700">
                Clean silhouettes, modern fits, and colours that work perfectly
                with screen printing, DTG, DTF, and embroidery.
              </p>
            </div>

            <div className="rounded-2xl bg-white border shadow-sm p-5">
              <p className="text-xs font-semibold tracking-wide uppercase text-gray-500 mb-2">
                Built for bulk
              </p>
              <p className="text-sm text-gray-700">
                Consistent sizing and reliable fabric quality make reordering
                easy — no surprises between batches.
              </p>
            </div>

            <div className="rounded-2xl bg-white border shadow-sm p-5">
              <p className="text-xs font-semibold tracking-wide uppercase text-gray-500 mb-2">
                Thoughtful details
              </p>
              <p className="text-sm text-gray-700">
                From neck tapes to stitch density, we obsess over small details
                so your final product feels premium in hand.
              </p>
            </div>

            <div className="rounded-2xl bg-white border shadow-sm p-5">
              <p className="text-xs font-semibold tracking-wide uppercase text-gray-500 mb-2">
                Reliable service
              </p>
              <p className="text-sm text-gray-700">
                Clear communication, realistic timelines, and support for your
                bulk orders, samples, and repeat runs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS / HIGHLIGHTS */}
      <section className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <p className="text-3xl md:text-4xl font-semibold mb-1">5K+</p>
              <p className="text-sm text-gray-300">
                Pieces shipped for brands, creators & agencies.
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-semibold mb-1">20+</p>
              <p className="text-sm text-gray-300">
                Base styles across tees, polos & hoodies.
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-semibold mb-1">30+</p>
              <p className="text-sm text-gray-300">
                Colour options crafted for branding and merch.
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-semibold mb-1">100%</p>
              <p className="text-sm text-gray-300">
                Focus on quality, fit and repeatable production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-14 md:py-16">
        <div className="mb-8 md:flex md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              What we stand for
            </h2>
            <p className="text-gray-600 max-w-xl">
              Our products are simple by design — but the thinking, testing, and
              engineering behind them is not. These principles guide every
              collection we release.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white border shadow-sm p-6">
            <p className="text-xs font-semibold tracking-wide uppercase text-gray-500 mb-2">
              Quality first
            </p>
            <p className="text-sm text-gray-700">
              We choose fabrics, dyes, and trims that can handle everyday wear,
              multiple washes, and heavy branding work.
            </p>
          </div>

          <div className="rounded-2xl bg-white border shadow-sm p-6">
            <p className="text-xs font-semibold tracking-wide uppercase text-gray-500 mb-2">
              Honest fits
            </p>
            <p className="text-sm text-gray-700">
              Our sizing is tested on real people, not just spec sheets. The
              goal: pieces that feel good the moment you put them on.
            </p>
          </div>

          <div className="rounded-2xl bg-white border shadow-sm p-6">
            <p className="text-xs font-semibold tracking-wide uppercase text-gray-500 mb-2">
              Long-term partners
            </p>
            <p className="text-sm text-gray-700">
              We don&apos;t just sell blanks — we help you build a reliable base
              for your merch line, uniforms, or brand wardrobe.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-14">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                Ready to build with better blanks?
              </h2>
              <p className="text-gray-600 max-w-xl">
                Whether you&apos;re planning a new merch drop, uniforms for your
                team, or a full product line, we&apos;re here to help you choose
                the right styles, colours, and quantities.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              {/* WhatsApp link opens in new tab */}
              <a
                href="https://wa.me/918710000817?text=Hi%2C%20I%20would%20like%20a%20bulk%20quote%20for%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-5 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-900 inline-flex items-center justify-center"
              >
                Get bulk quote
              </a>

              {/* Internal Link to homepage */}
              <Link href="/" className="w-full md:w-auto">
                <span className="block px-5 py-2.5 rounded-full border border-gray-400 text-sm font-semibold hover:border-black text-center">
                  View catalogue
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
