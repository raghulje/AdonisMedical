import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface Hospital {
  id: number;
  hospitalName: string;
  cityState: string;
  orderIndex: number;
  isActive: boolean;
}

interface SectionSettings {
  id?: number;
  backgroundImageId: number | null;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
}

export const useHospitalsServed = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [settings, setSettings] = useState<SectionSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [hospitalsRes, settingsRes] = await Promise.all([
          api.get<Hospital[]>('/hospitals-served').catch(() => ({ success: false, data: [] })),
          api.get<SectionSettings>('/hospitals-served/settings').catch(() => ({ success: false, data: null }))
        ]);

        if (hospitalsRes.success && hospitalsRes.data) {
          setHospitals((hospitalsRes.data as Hospital[]).filter(h => h.isActive).sort((a, b) => a.orderIndex - b.orderIndex));
        }
        if (settingsRes.success && settingsRes.data) {
          setSettings(settingsRes.data as SectionSettings);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch hospitals served data');
        console.error('Error fetching hospitals served:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { hospitals, settings, loading, error };
};

