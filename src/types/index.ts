export interface Shoe {
  id: string;
  name: string;
  era: string;
  year: number;
  designer: string;
  brand: string;
  style: string[];
  imageUrl: string;
  galleryImages?: string[];
  shortStory: string;
  fullStory: string;
  specs: {
    heelHeight: string;
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
  selectedEra: string | null;
  selectedStyle: string | null;
  loading: boolean;
  error: string | null;
  setShoes: (shoes: Shoe[]) => void;
  setCurrentShoe: (shoe: Shoe | null) => void;
  setEras: (eras: string[]) => void;
  setStyles: (styles: string[]) => void;
  setSelectedEra: (era: string | null) => void;
  setSelectedStyle: (style: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
