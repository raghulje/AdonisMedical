import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface HomeQualitySection {
  id?: number;
  heading: string | null;
  description: string | null;
  backgroundImageId: number | null;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
  // For compatibility with frontend component
  title?: string | null;
  content?: string | null;
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
          const data = response.data;
          // Map backend fields to component expectations
          setQuality({
            ...data,
            title: data.heading || data.title || null,
            content: data.description || data.content || null,
            image: data.backgroundImage || data.image || undefined,
            imageId: data.backgroundImageId || data.imageId || null,
          });
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

