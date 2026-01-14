import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface HomeStat {
  id: number;
  iconClass: string;
  imageId: number | null;
  number: string;
  label: string;
  orderIndex: number;
  image?: {
    filePath: string;
    altText: string;
  };
}

export const useHomeStats = () => {
  const [stats, setStats] = useState<HomeStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get<HomeStat[]>('/home-stats');
        if (response.success && response.data) {
          setStats(response.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch home stats');
        console.error('Error fetching home stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};

