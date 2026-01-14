import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export interface FaqsPage {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  backgroundImageId: number | null;
  sectionBackgroundImageId: number | null;
  titleColor: string | null;
  subtitleColor: string | null;
  overlayOpacity: number | null;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
  sectionBackgroundImage?: {
    filePath: string;
    altText: string;
  };
}

export interface FaqsItem {
  id: number;
  question: string;
  answer: string;
  imageId: number | null;
  orderIndex: number;
  isActive: boolean;
  image?: {
    filePath: string;
    altText: string;
  };
}

export const useFaqs = () => {
  const [page, setPage] = useState<FaqsPage | null>(null);
  const [items, setItems] = useState<FaqsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        setError(null);

        const [pageRes, itemsRes] = await Promise.all([
          api.get<FaqsPage>('/faqs/page', {
            params: { include: 'backgroundImage,sectionBackgroundImage' }
          }),
          api.get<FaqsItem[]>('/faqs/items')
        ]);

        if (pageRes.success && pageRes.data) {
          setPage(pageRes.data);
        }

        if (itemsRes.success && itemsRes.data) {
          setItems(itemsRes.data.sort((a, b) => a.orderIndex - b.orderIndex));
        }
      } catch (err: any) {
        console.error('Error fetching FAQs:', err);
        setError(err.message || 'Failed to fetch FAQs');
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return { page, items, loading, error };
};

