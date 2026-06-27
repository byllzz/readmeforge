import { useState, useEffect, useRef } from 'react';
import LoginModal from './LoginModal';
import LandingNavbar from './LandingNavbar';
import { ReadmeForgeLogo } from './LandingIcons';

function useTypingEffect(phrases, { typeSpeed = 60, deleteSpeed = 35, pauseMs = 2000 } = {}) {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = phrases[phraseIdx];
    if (!deleting && charIdx < current.length) {
      timeoutRef.current = setTimeout(
        () => {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        },
        typeSpeed + Math.random() * 30,
      );
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

function SplitHero({ onLogin, inputRef }) {
  const phrases = [
    'beautiful docs\nwith zero effort.',
    'docs that speak\nfor themselves.',
    'GitHub profiles\nthat stand out.',
    'READMEs\nin minutes.',
    'project pages\ndevs will love.',
  ];

  const typed = useTypingEffect(phrases, { typeSpeed: 55, deleteSpeed: 30, pauseMs: 2200 });

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden  w-full mx-auto max-w-[1300px]">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'linear-gradient(to right, transparent 45%, black 80%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 45%, black 80%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 sm:px-10 md:px-16 top-8 md:top-0 md:py-28 ">
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
            Build beautiful README.md docs with zero efforts
          </p>

          <LoginModal inline inputRef={inputRef} onLogin={onLogin} onClose={() => {}} />
        </div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center px-6 sm:px-10 md:px-16 pb-20 pt-5 md:pt-0 md:py-28 w-full">
        <p className="text-[14px] flex items-center gap-2 text uppercase relative top-15 font-bold">
          <ReadmeForgeLogo />
          ReadmeForge
        </p>

        <div className="min-h-[200px] md:min-h-[260px] flex items-start relative top-19">
          <h2
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            className="text-[clamp(36px,4.8vw,60px)] font-normal text-center leading-[1.12] tracking-[-0.03em] text-gray-900 m-0 whitespace-pre-line"
          >
            {'Build '}
            {typed}
            {/* <span
              className="inline-block w-[3px] rounded-[1px] bg-violet-600 ml-[3px] align-bottom"
              style={{ height: '0.82em', animation: 'blink 1s step-end infinite' }}
            /> */}
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
    <div className="h-screen relative antialiased overflow-auto lg:overflow-hidden">
      <LandingNavbar onSignIn={handleSignIn} />
      <SplitHero onLogin={onLogin} inputRef={inputRef} />
    </div>
  );
}
