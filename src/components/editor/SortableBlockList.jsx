import {
  DndContext, closestCenter,
  KeyboardSensor, PointerSensor,
  useSensor, useSensors,
} from '@dnd-kit/core'
import {
  SortableContext, sortableKeyboardCoordinates,
  verticalListSortingStrategy, arrayMove,
} from '@dnd-kit/sortable'
import useReadme from '../../store/useReadme.js'
import BlockItem from './BlockItem.jsx'

export default function SortableBlockList() {
  const { blocks, reorderBlocks } = useReadme()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragEnd({ active, over }) {
    if (over && active.id !== over.id) {
      const oldIdx = blocks.findIndex(b => b.id === active.id)
      const newIdx = blocks.findIndex(b => b.id === over.id)
      reorderBlocks(arrayMove(blocks, oldIdx, newIdx))
    }
  }

  if (blocks.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center h-full py-20">
        <div className="text-center space-y-2">
          <div className="text-4xl text-[#1e1e1e]">✦</div>
          <p className="text-xs text-[#333] font-mono">Add a block from the left panel</p>
        </div>
      </div>
    )
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2 p-4">
          {blocks.map(block => (
            <BlockItem key={block.id} block={block} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
