/**
 * Image URL Utility
 * Converts old WordPress URLs to new local paths
 * Handles both old URLs (https://adonismedical.com/wp-content/uploads/...) 
 * and new paths (/uploads/YYYY/MM/filename)
 */

/**
 * Convert image path/URL to the correct local path
 * - Removes https://www.adonismedical.com/wp-content/ prefix
 * - Handles paths already starting with /uploads/
 * - Returns full URL with base API URL
 */
export const getImageUrl = (image: any): string => {
  if (!image) return '';
  
  let imagePath = '';
  
  // Handle different image formats
  if (typeof image === 'string') {
    imagePath = image;
  } else if (image?.filePath) {
    imagePath = image.filePath;
  } else if (image?.image) {
    imagePath = image.image;
  } else if (image?.url) {
    imagePath = image.url;
  }
  
  if (!imagePath) return '';
  
  // Get base URL (remove /api/v1 if present)
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
  
  // If it's already a full URL starting with http:// or https://
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    // Check if it's the old WordPress URL structure
    if (imagePath.includes('adonismedical.com/wp-content/uploads/')) {
      // Extract the path after wp-content/uploads/
      // Example: https://www.adonismedical.com/wp-content/uploads/2025/05/filename.jpg
      // Becomes: /uploads/2025/05/filename.jpg
      const match = imagePath.match(/wp-content\/uploads\/(.+)$/);
      if (match && match[1]) {
        return `${baseUrl}/uploads/${match[1]}`;
      }
    }
    // If it's already a full URL and not WordPress, return as is
    return imagePath;
  }
  
  // If it already starts with /uploads/, just prepend base URL
  if (imagePath.startsWith('/uploads/')) {
    return `${baseUrl}${imagePath}`;
  }
  
  // If it's a relative path without /uploads/, add it
  // This handles cases where the path might be just "2025/05/filename.jpg"
  if (imagePath.match(/^\d{4}\/\d{2}\//)) {
    return `${baseUrl}/uploads/${imagePath}`;
  }
  
  // Default: treat as relative to uploads root
  return `${baseUrl}/uploads/${imagePath}`;
};

/**
 * Get fallback/default image URL
 * Converts old WordPress URLs to new local paths
 */
export const getDefaultImageUrl = (defaultPath: string): string => {
  if (!defaultPath) return '';
  
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
  
  // Convert old WordPress URLs to new paths
  if (defaultPath.includes('adonismedical.com/wp-content/uploads/')) {
    const match = defaultPath.match(/wp-content\/uploads\/(.+)$/);
    if (match && match[1]) {
      return `${baseUrl}/uploads/${match[1]}`;
    }
  }
  
  // If already a local path, use as is
  if (defaultPath.startsWith('/uploads/')) {
    return `${baseUrl}${defaultPath}`;
  }
  
  // If it's already a full URL, return as is
  if (defaultPath.startsWith('http://') || defaultPath.startsWith('https://')) {
    return defaultPath;
  }
  
  // Default: treat as relative to uploads
  return `${baseUrl}/uploads/${defaultPath}`;
};

