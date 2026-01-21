import { trackEvent, trackPageView } from './analytics';

/**
 * Enhanced Google Analytics tracking functions for Adonis Medical
 * These provide detailed tracking for specific user interactions
 */

// ============================================
// PRODUCT PAGE TRACKING
// ============================================

/**
 * Track product page view with product details
 */
export const trackProductPageView = (productName: string, productSlug: string) => {
  trackPageView(`/products/${productSlug}`, `Product: ${productName}`);
  trackEvent('Product View', 'view', productName, undefined, {
    product_name: productName,
    product_slug: productSlug,
    page_type: 'product_page',
  });
};

/**
 * Track product carousel navigation
 */
export const trackProductCarouselNav = (
  action: 'next' | 'previous' | 'thumbnail_click',
  productName: string,
  imageIndex?: number,
  totalImages?: number
) => {
  trackEvent('Product Carousel', action, productName, imageIndex, {
    product_name: productName,
    image_index: imageIndex,
    total_images: totalImages,
    action_type: action,
  });
};

/**
 * Track product card click (from home page or our-products page)
 */
export const trackProductCardClick = (productName: string, source: 'home' | 'our-products' | 'product_page') => {
  trackEvent('Product Card Click', 'click', productName, undefined, {
    product_name: productName,
    source_page: source,
    card_type: 'product_card',
  });
};

/**
 * Track product feature click/interaction
 */
export const trackProductFeatureClick = (productName: string, featureText: string, featureId?: number) => {
  trackEvent('Product Feature', 'interact', featureText, featureId, {
    product_name: productName,
    feature_text: featureText.substring(0, 100),
    feature_id: featureId,
  });
};

/**
 * Track product variant click
 */
export const trackProductVariantClick = (productName: string, variantName: string, variantId?: number) => {
  trackEvent('Product Variant', 'click', variantName, variantId, {
    product_name: productName,
    variant_name: variantName,
    variant_id: variantId,
  });
};

/**
 * Track hospital card click (in Hospitals Served section)
 */
export const trackHospitalCardClick = (
  hospitalName: string,
  city: string,
  state: string,
  productName: string
) => {
  trackEvent('Hospital Card', 'click', hospitalName, undefined, {
    hospital_name: hospitalName,
    city: city,
    state: state,
    product_name: productName,
    section: 'hospitals_served',
  });
};

// ============================================
// TESTIMONIALS TRACKING
// ============================================

/**
 * Track testimonials carousel navigation
 */
export const trackTestimonialNav = (action: 'next' | 'previous' | 'auto_scroll', testimonialIndex?: number) => {
  trackEvent('Testimonials', action, `Testimonial ${testimonialIndex || 'N/A'}`, testimonialIndex, {
    action_type: action,
    testimonial_index: testimonialIndex,
  });
};

/**
 * Track testimonial card view (when a specific testimonial is visible)
 */
export const trackTestimonialView = (clientName: string, testimonialId?: number) => {
  trackEvent('Testimonial View', 'view', clientName, testimonialId, {
    client_name: clientName,
    testimonial_id: testimonialId,
  });
};

// ============================================
// CTA & BUTTON TRACKING
// ============================================

/**
 * Track CTA button clicks with context
 */
export const trackCTAClick = (
  buttonText: string,
  location: string,
  ctaType: 'enquire' | 'contact' | 'demo' | 'learn_more' | 'view_all' | 'apply' | 'other',
  additionalData?: Record<string, any>
) => {
  trackEvent('CTA Click', 'click', buttonText, undefined, {
    button_text: buttonText,
    location: location,
    cta_type: ctaType,
    ...additionalData,
  });
};

/**
 * Track "Enquire Now" button clicks
 */
export const trackEnquireNow = (productName?: string, page?: string) => {
  trackCTAClick('Enquire Now', page || window.location.pathname, 'enquire', {
    product_name: productName,
  });
};

/**
 * Track "Request Demo" button clicks
 */
export const trackRequestDemo = (source?: string) => {
  trackCTAClick('Request Demo', source || window.location.pathname, 'demo', {
    source: source,
  });
};

/**
 * Track "Contact Us" button clicks
 */
export const trackContactUs = (source?: string) => {
  trackCTAClick('Contact Us', source || window.location.pathname, 'contact', {
    source: source,
  });
};

/**
 * Track "View All Openings" button (Careers page)
 */
export const trackViewAllOpenings = () => {
  trackCTAClick('View All Openings', '/careers', 'view_all', {
    section: 'careers',
  });
};

/**
 * Track job application click
 */
export const trackJobApplication = (jobTitle: string, jobId?: number) => {
  trackCTAClick('Apply Now', '/careers', 'apply', {
    job_title: jobTitle,
    job_id: jobId,
  });
};

// ============================================
// FORM TRACKING
// ============================================

/**
 * Track form field focus (engagement metric)
 */
export const trackFormFieldFocus = (formName: string, fieldName: string) => {
  trackEvent('Form Field Focus', 'focus', fieldName, undefined, {
    form_name: formName,
    field_name: fieldName,
  });
};

/**
 * Track form field completion (when user fills and leaves field)
 */
export const trackFormFieldComplete = (formName: string, fieldName: string, hasValue: boolean) => {
  trackEvent('Form Field Complete', 'complete', fieldName, undefined, {
    form_name: formName,
    field_name: fieldName,
    has_value: hasValue,
  });
};

/**
 * Track form validation error
 */
