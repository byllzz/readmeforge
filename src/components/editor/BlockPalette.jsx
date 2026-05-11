import { useState, useEffect } from 'react';
import { BLOCK_META, BLOCK_TYPES } from '../../lib/blocks.js';
import useReadme from '../../store/useReadme.js';

const BLOCK_CATEGORIES = {
  'Header':    [BLOCK_TYPES.TITLE, BLOCK_TYPES.BADGES, BLOCK_TYPES.DESCRIPTION],
  'Core':      [BLOCK_TYPES.FEATURES, BLOCK_TYPES.INSTALLATION, BLOCK_TYPES.USAGE],
  'Media':     [BLOCK_TYPES.SCREENSHOTS],
  'Technical': [BLOCK_TYPES.API, BLOCK_TYPES.CONTRIBUTING, BLOCK_TYPES.LICENSE],
  'Custom':    [BLOCK_TYPES.CUSTOM],
};

/* ─── Icons ─── */
function HamburgerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="3.5"  width="16" height="1.5" rx="0.75" fill="currentColor" />
      <rect x="1" y="8.25" width="16" height="1.5" rx="0.75" fill="currentColor" />
      <rect x="1" y="13"   width="10" height="1.5" rx="0.75" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 4A1.5 1.5 0 0 1 18 5.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5v-9A1.5 1.5 0 0 1 3.5 4zM7 15h9.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7zM3.5 5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H6V5z" />
    </svg>
  );
}

