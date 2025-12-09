// components/VideoBanner.jsx (Server Component – no "use client")
export default function VideoBanner() {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      <video
        className="block w-full h-[80vh] sm:h-[85vh] lg:h-[92vh] object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        poster="/assets/Images/video-poster.jpg"
        onLoadedData={() => console.log("✅ Video loaded successfully")}
        onError={(e) => console.error("❌ Video load error:", e.currentTarget.error)}
      >
        <source src="/assets/Video/garments-hero.mp4#t=0.1" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional gradient overlay for better contrast */}
      <div className="pointer-events-none absolute inset-0 bg-black/10" />
    </section>
  );
}
