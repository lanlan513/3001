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

export type BuildingType = 'boutique' | 'studio' | 'runway' | 'museum';

export interface ExclusiveShoe {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  rarity: 'common' | 'rare' | 'legendary';
  heelHeight: number;
}

export interface DesignElement {
  id: string;
  name: string;
  type: 'material' | 'decoration' | 'color' | 'toeShape' | 'strapStyle';
  value: string;
  description: string;
  unlocked: boolean;
}

export interface Building {
  id: string;
  name: string;
  type: BuildingType;
  description: string;
  x: number;
  y: number;
  unlocked: boolean;
  challengeId?: string;
  exclusiveShoes: ExclusiveShoe[];
  designElements: DesignElement[];
  icon: string;
}

export interface Challenge {
  id: string;
  buildingId: string;
  title: string;
  description: string;
  type: 'design' | 'quiz' | 'collection';
  rewardCoins: number;
  unlocksRegion?: string;
  completed: boolean;
  requirements: {
    type: string;
    target: number;
    current: number;
  };
}

export interface MapRegion {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  unlockCost: number;
  buildings: Building[];
  color: string;
  position: { x: number; y: number; width: number; height: number };
}

export interface CharacterPosition {
  x: number;
  y: number;
  moving: boolean;
  targetBuildingId?: string;
}

export interface CityMapState {
  coins: number;
  unlockedRegions: string[];
  completedChallenges: string[];
  unlockedShoes: string[];
  unlockedElements: string[];
  currentPosition: CharacterPosition;
  selectedBuilding: Building | null;
  selectedChallenge: Challenge | null;
  showReward: boolean;
  rewardData: {
    coins?: number;
    shoes?: ExclusiveShoe[];
    elements?: DesignElement[];
    region?: MapRegion;
  } | null;
  regions: MapRegion[];
  challenges: Challenge[];
  setCoins: (coins: number) => void;
  addCoins: (amount: number) => void;
  unlockRegion: (regionId: string) => boolean;
  completeChallenge: (challengeId: string) => void;
  unlockShoe: (shoeId: string) => void;
  unlockElement: (elementId: string) => void;
  setCurrentPosition: (position: CharacterPosition) => void;
  moveToBuilding: (buildingId: string) => void;
  setSelectedBuilding: (building: Building | null) => void;
  setSelectedChallenge: (challenge: Challenge | null) => void;
  showRewardModal: (data: {
    coins?: number;
    shoes?: ExclusiveShoe[];
    elements?: DesignElement[];
    region?: MapRegion;
  }) => void;
  hideRewardModal: () => void;
  updateChallengeProgress: (challengeId: string, progress: number) => void;
}
