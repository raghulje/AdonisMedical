import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface OurProductsPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  heroImage?: {
    filePath: string;
    altText: string;
  };
}

export const useOurProductsPage = () => {
  const [content, setContent] = useState<OurProductsPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<OurProductsPageContent>('/our-products/content');
        if (response.success && response.data) {
          setContent(response.data as OurProductsPageContent);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch our products page content');
        console.error('Error fetching our products page content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
};

