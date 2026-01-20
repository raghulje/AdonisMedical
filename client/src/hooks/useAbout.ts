import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface AboutPageHighlight {
  id: number;
  text: string;
  iconClass: string | null;
  iconId: number | null;
  icon?: {
    filePath: string;
    altText: string;
  };
  orderIndex: number;
}

interface AboutPageOverviewParagraph {
  id: number;
  content: string;
  orderIndex: number;
  position: string | null; // 'before' or 'after' highlights
}

interface AboutPageGlobalReachCard {
  id: number;
  iconClass: string | null;
  iconId: number | null;
  icon?: {
    filePath: string;
    altText: string;
  };
  content: string;
  orderIndex: number;
}

interface AboutPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  overviewHeading: string | null;
  overviewContent: string | null;
  overviewImageId: number | null;
  overviewImageOverlayText: string | null;
  backgroundImageId: number | null;
  safetyHeading: string | null;
  safetyContent: string | null;
  safetyImageId: number | null;
  excellenceHeading: string | null;
  excellenceContent: string | null;
  excellenceImageId: number | null;
  globalReachHeading: string | null;
  heroImage?: {
    filePath: string;
    altText: string;
  };
  overviewImage?: {
    filePath: string;
    altText: string;
  };
  backgroundImage?: {
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
  highlights?: AboutPageHighlight[];
  overviewParagraphs?: AboutPageOverviewParagraph[];
  globalReachCards?: AboutPageGlobalReachCard[];
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

