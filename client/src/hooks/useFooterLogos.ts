import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export interface FooterLogo {
  id: number;
  name: string;
  logoImageId: number | null;
  orderIndex: number;
  isActive: boolean;
  logoImage?: {
    filePath: string;
    altText: string;
  };
}

export const useFooterLogos = () => {
  const [logos, setLogos] = useState<FooterLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<FooterLogo[]>('/footer/logos');
        if (response.success && response.data) {
          const sortedLogos = (response.data as FooterLogo[])
            .filter(logo => logo.isActive)
            .sort((a, b) => a.orderIndex - b.orderIndex);
          setLogos(sortedLogos);
        }
      } catch (err: any) {
        console.error('Error fetching footer logos:', err);
        setError(err.message || 'Failed to load footer logos');
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  return { logos, loading, error };
};

