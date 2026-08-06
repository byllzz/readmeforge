import { BLOCK_ICONS } from "../../lib/blocks";

export default function DragGhost({ block, meta }) {
  const IconComponent = BLOCK_ICONS[block.type];

  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white border border-gray-200 shadow-2xl shadow-black/20 min-w-[260px] max-w-[320px] rotate-[1deg] scale-[1.03]">
      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-gray-100 border border-gray-200">
        {IconComponent ? (
          <IconComponent size={18} style={{ color: meta?.color }} />
        ) : (
          <span className="text-[17px] leading-none">❓</span>
        )}
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[13px] font-medium text-gray-800 leading-tight truncate">
          {meta.label}
        </span>
        <span className="text-[10px] text-gray-400 truncate mt-0.5">Drag to reorder</span>
      </div>
      <div className="flex-shrink-0 px-1.5 py-0.5 rounded-md bg-gray-100 border border-gray-200">
        <span className="text-[9px]  text-gray-500 uppercase tracking-wide">moving</span>
      </div>
    </div>
  );
}
