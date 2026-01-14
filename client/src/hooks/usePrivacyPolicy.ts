import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export interface PrivacyPolicyPage {
  id: number;
  title: string | null;
  subtitle: string | null;
  richTextContent: string | null;
}

export const usePrivacyPolicy = () => {
  const [content, setContent] = useState<PrivacyPolicyPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<PrivacyPolicyPage>('/terms-privacy/privacy/content');
        if (response.success && response.data) {
          setContent(response.data as PrivacyPolicyPage);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch privacy policy content');
        console.error('Error fetching privacy policy:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
};

