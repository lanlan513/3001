import { useEffect } from 'react';
import { useShoeStore } from '@/store/useShoeStore';
import { api } from '@/utils/api';

export const useShoes = () => {
  const {
    shoes,
    eras,
    styles,
    selectedEra,
    selectedStyle,
    loading,
    error,
    setShoes,
    setEras,
    setStyles,
    setLoading,
    setError,
  } = useShoeStore();

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [shoesData, erasData, stylesData] = await Promise.all([
          api.getShoes(),
          api.getEras(),
          api.getStyles(),
        ]);
        setShoes(shoesData);
        setEras(erasData);
        setStyles(stylesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [setShoes, setEras, setStyles, setLoading, setError]);

  useEffect(() => {
    const fetchFilteredShoes = async () => {
      if (selectedEra || selectedStyle) {
        setLoading(true);
        try {
          const shoesData = await api.getShoes(selectedEra || undefined, selectedStyle || undefined);
          setShoes(shoesData);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      }
    };

    if (selectedEra || selectedStyle) {
      fetchFilteredShoes();
    }
  }, [selectedEra, selectedStyle, setShoes, setLoading, setError]);

  return { shoes, eras, styles, loading, error };
};

export const useShoeDetail = (id: string | undefined) => {
  const { currentShoe, loading, error, setCurrentShoe, setLoading, setError } = useShoeStore();

  useEffect(() => {
    if (!id) return;

    const fetchShoeDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const shoeData = await api.getShoeById(id);
        setCurrentShoe(shoeData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchShoeDetail();

    return () => {
      setCurrentShoe(null);
    };
  }, [id, setCurrentShoe, setLoading, setError]);

  return { shoe: currentShoe, loading, error };
};
