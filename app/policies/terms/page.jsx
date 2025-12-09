// app/policies/terms/page.jsx

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Terms & Conditions</h1>
          <p className="text-gray-600">
            Please read these terms carefully before using our website or purchasing any products.
          </p>
        </header>

        {/* SECTION: ACCEPTANCE */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using our website, you agree to be bound by these Terms & Conditions.
            If you do not agree, please discontinue using the website immediately.
          </p>
        </section>

        {/* SECTION: PRODUCTS */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">2. Products & Services</h2>
          <div className="text-gray-700 space-y-4 leading-relaxed">
            <p>
              All products listed on our website are subject to availability. We reserve the right to modify, discontinue, 
              or update any product without prior notice.
            </p>
            <p>
              Product images are for illustration only. Actual colors may vary based on screen display and lighting conditions.
            </p>
          </div>
        </section>

        {/* SECTION: PRICING */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">3. Pricing & Payments</h2>
          <div className="text-gray-700 space-y-4 leading-relaxed">
            <p>
              All prices listed are in Indian Rupees (INR) unless otherwise stated. We reserve the right to update pricing 
              at any time without notice.
            </p>
            <p>
              Orders will be processed only after full or partial payment confirmation, depending on agreed terms.
            </p>
          </div>
        </section>

        {/* SECTION: ORDERS */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">4. Order Confirmation</h2>
          <div className="text-gray-700 space-y-4 leading-relaxed">
            <p>
              Once an order is placed, you will receive a confirmation message or email. This does not guarantee product availability.
            </p>
            <p>
              We reserve the right to cancel or modify an order due to stock issues, errors in pricing, or suspected fraudulent activity.
            </p>
          </div>
        </section>

        {/* SECTION: SHIPPING */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">5. Shipping</h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              Shipping timelines may vary based on your location and courier service availability. We do not guarantee delivery dates.
            </p>
            <p>
              Delays caused by courier partners, weather, government restrictions, or unforeseen events are not our responsibility.
            </p>
          </div>
        </section>

        {/* SECTION: RETURNS */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">6. Returns & Refunds</h2>
          <p className="text-gray-700 leading-relaxed">
            Returns are accepted only under specific conditions. Please refer to our{" "}
            <a href="/policies/shipping-return" className="underline font-medium">
              Shipping & Return Policy
            </a>{" "}
            for full details.
          </p>
        </section>

        {/* SECTION: LIABILITY */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">7. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            We are not liable for any direct, indirect, incidental, or consequential damages arising from the 
            use of our products or website.
          </p>
        </section>

        {/* SECTION: PRIVACY */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">8. Privacy & Data Protection</h2>
          <p className="text-gray-700 leading-relaxed">
            Your personal information is handled in accordance with our{" "}
            <a href="/policies/privacy" className="underline font-medium">
              Privacy Policy
            </a>.
          </p>
        </section>

        {/* SECTION: CHANGES */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">9. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these Terms & Conditions at any time. Changes will be posted on this page,
            and continued use of the website indicates your acceptance.
          </p>
        </section>

        {/* SECTION: CONTACT */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Contact Information</h2>
          <p className="text-gray-700 leading-relaxed">
            For questions or concerns regarding these Terms, please contact us:
          </p>

          <address className="not-italic mt-3 text-gray-700">
            <div>Vevo Knits Garments</div>
            <div>Email: <a href="mailto:hello@example.com" className="underline">hello@example.com</a></div>
            <div>Phone: +91 98765 43210</div>
          </address>
        </section>

        {/* FOOTER */}
        <footer className="border-t mt-12 pt-6 text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </footer>
      </div>
    </main>
  );
}
