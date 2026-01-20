import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface ProductionFacilityFeature {
  id: number;
  iconId: number | null;
  icon?: {
    filePath: string;
    altText: string;
  };
  iconClass: string | null;
  heading: string | null;
  description: string | null;
  orderIndex: number;
}

interface ProductionFacilityPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  introText: string | null;
  introBackgroundImageId: number | null;
  flexibilityHeading: string | null;
  flexibilityContent: string | null;
  highlightedBoxText: string | null;
  flexibilityAdditionalText: string | null;
  flexibilityImageId: number | null;
  qualityHeading: string | null;
  qualityContent: string | null;
  qualityBackgroundImageId: number | null;
  qualityImageId: number | null;
  heroImage?: {
    filePath: string;
    altText: string;
  };
  introBackgroundImage?: {
    filePath: string;
    altText: string;
  };
  flexibilityImage?: {
    filePath: string;
    altText: string;
  };
  qualityBackgroundImage?: {
    filePath: string;
    altText: string;
  };
  qualityImage?: {
    filePath: string;
    altText: string;
  };
}

export const useProductionFacility = () => {
  const [content, setContent] = useState<ProductionFacilityPageContent | null>(null);
  const [features, setFeatures] = useState<ProductionFacilityFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuresLoading, setFeaturesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductionFacility = async () => {
      try {
        setLoading(true);
        setError(null);
        const [contentRes, featuresRes] = await Promise.all([
          api.get<ProductionFacilityPageContent>('/production-facility').catch(() => ({ success: false, data: null })),
          api.get<ProductionFacilityFeature[]>('/production-facility/features').catch(() => ({ success: false, data: [] }))
        ]);

        if (contentRes.success && contentRes.data) {
          setContent(contentRes.data as ProductionFacilityPageContent);
        }
        if (featuresRes.success && featuresRes.data) {
          setFeatures((featuresRes.data as ProductionFacilityFeature[]).sort((a, b) => a.orderIndex - b.orderIndex));
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch production facility page data');
        console.error('Error fetching production facility page:', err);
      } finally {
        setLoading(false);
        setFeaturesLoading(false);
      }
    };

    fetchProductionFacility();
  }, []);

  return { content, features, loading, featuresLoading, error };
};

