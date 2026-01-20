import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface HomeAboutParagraph {
  id: number;
  content: string;
  orderIndex: number;
}

interface HomeAboutSection {
  id?: number;
  title: string | null;
  subtitle: string | null;
  introText: string | null;
  backgroundImageId: number | null;
  mainImageId: number | null;
  ctaText: string | null;
  ctaUrl: string | null;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
  mainImage?: {
    filePath: string;
    altText: string;
  };
  paragraphs?: HomeAboutParagraph[];
}

export const useHomeAbout = () => {
  const [about, setAbout] = useState<HomeAboutSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const response = await api.get<HomeAboutSection>('/home-about-section');
        if (response.success && response.data) {
          setAbout(response.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch about section');
        console.error('Error fetching about section:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return { about, loading, error };
};

