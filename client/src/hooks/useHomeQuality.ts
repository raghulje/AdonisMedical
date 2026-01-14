import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface HomeQualitySection {
  id?: number;
  title: string | null;
  content: string | null;
  imageId: number | null;
  image?: {
    filePath: string;
    altText: string;
  };
}

export const useHomeQuality = () => {
  const [quality, setQuality] = useState<HomeQualitySection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuality = async () => {
      try {
        setLoading(true);
        const response = await api.get<HomeQualitySection>('/home-quality-section');
        if (response.success && response.data) {
          setQuality(response.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch quality section');
        console.error('Error fetching quality section:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuality();
  }, []);

  return { quality, loading, error };
};

