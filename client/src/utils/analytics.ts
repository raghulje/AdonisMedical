import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-GD81KJNCB8';

// Initialize GA4 (call once at app startup)
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      testMode: process.env.NODE_ENV === 'development' ? false : false, // Set to true for testing
    });
    console.log('GA4 initialized');
  }
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined') {
    ReactGA.send({ hitType: 'pageview', page: path, title: title || document.title });
  }
};

// Track custom events
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number,
  additionalParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined') {
    ReactGA.event({
      category,
      action,
      label,
      value,
      ...additionalParams,
    });
  }
};

// Track button/CTA clicks
export const trackButtonClick = (buttonText: string, location?: string, additionalData?: Record<string, any>) => {
  trackEvent('Button Click', 'click', buttonText, undefined, {
    button_text: buttonText,
    location: location || window.location.pathname,
    ...additionalData,
  });
};

// Track link clicks
export const trackLinkClick = (url: string, linkText?: string, isExternal: boolean = false) => {
  trackEvent('Link Click', 'click', linkText || url, undefined, {
    link_url: url,
    link_text: linkText,
    link_type: isExternal ? 'external' : 'internal',
  });
};

// Track form submissions
export const trackFormSubmit = (formName: string, formType?: string, additionalData?: Record<string, any>) => {
  trackEvent('Form Submission', 'submit', formName, undefined, {
    form_name: formName,
    form_type: formType,
    ...additionalData,
  });
};

// Track file downloads
export const trackFileDownload = (fileName: string, fileType?: string, fileUrl?: string) => {
  trackEvent('File Download', 'download', fileName, undefined, {
    file_name: fileName,
    file_type: fileType,
    file_url: fileUrl,
  });
};

// Track video plays
export const trackVideoPlay = (videoTitle: string, videoUrl?: string, videoDuration?: number) => {
  trackEvent('Video Play', 'play', videoTitle, videoDuration, {
    video_title: videoTitle,
    video_url: videoUrl,
  });
};

// Helper to check if URL is external
export const isExternalUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url, window.location.origin);
    return urlObj.origin !== window.location.origin;
  } catch {
    return false;
  }
};

// Helper to extract button text (handles various element types)
export const getButtonText = (element: HTMLElement): string => {
  // Check data-ga-label first
  if (element.dataset.gaLabel) {
    return element.dataset.gaLabel;
  }

  // Try to get text content
  const text = element.textContent?.trim() || element.innerText?.trim();
  if (text) {
    return text.substring(0, 100); // Limit length
  }

  // Check aria-label
  if (element.getAttribute('aria-label')) {
    return element.getAttribute('aria-label')!.substring(0, 100);
  }

  // Check title
  if (element.getAttribute('title')) {
    return element.getAttribute('title')!.substring(0, 100);
  }

  // Check alt for images
  if (element.tagName === 'IMG' && element.getAttribute('alt')) {
    return element.getAttribute('alt')!.substring(0, 100);
  }

  return 'Unknown Button';
};

// Helper to extract link text
export const getLinkText = (element: HTMLElement): string => {
  if (element.dataset.gaLabel) {
    return element.dataset.gaLabel;
  }

  const text = element.textContent?.trim() || element.innerText?.trim();
  if (text) {
    return text.substring(0, 100);
  }

  if (element.getAttribute('aria-label')) {
    return element.getAttribute('aria-label')!.substring(0, 100);
  }

  if (element.getAttribute('title')) {
    return element.getAttribute('title')!.substring(0, 100);
  }

  return element.getAttribute('href') || 'Unknown Link';
};

