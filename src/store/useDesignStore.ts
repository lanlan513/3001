import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DesignState, DesignerShoeConfig } from '@/types';

const defaultConfig: DesignerShoeConfig = {
  heelHeight: 8,
  material: 'satin',
  color: '#D4AF8A',
  decoration: 'none',
  toeShape: 'pointed',
  strapStyle: 'none',
};

export const useDesignStore = create<DesignState>()(
  persist(
    (set, get) => ({
      currentConfig: { ...defaultConfig },
      works: [],

      setCurrentConfig: (config) =>
        set((state) => ({
          currentConfig: { ...state.currentConfig, ...config },
        })),

      resetConfig: () =>
        set({
          currentConfig: { ...defaultConfig },
        }),

      saveWork: (name, previewDataUrl) => {
        const newWork = {
          id: `work-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name,
          config: { ...get().currentConfig },
          createdAt: Date.now(),
          previewDataUrl,
        };
        set((state) => ({
          works: [newWork, ...state.works],
        }));
      },

      deleteWork: (id) =>
        set((state) => ({
          works: state.works.filter((work) => work.id !== id),
        })),

      loadWork: (id) => {
        const work = get().works.find((w) => w.id === id);
        if (work) {
          set({ currentConfig: { ...work.config } });
        }
      },
    }),
    {
      name: 'shoe-design-storage',
    }
  )
);
