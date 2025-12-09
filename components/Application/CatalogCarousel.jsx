"use client";

import Image from "next/image";

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

export default function CatalogCarousel() {
  return (
    <section className="bg-[#FAF6F2] py-14 w-full">
      <div className="max-w-[1500px] mx-auto px-6">
        <p className="text-center text-gray-700 text-lg mb-8">
          Check our awesome apparel catalogue with new branding, style and colours.
        </p>

        {/* Scrollable container */}
        <div className="overflow-x-auto pb-6 scrollbar-hide">
          <div className="flex gap-6 min-w-full w-max px-2">
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
  );
}
