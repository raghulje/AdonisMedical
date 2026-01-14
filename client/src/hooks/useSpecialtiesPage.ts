import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface SpecialtiesPageContent {
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

interface SpecialtiesPageCard {
  id: number;
  name: string;
  backgroundImageId: number | null;
  cardImageId: number | null;
  internalLink: string | null;
  orderIndex: number;
  isActive: boolean;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
  cardImage?: {
    filePath: string;
    altText: string;
  };
}

export const useSpecialtiesPage = () => {
  const [content, setContent] = useState<SpecialtiesPageContent | null>(null);
  const [cards, setCards] = useState<SpecialtiesPageCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [contentRes, cardsRes] = await Promise.all([
          api.get<SpecialtiesPageContent>('/specialties/page/content').catch(() => ({ success: false, data: null })),
          api.get<SpecialtiesPageCard[]>('/specialties/page/cards').catch(() => ({ success: false, data: [] }))
        ]);

        if (contentRes.success && contentRes.data) {
          setContent(contentRes.data as SpecialtiesPageContent);
        }
        if (cardsRes.success && cardsRes.data) {
          setCards((cardsRes.data as SpecialtiesPageCard[]).sort((a, b) => a.orderIndex - b.orderIndex));
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch specialties page data');
        console.error('Error fetching specialties page:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { content, cards, loading, error };
};

