import {
  DndContext, closestCenter,
  KeyboardSensor, PointerSensor,
  useSensor, useSensors, DragOverlay,
} from '@dnd-kit/core'
import {
  SortableContext, sortableKeyboardCoordinates,
  verticalListSortingStrategy, arrayMove,
} from '@dnd-kit/sortable'
import { useState } from 'react'
import useReadme from '../../store/useReadme.js'
import BlockItem from './BlockItem.jsx'
import { BLOCK_META } from '../../lib/blocks.js'
import { Edit3 } from 'lucide-react'

function EmptyCanvas() {
  return (
    <div className="flex-1 flex items-center justify-center h-full min-h-[400px] select-none">
      <div className="flex flex-col items-center text-center space-y-5 max-w-[260px] px-4">
        <div className="relative">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.07] shadow-inner">
            <span className="text-[28px] leading-none">📄</span>
          </div>
          <div className="absolute inset-0 rounded-2xl blur-xl bg-white/[0.03] -z-10 scale-150" />
        </div>
        <div className="space-y-1.5">
          <p className="text-[14px] font-mono font-semibold text-white/70 tracking-tight">Empty canvas</p>
          <p className="text-[11px] text-white/28 leading-relaxed">Your README is waiting. Pick a block from the left panel to get started.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07]">
          <div className="w-1 h-1 rounded-full bg-emerald-400/60 animate-pulse" />
          <span className="text-[10px] font-mono text-white/30">click a block to begin</span>
        </div>
      </div>
    </div>
  )
}

function DragGhost({ block, meta }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#161616] border border-amber-400/40 shadow-2xl shadow-black/70 min-w-[260px] max-w-[320px] rotate-[1deg] scale-[1.03] ring-1 ring-amber-400/10">
      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-amber-400/10 border border-amber-400/20">
        <span className="text-[17px] leading-none">{meta.icon}</span>
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[13px] font-medium text-white/85 leading-tight truncate">{meta.label}</span>
        <span className="text-[10px] text-white/30 truncate mt-0.5">{meta.description}</span>
      </div>
      <div className="flex-shrink-0 px-1.5 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/25">
        <span className="text-[9px] font-mono text-amber-400/80 uppercase tracking-wide">moving</span>
      </div>
    </div>
  )
}

// Pure content component — no mobile FAB or drawer logic.
// Home.jsx owns all mobile behavior.
export default function SortableBlockList() {
  const { blocks, reorderBlocks } = useReadme()
  const [activeId,   setActiveId]   = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8, delay: 100, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragStart({ active }) { setActiveId(active.id); setIsDragging(true) }
  function handleDragCancel()          { setActiveId(null);      setIsDragging(false) }
  function handleDragEnd({ active, over }) {
    setActiveId(null); setIsDragging(false)
    if (over && active.id !== over.id) {
      const oldIdx = blocks.findIndex(b => b.id === active.id)
      const newIdx = blocks.findIndex(b => b.id === over.id)
      reorderBlocks(arrayMove(blocks, oldIdx, newIdx))
    }
  }

  const activeBlock = blocks.find(b => b.id === activeId)
  const activeMeta  = activeBlock ? BLOCK_META[activeBlock.type] : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
        <div
          className="h-full flex flex-col overflow-y-auto"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.07) transparent' }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 w-full backdrop-blur-md border-b border-white/[0.05] px-4 py-2.5 flex-shrink-0">
            <div className="flex items-center justify-between w-full">
              <span className="text-[10px] font-medium uppercase tracking-wide text-white/40">
                Drag to reorder your README
              </span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#a8ff57] text-black font-medium">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3"  y="3"  width="7" height="7" rx="1" />
                    <rect x="14" y="3"  width="7" height="7" rx="1" />
                    <rect x="3"  y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                  <span className="text-[12px]">{blocks.length} {blocks.length === 1 ? 'block' : 'blocks'}</span>
                </div>
                <div
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md border transition-all duration-200"
                  style={{
                    background:  isDragging ? 'rgba(251,191,36,0.08)' : 'transparent',
                    borderColor: isDragging ? 'rgba(251,191,36,0.2)'  : 'transparent',
                    opacity:     isDragging ? 1 : 0,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70 animate-pulse" />
                  <span className="text-[12px] text-amber-400/70">reordering</span>
                </div>
              </div>
            </div>
          </div>

          {/* Block list */}
          <div className="flex-1 p-3 space-y-[3px]">
            {blocks.length === 0
              ? <EmptyCanvas />
              : blocks.map((block, index) => (
                  <BlockItem key={block.id} block={block} index={index} totalBlocks={blocks.length} />
                ))
            }
          </div>

          {/* Footer hint */}
          <div className="sticky bottom-0 flex-shrink-0 bg-gradient-to-t from-[#0a0a0a] to-transparent pt-6 pb-3 px-4 pointer-events-none">
            <div className="flex items-center justify-center gap-4 text-[9px] font-mono text-white/20">
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="9"  cy="8"  r="2" /><circle cx="15" cy="8"  r="2" />
                  <circle cx="9"  cy="16" r="2" /><circle cx="15" cy="16" r="2" />
                </svg>
                <span>drag to reorder</span>
              </div>
              <div className="w-px h-3 bg-white/[0.08]" />
              <div className="flex items-center gap-1.5">
                <Edit3 size={10} />
                <span>click to edit</span>
              </div>
            </div>
          </div>
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={null}>
        {activeId && activeBlock && activeMeta && (
          <DragGhost block={activeBlock} meta={activeMeta} />
        )}
      </DragOverlay>
    </DndContext>
  )
}
