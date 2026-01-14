import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface ClientsPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  introText: string | null;
  heroImage?: {
    filePath: string;
    altText: string;
  };
}

export const useClientsPage = () => {
  const [content, setContent] = useState<ClientsPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientsPage = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<ClientsPageContent>('/clients/page-content');
        if (response.success && response.data) {
          setContent(response.data as ClientsPageContent);
        } else {
          // Page content doesn't exist yet, use defaults
          setContent({
            heroTitle: null,
            heroSubtitle: null,
            heroImageId: null,
            introText: null
          });
        }
      } catch (err: any) {
        // If it's a "not found" error, that's okay - use defaults
        if (err.message && err.message.includes('not found')) {
          setContent({
            heroTitle: null,
            heroSubtitle: null,
            heroImageId: null,
            introText: null
          });
          setError(null); // Don't treat "not found" as an error
        } else {
          setError(err.message || 'Failed to fetch clients page data');
          console.error('Error fetching clients page:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClientsPage();
  }, []);

  return { content, loading, error };
};

