import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface Testimonial {
  id: number;
  clientName: string;
  clientPosition: string | null;
  clientCompany: string | null;
  clientImageId: number | null;
  testimonialText: string;
  rating: number;
  orderIndex: number;
  isFeatured: boolean;
  isActive: boolean;
  clientImage: any | null;
}

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await api.get<Testimonial[]>('/testimonials');
        if (response.success && response.data) {
          setTestimonials(response.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch testimonials');
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
};