export const trackFormError = (formName: string, fieldName: string, errorType: string) => {
  trackEvent('Form Error', 'error', fieldName, undefined, {
    form_name: formName,
    field_name: fieldName,
    error_type: errorType,
  });
};

// ============================================
// NAVIGATION & LINKS
// ============================================

/**
 * Track navigation menu clicks
 */
export const trackNavMenuClick = (menuItem: string, menuType: 'header' | 'footer' | 'mobile') => {
  trackEvent('Navigation Menu', 'click', menuItem, undefined, {
    menu_item: menuItem,
    menu_type: menuType,
  });
};

/**
 * Track email link clicks
 */
export const trackEmailClick = (email: string, location?: string) => {
  trackEvent('Email Click', 'click', email, undefined, {
    email: email,
    location: location || window.location.pathname,
    link_type: 'email',
  });
};

/**
 * Track phone number clicks
 */
export const trackPhoneClick = (phone: string, location?: string) => {
  trackEvent('Phone Click', 'click', phone, undefined, {
    phone: phone,
    location: location || window.location.pathname,
    link_type: 'phone',
  });
};

/**
 * Track social media link clicks
 */
export const trackSocialMediaClick = (platform: string, url: string) => {
  trackEvent('Social Media', 'click', platform, undefined, {
    platform: platform,
    url: url,
    link_type: 'social',
  });
};

// ============================================
// ENGAGEMENT METRICS
// ============================================

/**
 * Track scroll depth (25%, 50%, 75%, 100%)
 */
export const trackScrollDepth = (depth: 25 | 50 | 75 | 100, page: string) => {
  trackEvent('Scroll Depth', 'scroll', `${depth}%`, depth, {
    scroll_depth: depth,
    page: page,
  });
};

/**
 * Track time on page (at intervals)
 */
export const trackTimeOnPage = (seconds: number, page: string) => {
  const intervals = [30, 60, 120, 300]; // 30s, 1min, 2min, 5min
  if (intervals.includes(seconds)) {
    trackEvent('Time on Page', 'engagement', `${seconds}s`, seconds, {
      time_seconds: seconds,
      page: page,
    });
  }
};

/**
 * Track section visibility (when AOS animations trigger)
 */
export const trackSectionView = (sectionName: string, page: string) => {
  trackEvent('Section View', 'view', sectionName, undefined, {
    section_name: sectionName,
    page: page,
  });
};

// ============================================
// SEARCH & FILTER TRACKING
// ============================================

/**
 * Track search query (if search functionality exists)
 */
export const trackSearch = (query: string, resultsCount?: number) => {
  trackEvent('Search', 'search', query, resultsCount, {
    search_query: query,
    results_count: resultsCount,
  });
};

/**
 * Track filter usage (if filtering exists)
 */
export const trackFilter = (filterType: string, filterValue: string) => {
  trackEvent('Filter', 'apply', filterValue, undefined, {
    filter_type: filterType,
    filter_value: filterValue,
  });
};

// ============================================
// ERROR TRACKING
// ============================================

/**
 * Track JavaScript errors
 */
export const trackError = (errorMessage: string, errorType: string, location?: string) => {
  trackEvent('Error', 'error', errorMessage, undefined, {
    error_message: errorMessage.substring(0, 200),
    error_type: errorType,
    location: location || window.location.pathname,
  });
};

/**
 * Track API errors
 */
export const trackAPIError = (endpoint: string, statusCode: number, errorMessage?: string) => {
  trackEvent('API Error', 'error', endpoint, statusCode, {
    endpoint: endpoint,
    status_code: statusCode,
    error_message: errorMessage?.substring(0, 200),
  });
};

// ============================================
// PAGE-SPECIFIC TRACKING
// ============================================

/**
 * Track About page section views
 */
export const trackAboutSection = (sectionName: string) => {
  trackEvent('About Page', 'section_view', sectionName, undefined, {
    section_name: sectionName,
    page: '/about',
  });
};

/**
 * Track Careers page job view
 */
export const trackJobView = (jobTitle: string, jobId?: number) => {
  trackEvent('Job View', 'view', jobTitle, jobId, {
    job_title: jobTitle,
    job_id: jobId,
    page: '/careers',
  });
};

/**
 * Track Our Products page filter/sort
 */
export const trackProductsPageFilter = (filterType: string, value: string) => {
  trackEvent('Products Page Filter', 'filter', value, undefined, {
    filter_type: filterType,
    filter_value: value,
    page: '/our-products',
  });
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Initialize scroll depth tracking
 */
export const initScrollDepthTracking = () => {
  if (typeof window === 'undefined') return;

  const depths = [25, 50, 75, 100];
  const tracked: number[] = [];

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

    depths.forEach((depth) => {
      if (scrollPercent >= depth && !tracked.includes(depth)) {
        tracked.push(depth);
        trackScrollDepth(depth as 25 | 50 | 75 | 100, window.location.pathname);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};

/**
 * Initialize time on page tracking
 */
export const initTimeOnPageTracking = () => {
  if (typeof window === 'undefined') return;

  let startTime = Date.now();
  const intervals = [30, 60, 120, 300]; // seconds
  const tracked: number[] = [];

  const checkTime = () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    intervals.forEach((interval) => {
      if (elapsed >= interval && !tracked.includes(interval)) {
        tracked.push(interval);
        trackTimeOnPage(interval, window.location.pathname);
      }
    });
  };

  const intervalId = setInterval(checkTime, 10000); // Check every 10 seconds

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(intervalId);
  });

  return () => clearInterval(intervalId);
};

