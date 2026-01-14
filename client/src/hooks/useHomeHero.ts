import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface HomeHeroSection {
  id?: number;
  title: string | null;
  subtitle: string | null;
  backgroundImageId: number | null;
  titleColor: string | null;
  subtitleColor: string | null;
  overlayOpacity: number | null;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
}

export const useHomeHero = () => {
  const [hero, setHero] = useState<HomeHeroSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        setLoading(true);
        const response = await api.get<HomeHeroSection>('/home-hero-section');
        if (response.success && response.data) {
          setHero(response.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch hero section');
        console.error('Error fetching hero section:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  return { hero, loading, error };
};

