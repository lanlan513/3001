import { create } from 'zustand';
import type { ShoeState } from '@/types';

export const useShoeStore = create<ShoeState>((set) => ({
  shoes: [],
  currentShoe: null,
  eras: [],
  styles: [],
  selectedEra: null,
  selectedStyle: null,
  loading: false,
  error: null,

  setShoes: (shoes) => set({ shoes }),
  setCurrentShoe: (currentShoe) => set({ currentShoe }),
  setEras: (eras) => set({ eras }),
  setStyles: (styles) => set({ styles }),
  setSelectedEra: (selectedEra) => set({ selectedEra, selectedStyle: null }),
  setSelectedStyle: (selectedStyle) => set({ selectedStyle }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
