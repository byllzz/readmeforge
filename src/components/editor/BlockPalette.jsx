import { useState } from 'react';
import { BLOCK_META, BLOCK_TYPES } from '../../lib/blocks.js'
import useReadme from '../../store/useReadme.js'

const ORDER = [
  BLOCK_TYPES.TITLE, BLOCK_TYPES.BADGES, BLOCK_TYPES.DESCRIPTION, BLOCK_TYPES.FEATURES,
  BLOCK_TYPES.INSTALLATION, BLOCK_TYPES.USAGE, BLOCK_TYPES.SCREENSHOTS,
  BLOCK_TYPES.API, BLOCK_TYPES.CONTRIBUTING, BLOCK_TYPES.LICENSE, BLOCK_TYPES.CUSTOM,
]

// Group blocks by category for better organization
const BLOCK_CATEGORIES = {
  'Header': [BLOCK_TYPES.TITLE, BLOCK_TYPES.BADGES, BLOCK_TYPES.DESCRIPTION],
  'Core': [BLOCK_TYPES.FEATURES, BLOCK_TYPES.INSTALLATION, BLOCK_TYPES.USAGE],
  'Media': [BLOCK_TYPES.SCREENSHOTS],
  'Technical': [BLOCK_TYPES.API, BLOCK_TYPES.CONTRIBUTING, BLOCK_TYPES.LICENSE],
  'Custom': [BLOCK_TYPES.CUSTOM]
}

export default function BlockPalette() {
  const addBlock = useReadme(s => s.addBlock);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
  };

  return (
    <aside
      className={`${isMinimized ? 'w-16' : 'w-80'} shrink-0 border-r border-[#1a1a1a] overflow-y-auto transition-all duration-300 ease-in-out`}
    >
      {/* Header Section */}
      <div className={`${isMinimized ? 'p-2' : 'px-4 py-2'} border-b border-[#1a1a1a]`}>
        <div
          className={`flex items-center ${isMinimized ? 'justify-center' : 'justify-between'} mb-2`}
        >
          {!isMinimized && (
            <div className="flex items-center gap-2">
              <p className="text-[24px] font-mono font-medium tracking-tight text-white">Blocks</p>
            </div>
          )}
          <button
            className="p-1.5 rounded-md hover:bg-[#1a1a1a] transition-colors"
            onClick={toggleMinimize}
            title={isMinimized ? 'Expand sidebar' : 'Minimize sidebar'}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className=" text transition-colors"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <path d="M16.5 4A1.5 1.5 0 0 1 18 5.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5v-9A1.5 1.5 0 0 1 3.5 4zM7 15h9.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7zM3.5 5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H6V5z"></path>
            </svg>
          </button>
        </div>
        {!isMinimized && (
          <p className="text-[12px] text ">Add components to your README</p>
        )}
      </div>

      {/* Blocks Container - Hide text when minimized */}
      <div
        className={`flex-1 overflow-y-auto ${isMinimized ? 'p-2' : 'p-3'} space-y-${isMinimized ? '0' : '1'}`}
      >
        {Object.entries(BLOCK_CATEGORIES).map(([category, types]) => (
          <div key={category} className={` ${isMinimized ? 'relative group' : ''}`}>
            {/* Category Header - Hide when minimized */}
            {!isMinimized && (
              <div className="px-2 pt-1 pb-1.5">
                <h3 className="text-[10px] font-mono font-semibold text-[#555] uppercase tracking-wider">
                  {category}
                </h3>
                <div className="h-px bg-gradient-to-r from-[#1a1a1a] to-transparent mt-1"></div>
              </div>
            )}

            {/* Category Buttons */}
            <div
              className={`${isMinimized ? 'space-y-0' : 'space-y-0'} ${isMinimized ? 'flex flex-col items-center' : ''}`}
            >
              {types.map(type => {
                const meta = BLOCK_META[type];
                if (!meta) return null;
                return (
                  <button
                    key={type}
                    onClick={() => addBlock(type)}
                    title={isMinimized ? meta.label : meta.description}
                    className={`group relative w-full flex items-center ${isMinimized ? 'gap-0' : 'gap-3'} px-3 py-2.5
                               bg-[#0d0d0d] hover:bg-[#141414]
                               border border-[#1a1a1a] hover:border-[#252525]
                               transition-all duration-200 ease-out
                               ${!isMinimized && 'hover:translate-x-0.5 hover:shadow-lg'}
                               ${isMinimized ? 'justify-center' : ''}`}
                  >
                    {/* Icon Container */}
                    <div
                      className={`${isMinimized ? 'w-10 h-10' : 'w-8 h-8'} flex items-center justify-center
                                   rounded-md transition-all duration-200 ${isMinimized ? 'hover:scale-110' : ''}`}
                    >
                      <span
                        className={`text-[${isMinimized ? '22px' : '18px'}] transition-transform duration-200
                                      ${!isMinimized && 'relative bottom-1'}`}
                      >
                        {meta.icon}
                      </span>
                    </div>

                    {/* Text Content - Hide when minimized */}
                    {!isMinimized && (
                      <div className="flex items-start flex-col justify-between relative w-full">
                        <div
                          className="text-[13px] font-medium text-[#e0e0e0] group-hover:text-white
                                        transition-colors leading-tight truncate"
                        >
                          {meta.label}
                        </div>
                        <div
                          className="text-[10px] text-[#555] group-hover:text-[#666]
                                      transition-colors truncate"
                        >
                          {meta.description}
                        </div>
                      </div>
                    )}

                    {/* Tooltip for minimized mode */}
                    {isMinimized && (
                      <div
                        className="absolute left-full ml-2 px-2 py-1 bg-[#1a1a1a] text-white text-xs rounded
                                    opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity
                                    whitespace-nowrap z-50 border border-[#252525] shadow-lg"
                      >
                        {meta.label}
                        <div
                          className="absolute left-0 -ml-1 top-1/2 transform -translate-y-1/2
                                      w-1.5 h-1.5 bg-[#1a1a1a] border-l border-b border-[#252525]
                                      rotate-45 -translate-x-1/2"
                        ></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section - Hide when minimized */}
      {!isMinimized && (
        <div className="p-3 border-t border-[#1a1a1a]">
          <div className="flex items-center justify-between text-[10px] text-[#444] font-mono">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/30 animate-pulse"></div>
              <span>Ready to add</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#1a1a1a] text-white rounded text-[9px]">click</kbd>
              <span>→</span>
              <span>insert block</span>
            </div>
          </div>
        </div>
      )}

      {/* Mini footer for minimized mode */}
      {isMinimized && (
        <div className="p-2 border-t border-[#1a1a1a]">
          <div className="w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full"></div>
        </div>
      )}
    </aside>
  );
}
