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
import { BLOCK_META } from '../../lib/blocks.js';
import { Edit3 } from 'lucide-react'
import EmptyCanvas from '../ui/EmptyCanvas.jsx'
import DragGhost from '../ui/DragGhost.jsx'

// main component::
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
          style={{  scrollbarWidth: "none"  }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 w-full bg-(--bg)  border-b border-white/[0.05] px-4 py-2.5 flex-shrink-0 ">
            <div className="flex items-center justify-between w-full">
              <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wide text">
                Drag to reorder your README
              </span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white text-black font-medium">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                  <span className="text-[10px] sm:text-[12px]">
                    {blocks.length} {blocks.length === 1 ? 'block' : 'blocks'}
                  </span>
                </div>
                <div
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md border transition-all duration-200"
                  style={{
                    background: isDragging ? 'rgba(251,191,36,0.08)' : 'transparent',
                    borderColor: isDragging ? 'rgba(251,191,36,0.2)' : 'transparent',
                    opacity: isDragging ? 1 : 0,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70 animate-pulse" />
                  <span className="text-[10px] sm:text-[12px] text-amber-400/70">reordering</span>
                </div>
              </div>
            </div>
          </div>

          {/* Block list */}
          <div className="flex-1 p-3 space-y-[3px]">
            {blocks.length === 0 ? (
              <EmptyCanvas />
            ) : (
              blocks.map((block, index) => (
                <BlockItem key={block.id} block={block} index={index} totalBlocks={blocks.length} />
              ))
            )}
          </div>

          {/* Footer hint */}
          <div className="sticky bottom-0 flex-shrink-0 bg-(--bg)  pt-2 pb-2 px-4 pointer-events-none">
            <div className="flex items-center justify-center gap-4 text-[9px] text font-bold">
              <div className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="9" cy="8" r="2" />
                  <circle cx="15" cy="8" r="2" />
                  <circle cx="9" cy="16" r="2" />
                  <circle cx="15" cy="16" r="2" />
                </svg>
                <span>drag to reorder</span>
              </div>
              <div className="w-px h-3 bg-white/[0.08]" />
              <div className="flex items-center gap-1">
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
  );
}
