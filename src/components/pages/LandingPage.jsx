import { useState, useEffect, useRef } from 'react';
import LoginModal from './LoginModal';

function useTypingEffect(phrases, { typeSpeed = 60, deleteSpeed = 35, pauseMs = 2000 } = {}) {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = phrases[phraseIdx];
    if (!deleting && charIdx < current.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, typeSpeed + Math.random() * 30);
    } else if (!deleting && charIdx === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && charIdx > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      }, deleteSpeed);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [charIdx, deleting, phraseIdx, phrases, typeSpeed, deleteSpeed, pauseMs]);

  return displayed;
}

function PillNav({ onSignIn }) {
  return (
    <div className="fixed top-2 w-full max-w-[1400px] left-1/2 -translate-x-1/2  flex justify-center z-50 px-4">
      <nav className="flex items-center justify-between gap-1 px-2 py-2 w-full">
        <div className="flex items-center gap-2 px-5 py-1">
          {/* <span className="text-lg leading-none bg-blue-500 p-3 px-2.5 rounded-[8px]">📄</span> */}
          <span className="font-medium text-[20px] tracking-tight text-gray-900">ReadmeForge</span>
        </div>

        <div className="w-px h-4 bg-black/10 mx-1" />

        {/* {['Features', 'Pricing', 'Docs'].map(link => (
          <a
            key={link}
            href="#"
            className="hidden sm:block px-3 py-1.5 rounded-full text-xs font-medium text-gray-500 hover:text-gray-900 hover:bg-black/[0.05] transition-all duration-150"
            style={{ fontFamily: 'sans-serif' }}
          >
            {link}
          </a>
        ))} */}

        <div className="hidden sm:block w-px h-4 bg-black/10 mx-1" />

        <button
          onClick={onSignIn}
          className="px-4 py-2.5 rounded-[5px]  text text-xs font-semibold hover:bg-gray-700 active:scale-95 transition-all duration-150"
        >
          Sign in
        </button>
      </nav>
    </div>
  );
}

function SplitHero({ onLogin, inputRef }) {
  const phrases = [
    'stunning READMEs\nin minutes.',
    'docs that speak\nfor themselves.',
    'GitHub profiles\nthat stand out.',
    'project pages\ndevs will love.',
    'beautiful docs\nwith zero effort.',
  ];

  const typed = useTypingEffect(phrases, { typeSpeed: 55, deleteSpeed: 30, pauseMs: 2200 });

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden bg-[#F8F8F6]">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'linear-gradient(to right, transparent 45%, black 80%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 45%, black 80%)',
        }}
      />

      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-black/[0.07] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 sm:px-10 md:px-16 pt-28 pb-10 md:py-28 top-10">
        <div className="w-full max-w-[340px]">
          <h1
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            className="text-[40px] sm:text-[50px] font-normal text-center leading-[1.15] tracking-[-0.03em] text-gray-900 mb-2.5"
          >
            Think fast,
            <br />
            build faster
          </h1>
          <p className="text-sm text-gray-400 mb-3 leading-relaxed text-center">
            Build beautiful docs with zero effort
          </p>

          <LoginModal inline inputRef={inputRef} onLogin={onLogin} onClose={() => {}} />
        </div>
      </div>

      <div className="relative top-6 z-10 flex flex-col justify-center items-center px-6 sm:px-10 md:px-16 pb-20 md:py-28 w-full">
        <p className="text-[11px] text uppercase relative top-15 font-bold">ReadmeForge</p>

        <div className="min-h-[200px] md:min-h-[260px] flex items-start relative top-20">
          <h2
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            className="text-[clamp(36px,4.8vw,60px)] font-normal text-center leading-[1.12] tracking-[-0.03em] text-gray-900 m-0 whitespace-pre-line"
          >
            {'Build '}
            {typed}
            <span
              className="inline-block w-[3px] rounded-[1px] bg-violet-600 ml-[3px] align-bottom"
              style={{ height: '0.82em', animation: 'blink 1s step-end infinite' }}
            />
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {['Drag & drop blocks', 'Live preview', 'One-click export', 'Works offline'].map(tag => (
            <span
              key={tag}
              className="px-3 py-1.5 text-[11px] text bg-black text-white shadow-2xl rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="absolute bottom-12 left-16 right-16 h-px opacity-40"
          style={{ background: 'linear-gradient(90deg, #7c3aed44, transparent)' }}
        />
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
}

export default function LandingPage({ onLogin }) {
  const inputRef = useRef(null);

  function handleSignIn() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => inputRef.current?.focus(), 300);
  }

  return (
    <div className="min-h-screen antialiased">
      <PillNav onSignIn={handleSignIn} />
      <SplitHero onLogin={onLogin} inputRef={inputRef} />
    </div>
  );
}
