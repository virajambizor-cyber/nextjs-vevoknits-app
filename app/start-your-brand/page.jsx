// app/start-your-brand/page.jsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function StartYourBrandPage() {
  return (
    <main className="min-h-screen bg-[#FAF5EF]">

      {/* HERO SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Build Your T-Shirt Brand <br />
            with Zero Inventory.
          </h1>

          <p className="text-gray-700 text-base md:text-lg">
            We provide premium-quality blank T-shirts so you can create, print, 
            and grow your brand without worrying about manufacturing or stock.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="https://wa.me/918710000817?text=Hi%2C%20I%20want%20to%20start%20my%20own%20T-shirt%20brand"
              target="_blank"
              className="px-6 py-3 rounded-md bg-black text-white font-semibold hover:bg-gray-800 transition"
            >
              Get Brand Quote
            </Link>

            <Link
              href="/Auth/register"
              className="px-6 py-3 rounded-md border border-black text-black font-semibold hover:bg-black hover:text-white transition"
            >
              Become a Reseller
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/assets/Images/model-lineup.png"
            alt="Start your brand"
            width={600}
            height={450}
            priority
            className="rounded-lg object-cover w-[90%] md:w-full"
          />
        </div>
      </section>


      {/* HOW IT WORKS */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10">
            How Your Brand Starts With Us
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="p-6 rounded-xl border bg-[#FAF5EF] shadow-sm">
              <h3 className="text-xl font-semibold mb-3">1. Choose Your Blanks</h3>
              <p className="text-gray-600">
                Pick from premium-quality polo, round-neck, and hoodie blanks in multiple GSM and colors.
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-[#FAF5EF] shadow-sm">
              <h3 className="text-xl font-semibold mb-3">2. Add Your Branding</h3>
              <p className="text-gray-600">
                Print, embroider, or customize your blanks with your logo, graphics, or brand identity.
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-[#FAF5EF] shadow-sm">
              <h3 className="text-xl font-semibold mb-3">3. Launch & Grow</h3>
              <p className="text-gray-600">
                Launch your brand instantly—no manufacturing delays, minimum order limits, or inventory cost.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* WHY CHOOSE US */}
      <section className="py-16 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
            Why Brands Choose Our Blanks
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="p-6 bg-[#FAF5EF] border rounded-xl shadow-sm">
              <h4 className="font-semibold text-lg mb-2">Premium Quality & Fit</h4>
              <p className="text-gray-600">
                Our garments are soft, durable, and designed for perfect everyday comfort.
              </p>
            </div>

            <div className="p-6 bg-[#FAF5EF] border rounded-xl shadow-sm">
              <h4 className="font-semibold text-lg mb-2">Fast Bulk Availability</h4>
              <p className="text-gray-600">
                Stock ready to ship across India—no production delays.
              </p>
            </div>

            <div className="p-6 bg-[#FAF5EF] border rounded-xl shadow-sm">
              <h4 className="font-semibold text-lg mb-2">Perfect for Printing</h4>
              <p className="text-gray-600">
                Compatible with DTG, DTF, screen printing, vinyl, and embroidery.
              </p>
            </div>

            <div className="p-6 bg-[#FAF5EF] border rounded-xl shadow-sm">
              <h4 className="font-semibold text-lg mb-2">No Inventory Needed</h4>
              <p className="text-gray-600">
                Start your brand without storage, manufacturing, or MOQ headaches.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* CTA SECTION */}
      <section className="py-16 bg-[#FAF5EF]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to Start Your Brand?
          </h2>
          <p className="text-gray-700 mb-8">
            Get expert support, premium blanks, and fast delivery for your brand.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="https://wa.me/918710000817?text=Hi%2C%20I%20want%20to%20start%20my%20brand"
              target="_blank"
              className="px-8 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition"
            >
              Chat on WhatsApp
            </Link>

            <Link
              href="/collections/polo"
              className="px-8 py-3 rounded-full border border-black text-black font-semibold hover:bg-black hover:text-white transition"
            >
              Browse Blanks
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
