import { useState } from 'react';
import { ReadmeForgeLogo } from './LandingIcons';

export default function LandingNavbar({ onSignIn }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // const navLinks = ['Product', 'Features', 'Pricing', 'Resources'];

  return (
    <nav className="sticky top-0 z-50 bg-[#f5f4ef]/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <ReadmeForgeLogo size={22} className="text-gray-900" />
          <span className="ml-1.5 text-lg font-semibold tracking-tight">ReadmeForge</span>
        </div>

        {/* Desktop navigation */}
        {/* <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          {navLinks.map((item) => (
            <button key={item} className="hover:text-gray-900 flex items-center gap-1">
              {item}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          ))}
        </div> */}

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/byllzz/readmeforge.git"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-600 border border-gray-300 rounded-[8px] px-4 py-2 hover:bg-gray-100 hover:text-black transition"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            Star on Github
          </a>
          <button
            onClick={onSignIn}
            className="text-sm text-white! bg-black! rounded-[8px] px-4 py-2 hover:bg-gray-800 transition font-medium"
          >
            Try ReadmeForge
          </button>
        </div>

        {/* Hamburger button (mobile) */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-[#f5f4ef] px-6 py-4 space-y-4">
          {/* <div className="flex flex-col gap-2">
            {navLinks.map(item => (
              <button
                key={item}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-gray-700 hover:text-gray-900 py-2 text-left flex items-center gap-1"
              >
                {item}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            ))}
          </div> */}
          <div className="flex flex-col gap-3 pt-3 border-t border-gray-200">
            <a
              href="https://github.com/byllzz/readmeforge.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm text-gray-600 border border-gray-300 rounded-[8px] px-4 py-2 hover:bg-gray-100 hover:text-black transition"
              onClick={() => setMobileOpen(false)}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Star on Github
            </a>
            <button
              onClick={() => {
                setMobileOpen(false);
                onSignIn?.();
              }}
              className="text-sm text-white bg-black rounded-[8px] px-4 py-2 hover:bg-gray-800 transition font-medium"
            >
              Try ReadmeForge
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
