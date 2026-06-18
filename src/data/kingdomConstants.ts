import type { ShoeStyle, ShoeSeason, ProductQuality } from '@/types';

export const styles: { id: ShoeStyle; name: string; icon: string }[] = [
  { id: 'classic', name: '经典', icon: '👠' },
  { id: 'modern', name: '现代', icon: '✨' },
  { id: 'vintage', name: '复古', icon: '🌹' },
  { id: 'avant-garde', name: '前卫', icon: '🎭' },
  { id: 'minimalist', name: '极简', icon: '◻️' },
  { id: 'glamorous', name: '华丽', icon: '💎' },
  { id: 'romantic', name: '浪漫', icon: '🌸' },
  { id: 'edgy', name: '个性', icon: '⚡' },
];

export const seasons: { id: ShoeSeason; name: string; icon: string }[] = [
  { id: 'spring', name: '春季', icon: '🌸' },
  { id: 'summer', name: '夏季', icon: '☀️' },
  { id: 'autumn', name: '秋季', icon: '🍂' },
  { id: 'winter', name: '冬季', icon: '❄️' },
];

export const qualities: { id: ProductQuality; name: string; mult: string }[] = [
  { id: 'standard', name: '标准', mult: 'x1.0' },
  { id: 'premium', name: '高端', mult: 'x1.8' },
  { id: 'luxury', name: '奢华', mult: 'x3.0' },
];

export const materials = [
  { id: 'satin', name: '缎面', cost: 20 },
  { id: 'leather', name: '皮革', cost: 30 },
  { id: 'suede', name: '绒面', cost: 25 },
  { id: 'velvet', name: '丝绒', cost: 35 },
  { id: 'patent', name: '漆皮', cost: 28 },
  { id: 'canvas', name: '帆布', cost: 10 },
];

export const colorPresets = [
  '#D4AF8A', '#722F37', '#1A1A1A', '#F5F1EB',
  '#C9C4BB', '#8B3E47', '#2E4057', '#2D5016',
  '#5C3D2E', '#9B2335', '#FFD700', '#C0C0C0',
];

export const decorations = [
  { id: 'none', name: '无装饰', cost: 0 },
  { id: 'bow', name: '蝴蝶结', cost: 15 },
  { id: 'buckle', name: '金属扣', cost: 12 },
  { id: 'lace', name: '蕾丝', cost: 20 },
  { id: 'embroidery', name: '刺绣', cost: 35 },
  { id: 'rhinestones', name: '水钻', cost: 50 },
  { id: 'feathers', name: '羽毛', cost: 40 },
  { id: 'chains', name: '链条', cost: 18 },
];

export const toeShapes = [
  { id: 'pointed', name: '尖头' },
  { id: 'rounded', name: '圆头' },
  { id: 'square', name: '方头' },
  { id: 'almond', name: '杏仁头' },
];

export const strapStyles = [
  { id: 'none', name: '无带' },
  { id: 'maryjane', name: '玛丽珍' },
  { id: 'tstrap', name: 'T字带' },
  { id: 'ankle', name: '脚踝带' },
  { id: 'slingback', name: '后绊带' },
];
