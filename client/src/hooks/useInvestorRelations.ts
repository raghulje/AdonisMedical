import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface InvestorDocument {
  id: number;
  title: string;
  description: string | null;
  fileId: number | null;
  orderIndex: number;
  isActive: boolean;
  file?: {
    filePath: string;
    altText: string;
  };
}

interface InvestorRelationsPageContent {
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

export const useInvestorRelations = () => {
  const [content, setContent] = useState<InvestorRelationsPageContent | null>(null);
  const [documents, setDocuments] = useState<InvestorDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [documentsLoading, setDocumentsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvestorRelations = async () => {
      try {
        setLoading(true);
        setError(null);
        const [contentRes, documentsRes] = await Promise.all([
          api.get<InvestorRelationsPageContent>('/investor-relations').catch(() => ({ success: false, data: null })),
          api.get<InvestorDocument[]>('/investor-relations/documents').catch(() => ({ success: false, data: [] }))
        ]);

        if (contentRes.success && contentRes.data) {
          setContent(contentRes.data as InvestorRelationsPageContent);
        }
        if (documentsRes.success && documentsRes.data) {
          setDocuments((documentsRes.data as InvestorDocument[]).sort((a, b) => a.orderIndex - b.orderIndex));
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch investor relations page data');
        console.error('Error fetching investor relations page:', err);
      } finally {
        setLoading(false);
        setDocumentsLoading(false);
      }
    };

    fetchInvestorRelations();
  }, []);

  return { content, documents, loading, documentsLoading, error };
};

