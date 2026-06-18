import { shoes } from '../data/shoes.js';
import type { Shoe } from '../shared/types.js';

export const getAllShoes = (
  era?: string,
  style?: string,
  color?: string,
  minHeelHeight?: string,
  maxHeelHeight?: string,
  search?: string
): Shoe[] => {
  let result = [...shoes];

  if (era) {
    result = result.filter((shoe) => shoe.era === era);
  }

  if (style) {
    result = result.filter((shoe) =>
      shoe.style.some((s) => s.toLowerCase().includes(style.toLowerCase()))
    );
  }

  if (color) {
    result = result.filter((shoe) => shoe.color === color);
  }

  if (minHeelHeight) {
    const min = parseFloat(minHeelHeight);
    if (!isNaN(min)) {
      result = result.filter((shoe) => shoe.specs.heelHeightCm >= min);
    }
  }

  if (maxHeelHeight) {
    const max = parseFloat(maxHeelHeight);
    if (!isNaN(max)) {
      result = result.filter((shoe) => shoe.specs.heelHeightCm <= max);
    }
  }

  if (search) {
    const searchLower = search.toLowerCase();
    result = result.filter(
      (shoe) =>
        shoe.name.toLowerCase().includes(searchLower) ||
        shoe.designer.toLowerCase().includes(searchLower) ||
        shoe.brand.toLowerCase().includes(searchLower)
    );
  }

  return result;
};

export const getShoeById = (id: string): Shoe | undefined => {
  return shoes.find((shoe) => shoe.id === id);
};

export const getAllEras = (): string[] => {
  const eras = new Set(shoes.map((shoe) => shoe.era));
  return Array.from(eras).sort();
};

export const getAllStyles = (): string[] => {
  const styles = new Set(shoes.flatMap((shoe) => shoe.style));
  return Array.from(styles).sort();
};

export const getAllColors = (): string[] => {
  const colors = new Set(shoes.map((shoe) => shoe.color));
  return Array.from(colors).sort();
};

export const getHeelHeightRange = (): { min: number; max: number } => {
  const heights = shoes.map((shoe) => shoe.specs.heelHeightCm);
  return {
    min: Math.min(...heights),
    max: Math.max(...heights),
  };
};
