# 📊 Google Analytics Enhancements for Adonis Medical

## ✅ **What's Already Implemented**

### Basic Tracking
- ✅ GA4 initialization (`G-GD81KJNCB8`)
- ✅ Automatic page view tracking
- ✅ Automatic button/link click tracking
- ✅ Automatic form submission tracking
- ✅ Automatic file download tracking
- ✅ Automatic video play tracking

### Current Auto-Tracking
- ✅ Button clicks (via `autoTracking.ts`)
- ✅ Link clicks (internal/external)
- ✅ Form submissions
- ✅ File downloads
- ✅ Video plays

---

## 🚀 **New Enhanced Analytics Available**

I've created `client/src/utils/enhancedAnalytics.ts` with comprehensive tracking functions. Here's what you can now track:

### 1. **Product Page Tracking**
- **Product page views** with product name and slug
- **Product carousel navigation** (next/prev/thumbnail clicks)
- **Product card clicks** (from home/our-products pages)
- **Product feature interactions**
- **Product variant clicks**
- **Hospital card clicks** (in Hospitals Served section)

### 2. **Testimonials Tracking**
- **Testimonials carousel navigation** (next/prev/auto-scroll)
- **Testimonial card views** (when specific testimonial is visible)

### 3. **CTA & Button Tracking**
- **Enquire Now** button clicks
- **Request Demo** button clicks
- **Contact Us** button clicks
- **View All Openings** (Careers page)
- **Job Application** clicks
- **Generic CTA tracking** with context

### 4. **Form Tracking**
- **Form field focus** (engagement metric)
- **Form field completion**
- **Form validation errors**

### 5. **Navigation & Links**
- **Navigation menu clicks** (header/footer/mobile)
- **Email link clicks**
- **Phone number clicks**
- **Social media link clicks**

### 6. **Engagement Metrics**
- **Scroll depth** (25%, 50%, 75%, 100%)
- **Time on page** (30s, 1min, 2min, 5min intervals)
- **Section visibility** (when AOS animations trigger)

### 7. **Error Tracking**
- **JavaScript errors**
- **API errors**

### 8. **Page-Specific Tracking**
- **About page section views**
- **Careers job views**
- **Products page filters** (if implemented)

---

## 📝 **Implementation Guide**

### Step 1: Import Enhanced Analytics

```typescript
import {
  trackProductPageView,
  trackProductCarouselNav,
  trackProductCardClick,
  trackHospitalCardClick,
  trackTestimonialNav,
  trackEnquireNow,
  trackRequestDemo,
  trackContactUs,
  trackJobApplication,
  initScrollDepthTracking,
  initTimeOnPageTracking,
  // ... other functions as needed
} from '../../utils/enhancedAnalytics';
```

### Step 2: Add Tracking to Product Pages

**Example: `client/src/pages/products/hf-mobile/page.tsx`**

```typescript
import { trackProductPageView, trackProductCarouselNav, trackEnquireNow } from '../../../utils/enhancedAnalytics';

// In component:
useEffect(() => {
  if (content) {
    trackProductPageView(content.name || 'HF Mobile', 'hf-mobile');
  }
}, [content]);

// In ProductImageCarousel component:
const goToNext = () => {
  trackProductCarouselNav('next', productName, currentIndex + 1, totalImages);
  // ... existing code
};

// On Enquire Now button:
<button onClick={() => {
  trackEnquireNow(content?.name, '/products/hf-mobile');
  navigate('/contact-us');
}}>
  Enquire Now
</button>
```

### Step 3: Add Tracking to Product Cards

**Example: `client/src/pages/home/components/ProductsSection.tsx`**

```typescript
import { trackProductCardClick } from '../../../utils/enhancedAnalytics';

<Link
  to={linkUrl}
  onClick={() => trackProductCardClick(product.name, 'home')}
  // ... existing props
>
```

### Step 4: Add Tracking to Testimonials

**Example: `client/src/pages/home/components/TestimonialsSection.tsx`**

```typescript
import { trackTestimonialNav } from '../../../utils/enhancedAnalytics';

const goToNext = () => {
  trackTestimonialNav('next', currentIndex);
  // ... existing code
};

const goToPrevious = () => {
  trackTestimonialNav('previous', currentIndex);
  // ... existing code
};
```

### Step 5: Add Tracking to Hospitals Served Section

**Example: In any product page with hospitals section**

```typescript
import { trackHospitalCardClick } from '../../../utils/enhancedAnalytics';

{hospitals.map((hospital) => (
  <div
    key={hospital.id}
    onClick={() => trackHospitalCardClick(
      hospital.hospitalName,
      hospital.city,
      hospital.state,
      content?.name || 'Product'
    )}
    // ... existing props
  >
```

### Step 6: Add Engagement Tracking (Global)

**In `client/src/main.tsx` or `client/src/router/index.tsx`:**

