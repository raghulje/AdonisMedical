import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
  structuredData?: object;
}

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author = 'Adonis Medical Systems',
  publishedTime,
  modifiedTime,
  noindex = false,
  nofollow = false,
  canonical,
  structuredData,
}: SEOProps) => {
  const location = useLocation();
  const baseUrl = 'https://www.adonismedical.com';
  const fullUrl = url || `${baseUrl}${location.pathname}`;
  const canonicalUrl = canonical || fullUrl;
  const defaultImage = 'https://www.adonismedical.com/wp-content/uploads/2025/11/cropped-adoinis-favicon-270x270.jpg';
  const ogImage = image || defaultImage;
  const siteName = 'Adonis Medical Systems';
  const defaultTitle = `${siteName} - Excellence In Technology, Dedication in Service`;
  const pageTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const defaultDescription = 'Adonis Medical Systems - Leader in medical imaging with 30+ years of experience in X-ray solutions, digital radiography, C-arm systems, and healthcare technology.';
  const metaDescription = description || defaultDescription;

  useEffect(() => {
    // Update document title
    document.title = pageTitle;

    // Helper function to update or create meta tag
    const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Basic meta tags
    updateMetaTag('description', metaDescription);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }
    if (author) {
      updateMetaTag('author', author);
    }

    // Robots meta
    const robotsContent = [
      noindex ? 'noindex' : 'index',
      nofollow ? 'nofollow' : 'follow',
    ].join(', ');
    updateMetaTag('robots', robotsContent);

    // Open Graph tags
    updateMetaTag('og:title', pageTitle, 'property');
    updateMetaTag('og:description', metaDescription, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:url', fullUrl, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', siteName, 'property');
    updateMetaTag('og:locale', 'en_US', 'property');
    if (publishedTime) {
      updateMetaTag('article:published_time', publishedTime, 'property');
    }
    if (modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime, 'property');
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', metaDescription);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    updateLinkTag('canonical', canonicalUrl);

    // Language
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('lang', 'en');

    // Structured Data (JSON-LD)
    const existingScript = document.querySelector('script[type="application/ld+json"][data-seo]');
    if (existingScript) {
      existingScript.remove();
    }

    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Note: We don't remove meta tags on cleanup as they should persist
      // The next page will update them anyway
    };
  }, [
    pageTitle,
    metaDescription,
    keywords,
    ogImage,
    fullUrl,
    canonicalUrl,
    type,
    author,
    publishedTime,
    modifiedTime,
    noindex,
    nofollow,
    structuredData,
  ]);

  return null; // This component doesn't render anything
};

export default SEO;

