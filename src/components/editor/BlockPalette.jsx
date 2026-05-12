import { useState } from 'react';
import { BLOCK_META, BLOCK_TYPES, BLOCK_ICONS } from '../../lib/blocks.js';
import useReadme from '../../store/useReadme.js';
import { LogOut } from 'lucide-react';

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
  const allTypes = Object.values(BLOCK_CATEGORIES).flat();

  return (
    <div
      className="flex-1 overflow-y-auto mt-2"
      style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.08) transparent' }}
    >
      {allTypes.map(type => {
        const meta = BLOCK_META[type];
        if (!meta) return null;
        const IconComponent = BLOCK_ICONS[type];
        return (
          <button
            key={type}
            onClick={() => {
              addBlock(type);
              onAfterAdd?.();
            }}
            className="
              group w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left
              bg-transparent hover:bg-gray-100
              border border-transparent hover:border-gray-200
              transition-all duration-150
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300
            "
          >
            {/* Icon box */}
            <div className="
              w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md
              bg-gray-50 group-hover:bg-white
              border border-gray-100 group-hover:border-gray-200
              transition-all duration-150
            ">
              {IconComponent && <IconComponent size={18} style={{ color: meta.color }} />}
            </div>

            {/* Label */}
            <span className="text-[15px] font-medium text-gray-700 transition-colors leading-tight truncate">
              {meta.label}
            </span>

            {/* “+” indicator */}
            <span className="
              ml-auto flex-shrink-0 text-gray-300
              opacity-0 group-hover:opacity-100
              translate-x-1 group-hover:translate-x-0
              transition-all duration-150
            ">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function UserFooter({ email, onLogout }) {
  const displayName = email ? email.split('@')[0] : 'User';
  return (
    <div className="px-4 py-3 border-t border-gray-200 hover:bg-gray-50 flex items-center gap-3 flex-shrink-0 transition-colors">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg select-none">
        {displayName.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0 leading-tight">
        <p className="text-[14px] font-medium text-gray-800 truncate">{displayName}</p>
        <p className="text-[12px] text-gray-500">Free plan</p>
      </div>
      <button
        onClick={onLogout}
        className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        title="Sign out"
      >
        <LogOut size={18} />
      </button>
    </div>
  );
}

export default function BlockPalette({ userEmail, onLogout, onAfterAdd }) {
  const addBlock = useReadme(s => s.addBlock);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <aside
      className={`
        flex flex-col flex-shrink-0 h-full bg-white
        transition-[width] duration-300 ease-in-out overflow-hidden
        ${isMinimized ? 'w-[52px]' : 'w-full md:w-[286px]'}
      `}
    >
      {isMinimized ? (
        /* Collapsed icon rail */
        <div
          className="flex flex-col items-center py-3 gap-[3px] h-full overflow-y-auto bg-white"
          style={{ scrollbarWidth: 'none' }}
        >
          <button
            onClick={() => setIsMinimized(false)}
            title="Expand sidebar"
            className="
              w-9 h-9 mb-2 flex items-center justify-center rounded-md
              text-gray-400 hover:text-gray-700 hover:bg-gray-100
              border border-transparent hover:border-gray-200
              transition-all duration-150
            "
          >
            <CollapseIcon />
          </button>
          {Object.values(BLOCK_CATEGORIES)
            .flat()
            .map(type => {
              const meta = BLOCK_META[type];
              if (!meta) return null;
              const IconComponent = BLOCK_ICONS[type];
              return (
                <div key={type} className="relative group w-9">
                  <button
                    onClick={() => {
                      addBlock(type);
                      onAfterAdd?.();
                    }}
                    title={meta.label}
                    className="
                      w-9 h-9 flex items-center justify-center rounded-md
                      bg-transparent hover:bg-gray-100
                      border border-transparent hover:border-gray-200
                      transition-all duration-150
                    "
                  >
                    {IconComponent && <IconComponent size={18} style={{ color: meta.color }} />}
                  </button>
                  {/* Tooltip */}
                  <div className="
                    absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50
                    px-2.5 py-1.5 rounded-md
                    bg-white border border-gray-200 shadow-lg
                    text-gray-700 text-[11px] font-medium whitespace-nowrap
                    opacity-0 group-hover:opacity-100 pointer-events-none
                    translate-x-1 group-hover:translate-x-0
                    transition-all duration-150
                  ">
                    {meta.label}
                    <span className="absolute right-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-white" />
                  </div>
                </div>
              );
            })}
          <div className="mt-auto pt-2 mb-2">
            <button
              onClick={onLogout}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition"
              title={`Signed in as ${userEmail}`}
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-[22px] font-mono font-semibold text-gray-800">Blocks</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Add components to your README</p>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              title="Collapse sidebar"
              className="
                hidden md:flex p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100
                border border-transparent hover:border-gray-200
                transition-all duration-150 relative bottom-2 left-2
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
