import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export interface ContactInfo {
  id: number;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
}

export const useContactInfo = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<ContactInfo>('/contact-info');
        if (response.success && response.data) {
          setContactInfo(response.data);
        } else {
          throw new Error(response.message || 'Failed to fetch contact information');
        }
      } catch (err: any) {
        console.error('Error fetching contact information:', err);
        setError(err.message || 'Failed to load contact information');
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  return { contactInfo, loading, error };
};

