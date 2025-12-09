import "./globals.css";
import { Josefin_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";

import GlobalStoreProvider from "@/components/Application/GlobalStoreProvider";
import AnnouncementBar from "@/components/Application/AnnouncementBar";
import Header from "@/components/Application/Header";
import Footer from "@/components/Application/Footer";
// import Footer from "@/components/Application/Footer"; // ✅ Correct import

const josefinsansFont = Josefin_Sans({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Vevo Knits Garments",
  description: "One of India's Best Blank Apparel & T-shirts Supplier!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`antialiased min-h-screen flex flex-col overflow-x-hidden ${josefinsansFont.className}`}
      >
        <GlobalStoreProvider>
          {/* Top Announcement Bar */}
          <div id="app-announcement">
            <AnnouncementBar
              messages={[
                "One of India's Best Blank Apparel & T-shirts Supplier!",
                "Premium Quality Cotton | Custom Branding Available!",
                "Bulk Orders? Get Your Quote Instantly!",
              ]}
            />
          </div>

          {/* Header */}
          <div id="app-header">
            <Header
              logoSrc="/assets/Images/design.svg"
              logoHeightDesktop={46}
              logoHeightMobile={34}
            />
          </div>

          {/* Page Content: padding is driven by CSS vars that the script sets dynamically */}
          <main
            className="flex-1"
            style={{
              paddingTop:
                "calc(var(--offset-top, 0px))",
              paddingBottom:
                "calc(var(--offset-bottom, 0px))",
            }}
          >
            {children}
          </main>
          
          {/* Footer */}
          <div id="app-footer">
            <Footer
              logoSrc="/assets/Images/design.svg"
              logoAlt="Your Brand"
            />
          </div>

          {/* Toast Container */}
          <ToastContainer />

          {/* ---- Dynamic spacing calculator (no client component needed) ---- */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
(function () {
  function isFixedOrSticky(el) {
    if (!el) return false;
    var cs = window.getComputedStyle(el);
    if (cs.position === 'fixed') return true;
    if (cs.position === 'sticky' && (cs.top === '0px' || cs.top === '0')) return true;
    return false;
  }
  function measure() {
    var abWrap = document.getElementById('app-announcement');
    var headerWrap = document.getElementById('app-header');
    var footerWrap = document.getElementById('app-footer');

    var ab = abWrap ? abWrap.firstElementChild : null;
    var header = headerWrap ? headerWrap.firstElementChild : null;
    var footer = footerWrap ? footerWrap.firstElementChild : null;

    var topOffset = 0;
    if (isFixedOrSticky(ab)) topOffset += (ab?.offsetHeight || 0);
    if (isFixedOrSticky(header)) topOffset += (header?.offsetHeight || 0);

    var bottomOffset = 0;
    if (isFixedOrSticky(footer)) bottomOffset += (footer?.offsetHeight || 0);

    document.body.style.setProperty('--offset-top', topOffset + 'px');
    document.body.style.setProperty('--offset-bottom', bottomOffset + 'px');

    // Prevent horizontal scroll jitters if any child overflows
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', measure);
  } else {
    measure();
  }
  window.addEventListener('resize', function () {
    // Debounce a bit
    clearTimeout(window.__vn_reflow__);
    window.__vn_reflow__ = setTimeout(measure, 100);
  });
})();
              `,
            }}
          />
        </GlobalStoreProvider>
      </body>
    </html>
  );
}
