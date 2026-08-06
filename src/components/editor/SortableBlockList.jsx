import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useState } from "react";
import useReadme from "../../store/useReadme.js";
import BlockItem from "./BlockItem.jsx";
import { BLOCK_META } from "../../lib/blocks.js";
import EmptyCanvas from "../ui/EmptyCanvas.jsx";
import DragGhost from "../ui/DragGhost.jsx";

export default function SortableBlockList() {
  const { blocks, reorderBlocks } = useReadme();
  const [activeId, setActiveId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8, delay: 100, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart({ active }) {
    setActiveId(active.id);
    setIsDragging(true);
  }
  function handleDragCancel() {
    setActiveId(null);
    setIsDragging(false);
  }
  function handleDragEnd({ active, over }) {
    setActiveId(null);
    setIsDragging(false);
    if (over && active.id !== over.id) {
      const oldIdx = blocks.findIndex((b) => b.id === active.id);
      const newIdx = blocks.findIndex((b) => b.id === over.id);
      reorderBlocks(arrayMove(blocks, oldIdx, newIdx));
    }
  }

  const activeBlock = blocks.find((b) => b.id === activeId);
  const activeMeta = activeBlock ? BLOCK_META[activeBlock.type] : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={blocks.map((b) => b.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          className="sortable-block-list h-full flex flex-col overflow-y-auto bg-white"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="sticky top-0 z-10 w-full bg-white border-b border-gray-200 px-4 py-2.5 flex-shrink-0">
            <div className="flex items-center justify-between w-full">
              <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wide text-gray-400">
                Drag to reorder your README
              </span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-900 text-white font-medium">
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
                    {blocks.length} {blocks.length === 1 ? "block" : "blocks"}
                  </span>
                </div>
                <div
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md border transition-all duration-200"
                  style={{
                    background: isDragging
                      ? "rgba(251,191,36,0.1)"
                      : "transparent",
                    borderColor: isDragging
                      ? "rgba(251,191,36,0.3)"
                      : "transparent",
                    opacity: isDragging ? 1 : 0,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[10px] sm:text-[12px] text-amber-600">
                    reordering
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-3 space-y-[3px]">
            {blocks.length === 0 ? (
              <EmptyCanvas />
            ) : (
              blocks.map((block, index) => (
                <BlockItem
                  key={block.id}
                  block={block}
                  index={index}
                  totalBlocks={blocks.length}
                />
              ))
            )}
          </div>

          <div className="sticky h-11.5 border-t border-gray-200 bg-white bottom-0 flex-shrink-0 pt-2 pb-2 px-4 pointer-events-none">
            <div className="flex items-center justify-between relative top-[3px] gap-4 text-[12px] text-gray-400 font-bold">
              <div className="flex items-center gap-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="9" cy="8" r="2" />
                  <circle cx="15" cy="8" r="2" />
                  <circle cx="9" cy="16" r="2" />
                  <circle cx="15" cy="16" r="2" />
                </svg>
                <span>drag to reorder</span>
              </div>
              <div className="w-px h-3 bg-gray-200" />
              <div className="flex items-center gap-1">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
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
