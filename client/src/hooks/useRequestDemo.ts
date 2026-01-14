import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface RequestDemoParagraph {
  id: number;
  content: string;
  orderIndex: number;
}

interface RequestDemoFeature {
  id: number;
  title: string;
  content: string;
  iconImageId: number | null;
  orderIndex: number;
  iconImage?: {
    filePath: string;
    altText: string;
  };
}

interface RequestDemoPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  introText: string | null;
  backgroundImageId: number | null;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
  paragraphs?: RequestDemoParagraph[];
  features?: RequestDemoFeature[];
}

export const useRequestDemo = () => {
  const [content, setContent] = useState<RequestDemoPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequestDemo = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<RequestDemoPageContent>('/request-demo');
        if (response.success && response.data) {
          setContent(response.data as RequestDemoPageContent);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch request demo page data');
        console.error('Error fetching request demo page:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDemo();
  }, []);

  return { content, loading, error };
};

