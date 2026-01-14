// Map route slugs to API slugs
export const getProductApiSlug = (routeSlug: string): string => {
  const slugMap: Record<string, string> = {
    'hf-mobile': 'hf-mobile',
    'hf-fixed': 'hf-fixed',
    'fpd-c-arm': 'fpd-c-arm',
    '1k1k-high-end-hf-c-arm': 'hf-c-arm-1k',
    'line-frequency-x-ray-systems': 'line-frequency',
    'digital-radiography': 'digital-radiography',
    'dream-series-ceiling-suspended': 'dream-series'
  };
  return slugMap[routeSlug] || routeSlug;
};

// Get route slug from current pathname
export const getRouteSlugFromPath = (pathname: string): string => {
  const match = pathname.match(/\/products\/([^/]+)/);
  return match ? match[1] : '';
};

