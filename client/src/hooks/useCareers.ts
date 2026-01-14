import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface Job {
  id: number;
  title: string;
  department: string | null;
  location: string | null;
  employmentType: string | null;
  description: string | null;
  requirements: string | null;
  postedDate: string | null;
  isActive: boolean;
}

interface CareersPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  introText: string | null;
  introImageId: number | null;
  lifeAtAdonisTitle: string | null;
  lifeAtAdonisContent: string | null;
  lifeAtAdonisBackgroundImageId: number | null;
  lifeAtAdonisImageId: number | null;
  heroImage?: {
    filePath: string;
    altText: string;
  };
  introImage?: {
    filePath: string;
    altText: string;
  };
  lifeAtAdonisBackgroundImage?: {
    filePath: string;
    altText: string;
  };
  lifeAtAdonisImage?: {
    filePath: string;
    altText: string;
  };
}

export const useCareers = () => {
  const [content, setContent] = useState<CareersPageContent | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        setError(null);
        const [contentRes, jobsRes] = await Promise.all([
          api.get<CareersPageContent>('/careers').catch(() => ({ success: false, data: null })),
          api.get<Job[]>('/careers/jobs').catch(() => ({ success: false, data: [] }))
        ]);

        if (contentRes.success && contentRes.data) {
          setContent(contentRes.data as CareersPageContent);
        }
        if (jobsRes.success && jobsRes.data) {
          setJobs(jobsRes.data as Job[]);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch careers page data');
        console.error('Error fetching careers page:', err);
      } finally {
        setLoading(false);
        setJobsLoading(false);
      }
    };

    fetchCareers();
  }, []);

  return { content, jobs, loading, jobsLoading, error };
};

