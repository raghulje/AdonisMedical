import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface Client {
  id: number;
  name: string;
  logoId: number | null;
  websiteUrl: string | null;
  orderIndex: number;
  isActive: boolean;
  logo: any | null;
}

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await api.get<Client[]>('/clients');
        if (response.success && response.data) {
          setClients(response.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch clients');
        console.error('Error fetching clients:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return { clients, loading, error };
};

