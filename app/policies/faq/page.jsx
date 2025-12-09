export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>

      <p className="text-gray-600 mb-10">
        Find answers to common questions about our products, orders, shipping, and support.
        If you still need help, feel free to contact us anytime.
      </p>

      {/* FAQ SECTION */}
      <div className="space-y-8">

        {/* 1 */}
        <div>
          <h2 className="text-xl font-semibold">1. What products do you offer?</h2>
          <p className="text-gray-700 mt-2">
            We specialize in premium blank apparel including Polo T-Shirts, Round-Neck T-Shirts,
            Hoodies, and other customizable garments suitable for printing and embroidery.
          </p>
        </div>

        {/* 2 */}
        <div>
          <h2 className="text-xl font-semibold">2. Do you accept bulk orders?</h2>
          <p className="text-gray-700 mt-2">
            Yes! We offer competitive pricing for bulk and reseller orders. Minimum Order Quantity
            (MOQ) is 10 pieces per design/colour. For bulk quotes, contact us anytime.
          </p>
        </div>

        {/* 3 */}
        <div>
          <h2 className="text-xl font-semibold">3. How can I place an order?</h2>
          <p className="text-gray-700 mt-2">
            You can inquire via WhatsApp or email with your selected product, colours, and quantities.
            Our team will assist you with pricing, availability, and dispatch timelines.
          </p>
        </div>

        {/* 4 */}
        <div>
          <h2 className="text-xl font-semibold">4. Do you offer customization?</h2>
          <p className="text-gray-700 mt-2">
            Yes, you can add printing or embroidery to your apparel. Customization charges depend on
            design size, colors, and quantity. Contact us for a personalised quote.
          </p>
        </div>

        {/* 5 */}
        <div>
          <h2 className="text-xl font-semibold">5. What are the available sizes?</h2>
          <p className="text-gray-700 mt-2">
            We provide sizes from S to XXL depending on the product style. Detailed size charts are
            available on each product page.
          </p>
        </div>

        {/* 6 */}
        <div>
          <h2 className="text-xl font-semibold">6. What payment modes do you accept?</h2>
          <p className="text-gray-700 mt-2">
            We accept secure online payments via UPI, bank transfer, and other supported platforms.
            Orders are processed after payment confirmation.
          </p>
        </div>

        {/* 7 */}
        <div>
          <h2 className="text-xl font-semibold">7. What is the shipping timeline?</h2>
          <p className="text-gray-700 mt-2">
            Orders are usually dispatched within 2–4 working days depending on product availability.
            Delivery timelines depend on your location.
          </p>
        </div>

        {/* 8 */}
        <div>
          <h2 className="text-xl font-semibold">8. Can I return or exchange products?</h2>
          <p className="text-gray-700 mt-2">
            Returns are only accepted for manufacturing defects. All returns must be reported within
            48 hours of delivery. Customized items are not eligible for return.
          </p>
        </div>

        {/* 9 */}
        <div>
          <h2 className="text-xl font-semibold">9. Do you ship outside India?</h2>
          <p className="text-gray-700 mt-2">
            Yes, international shipping is available. Shipping rates vary based on location and order weight.
          </p>
        </div>

        {/* 10 */}
        <div>
          <h2 className="text-xl font-semibold">10. How do I contact customer support?</h2>
          <p className="text-gray-700 mt-2">
            You can reach us anytime through the following channels:
          </p>

          <ul className="text-gray-700 mt-3 space-y-1">
            <li>📞 <strong>Phone:</strong> +91 80503 66666</li>
            <li>💬 <strong>WhatsApp:</strong> +91 87100 00817</li>
            <li>📧 <strong>Email:</strong> sales@vevoknits.com</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
