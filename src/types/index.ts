export interface DesignerShoeConfig {
  heelHeight: number;
  material: string;
  color: string;
  decoration: string;
  toeShape: string;
  strapStyle: string;
}

export interface DesignWork {
  id: string;
  name: string;
  config: DesignerShoeConfig;
  createdAt: number;
  previewDataUrl: string;
}

export interface DesignState {
  currentConfig: DesignerShoeConfig;
  works: DesignWork[];
  setCurrentConfig: (config: Partial<DesignerShoeConfig>) => void;
  resetConfig: () => void;
  saveWork: (name: string, previewDataUrl: string) => void;
  deleteWork: (id: string) => void;
  loadWork: (id: string) => void;
}

export interface Shoe {
  id: string;
  name: string;
  era: string;
  year: number;
  designer: string;
  brand: string;
  style: string[];
  color: string;
  imageUrl: string;
  galleryImages?: string[];
  shortStory: string;
  fullStory: string;
  specs: {
    heelHeight: string;
    heelHeightCm: number;
    material: string;
    craftsmanship: string;
    origin: string;
  };
  historicalContext: string;
}

export interface ShoeState {
  shoes: Shoe[];
  currentShoe: Shoe | null;
  eras: string[];
  styles: string[];
  colors: string[];
  selectedEra: string | null;
  selectedStyle: string | null;
  selectedColor: string | null;
  heelHeightRange: [number, number] | null;
  searchQuery: string;
  loading: boolean;
  error: string | null;
  setShoes: (shoes: Shoe[]) => void;
  setCurrentShoe: (shoe: Shoe | null) => void;
  setEras: (eras: string[]) => void;
  setStyles: (styles: string[]) => void;
  setColors: (colors: string[]) => void;
  setSelectedEra: (era: string | null) => void;
  setSelectedStyle: (style: string | null) => void;
  setSelectedColor: (color: string | null) => void;
  setHeelHeightRange: (range: [number, number] | null) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
