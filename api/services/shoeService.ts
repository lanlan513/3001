import { shoes } from '../data/shoes.js';
import type { Shoe } from '../shared/types.js';

export const getAllShoes = (era?: string, style?: string): Shoe[] => {
  let result = [...shoes];

  if (era) {
    result = result.filter((shoe) => shoe.era === era);
  }

  if (style) {
    result = result.filter((shoe) =>
      shoe.style.some((s) => s.toLowerCase().includes(style.toLowerCase()))
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