/* ─── Shared block list ─── */
function BlockList({ addBlock, onAfterAdd }) {
  return (
    <div
      className="flex-1 overflow-y-auto p-3 space-y-3"
      style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}
    >
      {Object.entries(BLOCK_CATEGORIES).map(([category, types]) => (
        <div key={category}>
          <div className="px-1 pb-1.5 pt-0.5 flex items-center gap-2">
            <span className="text-[9px] font-mono font-bold text-white/55 uppercase tracking-tight ">
              {category}
            </span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>

          <div className="space-y-[2px]">
            {types.map(type => {
              const meta = BLOCK_META[type];
              if (!meta) return null;
              return (
                <button
                  key={type}
                  onClick={() => { addBlock(type); onAfterAdd?.(); }}
                  title={meta.description}
                  className="
                    group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                    bg-transparent hover:bg-white/[0.055]
                    border border-transparent hover:border-white/[0.09]
                    transition-all duration-150
                    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20
                  "
                >
                  <div className="
                    w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md
                    bg-white/[0.05] group-hover:bg-white/[0.09]
                    border border-white/[0.07] group-hover:border-white/[0.14]
                    transition-all duration-150
                  ">
                    <span className="text-[17px] leading-none">{meta.icon}</span>
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[13px] font-medium text-white/78 group-hover:text-white transition-colors leading-tight truncate">
                      {meta.label}
                    </span>
                    <span className="text-[10px] text-white/25 group-hover:text-white/40 transition-colors truncate mt-0.5">
                      {meta.description}
                    </span>
                  </div>

                  <span className="
                    ml-auto flex-shrink-0 text-[12px] text-white/28 font-mono
                    opacity-0 group-hover:opacity-100
                    translate-x-1 group-hover:translate-x-0
                    transition-all duration-150
                  ">+</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Shared footer ─── */
function SidebarFooter() {
  return (
    <div className="px-4 py-2.5 border-t border-white/[0.05] flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/55 animate-pulse" />
        <span className="text-[10px] text-white/22 font-mono">ready</span>
      </div>
      <div className="flex items-center gap-1 text-[10px] text-white/18 font-mono">
        <kbd className="px-1.5 py-0.5 bg-white/[0.05] text-white/35 rounded text-[9px] border border-white/[0.07]">click</kbd>
        <span>to insert</span>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function BlockPalette() {
  const addBlock = useReadme(s => s.addBlock);
  const [isMinimized,  setIsMinimized]  = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && setIsMobileOpen(false);
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════
          DESKTOP SIDEBAR  ≥ 768 px
      ═══════════════════════════════════ */}
      <aside
        className={`
          hidden md:flex flex-col flex-shrink-0 h-full
           border-r border-white/[0.05]
          transition-[width] duration-300 ease-in-out overflow-hidden
          ${isMinimized ? 'w-[52px]' : 'w-[296px]'}
        `}
      >
        {isMinimized ? (
          /* ── Collapsed icon rail ── */
          <div className="flex flex-col items-center py-3 gap-[3px] h-full overflow-y-auto"
            style={{ scrollbarWidth: 'none' }}>
            <button
              onClick={() => setIsMinimized(false)}
              title="Expand sidebar"
              className="
                w-9 h-9 mb-2 flex items-center justify-center rounded-md
                text-white/35 hover:text-white hover:bg-white/[0.08]
                border border-transparent hover:border-white/[0.08]
                transition-all duration-150
              "
            >
              <CollapseIcon />
            </button>

            {Object.values(BLOCK_CATEGORIES).flat().map(type => {
              const meta = BLOCK_META[type];
              if (!meta) return null;
              return (
                <div key={type} className="relative group w-9">
                  <button
                    onClick={() => addBlock(type)}
                    title={meta.label}
                    className="
                      w-9 h-9 flex items-center justify-center rounded-md
                      bg-transparent hover:bg-white/[0.07]
                      border border-transparent hover:border-white/[0.09]
                      transition-all duration-150
                    "
                  >
                    <span className="text-[18px] leading-none">{meta.icon}</span>
                  </button>
                  {/* Tooltip */}
                  <div className="
                    absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50
                    px-2.5 py-1.5 rounded-md
                    bg-[#1e1e1e] border border-white/[0.1] shadow-xl shadow-black/60
                    text-white text-[11px] font-medium whitespace-nowrap
                    opacity-0 group-hover:opacity-100 pointer-events-none
                    translate-x-1 group-hover:translate-x-0
                    transition-all duration-150
                  ">
                    {meta.label}
                    <span className="absolute right-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-[#1e1e1e]" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── Expanded ── */
          <>
            <div className="px-4 py-3 border-b border-white/[0.05] flex items-center justify-between flex-shrink-0">
              <div>
                <p className="text-[22px] font-mono font-semibold tracking-tight text-white">Blocks</p>
                <p className="text-[11px] text-white/28 mt-0.5">Add components to your README</p>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                title="Collapse sidebar"
                className="
                  p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/[0.08]
                  border border-transparent hover:border-white/[0.07]
                  transition-all duration-150 relative bottom-3
                "
              >
                <CollapseIcon />
              </button>
            </div>

            <BlockList addBlock={addBlock} />
            <SidebarFooter />
          </>
        )}
      </aside>

      {/* ═══════════════════════════════════
          MOBILE HAMBURGER  < 768 px
      ═══════════════════════════════════ */}
      <button
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open blocks panel"
        className="
          md:hidden fixed top-3 left-3 z-40
          w-9 h-9 flex items-center justify-center rounded-md
          bg-[#111]/90 backdrop-blur-sm
          border border-white/[0.1]
          text-white/55 hover:text-white hover:bg-[#1a1a1a]
          shadow-lg shadow-black/60
          transition-all duration-150
        "
      >
        <HamburgerIcon />
      </button>

      {/* ═══════════════════════════════════
          MOBILE OVERLAY  < 768 px
      ═══════════════════════════════════ */}
      {isMobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Blocks panel"
          className="md:hidden fixed inset-0 z-50 flex"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            style={{ animation: 'bpFade 200ms ease-out forwards' }}
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Panel */}
          <div
            className="relative flex flex-col w-[268px] max-w-[82vw] h-full bg-[#0a0a0a] border-r border-white/[0.06] shadow-2xl shadow-black/80"
            style={{ animation: 'bpSlide 220ms cubic-bezier(0.25, 1, 0.5, 1) forwards' }}
          >
            <div className="px-4 py-3 border-b border-white/[0.05] flex items-center justify-between flex-shrink-0">
              <div>
                <p className="text-[15px] font-mono font-semibold tracking-tight text-white">Blocks</p>
                <p className="text-[11px] text-white/28 mt-0.5">Add components to your README</p>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close blocks panel"
                className="
                  p-1.5 rounded-md text-white/35 hover:text-white hover:bg-white/[0.09]
                  border border-transparent hover:border-white/[0.08]
                  transition-all duration-150
                "
              >
                <CloseIcon />
              </button>
            </div>

            <BlockList addBlock={addBlock} onAfterAdd={() => setIsMobileOpen(false)} />
            <SidebarFooter />
          </div>
        </div>
      )}

      <style>{`
        @keyframes bpFade  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes bpSlide { from { transform: translateX(-100%) } to { transform: translateX(0) } }
      `}</style>
    </>
  );
}
