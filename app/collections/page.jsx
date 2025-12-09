import Link from "next/link";
import Image from "next/image";

export default function CollectionsPage() {
  const collections = [
    {
      name: "Polo T-Shirts",
      slug: "polo",
      description: "Premium polo T-shirts made from high-quality fabric.",
      banner: "/Images/polo-banner.jpg",
    },
    {
      name: "Hoodies",
      slug: "hoodies",
      description: "Comfortable winter hoodies with premium stitching.",
      banner: "/Images/hoodies-banner.jpg",
    },
    {
      name: "Round Neck T-Shirts",
      slug: "round-neck",
      description: "Soft and stylish round-neck blank T-shirts.",
      banner: "/Images/roundneck-banner.jpg",
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Collections</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {collections.map((c) => (
          <Link
            key={c.slug}
            href={`/collections/${c.slug}`}
            className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <Image
              src={c.banner}
              alt={c.name}
              width={500}
              height={300}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{c.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{c.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
