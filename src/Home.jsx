import Navbar from './components/ui/Navbar.jsx'
import BlockPalette from './components/editor/BlockPalette.jsx'
import SortableBlockList from './components/editor/SortableBlockList.jsx'
import MarkdownPreview from './components/preview/MarkdownPreview.jsx'

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-[#0d0d0d]">
      <Navbar />

      <div className="flex flex-1 min-h-0">
        {/* Left — Block palette */}
        <BlockPalette />

        {/* Center — Sortable editor */}
        <main className="w-[40rem] shrink-0 bg-[#0f0f0f] border-r border-[#1a1a1a] flex flex-col min-h-0">
          <div className="px-3 pt-3.5 pb-2.5 border-b border-[#1a1a1a] flex items-center justify-between shrink-0">
            <p className="text-[10px] font-mono text-[#444] uppercase tracking-widest">Editor</p>
            <p className="text-[10px] font-mono text-[#2a2a2a]">drag to reorder</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            <SortableBlockList />
          </div>
        </main>

        {/* Right — Live preview */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="px-5 pt-3.5 pb-2.5 border-b border-[#1a1a1a] flex items-center justify-between shrink-0">
            <p className="text-[10px] font-mono text-[#444] uppercase tracking-widest">Preview</p>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-[#2a2a2a]">live</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-[#0d0d0d]">
             <MarkdownPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
