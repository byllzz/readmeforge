import { useState } from "react";
import { FaGithub, } from "react-icons/fa";

import logo from '../../assets/favicon.svg'

export default function LoginScreen({ onLogin }) {
  // Pre-filled with demo email to match original behavior
  const [email, setEmail] = useState("demo@gmail.com");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    onLogin(email.trim());
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-[440px]">
        {/* Main Header */}
        <h1 className="text-[38px] font-bold tracking-tight text-black mb-4">
          Login
        </h1>

        <p className="text-[16px] text-gray-800 mb-4">
          Click the button below to log in.
        </p>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-black text-white rounded-full px-7 py-2.5 text-[15px] font-medium
                     hover:bg-gray-800 transition-colors disabled:opacity-60"
        >
          {submitting ? "Logging in..." : "Click to log in"}
        </button>

        {/* Optional Email Input (Styled like the code box) */}
        <div className="mt-6">
          <p className="text-[16px] text-gray-800 mb-3">
            Or, enter your email address:
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#f4f4f5] rounded-2xl px-5 py-4 text-base font-medium
                       text-gray-800 placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-black/5 transition-shadow"
          />
        </div>

        <p className="text-[14px] text-gray-400 mt-5 leading-relaxed">
          If you didn't try to log in, you can safely ignore this page.
        </p>

        {/* Brand Footer */}
        <div className="mt-14 pt-6 border-t border-gray-200">
          <div className="flex flex-col items-start gap-2 mb-3">
            <div className="w-8 h-8 bg-black flex items-center justify-center rounded-md">
              <img src={logo} alt="Readmeforge Logo" />
            </div>
            <span className="text-[15px] font-medium text-black">
              ReadmeForge
            </span>
          </div>

          <p className="text-[14px] text-gray-500 leading-relaxed mb-3">
            ReadmeForge - the simplest way to build beautiful READMEs.
          </p>

          <p className="text-[14px] text-gray-400 mb-5">
            Having trouble? Visit our{" "}
            <button
            disabled
              href="#"
              className="underline cursor-not-allowed decoration-gray-300 hover:decoration-gray-500"
            >
              Help Center
            </button>{" "}
            or{" "}
            <button
              href="#"
              className="underline cursor-not-allowed decoration-gray-300 hover:decoration-gray-500"
            >
              contact us
            </button>
          </p>

          <div className="flex items-center gap-4 text-gray-400">
            <a
              href="https://github.com/byllzz/readmeforge"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              title="View on GitHub"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
