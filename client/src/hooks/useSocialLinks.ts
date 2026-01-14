import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  iconClass: string | null;
  orderIndex: number;
  isActive: boolean;
}

export const useSocialLinks = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<SocialLink[]>('/social-links');
        if (response.success && response.data) {
          const activeLinks = (response.data as SocialLink[])
            .filter(link => link.isActive)
            .sort((a, b) => a.orderIndex - b.orderIndex);
          setLinks(activeLinks);
        } else {
          throw new Error(response.message || 'Failed to fetch social links');
        }
      } catch (err: any) {
        console.error('Error fetching social links:', err);
        setError(err.message || 'Failed to load social links');
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  return { links, loading, error };
};

