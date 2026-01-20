import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

/**
 * Hook to automatically track page views on route changes
 * Use this in your AppRoutes component or main router component
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    const path = location.pathname + location.search;
    const title = document.title || path;
    
    // Small delay to ensure page is fully loaded and React has updated the DOM
    const timer = setTimeout(() => {
      trackPageView(path, title);
    }, 300);

    return () => clearTimeout(timer);
  }, [location]);
};

