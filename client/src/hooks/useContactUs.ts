import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface ContactUsPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  introText: string | null;
}

export const useContactUs = () => {
  const [content, setContent] = useState<ContactUsPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactUs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<ContactUsPageContent>('/contact-us');
        if (response.success && response.data) {
          setContent(response.data as ContactUsPageContent);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch contact us page data');
        console.error('Error fetching contact us page:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactUs();
  }, []);

  return { content, loading, error };
};

