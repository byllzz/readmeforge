import { Link } from "react-router-dom";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#f5f4ef] border border-black/[0.06] flex items-center justify-center mb-6">
        <FileQuestion size={28} className="text-gray-400" />
      </div>

      <p className="text-[13px] font-semibold tracking-widest text-gray-400 uppercase mb-2">
        404
      </p>
      <h1 className="text-[26px] md:text-[32px] font-bold tracking-tight">
        This page doesn't exist
      </h1>
      <p className="mt-3 text-[14px] text-gray-500 max-w-sm leading-relaxed">
        The page you're looking for was moved, renamed, or never existed in the
        first place.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white! text-[13.5px] font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-black/10"
      >
        <ArrowLeft size={15} />
        Back to ReadmeForge
      </Link>
    </div>
  );
}
