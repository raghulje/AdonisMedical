import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export interface TermsAndConditionsPage {
  id: number;
  title: string | null;
  subtitle: string | null;
  richTextContent: string | null;
}

export const useTermsAndConditions = () => {
  const [content, setContent] = useState<TermsAndConditionsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<TermsAndConditionsPage>('/terms-privacy/terms/content');
        if (response.success && response.data) {
          setContent(response.data as TermsAndConditionsPage);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch terms and conditions content');
        console.error('Error fetching terms and conditions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
};

