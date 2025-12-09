"use client";

import { FiBox, FiDollarSign, FiTag, FiTruck } from "react-icons/fi";

const FEATURES = [
  {
    icon: <FiBox className="text-3xl text-gray-800" />,
    title: "Ready Stock in All Colors",
  },
  {
    icon: <FiDollarSign className="text-3xl text-gray-800" />,
    title: "Affordable Bulk Pricing",
  },
  {
    icon: <FiTag className="text-3xl text-gray-800" />,
    title: "Your Label. Your Brand.",
  },
  {
    icon: <FiTruck className="text-3xl text-gray-800" />,
    title: "Next-Day Dispatch",
  },
];

export default function WhyResellersChooseUs() {
  return (
    <section className="bg-[#FFF7ED] py-16">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-12">
          Why Resellers Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center
                         transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="bg-gray-100 p-6 rounded-full mb-5 flex items-center justify-center">
                {feature.icon}
              </div>
              <p className="text-gray-800 font-semibold text-lg">
                {feature.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
