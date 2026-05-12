import { useState, useEffect } from 'react'
import BlockPalette from './components/editor/BlockPalette.jsx'
import SortableBlockList from './components/editor/SortableBlockList.jsx'
import MarkdownPreview from './components/preview/MarkdownPreview.jsx'
import { ChevronDown, Layers, LayoutGrid, X } from 'lucide-react'
import useReadme from './store/useReadme.js'

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
        className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="md:hidden fixed top-0 right-0 z-50 h-full w-[90vw] max-w-[440px]
                   bg-[#0a0a0a] border-l border-white/[0.07]
                   flex flex-col overflow-hidden
                   transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] shrink-0">
          <span className="text-[13px] font-medium text-white/60">{title}</span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center w-7 h-7 rounded-lg
                       bg-white/[0.05] border border-white/[0.08]
                       text-white/50 hover:text-white/80 transition-colors duration-150"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {everOpened ? children : null}
        </div>
      </div>
    </>
  )
}

export default function Home({ onLogout }) {
  const email = localStorage.getItem('readmeforge_activeEmail') || 'user'
  const { blocks } = useReadme()

  const [paletteOpen,  setPaletteOpen]  = useState(false)
  const [blocksOpen,   setBlocksOpen]   = useState(false)

  return (
    <div className="flex flex-col h-screen ">
      <div className="flex flex-1 min-h-0">

        {/* ── Left: Block palette — desktop only ── */}
        <div className="hidden md:flex">
          <BlockPalette userEmail={email} onLogout={onLogout} />
        </div>

        <div className="hidden md:block h-screen w-[2px] bg-[#1a1a1a]" />

        {/* ── Center: Sortable editor — desktop only ── */}
        <main className="hidden md:flex w-[35rem] shrink-0 border-r border-[#1a1a1a] flex-col min-h-0">
          <div className="px-3 pt-3.5 pb-2.5 border-b border-[#1a1a1a] flex items-center gap-1.5 shrink-0 relative top-1">
            <p className="text-[15px] font-medium">Area contains specific blocks</p>
            <ChevronDown size={16} />
          </div>
          <div className="flex-1 overflow-y-auto">
            <SortableBlockList />
          </div>
        </main>

        <div className="hidden md:block h-screen w-[2px] bg-[#1a1a1a]" />

        {/* ── Right: Live preview — always visible, full width on mobile ── */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <MarkdownPreview />
          </div>
        </div>

      </div>

      {/* ── Mobile FABs ── */}
      <div className="md:hidden fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">

        {/* Blocks FAB */}
        <button
          onClick={() => { setBlocksOpen(true); setPaletteOpen(false) }}
          aria-label="Open blocks panel"
          className="flex items-center gap-2 pl-3.5 pr-4 py-3 rounded-2xl
                     bg-[#0f0f0f] border border-white/[0.10]
                     shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                     text-white/80 active:scale-95 transition-transform duration-150"
        >
          <Layers size={16} className="text-[#a8ff57]" />
          <span className="text-[13px] font-medium leading-none">Blocks</span>
          {blocks.length > 0 && (
            <span className="ml-0.5 flex items-center justify-center w-5 h-5 rounded-full
                             bg-[#a8ff57] text-black text-[10px] font-bold leading-none">
              {blocks.length}
            </span>
          )}
        </button>

        {/* Palette FAB */}
        <button
          onClick={() => { setPaletteOpen(true); setBlocksOpen(false) }}
          aria-label="Open block palette"
          className="flex items-center gap-2 pl-3.5 pr-4 py-3 rounded-2xl
                     bg-[#0f0f0f] border border-white/[0.10]
                     shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                     text-white/80 active:scale-95 transition-transform duration-150"
        >
          <LayoutGrid size={16} className="text-white/50" />
          <span className="text-[13px] font-medium leading-none">Palette</span>
        </button>

      </div>

      {/* ── Mobile drawers ── */}
      <MobileDrawer
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        title="Block palette"
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
          <BlockPalette userEmail={email} onLogout={onLogout} />
        </div>
      </MobileDrawer>

      <MobileDrawer
        open={blocksOpen}
        onClose={() => setBlocksOpen(false)}
        title="Blocks"
      >
        <div className="flex flex-col h-full">
          <SortableBlockList />
        </div>
      </MobileDrawer>

    </div>
  )
}
