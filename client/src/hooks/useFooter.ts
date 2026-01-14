import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export interface FooterLink {
  id: number;
  footerSectionId: number;
  label: string;
  url: string;
  iconSvg: string | null;
  iconImageId: number | null;
  orderIndex: number;
  iconImage?: {
    filePath: string;
    altText: string;
  };
}

export interface FooterSection {
  id: number;
  title: string;
  orderIndex: number;
  links?: FooterLink[];
}

export const useFooter = () => {
  const [sections, setSections] = useState<FooterSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFooter = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<FooterSection[]>('/footer/sections');
        if (response.success && response.data) {
          // Sort sections by orderIndex and links within each section
          const sortedSections = (response.data as FooterSection[])
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map(section => ({
              ...section,
              links: section.links?.sort((a, b) => a.orderIndex - b.orderIndex)
            }));
          setSections(sortedSections);
        } else {
          throw new Error(response.message || 'Failed to fetch footer sections');
        }
      } catch (err: any) {
        console.error('Error fetching footer sections:', err);
        setError(err.message || 'Failed to load footer sections');
      } finally {
        setLoading(false);
      }
    };

    fetchFooter();
  }, []);

  return { sections, loading, error };
};

