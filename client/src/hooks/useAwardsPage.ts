import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface AwardsPageContent {
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

export const useAwardsPage = () => {
  const [content, setContent] = useState<AwardsPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAwardsPage = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<AwardsPageContent>('/awards/page-content');
        if (response.success && response.data) {
          const data = response.data as AwardsPageContent;
          setContent({
            id: data.id || undefined,
            heroTitle: data.heroTitle || null,
            heroSubtitle: data.heroSubtitle || null,
            heroImageId: data.heroImageId || null,
            introText: data.introText || null,
            heroImage: data.heroImage
          });
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
          setError(err.message || 'Failed to fetch awards page data');
          console.error('Error fetching awards page:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAwardsPage();
  }, []);

  return { content, loading, error };
};

