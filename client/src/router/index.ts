import { useNavigate, type NavigateFunction, useLocation } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import routes from "./config";
import { usePageTracking } from "../hooks/usePageTracking";
import { trackPageView } from "../utils/analytics";

let navigateResolver: (navigate: ReturnType<typeof useNavigate>) => void;

declare global {
  interface Window {
    REACT_APP_NAVIGATE: ReturnType<typeof useNavigate>;
  }
}

export const navigatePromise = new Promise<NavigateFunction>((resolve) => {
  navigateResolver = resolve;
});

export function AppRoutes() {
  const element = useRoutes(routes);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Track page views on route changes
  usePageTracking();
  
  // Track initial page view on mount
  useEffect(() => {
    const path = location.pathname + location.search;
    const title = document.title || path;
    
    // Track initial page view after a short delay to ensure GA is initialized
    const timer = setTimeout(() => {
      trackPageView(path, title);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []); // Only run on mount
  
  useEffect(() => {
    window.REACT_APP_NAVIGATE = navigate;
    navigateResolver(window.REACT_APP_NAVIGATE);
  });
  
  return element;
}
