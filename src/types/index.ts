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

export type ShoeStyle = 'classic' | 'modern' | 'vintage' | 'avant-garde' | 'minimalist' | 'glamorous' | 'romantic' | 'edgy';
export type ShoeSeason = 'spring' | 'summer' | 'autumn' | 'winter';
export type ProductQuality = 'standard' | 'premium' | 'luxury';

export interface ProductDesign extends DesignerShoeConfig {
  style: ShoeStyle;
  season: ShoeSeason;
  quality: ProductQuality;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  design: ProductDesign;
  productionCost: number;
  sellingPrice: number;
  stock: number;
  totalProduced: number;
  totalSold: number;
  totalRevenue: number;
  popularityScore: number;
  isActive: boolean;
  createdAt: number;
  previewDataUrl?: string;
}

export interface MarketTrend {
  style: ShoeStyle;
  popularity: number;
  trend: 'rising' | 'stable' | 'falling';
  remainingDays: number;
}

export interface FashionShow {
  id: string;
  name: string;
  season: ShoeSeason;
  budget: number;
  products: string[];
  date: number;
  marketingReach: number;
  success: boolean | null;
  revenueBoost: number;
  buzzGenerated: number;
}

export interface DailySalesRecord {
  day: number;
  productId: string;
  unitsSold: number;
  revenue: number;
}

export interface CompanyState {
  companyName: string;
  companyReputation: number;
  money: number;
  currentDay: number;
  currentSeason: ShoeSeason;
  products: Product[];
  marketTrends: MarketTrend[];
  fashionShows: FashionShow[];
  dailySales: DailySalesRecord[];
  totalRevenue: number;
  totalProfit: number;
  monthlyRent: number;
  storageCapacity: number;
  activeProductIds: string[];
  showHistory: {
    day: number;
    event: string;
    type: 'sale' | 'trend' | 'show' | 'warning' | 'success';
  }[];

  setCompanyName: (name: string) => void;
  addMoney: (amount: number) => void;
  spendMoney: (amount: number) => boolean;
  advanceDay: () => void;
  createProduct: (name: string, design: ProductDesign, previewDataUrl?: string) => Product | null;
  setProductPrice: (productId: string, price: number) => void;
  produceUnits: (productId: string, quantity: number) => boolean;
  toggleProductActive: (productId: string) => void;
  deleteProduct: (productId: string) => void;
  hostFashionShow: (name: string, season: ShoeSeason, budget: number, productIds: string[]) => FashionShow | null;
  updateReputation: (delta: number) => void;
  addHistory: (event: string, type: 'sale' | 'trend' | 'show' | 'warning' | 'success') => void;
  resetGame: () => void;
}

export type MagazineNewsCategory = 'trend' | 'industry' | 'culture' | 'scandal' | 'innovation';

export interface FashionNews {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: MagazineNewsCategory;
  relatedStyle?: ShoeStyle;
  impact?: 'positive' | 'negative' | 'neutral';
  day: number;
  imageUrl?: string;
}

export interface TrendEvent {
  id: string;
  name: string;
  description: string;
  icon: string;
  affectedStyles: ShoeStyle[];
  demandMultiplier: number;
  duration: number;
  remainingDays: number;
  intensity: 'minor' | 'moderate' | 'major';
}

export interface MagazineCover {
  id: string;
  issueNumber: number;
  title: string;
  subtitle: string;
  productId?: string;
  productPreviewUrl?: string;
  publishDay: number;
  featuredNewsIds: string[];
  trendEventId?: string;
}

export interface FashionMagazineState {
  news: FashionNews[];
  trendEvents: TrendEvent[];
  covers: MagazineCover[];
  issueCounter: number;
  lastNewsDay: number;
  generateDailyNews: (day: number, season: ShoeSeason, marketTrends: MarketTrend[], products: Product[]) => void;
  updateTrendEvents: () => void;
  checkCoverEligibility: (products: Product[], marketTrends: MarketTrend[]) => MagazineCover | null;
  reset: () => void;
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

export type PuzzleType = 'sequence' | 'riddle' | 'combination' | 'pattern';

export interface ArchaeologyClue {
  id: string;
  name: string;
  description: string;
  icon: string;
  found: boolean;
  roomId: string;
  detail: string;
}

export interface ArchaeologyPuzzle {
  id: string;
  name: string;
  description: string;
  type: PuzzleType;
  solved: boolean;
  hints: string[];
  options: string[];
  correctAnswer: string;
  storyFragment: string;
}

export interface ArchaeologyReward {
  designName: string;
  designDescription: string;
  designImageUrl: string;
  designEra: string;
  storyFragment: string;
}

export interface ArchaeologyRoom {
  id: string;
  name: string;
  description: string;
  icon: string;
  explored: boolean;
  x: number;
  y: number;
  clues: ArchaeologyClue[];
  puzzle: ArchaeologyPuzzle;
  reward: ArchaeologyReward;
  locked: boolean;
  requiredClueIds: string[];
}

export interface ArchaeologyLocation {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  era: string;
  icon: string;
  color: string;
  accentColor: string;
  imageUrl: string;
  unlocked: boolean;
  unlockCost: number;
  rooms: ArchaeologyRoom[];
  historicalStory: string;
}

export interface ArchaeologyState {
  locations: ArchaeologyLocation[];
  foundClueIds: string[];
  solvedPuzzleIds: string[];
  unlockedDesignIds: string[];
  selectedLocationId: string | null;
  selectedRoomId: string | null;
  activePuzzleId: string | null;
  showReward: boolean;
  currentReward: ArchaeologyReward | null;
  showStory: boolean;
  currentStory: string | null;
  foundClue: (locationId: string, roomId: string, clueId: string) => void;
  solvePuzzle: (locationId: string, roomId: string) => void;
  unlockLocation: (locationId: string) => boolean;
  exploreRoom: (locationId: string, roomId: string) => void;
  setSelectedLocation: (locationId: string | null) => void;
  setSelectedRoom: (roomId: string | null) => void;
  setActivePuzzle: (puzzleId: string | null) => void;
  showRewardModal: (reward: ArchaeologyReward) => void;
  hideRewardModal: () => void;
  showStoryModal: (story: string) => void;
  hideStoryModal: () => void;
  canUnlockRoom: (locationId: string, roomId: string) => boolean;
  getLocationProgress: (locationId: string) => { rooms: string; clues: string; puzzles: string };
}
