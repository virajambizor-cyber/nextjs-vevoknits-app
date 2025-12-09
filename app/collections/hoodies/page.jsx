import Image from "next/image";
import Link from "next/link";
import products from "@/data/products.json";

export default function HoodiesCollection() {
  const hoodies = products.filter((p) => p.collection === "hoodies");

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="text-4xl font-bold mb-6">Hoodies</h1>
      <p className="text-gray-600 mb-10">
        High-quality winter hoodies in premium fabrics.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {hoodies.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.slug}`}
            className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white"
          >
            <Image
              src={p.image}
              alt={p.name}
              width={400}
              height={400}
              className="w-full h-60 object-cover"
            />

            <div className="p-4">
              <h2 className="font-semibold text-lg">{p.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
