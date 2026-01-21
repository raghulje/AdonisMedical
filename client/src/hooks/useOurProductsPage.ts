import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface OurProductsPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  sectionIntro?: string | null;
  heroImageId: number | null;
  heroImage?: {
    filePath: string;
    altText: string;
  };
  sectionBackgroundImage?: {
    filePath: string;
    altText: string;
  };
}

interface OurProductsItem {
  id: number;
  name: string;
  productImageId: number | null;
  backgroundImageId: number | null;
  internalLink: string | null;
  orderIndex: number;
  isActive: boolean;
  productImage?: {
    filePath: string;
    altText: string;
  };
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
}

export const useOurProductsPage = () => {
  const [content, setContent] = useState<OurProductsPageContent | null>(null);
  const [items, setItems] = useState<OurProductsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const [contentRes, itemsRes] = await Promise.all([
          api.get<OurProductsPageContent>('/our-products/content').catch(() => ({ success: false, data: null })),
          api.get<OurProductsItem[]>('/our-products/items').catch(() => ({ success: false, data: [] }))
        ]);

        if (contentRes.success && contentRes.data) {
          setContent(contentRes.data as OurProductsPageContent);
        }
        if (itemsRes.success && itemsRes.data) {
          setItems((itemsRes.data as OurProductsItem[]).filter(item => item.isActive).sort((a, b) => a.orderIndex - b.orderIndex));
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

  return { content, items, loading, error };
};

