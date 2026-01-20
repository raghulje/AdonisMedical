import {
  trackButtonClick,
  trackLinkClick,
  trackFormSubmit,
  trackFileDownload,
  trackVideoPlay,
  isExternalUrl,
  getButtonText,
  getLinkText,
} from './analytics';

/**
 * Initialize automatic event tracking using event delegation
 * This should be called once after GA4 is initialized
 */
export const initAutoTracking = () => {
  if (typeof window === 'undefined') return;

  // Track button clicks
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    
    // Find the closest button, link, or clickable element
    const button = target.closest('button, [role="button"], a[href], input[type="submit"], input[type="button"]');
    
    if (!button) return;

    const element = button as HTMLElement;
    const tagName = element.tagName.toLowerCase();

    // Skip if element has data-ga-ignore attribute
    if (element.dataset.gaIgnore === 'true') {
      return;
    }

    // Track button clicks
    if (tagName === 'button' || element.getAttribute('role') === 'button' || 
        (tagName === 'input' && (element.getAttribute('type') === 'submit' || element.getAttribute('type') === 'button'))) {
      const buttonText = getButtonText(element);
      const location = window.location.pathname;
      
      // Skip tracking for admin pages (optional - remove if you want to track admin)
      if (location.startsWith('/admin')) {
        return;
      }

      trackButtonClick(buttonText, location, {
        element_type: tagName,
        element_id: element.id || undefined,
        element_class: element.className || undefined,
      });
    }

    // Track link clicks
    if (tagName === 'a' && element.getAttribute('href')) {
      const href = element.getAttribute('href')!;
      
      // Skip anchor links to same page
      if (href.startsWith('#')) {
        return;
      }

      // Skip admin links
      if (href.includes('/admin')) {
        return;
      }

      const linkText = getLinkText(element);
      const external = isExternalUrl(href);
      
      trackLinkClick(href, linkText, external);
    }
  }, true); // Use capture phase to catch events early

  // Track form submissions
  document.addEventListener('submit', (e) => {
    const form = e.target as HTMLFormElement;
    
    if (form.tagName !== 'FORM') return;

    // Skip if form has data-ga-ignore attribute
    if (form.dataset.gaIgnore === 'true') {
      return;
    }

    // Skip admin forms
    if (window.location.pathname.startsWith('/admin')) {
      return;
    }

    const formName = form.name || form.id || form.getAttribute('data-form-name') || 'Unknown Form';
    const formType = form.getAttribute('data-form-type') || 
                     (form.action ? new URL(form.action, window.location.origin).pathname : undefined);

    // Extract form fields (names only, NOT values - for privacy)
    const fieldNames: string[] = [];
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      const name = (input as HTMLInputElement).name || (input as HTMLInputElement).id;
      if (name && !name.toLowerCase().includes('password')) {
        fieldNames.push(name);
      }
    });

    trackFormSubmit(formName, formType, {
      field_count: inputs.length,
      field_names: fieldNames.length > 0 ? fieldNames : undefined,
    });
  }, true);

  // Track file downloads
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href]') as HTMLAnchorElement;
    
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Check if it's a download link
    const isDownload = link.hasAttribute('download') || 
                       href.match(/\.(pdf|doc|docx|xls|xlsx|csv|zip|rar|tar|gz|mp4|mp3|avi|mov|wmv|flv|webm|jpg|jpeg|png|gif|svg|ico)$/i);

    if (isDownload) {
      const fileName = link.getAttribute('download') || href.split('/').pop() || 'Unknown File';
      const fileType = fileName.split('.').pop()?.toLowerCase();
      
      trackFileDownload(fileName, fileType, href);
    }
  }, true);

  // Track video plays
  document.addEventListener('play', (e) => {
    const target = e.target as HTMLVideoElement | HTMLAudioElement;
    
    if (target.tagName === 'VIDEO' || target.tagName === 'AUDIO') {
      // Skip if element has data-ga-ignore attribute
      if (target.dataset.gaIgnore === 'true') {
        return;
      }

      const videoTitle = target.getAttribute('data-ga-label') || 
                        target.getAttribute('title') || 
                        target.getAttribute('aria-label') ||
                        target.src?.split('/').pop() || 
                        'Unknown Video';
      const videoUrl = target.src || target.currentSrc;
      const videoDuration = target.duration || undefined;

      trackVideoPlay(videoTitle, videoUrl, videoDuration);
    }
  }, true);

  console.log('Auto-tracking initialized');
};

