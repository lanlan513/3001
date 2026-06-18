import { useEffect } from 'react';
import { useShoeStore } from '@/store/useShoeStore';
import { api } from '@/utils/api';

export const useGallery = () => {
  const {
    shoes,
    eras,
    styles,
    colors,
    selectedEra,
    selectedStyle,
    selectedColor,
    heelHeightRange,
    searchQuery,
    loading,
    error,
    setShoes,
    setEras,
    setStyles,
    setColors,
    setLoading,
    setError,
  } = useShoeStore();

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [shoesData, erasData, stylesData, colorsData] = await Promise.all([
          api.getShoes(),
          api.getEras(),
          api.getStyles(),
          api.getColors(),
        ]);
        setShoes(shoesData);
        setEras(erasData);
        setStyles(stylesData);
        setColors(colorsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [setShoes, setEras, setStyles, setColors, setLoading, setError]);

  useEffect(() => {
    const fetchFilteredShoes = async () => {
      setLoading(true);
      setError(null);
      try {
        const shoesData = await api.getShoes(
          selectedEra || undefined,
          selectedStyle || undefined,
          selectedColor || undefined,
          heelHeightRange?.[0],
          heelHeightRange?.[1],
          searchQuery || undefined
        );
        setShoes(shoesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchFilteredShoes();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [
    selectedEra,
    selectedStyle,
    selectedColor,
    heelHeightRange,
    searchQuery,
    setShoes,
    setLoading,
    setError,
  ]);

  return { shoes, eras, styles, colors, loading, error };
};

export default useGallery;
