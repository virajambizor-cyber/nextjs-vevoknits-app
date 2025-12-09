// app/policies/cookies/page.jsx
export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Cookies Policy</h1>
          <p className="text-gray-600">
            This Cookies Policy explains how we use cookies and similar tracking technologies when you visit and use our website.
            It describes what cookies are, how we use them, and how you can manage them.
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">What are cookies?</h2>
          <p className="text-gray-700 leading-relaxed">
            Cookies are small text files placed on your device (computer, tablet or mobile) by the websites you visit.
            They are widely used to make websites work — or work more efficiently — and to provide information to the site owners.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Why we use cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            We use cookies to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Remember your preferences and settings so we can personalize your experience.</li>
            <li>Measure and improve site performance and usability.</li>
            <li>Provide basic security and anti-fraud protections.</li>
            <li>Support marketing and analytics to show relevant content and ads.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Types of cookies we use</h2>

          <div className="mb-4">
            <h3 className="text-lg font-medium mb-1">1. Essential cookies</h3>
            <p className="text-gray-700 leading-relaxed">
              These cookies are necessary for the website to operate and cannot be switched off in our systems.
              They enable core functionality such as navigation, access to secure areas, and basic site features.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium mb-1">2. Performance cookies</h3>
            <p className="text-gray-700 leading-relaxed">
              Performance cookies collect anonymous information about how visitors use our site — for example which pages are visited most often.
              We use this data to improve the way our site works.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium mb-1">3. Functional cookies</h3>
            <p className="text-gray-700 leading-relaxed">
              Functional cookies allow the website to remember choices you make (such as language or region) and provide enhanced, personalized features.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-1">4. Marketing &amp; targeting cookies</h3>
            <p className="text-gray-700 leading-relaxed">
              These cookies are used to deliver advertising that is more relevant to you and your interests and to limit the number of times you see an ad.
              They may be set by third-party advertising networks with our permission.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Third-party cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            Some cookies are set by third parties (for example analytics and advertising partners). These third parties may use cookies to collect information
            about your online activities across different websites and services to build a profile of your interests.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We do not control third-party cookies. For more details on how third parties use cookies and how to opt out, please refer to their privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">How to control and delete cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            You can manage cookies in several ways:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-3">
            <li>Use your browser settings to block or delete cookies. Each browser provides controls — see your browser’s “Help” for instructions.</li>
            <li>Use in-page cookie controls if available (for example a consent banner you may have seen when first visiting the site).</li>
            <li>To opt out of targeted advertising, you can visit industry opt-out pages such as <a className="underline text-gray-800" href="https://www.youronlinechoices.com/" target="_blank" rel="noreferrer">Your Online Choices</a>.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Note: blocking or deleting cookies may affect the functionality of the site and limit your ability to use certain features.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Retention</h2>
          <p className="text-gray-700 leading-relaxed">
            Cookie retention periods vary — some cookies expire at the end of your browsing session (session cookies), while others remain on your device for longer
            (persistent cookies). Specific retention periods are determined by the cookie owner (us or a third party).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Changes to this policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Cookies Policy from time to time. When we make changes, we will revise the “last updated” date and, where appropriate, notify users.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have questions about our cookies or this policy, please contact us at:
          </p>
          <address className="not-italic mt-3 text-gray-700">
            <div>Vevo Knits Garments</div>
            <div>Email: <a href="mailto:hello@example.com" className="underline text-gray-800">hello@example.com</a></div>
          </address>
        </section>

        <footer className="border-t pt-6 text-sm text-gray-600">
          <div>Last updated: {new Date().toLocaleDateString()}</div>
        </footer>
      </div>
    </main>
  );
}
