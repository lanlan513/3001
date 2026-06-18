import { create } from 'zustand';
import type { ShoeState } from '@/types';

export const useShoeStore = create<ShoeState>((set) => ({
  shoes: [],
  currentShoe: null,
  eras: [],
  styles: [],
  colors: [],
  selectedEra: null,
  selectedStyle: null,
  selectedColor: null,
  heelHeightRange: null,
  searchQuery: '',
  loading: false,
  error: null,

  setShoes: (shoes) => set({ shoes }),
  setCurrentShoe: (currentShoe) => set({ currentShoe }),
  setEras: (eras) => set({ eras }),
  setStyles: (styles) => set({ styles }),
  setColors: (colors) => set({ colors }),
  setSelectedEra: (selectedEra) => set({ selectedEra, selectedStyle: null }),
  setSelectedStyle: (selectedStyle) => set({ selectedStyle }),
  setSelectedColor: (selectedColor) => set({ selectedColor }),
  setHeelHeightRange: (heelHeightRange) => set({ heelHeightRange }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
