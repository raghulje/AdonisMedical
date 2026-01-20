import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface ReusableContactSection {
  id?: number;
  heading: string | null;
  companyName: string | null;
  address: string | null;
  phone: string | null;
  phoneIconId: number | null;
  phoneIcon?: {
    filePath: string;
    altText: string;
  };
  email: string | null;
  emailIconId: number | null;
  emailIcon?: {
    filePath: string;
    altText: string;
  };
  imageId: number | null;
  image?: {
    filePath: string;
    altText: string;
  };
  backgroundImageId: number | null;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
}

export const useReusableContact = () => {
  const [content, setContent] = useState<ReusableContactSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<ReusableContactSection>('/reusable-contact-section');
        if (response.success && response.data) {
          setContent(response.data as ReusableContactSection);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch reusable contact section');
        console.error('Error fetching reusable contact section:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
};

