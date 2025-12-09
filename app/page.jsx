// app/page.jsx  (Server Component – no "use client")
import Image from "next/image";
import Link from "next/link";
import { FiBox, FiDollarSign, FiTag, FiTruck } from "react-icons/fi";

export const metadata = {
  title: "Vevo Knits Garments",
  description: "One of India's Best Blank Apparel & T-shirts Supplier!",
};

export default function Home() {
  const catalogs = [
    {
      title: "Hayati Polo Premium",
      image: "/assets/Images/HayatiPoloPremium.jpg",
      pdf: "/assets/Cataloge/HAYATI POLO PREMIUM .pdf",
    },
    {
      title: "Mexmy Polo T-Shirts",
      image: "/assets/Images/mexmyPolo.jpg",
      pdf: "/assets/Cataloge/MEXMY POLO.pdf",
    },
    {
      title: "Axroo Cotton Polo",
      image: "/assets/Images/AxrooCottonPolo.jpg",
      pdf: "/assets/Cataloge/AXROO COTTON POLO PROMOTIONAL.pdf",
    },
    {
      title: "Muskox Premium Hoody",
      image: "/assets/Images/muskoxhoody.jpg",
      pdf: "/assets/Cataloge/MUSKOX HOODIES .pdf",
    },
    {
      title: "Hayati 160GSM",
      image: "/assets/Images/hayati160GSM.jpg",
      pdf: "/assets/Cataloge/HAYATI 160 GSM .pdf",
    },
    {
      title: "Hayati Premium 180GSM",
      image: "/assets/Images/hayatipremium180GSM.jpg",
      pdf: "/assets/Cataloge/HAYATI PREMIUM 180 GSM .pdf",
    },
  ];

  return (
    <main className="bg-[#FAF6F2]">
      {/* HERO SECTION */}
      <section className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-10 lg:py-16">
          {/* Model image */}
          <div className="order-1 lg:order-2 w-full lg:w-1/2 flex justify-center">
            <Image
              src="/assets/Images/Quality%20image%20copy.png"
              alt="Premium blank apparel model"
              width={800}
              height={900}
              priority
              className="w-[92%] sm:w-[85%] lg:w-full max-w-[780px] h-auto object-contain"
            />
          </div>

          {/* Text content */}
          <div className="order-2 lg:order-1 max-w-xl w-full text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
              Start Your T-Shirt Brand.
              <br />
              Without Inventory.
            </h1>

            <p className="text-lg text-gray-600 mb-10">
              Buy ready blank T-shirts in bulk &amp; start printing your brand instantly.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                href="/collections/polo"
                className="px-8 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
              >
                Shop Blanks
              </Link>
              <Link
                href="/Auth/register"
                className="px-8 py-3 border border-black text-black font-semibold rounded-md hover:bg-black hover:text-white transition"
              >
                Become a Reseller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-[#FFF7ED] py-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-12">
            Why Resellers Choose Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FiBox, title: "Ready Stock in All Colors" },
              { icon: FiDollarSign, title: "Affordable Bulk Pricing" },
              { icon: FiTag, title: "Your Label. Your Brand." },
              { icon: FiTruck, title: "Next-Day Dispatch" },
            ].map(({ icon: Icon, title }, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center
                           transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="bg-gray-100 p-6 rounded-full mb-5 flex items-center justify-center 
                                transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon className="text-3xl text-gray-800" />
                </div>
                <p className="text-gray-800 font-semibold text-lg">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-WIDTH CATALOG SECTION */}
      <section className="bg-[#FAF6F2] py-14 w-full">
        <div className="max-w-[1500px] mx-auto px-6">
          <p className="text-center text-gray-700 text-lg mb-8">
            Check our awesome apparel catalogue with new branding, style and colours.
          </p>

          <div className="overflow-x-auto pb-6 scrollbar-hide">
            <div className="flex gap-6 min-w-full w-max px-2 justify-start">
              {catalogs.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center justify-between 
                             w-[260px] sm:w-[280px] flex-shrink-0 text-center transition-all duration-300 
                             hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative w-full h-[340px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain rounded-xl"
                    />
                  </div>
                  <h3 className="mt-4 font-bold text-lg text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">MOQ : 10</p>
                  <a
                    href={item.pdf}
                    download
                    className="px-5 py-2.5 bg-black text-white rounded-md text-sm font-semibold hover:bg-gray-800 transition-all"
                  >
                    Get Catalog
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES / WHAT WE DO ===== */}
      <section className="bg-[#FAF6F2] py-16 w-full">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-6 lg:px-10 text-center">
          {/* Centered Heading + Subtext */}
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-gray-800">
            Everything you need in one place for making Garments
          </h2>
          <hr className="mt-4 mb-6 border-gray-300/50 mx-auto w-[90%] lg:w-[70%]" />
          <p className="text-[18px] sm:text-[20px] text-gray-600 mb-10 max-w-[900px] mx-auto">
            We’re a clothing manufacturer group focused on high-quality apparel, branding, and fast
            turnarounds — built to fit your business.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* Card 1 */}
            <article className="group bg-white rounded-3xl overflow-hidden ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-[260px] sm:h-[320px] lg:h-[360px] overflow-hidden">
                <Image
                  src="/assets/Images/knitting.jpg"
                  alt="Knitting & garment development machinery"
                  fill
                  priority
                  className="object-cover brightness-[0.92] saturate-75 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="text-[22px] sm:text-[24px] font-semibold text-gray-800">
                  Development From Scratch
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  Fully custom garments designed and produced to your spec—jackets, chinos, sportswear and more.
                </p>
                <p className="mt-3 text-gray-500 italic">
                  MOQ: Starts at 150 pieces per model/color
                </p>
              </div>
            </article>

            {/* Card 2 */}
            <article className="group bg-white rounded-3xl overflow-hidden ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-[260px] sm:h-[320px] lg:h-[360px] overflow-hidden">
                <Image
                  src="/assets/Images/printing.jpg"
                  alt="Screen printing / branding on blank apparel"
                  fill
                  className="object-cover brightness-[0.92] saturate-75 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="text-[22px] sm:text-[24px] font-semibold text-gray-800">
                  Blanks Customization
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  Personalize our premium blanks with prints, embroidery, labeling and packaging—done right and on time.
                </p>
                <p className="mt-3 text-gray-500 italic">
                  MOQ: 100 pieces per model/color
                </p>
              </div>
            </article>

            {/* Card 3 */}
            <article className="group bg-white rounded-3xl overflow-hidden ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-[260px] sm:h-[320px] lg:h-[360px] overflow-hidden">
                <Image
                  src="/assets/Images/hoodies.jpg"
                  alt="Premium hoodies and blanks ready to brand"
                  fill
                  className="object-cover brightness-[0.92] saturate-75 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="text-[22px] sm:text-[24px] font-semibold text-gray-800">
                  Shop Blanks
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  High-quality, ready-to-brand tees & hoodies with fast dispatch and consistent sizing/quality.
                </p>
                <p className="mt-3 text-gray-500 italic">
                  No MOQ • Ready stock in popular colors
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
{/* === VIDEO BANNER (full-width, responsive) === */}
<section className="relative w-full bg-black overflow-hidden">
  <video
    src="/assets/Video/garments-hero.mp4#t=0.1"
    className="block w-full h-[70vh] sm:h-[82vh] lg:h-[92vh] object-cover"
    muted
    autoPlay
    playsInline
    loop
    preload="auto"
    controls={false}
    poster="/assets/Images/video-poster.jpg"  // optional; remove if not available
    crossOrigin="anonymous"
  >
    Your browser does not support the video tag.
  </video>

  {/* Optional subtle overlay for contrast */}
  {/* <div className="pointer-events-none absolute inset-0 bg-black/10" /> */}
</section>

{/* ===== Hero: Luxury Blanks (India) — fixed mobile overflow ===== */}
<section className="w-full bg-[#FAF6F2] overflow-x-clip">
  <div className="w-full mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center py-12 lg:py-16">

      {/* Copy */}
      <div className="text-center lg:text-left">
        <p className="text-sm sm:text-base text-gray-500 mb-3">
          Available DTG | Screen Print | Embroidery | Labelling Service.
        </p>

        <h1 className="text-4xl sm:text-5xl xl:text-[56px] font-bold leading-tight text-[#1F2937]">
          Organic Luxury Blanks
          <span className="block">Crafted in India.</span>
        </h1>

        <p className="mt-6 text-gray-600 text-base sm:text-lg">
          Specialised in premium clothing. No minimum quantities in store.
        </p>

        <div className="mt-8 flex justify-center lg:justify-start">
          <Link
            href="/collections/polo"
            className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition"
          >
            Shop Luxury Blanks <span className="ml-2">→</span>
          </Link>
        </div>
      </div>

      {/* Image (no absolute/negative offsets; cannot overflow) */}
      <div className="relative w-full">
        <div className="relative mx-auto w-full max-w-[720px]">
          <Image
            src="/assets/Images/model-lineup.png"
            alt="Models wearing premium blanks"
            width={1200}
            height={800}
            priority
            sizes="100vw"
            className="block w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  </div>
</section>

    </main>
  );
}
