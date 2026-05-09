import { BLOCK_META, BLOCK_TYPES } from '../../lib/blocks.js'
import useReadme from '../../store/useReadme.js'

const ORDER = [
  BLOCK_TYPES.TITLE, BLOCK_TYPES.BADGES, BLOCK_TYPES.DESCRIPTION, BLOCK_TYPES.FEATURES,
  BLOCK_TYPES.INSTALLATION, BLOCK_TYPES.USAGE, BLOCK_TYPES.SCREENSHOTS,
  BLOCK_TYPES.API, BLOCK_TYPES.CONTRIBUTING, BLOCK_TYPES.LICENSE, BLOCK_TYPES.CUSTOM,
]

export default function BlockPalette() {
  const addBlock = useReadme(s => s.addBlock)

  return (
    <aside className="w-48 shrink-0 bg-[#0f0f0f] border-r border-[#1a1a1a] flex flex-col overflow-y-auto">
      <div className="px-3 py-3 border-b border-[#1a1a1a]">
        <p className="text-[10px] font-mono text-[#444] uppercase tracking-widest">Blocks</p>
      </div>

      <div className="p-2 flex flex-col gap-0.5 flex-1">
        {ORDER.map(type => {
          const meta = BLOCK_META[type]
          if (!meta) return null
          return (
            <button
              key={type}
              onClick={() => addBlock(type)}
              title={meta.description}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left w-full hover:bg-[#161616] transition-colors group"
            >
              <span
                className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-mono shrink-0 transition-opacity group-hover:opacity-100 opacity-70"
                style={{ background: `${meta.color}18`, border: `1px solid ${meta.color}30`, color: meta.color }}
              >
                {meta.icon}
              </span>
              <div className="overflow-hidden">
                <div className="text-[13px] font-medium text-[#ccc] leading-tight">{meta.label}</div>
                <div className="text-[10px] text-[#444] truncate">{meta.description}</div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="px-3 py-3 border-t border-[#1a1a1a]">
        <p className="text-[10px] text-[#333] font-mono leading-relaxed">Click to add ↑</p>
      </div>
    </aside>
  )
}
