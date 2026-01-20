import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface OfficeLocation {
  id: number;
  officeName: string;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  phone: string | null;
  email: string | null;
  latitude: number | null;
  longitude: number | null;
  isActive: boolean;
}

interface OurPresencePageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  introText: string | null;
  mapImageId: number | null;
  mapBackgroundImageId: number | null;
  salesServiceHeading: string | null;
  salesServiceContent: string | null;
  salesServiceImageId: number | null;
  heroImage?: {
    filePath: string;
    altText: string;
  };
  mapImage?: {
    filePath: string;
    altText: string;
  };
  mapBackgroundImage?: {
    filePath: string;
    altText: string;
  };
  salesServiceImage?: {
    filePath: string;
    altText: string;
  };
}

export const useOurPresence = () => {
  const [content, setContent] = useState<OurPresencePageContent | null>(null);
  const [locations, setLocations] = useState<OfficeLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationsLoading, setLocationsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOurPresence = async () => {
      try {
        setLoading(true);
        setError(null);
        const [contentRes, locationsRes] = await Promise.all([
          api.get<OurPresencePageContent>('/our-presence').catch(() => ({ success: false, data: null })),
          api.get<OfficeLocation[]>('/our-presence/locations').catch(() => ({ success: false, data: [] }))
        ]);

        if (contentRes.success && contentRes.data) {
          setContent(contentRes.data as OurPresencePageContent);
        }
        if (locationsRes.success && locationsRes.data) {
          setLocations(locationsRes.data as OfficeLocation[]);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch our presence page data');
        console.error('Error fetching our presence page:', err);
      } finally {
        setLoading(false);
        setLocationsLoading(false);
      }
    };

    fetchOurPresence();
  }, []);

  return { content, locations, loading, locationsLoading, error };
};

