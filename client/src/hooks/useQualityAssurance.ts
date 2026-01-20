import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface Certification {
  id: number;
  name: string;
  abbreviation?: string | null;
  description: string | null;
  logoId: number | null;
  orderIndex: number;
  isActive: boolean;
  logo?: {
    filePath: string;
    altText: string;
  };
}

interface QualityAssurancePageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  introText: string | null;
  backgroundImageId: number | null;
  mainHeading: string | null;
  mainContent: string | null;
  mainImageId: number | null;
  heroImage?: {
    filePath: string;
    altText: string;
  };
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
  mainImage?: {
    filePath: string;
    altText: string;
  };
}

export const useQualityAssurance = () => {
  const [content, setContent] = useState<QualityAssurancePageContent | null>(null);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [certificationsLoading, setCertificationsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQualityAssurance = async () => {
      try {
        setLoading(true);
        setError(null);
        const [contentRes, certificationsRes] = await Promise.all([
          api.get<QualityAssurancePageContent>('/quality-assurance').catch(() => ({ success: false, data: null })),
          api.get<Certification[]>('/quality-assurance/certifications').catch(() => ({ success: false, data: [] }))
        ]);

        if (contentRes.success && contentRes.data) {
          setContent(contentRes.data as QualityAssurancePageContent);
        }
        if (certificationsRes.success && certificationsRes.data) {
          setCertifications((certificationsRes.data as Certification[]).sort((a, b) => a.orderIndex - b.orderIndex));
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch quality assurance page data');
        console.error('Error fetching quality assurance page:', err);
      } finally {
        setLoading(false);
        setCertificationsLoading(false);
      }
    };

    fetchQualityAssurance();
  }, []);

  return { content, certifications, loading, certificationsLoading, error };
};

