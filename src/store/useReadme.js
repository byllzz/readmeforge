import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createBlock } from '../lib/blocks.js';
import { blocksToMarkdown } from '../lib/markdown.js';

const DEFAULT_BLOCKS = ['title', 'badges', 'description', 'features', 'installation', 'usage'];
const ACTIVE_EMAIL_KEY = 'readmeforge_activeEmail';

const useReadme = create(
  persist(
    (set, get) => ({
      blocks: DEFAULT_BLOCKS.map(createBlock),
      activeBlockId: null,

      addBlock: type => set(s => ({ blocks: [...s.blocks, createBlock(type)] })),

      removeBlock: id =>
        set(s => ({
          blocks: s.blocks.filter(b => b.id !== id),
          activeBlockId: s.activeBlockId === id ? null : s.activeBlockId,
        })),

      reorderBlocks: blocks => set({ blocks }),

      updateBlock: (id, patch) =>
        set(s => ({
          blocks: s.blocks.map(b =>
            b.id === id ? { ...b, content: { ...b.content, ...patch } } : b,
          ),
        })),

      setActiveBlock: id => set({ activeBlockId: id }),

      getMarkdown: () => blocksToMarkdown(get().blocks),

      duplicateBlock: id =>
        set(s => {
          const idx = s.blocks.findIndex(b => b.id === id);
          if (idx === -1) return s;
          const copy = {
            ...JSON.parse(JSON.stringify(s.blocks[idx])),
            id: `block_copy_${Date.now()}`,
          };
          const next = [...s.blocks];
          next.splice(idx + 1, 0, copy);
          return { blocks: next };
        }),

      // Reset blocks to initial template - only used for new users
      resetToInitialTemplate: () => {
        set({ blocks: DEFAULT_BLOCKS.map(createBlock), activeBlockId: null });
      },

      // Completely clear everything
      clearAllData: () => {
        set({ blocks: [], activeBlockId: null });
      },
    }),
    {
      name: 'readmeforge-workspace', // Fixed internal handle name
      storage: createJSONStorage(() => ({
        // Dynamically point to the correct email key whenever Zustand reads/writes
        getItem: () => {
          const email = localStorage.getItem(ACTIVE_EMAIL_KEY);
          const key = email ? `readmeforge:${email}:blocks` : 'readmeforge:blocks';
          return localStorage.getItem(key);
        },
        setItem: (name, value) => {
          const email = localStorage.getItem(ACTIVE_EMAIL_KEY);
          const key = email ? `readmeforge:${email}:blocks` : 'readmeforge:blocks';
          localStorage.setItem(key, value);
        },
        removeItem: () => {
          const email = localStorage.getItem(ACTIVE_EMAIL_KEY);
          const key = email ? `readmeforge:${email}:blocks` : 'readmeforge:blocks';
          localStorage.removeItem(key);
        },
      })),
      partialize: state => ({
        blocks: state.blocks,
        activeBlockId: state.activeBlockId,
      }),
    },
  ),
);

export default useReadme;
