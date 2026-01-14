import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface AboutPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  overviewHeading: string | null;
  overviewContent: string | null;
  overviewImageId: number | null;
  safetyHeading: string | null;
  safetyContent: string | null;
  safetyImageId: number | null;
  excellenceHeading: string | null;
  excellenceContent: string | null;
  excellenceImageId: number | null;
  heroImage?: {
    filePath: string;
    altText: string;
  };
  overviewImage?: {
    filePath: string;
    altText: string;
  };
  safetyImage?: {
    filePath: string;
    altText: string;
  };
  excellenceImage?: {
    filePath: string;
    altText: string;
  };
}

export const useAbout = () => {
  const [content, setContent] = useState<AboutPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<AboutPageContent>('/about');
        if (response.success && response.data) {
          setContent(response.data as AboutPageContent);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch about page data');
        console.error('Error fetching about page:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return { content, loading, error };
};

