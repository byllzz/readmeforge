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

export default function SortableBlockList() {
  const { blocks, reorderBlocks } = useReadme()
  const [activeId, setActiveId] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Reduced sensitivity for accidental drags
        delay: 100,
        tolerance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  function handleDragStart({ active }) {
    setActiveId(active.id)
    setIsDragging(true)
  }

  function handleDragEnd({ active, over }) {
    setActiveId(null)
    setIsDragging(false)

    if (over && active.id !== over.id) {
      const oldIdx = blocks.findIndex(b => b.id === active.id)
      const newIdx = blocks.findIndex(b => b.id === over.id)
      reorderBlocks(arrayMove(blocks, oldIdx, newIdx))
    }
  }

  function handleDragCancel() {
    setActiveId(null)
    setIsDragging(false)
  }

  // Get active block for drag overlay
  const activeBlock = blocks.find(b => b.id === activeId)
  const activeMeta = activeBlock ? BLOCK_META[activeBlock.type] : null

  if (blocks.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center h-full min-h-[500px]">
        <div className="textcenter space-y-4 max-w-sm px-6">
          {/* Animated empty state */}
          <div className="relative">
            <div className="absolute inset-0 blur-xl bg-gradient-to-r from-[#ffd557]/5 to-transparent rounded-full"></div>
            <div className="relative text6xl mb-4 animate-bounce">
              📦
            </div>
          </div>

          <div className="space-y-2">
            <p className="textsm  font-medium text]">Empty Canvas</p>
            <p className="text[11px] text leading-relaxed">
              Your README is waiting to come to life
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 pt-4">
            <div className="w-px h-4 bg-gradient-to-t from-transparent via-[#2a2a2a] to-transparent"></div>
            <span className="text[10px] text[#3a3a3a]  animate-pulse">
              ✨ Click a block on the left to begin
            </span>
            <div className="w-px h-4 bg-gradient-to-t from-transparent via-[#2a2a2a] to-transparent"></div>
          </div>

          {/* Decorative dots */}
          <div className="flex justify-center gap-1 pt-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-[#1a1a1a] transition-all duration-300"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={blocks.map(b => b.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="h-screen overflow-y-auto custom-scrollbar">
          {/* Header with stats */}
          <div className="sticky top-0 z-10 pb-3">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <div className="flex items-center gap-2">
                <h2 className="textxs  font-semibold text[#888] uppercase tracking-wider">
                  Readme Structure
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-[#0d0d0d] px-2 py-1 rounded-md border border-[#1a1a1a]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text[10px]  text">{blocks.length} blocks</span>
                </div>
                {isDragging && (
                  <div className="flex items-center gap-1.5 bg-[#ffd557]/10 px-2 py-1 rounded-md border border-[#ffd557]/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffd557] animate-pulse"></div>
                    <span className="text[10px]  text[#ffd557]">reordering</span>
                  </div>
                )}
              </div>
            </div>
            <div className="h-px  to-transparent mx-4"></div>
          </div>

          {/* Blocks Container */}
          <div className="space-y-2 p-4 pt-2">
            {blocks.map((block, index) => (
              <BlockItem
                key={block.id}
                block={block}
                index={index}
                totalBlocks={blocks.length}
              />
            ))}
          </div>

          {/* Footer tip */}
          <div className="sticky bottom-0 pt-4 pb-2">
            <div className="flex items-center justify-center gap-3 text[9px]  text[#3a3a3a] px-4">
              <div className="flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="12" r="1" />
                  <circle cx="9" cy="8" r="1" />
                  <circle cx="9" cy="16" r="1" />
                  <circle cx="15" cy="12" r="1" />
                  <circle cx="15" cy="8" r="1" />
                  <circle cx="15" cy="16" r="1" />
                </svg>
                <span>Drag to reorder</span>
              </div>
              <div className="w-px h-3 bg-[#1a1a1a]"></div>
              <div className="flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Click to edit</span>
              </div>
            </div>
          </div>
        </div>
      </SortableContext>

      {/* Drag Overlay */}
      <DragOverlay dropAnimation={null}>
        {activeId && activeBlock && activeMeta && (
          <div className="opacity-90 scale-105 rotate-1 shadow-2xl">
            <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0d0d0d] border-2 border-[#ffd557] rounded-lg p-3 min-w-[300px]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[#ffd557]/10 rounded-lg">
                  <span className="textlg">{activeMeta.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="textsm font-medium textwhite truncate">
                      {activeMeta.label}
                    </h3>
                    <div className="px-1.5 py-0.5 bg-[#ffd557]/20 rounded text[9px]  text[#ffd557]">
                      moving
                    </div>
                  </div>
                  <p className="text[10px] text mt-0.5 truncate">
                    {activeMeta.description}
                  </p>
                </div>
                <div className="animate-pulse">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text[#ffd557]">
                    <circle cx="9" cy="12" r="1" />
                    <circle cx="9" cy="8" r="1" />
                    <circle cx="9" cy="16" r="1" />
                    <line x1="17" y1="8" x2="12" y2="12" />
                    <line x1="17" y1="16" x2="12" y2="12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
