import { useState } from 'react';
import { BLOCK_META, BLOCK_TYPES } from '../../lib/blocks.js';
import useReadme from '../../store/useReadme.js';

const BLOCK_CATEGORIES = {
  'Header':    [BLOCK_TYPES.TITLE, BLOCK_TYPES.BADGES, BLOCK_TYPES.DESCRIPTION],
  'Core':      [BLOCK_TYPES.FEATURES, BLOCK_TYPES.INSTALLATION, BLOCK_TYPES.USAGE],
  'Media':     [BLOCK_TYPES.SCREENSHOTS],
  'Technical': [BLOCK_TYPES.API, BLOCK_TYPES.CONTRIBUTING, BLOCK_TYPES.LICENSE],
  'Custom':    [BLOCK_TYPES.CUSTOM],
};

function CollapseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M16.5 4A1.5 1.5 0 0 1 18 5.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5v-9A1.5 1.5 0 0 1 3.5 4zM7 15h9.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7zM3.5 5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H6V5z" />
    </svg>
  );
}

function BlockList({ addBlock, onAfterAdd }) {
  return (
    <div
      className="flex-1 overflow-y-auto p-3 space-y-3"
      style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}
    >
      {Object.entries(BLOCK_CATEGORIES).map(([category, types]) => (
        <div key={category}>
          <div className="px-1 pb-1.5 pt-0.5 flex items-center gap-2">
            <span className="text-[9px] font-mono font-bold text-white/55 uppercase tracking-tight">
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

function UserFooter({ email, onLogout }) {
  const displayName = email ? email.split('@')[0] : 'User';
  return (
    <div className="px-4 py-3 border-t border-white/[0.05] flex items-center gap-3 flex-shrink-0">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm select-none">
        {displayName.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-white truncate">{displayName}</p>
        <p className="text-[10px] text-white/40">Free plan</p>
      </div>
      <button
        onClick={onLogout}
        className="text-white/40 hover:text-white/80 transition-colors p-1 rounded hover:bg-white/5"
        title="Sign out"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Pure content component — no mobile drawer/FAB logic lives here anymore.
   Home.jsx owns all mobile behavior.
───────────────────────────────────────────────────────────────────────────── */
export default function BlockPalette({ userEmail, onLogout, onAfterAdd }) {
  const addBlock = useReadme(s => s.addBlock);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <aside
      className={`
        flex flex-col flex-shrink-0 h-full
        border-r border-white/[0.05]
        transition-[width] duration-300 ease-in-out overflow-hidden
        ${isMinimized ? 'w-[52px]' : 'w-full md:w-[296px]'}
      `}
    >
      {isMinimized ? (
        /* Collapsed icon rail — desktop only */
        <div
          className="flex flex-col items-center py-3 gap-[3px] h-full overflow-y-auto"
          style={{ scrollbarWidth: 'none' }}
        >
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
                  onClick={() => { addBlock(type); onAfterAdd?.(); }}
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
          <div className="mt-auto pt-2 mb-2">
            <button
              onClick={onLogout}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition"
              title={`Signed in as ${userEmail}`}
            >
              {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="px-4 py-3 border-b border-white/[0.05] flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-[22px] font-mono font-semibold tracking-tight text-white">Blocks</p>
              <p className="text-[11px] text-white/28 mt-0.5">Add components to your README</p>
            </div>
            {/* Collapse button — desktop only */}
            <button
              onClick={() => setIsMinimized(true)}
              title="Collapse sidebar"
              className="
                hidden md:flex p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/[0.08]
                border border-transparent hover:border-white/[0.07]
                transition-all duration-150 relative bottom-3
              "
            >
              <CollapseIcon />
            </button>
          </div>
          <BlockList addBlock={addBlock} onAfterAdd={onAfterAdd} />
          <UserFooter email={userEmail} onLogout={onLogout} />
        </>
      )}
    </aside>
  );
}
