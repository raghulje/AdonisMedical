import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface Leader {
  id: number;
  fullName: string;
  position: string;
  department: string | null;
  bio: string | null;
  imageId: number | null;
  email: string | null;
  linkedinUrl: string | null;
  orderIndex: number;
  isActive: boolean;
  image: any | null;
}

export const useLeaders = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        setLoading(true);
        const response = await api.get<Leader[]>('/leaders');
        if (response.success && response.data) {
          setLeaders(response.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch leaders');
        console.error('Error fetching leaders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  return { leaders, loading, error };
};

