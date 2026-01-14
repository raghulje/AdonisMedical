import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface Specialty {
  id: number;
  name: string;
  iconClass: string;
  description: string | null;
  imageId: number | null;
  orderIndex: number;
  image?: {
    filePath: string;
    altText: string;
  };
}

export const useSpecialties = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        setLoading(true);
        const response = await api.get<Specialty[]>('/specialties');
        if (response.success && response.data) {
          setSpecialties((response.data as Specialty[]).sort((a, b) => a.orderIndex - b.orderIndex));
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch specialties');
        console.error('Error fetching specialties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  return { specialties, loading, error };
};

