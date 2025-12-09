"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-[#FAF5EF] overflow-hidden">
      <div className="mx-auto max-w-[1200px] flex flex-col-reverse md:flex-row items-center justify-between py-12 md:py-20 px-6 md:px-10">
        
        {/* Left Text Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-left space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
            Start Your T-Shirt Brand. <br className="hidden md:block" />
            Without Inventory.
          </h1>

          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Buy ready blank T-shirts in bulk & start printing your brand instantly.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">

            {/* ✅ UPDATED BUTTON — Get Quote + WhatsApp Redirect */}
            <Link
              href="https://wa.me/919999225725?text=Hi%2C%20I%20want%20a%20bulk%20quote%20for%20T-shirts"
              target="_blank"
              className="bg-black text-white px-6 py-3 rounded-md text-sm md:text-base font-semibold hover:bg-gray-800 transition"
            >
              Get Quote
            </Link>

            {/* Reseller Button — unchanged */}
            <Link
              href="/Auth/register"
              className="border border-black text-black px-6 py-3 rounded-md text-sm md:text-base font-semibold hover:bg-black hover:text-white transition"
            >
              Become a Reseller
            </Link>

          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0">
          <Image
            src="/assets/Images/Quality image copy.png"
            alt="Blank T-shirt model"
            width={600}
            height={450}
            priority
            className="object-cover h-auto w-[90%] md:w-full rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
