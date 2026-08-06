import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createBlock } from "../lib/blocks.js";
import { blocksToMarkdown } from "../lib/markdown.js";

const DEFAULT_BLOCKS = [
  "title",
  "badges",
  "description",
  "features",
  "installation",
  "usage",
];
const ACTIVE_USER_ID_KEY = "readmeforge_active_user_id"; // <-- fixed name

let _dupeCounter = 0;

function workspaceKey() {
  const userId = localStorage.getItem(ACTIVE_USER_ID_KEY);
  return userId ? `readmeforge:${userId}:blocks` : "readmeforge:blocks";
}

const useReadme = create(
  persist(
    (set, get) => ({
      blocks: DEFAULT_BLOCKS.map(createBlock),
      activeBlockId: null,

      addBlock: (type) =>
        set((s) => ({ blocks: [...s.blocks, createBlock(type)] })),

      removeBlock: (id) =>
        set((s) => ({
          blocks: s.blocks.filter((b) => b.id !== id),
          activeBlockId: s.activeBlockId === id ? null : s.activeBlockId,
        })),

      reorderBlocks: (blocks) => set({ blocks }),

      updateBlock: (id, patch) =>
        set((s) => ({
          blocks: s.blocks.map((b) =>
            b.id === id ? { ...b, content: { ...b.content, ...patch } } : b,
          ),
        })),

      setActiveBlock: (id) => set({ activeBlockId: id }),

      getMarkdown: () => blocksToMarkdown(get().blocks),

      duplicateBlock: (id) =>
        set((s) => {
          const idx = s.blocks.findIndex((b) => b.id === id);
          if (idx === -1) return s;
          _dupeCounter += 1;
          const copy = {
            ...JSON.parse(JSON.stringify(s.blocks[idx])),
            id: `block_copy_${Date.now()}_${_dupeCounter}`,
          };
          const next = [...s.blocks];
          next.splice(idx + 1, 0, copy);
          return { blocks: next };
        }),

      resetToInitialTemplate: () => {
        set({ blocks: DEFAULT_BLOCKS.map(createBlock), activeBlockId: null });
      },

      clearAllData: () => {
        set({ blocks: [], activeBlockId: null });
      },
    }),
    {
      name: "readmeforge-workspace",
      storage: createJSONStorage(() => ({
        getItem: () => localStorage.getItem(workspaceKey()),
        setItem: (name, value) => localStorage.setItem(workspaceKey(), value),
        removeItem: () => localStorage.removeItem(workspaceKey()),
      })),
      partialize: (state) => ({
        blocks: state.blocks,
        activeBlockId: state.activeBlockId,
      }),
    },
  ),
);

export default useReadme;