```typescript
import { initScrollDepthTracking, initTimeOnPageTracking } from './utils/enhancedAnalytics';

// After GA4 initialization:
useEffect(() => {
  initScrollDepthTracking();
  initTimeOnPageTracking();
}, []);
```

### Step 7: Add Form Field Tracking

**Example: `client/src/pages/contact-us/page.tsx`**

```typescript
import { trackFormFieldFocus, trackFormFieldComplete, trackFormError } from '../../utils/enhancedAnalytics';

<input
  onFocus={() => trackFormFieldFocus('contact-us', 'name')}
  onBlur={(e) => trackFormFieldComplete('contact-us', 'name', !!e.target.value)}
  // ... existing props
/>
```

### Step 8: Add Navigation Menu Tracking

**Example: `client/src/components/feature/Header.tsx`**

```typescript
import { trackNavMenuClick } from '../../utils/enhancedAnalytics';

<Link
  to="/about"
  onClick={() => trackNavMenuClick('About', 'header')}
  // ... existing props
>
```

### Step 9: Add Email/Phone/Social Tracking

**Example: Footer component**

```typescript
import { trackEmailClick, trackPhoneClick, trackSocialMediaClick } from '../../utils/enhancedAnalytics';

<a
  href="mailto:info@adonismedical.com"
  onClick={() => trackEmailClick('info@adonismedical.com')}
>
  info@adonismedical.com
</a>

<a
  href="tel:+1234567890"
  onClick={() => trackPhoneClick('+1234567890')}
>
  +1 234 567 890
</a>

<a
  href="https://facebook.com/adonismedical"
  onClick={() => trackSocialMediaClick('Facebook', 'https://facebook.com/adonismedical')}
>
  Facebook
</a>
```

---

## 📈 **What You'll See in Google Analytics**

### Events Dashboard
All events will appear in GA4 under **Events** with these categories:

- **Product View** - When users view product pages
- **Product Carousel** - Carousel interactions
- **Product Card Click** - Product card clicks
- **Product Feature** - Feature interactions
- **Product Variant** - Variant clicks
- **Hospital Card** - Hospital card clicks
- **Testimonials** - Testimonial carousel navigation
- **CTA Click** - All CTA button clicks
- **Form Field Focus** - Form engagement
- **Form Field Complete** - Form completion
- **Form Error** - Validation errors
- **Navigation Menu** - Menu clicks
- **Email Click** - Email link clicks
- **Phone Click** - Phone link clicks
- **Social Media** - Social link clicks
- **Scroll Depth** - Scroll engagement
- **Time on Page** - Time-based engagement
- **Section View** - Section visibility
- **Error** - JavaScript/API errors

### Custom Dimensions (Recommended)
You can create custom dimensions in GA4 for:
- `product_name`
- `product_slug`
- `page_type`
- `source_page`
- `cta_type`
- `form_name`
- `menu_type`
- `platform`

---

## 🎯 **Priority Implementation Order**

### High Priority (Most Impact)
1. ✅ Product page views
2. ✅ Product carousel navigation
3. ✅ CTA button clicks (Enquire Now, Contact Us, Request Demo)
4. ✅ Product card clicks
5. ✅ Scroll depth tracking
6. ✅ Time on page tracking

### Medium Priority
7. ✅ Testimonials navigation
8. ✅ Hospital card clicks
9. ✅ Form field tracking
10. ✅ Navigation menu clicks

### Low Priority (Nice to Have)
11. ✅ Email/phone/social clicks
12. ✅ Section visibility tracking
13. ✅ Error tracking

---

## 🔧 **Quick Start**

1. **Import the enhanced analytics** in your main router file
2. **Add product page tracking** to all 7 product pages
3. **Add CTA tracking** to all "Enquire Now", "Contact Us", "Request Demo" buttons
4. **Add scroll depth and time tracking** globally
5. **Test in GA4 Real-Time** to verify events are firing

---

## 📊 **Expected Analytics Insights**

With these enhancements, you'll be able to answer:

- **Which products are most viewed?**
- **Which product images get the most interaction?**
- **Which CTAs convert best?**
- **How engaged are users?** (scroll depth, time on page)
- **Which forms have the most errors?**
- **Which navigation items are most clicked?**
- **Which hospitals are most viewed?**
- **How do users navigate through testimonials?**

---

## 🚨 **Privacy Note**

All tracking respects user privacy:
- **No PII (Personally Identifiable Information)** is tracked
- Form field **names only** (not values)
- Email/phone tracking is for **link clicks only**, not content

---

## 📝 **Next Steps**

1. Review this document
2. Decide which tracking to implement first
3. Add tracking incrementally (start with high-priority items)
4. Test in GA4 Real-Time view
5. Create custom reports/dashboards in GA4
6. Monitor and optimize based on data

---

**Need help implementing?** The functions are ready to use - just import and call them at the right places in your components!

