import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface HomeProductsCard {
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

interface HomeProductsSection {
  id?: number;
  heading: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  backgroundImageId: number | null;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
}

export const useHomeProducts = () => {
  const [section, setSection] = useState<HomeProductsSection | null>(null);
  const [cards, setCards] = useState<HomeProductsCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [sectionRes, cardsRes] = await Promise.all([
          api.get<HomeProductsSection>('/home-products-section'),
          api.get<HomeProductsCard[]>('/home-products-cards')
        ]);
        
        if (sectionRes.success && sectionRes.data) {
          setSection(sectionRes.data as HomeProductsSection);
        }
        
        if (cardsRes.success && cardsRes.data) {
          const activeCards = (cardsRes.data as HomeProductsCard[])
            .filter(card => card.isActive)
            .sort((a, b) => a.orderIndex - b.orderIndex);
          setCards(activeCards);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch products data');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { section, cards, loading, error };
};

