import Navbar from './components/ui/Navbar.jsx'
import BlockPalette from './components/editor/BlockPalette.jsx'
import SortableBlockList from './components/editor/SortableBlockList.jsx'
import MarkdownPreview from './components/preview/MarkdownPreview.jsx'

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-100">
      {/* <Navbar /> */}

      <div className="flex flex-1 min-h-0">
        {/* Left — Block palette */}
        <BlockPalette />

        {/* Center — Sortable editor */}
        <main className="w-[40rem] shrink-0 border-r border-[#1a1a1a] flex flex-col min-h-0">
          <div className="px-3 pt-3.5 pb-2.5 border-b border-[#1a1a1a] flex items-center justify-between shrink-0">
            <p className="text-[17px] font-mono text tracking-wide font-medium">Editor</p>
            <p className="text-[15px] font-mono text tracking-wide font-medium ">Drag to reorder</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            <SortableBlockList />
          </div>
        </main>

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
