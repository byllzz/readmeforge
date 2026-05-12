import { useState, useEffect } from 'react'
import BlockPalette from './components/editor/BlockPalette.jsx'
import SortableBlockList from './components/editor/SortableBlockList.jsx'
import MarkdownPreview from './components/preview/MarkdownPreview.jsx'
import { ChevronDown, Layers, LayoutGrid, X } from 'lucide-react'
import useReadme from './store/useReadme.js'

/* ── Mobile Drawer (white version) ── */
function MobileDrawer({ open, onClose, title, children }) {
  const [everOpened, setEverOpened] = useState(false)

  useEffect(() => {
    if (open) setEverOpened(true)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="md:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="md:hidden fixed top-0 right-0 z-50 h-full w-[90vw] max-w-[440px]
                   bg-white border-l border-gray-200
                   flex flex-col overflow-hidden
                   transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0">
          <span className="text-[13px] font-medium text-gray-600">{title}</span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center w-7 h-7 rounded-lg
                       bg-gray-100 border border-gray-200
                       text-gray-400 hover:text-gray-700 transition-colors duration-150"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col bg-white">
          {everOpened ? children : null}
        </div>
      </div>
    </>
  );
}

/* ── Mobile Bottom Navbar ── */
function MobileNavbar({ blocksCount, onBlocksClick, onPaletteClick, activeTab }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg shadow-black/5">
      <div className="flex items-center justify-around h-16 px-4 pb-safe">
        {/* Blocks tab */}
        <button
          onClick={onBlocksClick}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full rounded-lg transition-colors
            ${activeTab === 'blocks' ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <div className="relative">
            <Layers size={20} />
            {blocksCount > 0 && (
              <span className="absolute -top-1 -right-2 flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-bold leading-none">
                {blocksCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium">Blocks</span>
        </button>

        {/* Palette tab */}
        <button
          onClick={onPaletteClick}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full rounded-lg transition-colors
            ${activeTab === 'palette' ? 'text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <LayoutGrid size={20} />
          <span className="text-[11px] font-medium">Palette</span>
        </button>
      </div>
    </nav>
  );
}

export default function Home({ onLogout }) {
  const email = localStorage.getItem('readmeforge_activeEmail') || 'user'
  const { blocks } = useReadme()

  const [paletteOpen, setPaletteOpen] = useState(false)
  const [blocksOpen, setBlocksOpen] = useState(false)
  const [mobileActiveTab, setMobileActiveTab] = useState(null) // 'blocks' | 'palette' | null

  const handleBlocksClick = () => {
    if (mobileActiveTab === 'blocks') {
      // Toggle off
      setBlocksOpen(false);
      setMobileActiveTab(null);
    } else {
      setBlocksOpen(true);
      setPaletteOpen(false);
      setMobileActiveTab('blocks');
    }
  };

  const handlePaletteClick = () => {
    if (mobileActiveTab === 'palette') {
      // Toggle off
      setPaletteOpen(false);
      setMobileActiveTab(null);
    } else {
      setPaletteOpen(true);
      setBlocksOpen(false);
      setMobileActiveTab('palette');
    }
  };

  const handleCloseBlocks = () => {
    setBlocksOpen(false);
    setMobileActiveTab(null);
  };

  const handleClosePalette = () => {
    setPaletteOpen(false);
    setMobileActiveTab(null);
  };

  return (
    /* Main wrapper – white background */
    <div className="flex flex-col h-screen bg-white">
      <div className="flex flex-1 min-h-0">
        {/* ── Left: Block palette — desktop only ── */}
        <div className="hidden md:flex">
          <BlockPalette userEmail={email} onLogout={onLogout} />
        </div>

        {/* Separator */}
        <div className="hidden md:block h-screen w-[1px] bg-[#d9d0d0]" />

        {/* ── Center: Sortable editor — desktop only ── */}
        <main className="hidden md:flex w-[41rem] shrink-0 flex-col min-h-0 bg-white">
          <div className="px-3 pt-3.5 pb-2.5 flex items-center gap-1.5 shrink-0">
            <p className="text-[15px] font-medium text-gray-800">Area contains specific blocks</p>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
          <div className="flex-1 overflow-y-auto bg-white">
            <SortableBlockList />
          </div>
        </main>

        {/* Resizer handle */}
        <div className="h-screen w-[.5px] bg-[#d9d0d0] relative hover:bg-blue-500 transition-colors hover:cursor-row-resize">
          <div className="absolute top-1/2 -translate-y-1/2 h-[24px] w-2 rounded-full -left-[2.5px] bg-[#aaa] group-hover:bg-blue-500 shadow-2xl z-10" />
        </div>

        {/* ── Right: Live preview — always visible, full width on mobile ── */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white pb-16 md:pb-0">
          <div className="flex-1 overflow-y-auto">
            <MarkdownPreview />
          </div>
        </div>
      </div>

      {/* ── Mobile Bottom Navbar ── */}
      <MobileNavbar
        blocksCount={blocks.length}
        onBlocksClick={handleBlocksClick}
        onPaletteClick={handlePaletteClick}
        activeTab={mobileActiveTab}
      />

      {/* ── Mobile drawers ── */}
      <MobileDrawer open={paletteOpen} onClose={handleClosePalette} title="Block palette">
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
          <BlockPalette userEmail={email} onLogout={onLogout} />
        </div>
      </MobileDrawer>

      <MobileDrawer open={blocksOpen} onClose={handleCloseBlocks} title="Blocks">
        <div className="flex flex-col h-full">
          <SortableBlockList />
        </div>
      </MobileDrawer>
    </div>
  );
}
