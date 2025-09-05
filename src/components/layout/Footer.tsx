import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="border-t border-slate-200/60 dark:border-slate-800/60"
      style={{
        background: `radial-gradient(
        1200px 600px at 10% 10%,
        rgba(99, 102, 241, 0.15),
        transparent
      ),
      radial-gradient(
        1000px 600px at 90% 20%,
        rgba(6, 182, 212, 0.15),
        transparent
      ),
      var(--background)`,
      }}
    >
      <div className="container-responsive py-16 sm:py-20">
        {/* Main Footer Content */}
        <div className="space-y-8 sm:space-y-12">
          {/* Brand Section */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-800 dark:text-slate-100 mb-4">
              <span className="text-2xl sm:text-3xl font-bold heading-gradient">
                EduConnect
              </span>
            </div>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto sm:mx-0">
              Discover, compare, and book college services with confidence. Your
              gateway to educational excellence.
            </p>
            <div className="mt-6">
              <p className="text-sm text-slate-500 dark:text-slate-500">
                Trusted by thousands of students worldwide
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-3 lg:gap-8">
            {/* Product Links */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-4">
                Product
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 block py-1"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/colleges"
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 block py-1"
                  >
                    Colleges
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admission"
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 block py-1"
                  >
                    Admission
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 block py-1"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 block py-1"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 block py-1"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="col-span-2 lg:col-span-1">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 block py-1"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 block py-1"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 block py-1"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-500">
              © {new Date().getFullYear()} EduConnect. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-slate-500 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm text-slate-500 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
