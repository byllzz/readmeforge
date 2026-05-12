import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BLOCK_META, BLOCK_TYPES, BLOCK_ICONS } from '../../lib/blocks.js';
import useReadme from '../../store/useReadme.js';
import TitleBlock from '../blocks/TitleBlock.jsx';
import BadgesBlock from '../blocks/BadgesBlock.jsx';
import DescriptionBlock from '../blocks/DescriptionBlock.jsx';
import FeaturesBlock from '../blocks/FeaturesBlock.jsx';
import InstallationBlock from '../blocks/InstallationBlock.jsx';
import UsageBlock from '../blocks/UsageBlock.jsx';
import ScreenshotsBlock from '../blocks/ScreenshotsBlock.jsx';
import ApiBlock from '../blocks/ApiBlock.jsx';
import ContributingBlock from '../blocks/ContributingBlock.jsx';
import LicenseBlock from '../blocks/LicenseBlock.jsx';
import CustomBlock from '../blocks/CustomBlock.jsx';
import { ChevronDown, Copy, Trash } from 'lucide-react';

const BLOCK_COMPONENTS = {
  [BLOCK_TYPES.TITLE]: TitleBlock,
  [BLOCK_TYPES.BADGES]: BadgesBlock,
  [BLOCK_TYPES.DESCRIPTION]: DescriptionBlock,
  [BLOCK_TYPES.FEATURES]: FeaturesBlock,
  [BLOCK_TYPES.INSTALLATION]: InstallationBlock,
  [BLOCK_TYPES.USAGE]: UsageBlock,
  [BLOCK_TYPES.SCREENSHOTS]: ScreenshotsBlock,
  [BLOCK_TYPES.API]: ApiBlock,
  [BLOCK_TYPES.CONTRIBUTING]: ContributingBlock,
  [BLOCK_TYPES.LICENSE]: LicenseBlock,
  [BLOCK_TYPES.CUSTOM]: CustomBlock,
};

export default function BlockItem({ block }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });
  const { removeBlock, updateBlock, activeBlockId, setActiveBlock, duplicateBlock } = useReadme();

  const meta = BLOCK_META[block.type];
  const EditorComponent = BLOCK_COMPONENTS[block.type];
  const IconComponent = BLOCK_ICONS[block.type];
  const isActive = activeBlockId === block.id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        rounded-lg overflow-hidden transition-all duration-200
        bg-white border border-[#EBEBEB]
        ${isActive ? 'shadow-sm shadow-black/5' : ''}
        ${isDragging ? 'shadow-lg shadow-black/10' : 'shadow-none'}
      `}
    >
      {/* Header row */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 cursor-pointer select-none
                   hover:bg-gray-50/80 transition-colors"
        onClick={() => setActiveBlock(isActive ? null : block.id)}
      >
        {/* Drag handle */}
        <div
          {...attributes}
          {...listeners}
          onClick={e => e.stopPropagation()}
          className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 px-0.5 transition-colors"
          title="Drag to reorder"
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
            <circle cx="2" cy="3" r="1.5" />
            <circle cx="8" cy="3" r="1.5" />
            <circle cx="2" cy="8" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="2" cy="13" r="1.5" />
            <circle cx="8" cy="13" r="1.5" />
          </svg>
        </div>

        {/* Lucide icon */}
        {IconComponent && (
          <IconComponent
            size={18}
            className="shrink-0"
            style={{ color: meta?.color || '#333' }}
          />
        )}

        {/* Title */}
        <span className="text-[15px] font-medium text-gray-800 flex-1 truncate">
          {meta?.label}
        </span>

        {/* Duplicate */}
        <button
          onClick={e => {
            e.stopPropagation();
            duplicateBlock(block.id);
          }}
          className="text-gray-300 hover:text-gray-600 p-1 rounded transition-colors"
          title="Duplicate"
        >
          <Copy size={15} />
        </button>

        {/* Remove */}
        <button
          onClick={e => {
            e.stopPropagation();
            removeBlock(block.id);
          }}
          className="text-gray-300 hover:text-red-400 p-1 rounded transition-colors"
          title="Remove block"
        >
          <Trash size={15} />
        </button>

        {/* Expand arrow */}
        <span
          className={`text-gray-300 transition-transform duration-200 ${
            isActive ? 'rotate-180' : ''
          }`}
        >
          <ChevronDown size={15} />
        </span>
      </div>

      {/* Expanded editor */}
      {isActive && EditorComponent && (
        <div className="px-3 pb-4 pt-1 border-t border-gray-100 bg-gray-50/30">
          <EditorComponent
            content={block.content}
            onChange={patch => updateBlock(block.id, patch)}
          />
        </div>
      )}
    </div>
  );
}
