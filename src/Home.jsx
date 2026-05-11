import Navbar from './components/ui/Navbar.jsx'
import BlockPalette from './components/editor/BlockPalette.jsx'
import SortableBlockList from './components/editor/SortableBlockList.jsx'
import MarkdownPreview from './components/preview/MarkdownPreview.jsx'
import { ChevronDown } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-100">
      {/* <Navbar /> */}

      <div className="flex flex-1 min-h-0">
        {/* Left — Block palette */}
        <BlockPalette />

        <div className="h-screen w-[2px] bg-[#1a1a1a]"></div>

        {/* Center — Sortable editor */}
        <main className="w-[38rem] shrink-0 border-r border-[#1a1a1a] flex flex-col min-h-0">
          <div className="px-3 pt-3.5 pb-2.5 border-b border-[#1a1a1a] flex items-center gap-1.5 shrink-0 relative top-1">
            <p className="text-[15px] font text  font-medium">Area contains specific blocks</p>
             <span><ChevronDown size={16} /></span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <SortableBlockList />
          </div>
        </main>

        <div className="h-screen w-[2px] bg-[#1a1a1a]"></div>

        {/* Right — Live preview */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto">
            <MarkdownPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
