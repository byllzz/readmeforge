import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BLOCK_META, BLOCK_TYPES } from '../../lib/blocks.js';
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
      className={`border rounded-[8px] overflow-hidden transition-colors ${
        isActive
          ? 'border-[#2a2a2a] bg-[#161616]'
          : 'border-[#1a1a1a] bg-[#111] hover:border-[#222]'
      }`}
    >
      {/* Header row */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 cursor-pointer select-none"
        onClick={() => setActiveBlock(isActive ? null : block.id)}
      >
        {/* Drag handle */}
        <div
          {...attributes}
          {...listeners}
          onClick={e => e.stopPropagation()}
          className="cursor-grab active:cursor-grabbing text hover:text-[#555] px-0.5 transition-colors"
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

        <span className="text-[15px] ml-1 font-mono w-5 text-center shrink-0" style={{ color: meta?.color }}>
          {meta?.icon}
        </span>
        <span className="text-[15px] ml-2 font-medium tracking-right text flex-1">{meta?.label}</span>

        {/* Duplicate */}
        <button
          onClick={e => {
            e.stopPropagation();
            duplicateBlock(block.id);
          }}
          className="text  text-xs transition-colors px-1"
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
          className="text text-xs hover:text-[#ff5757] text-base leading-none transition-colors"
          title="Remove block"
        >
          <Trash size={15} />
        </button>

        <span
          className={`text transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
        >
          <ChevronDown size={15} />
        </span>
      </div>

      {/* Expanded editor */}
      {isActive && EditorComponent && (
        <div className="px-3 pb-4 pt-1 border-t border-[#1e1e1e]">
          <EditorComponent
            content={block.content}
            onChange={patch => updateBlock(block.id, patch)}
          />
        </div>
      )}
    </div>
  );
}
