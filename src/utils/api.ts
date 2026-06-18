import type { Shoe } from '@/types';

const API_BASE = '/api';

export const api = {
  async getShoes(
    era?: string,
    style?: string,
    color?: string,
    minHeelHeight?: number,
    maxHeelHeight?: number,
    search?: string
  ): Promise<Shoe[]> {
    const params = new URLSearchParams();
    if (era) params.set('era', era);
    if (style) params.set('style', style);
    if (color) params.set('color', color);
    if (minHeelHeight !== undefined) params.set('minHeelHeight', minHeelHeight.toString());
    if (maxHeelHeight !== undefined) params.set('maxHeelHeight', maxHeelHeight.toString());
    if (search) params.set('search', search);

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/shoes${query}`);
    if (!res.ok) throw new Error('Failed to fetch shoes');
    return res.json();
  },

  async getShoeById(id: string): Promise<Shoe> {
    const res = await fetch(`${API_BASE}/shoes/${id}`);
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('Shoe not found');
      }
      throw new Error('Failed to fetch shoe');
    }
    return res.json();
  },

  async getEras(): Promise<string[]> {
    const res = await fetch(`${API_BASE}/shoes/eras`);
    if (!res.ok) throw new Error('Failed to fetch eras');
    return res.json();
  },

  async getStyles(): Promise<string[]> {
    const res = await fetch(`${API_BASE}/shoes/styles`);
    if (!res.ok) throw new Error('Failed to fetch styles');
    return res.json();
  },

  async getColors(): Promise<string[]> {
    const res = await fetch(`${API_BASE}/shoes/colors`);
    if (!res.ok) throw new Error('Failed to fetch colors');
    return res.json();
  },

  async getHeelHeightRange(): Promise<{ min: number; max: number }> {
    const res = await fetch(`${API_BASE}/shoes/heel-height-range`);
    if (!res.ok) throw new Error('Failed to fetch heel height range');
    return res.json();
  },
};
