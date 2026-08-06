import { useState, useEffect, useRef } from "react";
import BlockPalette from "./components/editor/BlockPalette.jsx";
import SortableBlockList from "./components/editor/SortableBlockList.jsx";
import MarkdownPreview from "./components/preview/MarkdownPreview.jsx";
import OnboardingTour from "./components/ui/OnboardingTour.jsx";
import ResetConfirmationModal from "./components/ui/ResetConfirmationModal.jsx";
import { HelpCircle, Layers, LayoutGrid, RefreshCw, X } from "lucide-react";
import useReadme from "./store/useReadme.js";

function MobileDrawer({ open, onClose, title, children }) {
  const [everOpened, setEverOpened] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (open) setEverOpened(true);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (open && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [open]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className="md:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      />
      <div
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="md:hidden fixed top-0 right-0 z-50 h-full w-[90vw] max-w-[440px]
                   bg-white border-l border-gray-200
                   flex flex-col overflow-hidden
                   transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
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
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col bg-white">
          {everOpened ? children : null}
        </div>
      </div>
    </>
  );
}

function MobileNavbar({
  blocksCount,
  onBlocksClick,
  onPaletteClick,
  activeTab,
}) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg shadow-black/5">
      <div className="flex items-center justify-around h-16 px-4 pb-safe">
        <button
          onClick={onBlocksClick}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full rounded-lg transition-colors
            ${activeTab === "blocks" ? "text-emerald-600" : "text-gray-400 hover:text-gray-600"}`}
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

        <button
          onClick={onPaletteClick}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full rounded-lg transition-colors
            ${activeTab === "palette" ? "text-gray-800" : "text-gray-400 hover:text-gray-600"}`}
        >
          <LayoutGrid size={20} />
          <span className="text-[11px] font-medium">Palette</span>
        </button>
      </div>
    </nav>
  );
}

function CenterBarHeader({ onReset, onRestartTour }) {
  return (
    <div className="px-4 pt-3.5 pb-2.5 flex items-center gap-1.5 shrink-0 border-b border-gray-100">
      <p className="text-[15px] font-medium text-gray-800">
        Your README blocks
      </p>
      {/* <-- removed the misleading ChevronDown */}

      <div className="ml-auto flex items-center gap-1">
        <button
          onClick={onRestartTour}
          title="How it works"
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-colors"
        >
          <HelpCircle size={14} />
          <span className="hidden sm:inline">How it works</span>
        </button>
        <button
          onClick={onReset}
          title="Reset workspace"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors"
        >
          <RefreshCw size={14} />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
}

export default function Home({ userId, userName, userEmail, onLogout }) {
  const { blocks, clearAllData, resetToInitialTemplate } = useReadme();
  const tourRef = useRef();

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [blocksOpen, setBlocksOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleBlocksClick = () => {
    if (mobileActiveTab === "blocks") {
      setBlocksOpen(false);
      setMobileActiveTab(null);
    } else {
      setBlocksOpen(true);
      setPaletteOpen(false);
      setMobileActiveTab("blocks");
    }
  };

  const handlePaletteClick = () => {
    if (mobileActiveTab === "palette") {
      setPaletteOpen(false);
      setMobileActiveTab(null);
    } else {
      setPaletteOpen(true);
      setBlocksOpen(false);
      setMobileActiveTab("palette");
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

  const handleRestartTour = () => {
    if (tourRef.current) tourRef.current.restart();
  };

  const handleResetConfirmed = () => {
    setShowResetConfirm(false);
    clearAllData();
    resetToInitialTemplate();
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex flex-1 min-h-0">
        <div className="hidden md:flex border-r border-gray-200">
          <BlockPalette
            userId={userId}
            userName={userName}
            userEmail={userEmail}
            onLogout={onLogout}
          />
        </div>

        <main className="hidden md:flex w-[41rem] shrink-0 flex-col min-h-0 bg-white">
          <CenterBarHeader
            onReset={() => setShowResetConfirm(true)}
            onRestartTour={handleRestartTour}
          />
          <div className="flex-1 overflow-y-auto">
            <SortableBlockList />
          </div>
        </main>

        <div className="hidden md:block w-[1px] bg-gray-200 relative hover:bg-blue-500 transition-colors">
          <div className="absolute top-1/2 -translate-y-1/2 h-6 w-2 rounded-full -left-[3px] bg-gray-300 shadow-sm" />
        </div>

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white pb-16 md:pb-0 markdown-preview-container">
          <div className="flex-1 overflow-y-auto">
            <MarkdownPreview />
          </div>
        </div>
      </div>

      <MobileNavbar
        blocksCount={blocks.length}
        onBlocksClick={handleBlocksClick}
        onPaletteClick={handlePaletteClick}
        activeTab={mobileActiveTab}
      />

      <MobileDrawer
        open={paletteOpen}
        onClose={handleClosePalette}
        title="Block palette"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <BlockPalette
            userId={userId}
            userName={userName}
            userEmail={userEmail}
            onLogout={onLogout}
          />
        </div>
      </MobileDrawer>

      <MobileDrawer
        open={blocksOpen}
        onClose={handleCloseBlocks}
        title="Blocks"
      >
        <div className="flex flex-col h-full">
          <CenterBarHeader
            onReset={() => setShowResetConfirm(true)}
            onRestartTour={handleRestartTour}
          />
          <SortableBlockList />
        </div>
      </MobileDrawer>

      <ResetConfirmationModal
        userName={userName}
        isOpen={showResetConfirm}
        onConfirm={handleResetConfirmed}
        onCancel={() => setShowResetConfirm(false)}
      />

      <OnboardingTour ref={tourRef} />
    </div>
  );
}
