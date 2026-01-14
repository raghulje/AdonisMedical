import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface Award {
  id: number;
  title: string;
  description: string | null;
  imageId: number | null;
  awardDate: string | null;
  orderIndex: number;
  isActive: boolean;
  image: any | null;
}

export const useAwards = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        setLoading(true);
        const response = await api.get<Award[]>('/awards');
        if (response.success && response.data) {
          setAwards(response.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch awards');
        console.error('Error fetching awards:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, []);

  return { awards, loading, error };
};

