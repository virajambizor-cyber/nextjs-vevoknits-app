// app/policies/shipping-return/page.jsx

export default function ShippingReturnPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Shipping & Return Policy</h1>
          <p className="text-gray-600">
            Learn how we process orders, shipping timelines, return eligibility, and refund procedures.
          </p>
        </header>

        {/* SHIPPING POLICY */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Shipping Policy</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              We aim to process and ship all orders as quickly as possible. Order processing typically takes 
              <strong> 1–3 business days</strong>, depending on product availability and order volume.
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>Orders placed on weekends or holidays will be processed the next business day.</li>
              <li>Shipping timelines vary based on your location and the courier's serviceability.</li>
              <li>Once shipped, you will receive a tracking link via email or WhatsApp.</li>
              <li>Delivery may take <strong>3–7 business days</strong> within India.</li>
            </ul>

            <p>
              We are not responsible for delays caused by courier partners, weather conditions, or 
              unforeseen circumstances beyond our control.
            </p>
          </div>
        </section>

        {/* RETURN POLICY */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Return Policy</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              We accept returns only under specific conditions. Please read the return eligibility section carefully 
              before initiating a return.
            </p>

            <h3 className="text-lg font-medium">Eligibility for Returns</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Items must be unused, unwashed, and in original condition.</li>
              <li>Products should include all original packaging and tags.</li>
              <li>Returns must be requested within <strong>7 days</strong> of delivery.</li>
              <li>Custom-printed or embroidered items cannot be returned.</li>
              <li>Bulk or wholesale orders are not eligible for return unless defective.</li>
            </ul>

            <h3 className="text-lg font-medium">Non-Returnable Items</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Clearance or discounted products</li>
              <li>Customized or personalized products</li>
              <li>Used, damaged, or altered items</li>
            </ul>

            <h3 className="text-lg font-medium">Defective or Wrong Product?</h3>
            <p>
              If you received a defective or incorrect item, please contact us within 48 hours of delivery. 
              Provide clear photos and order details for quick resolution.
            </p>
          </div>
        </section>

        {/* REFUND POLICY */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Refund Policy</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Refunds are processed only after we receive and inspect the returned product. Once approved, 
              refunds will be issued within <strong>5–7 business days</strong>.
            </p>

            <p>Refunds will be credited to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Your original payment method, or</li>
              <li>As store credit (if preferred)</li>
            </ul>

            <p>
              Shipping charges, COD fees, and taxes are non-refundable unless the return is due to an error on our part.
            </p>
          </div>
        </section>

        {/* CANCELLATION POLICY */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Order Cancellation</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Orders can be cancelled only before they are shipped. Once dispatched, an order cannot be cancelled.
            </p>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Need Help?</h2>
          <p className="text-gray-700 leading-relaxed">
            For shipping or return-related questions, contact us at:
          </p>

          <address className="not-italic mt-3 text-gray-700">
            <div>Vevo Knits Garments</div>
            <div>Email: <a href="mailto:hello@example.com" className="underline">hello@example.com</a></div>
            <div>Phone: +91 98765 43210</div>
          </address>
        </section>

        <footer className="border-t mt-12 pt-6 text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </footer>
      </div>
    </main>
  );
}
