import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface HomeSpecialtiesSection {
  id?: number;
  heading: string | null;
  description: string | null;
  imageId: number | null;
  ctaText: string | null;
  ctaUrl: string | null;
  image?: {
    filePath: string;
    altText: string;
  };
}

export const useHomeSpecialties = () => {
  const [section, setSection] = useState<HomeSpecialtiesSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        setLoading(true);
        const response = await api.get<HomeSpecialtiesSection>('/home-specialties-section');
        if (response.success && response.data) {
          setSection(response.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch specialties section');
        console.error('Error fetching specialties section:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  return { section, loading, error };
};

