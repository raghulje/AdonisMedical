import { useState, useEffect } from 'react';
import { api } from '../../utils/api';

interface Media {
  id: number;
  filePath: string;
  altText: string;
  fileName: string;
}

export const useMedia = (mediaId: number | null | undefined) => {
  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mediaId) {
      setMedia(null);
      return;
    }

    const fetchMedia = async () => {
      setLoading(true);
      try {
        // Note: We'll need to create a GET /media/:id endpoint or use the file path directly
        // For now, we'll just construct the URL from the mediaId
        setMedia({
          id: mediaId,
          filePath: `/uploads/images/general/general/${mediaId}.jpg`, // This will need to be fetched properly
          altText: '',
          fileName: ''
        });
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [mediaId]);

  const getImageUrl = (media: Media | null): string => {
    if (!media) return '';
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
    return `${baseUrl}${media.filePath}`;
  };

  return { media, loading, getImageUrl };
};

