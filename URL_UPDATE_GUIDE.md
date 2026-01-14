# URL Update Guide

## Pattern for Updating External URLs

### Old Pattern:
```typescript
const getImageUrl = (image: any): string => {
  if (!image) return 'https://www.adonismedical.com/wp-content/uploads/2024/10/filename.jpg';
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
  return `${baseUrl}${image.filePath}`;
};
```

### New Pattern:
```typescript
import { getImageUrl, getDefaultImageUrl } from '../../utils/imageUrl';

// For images from CMS:
const imageUrl = content?.image ? getImageUrl(content.image) : getDefaultImageUrl('2024/10/filename.jpg');

// For direct URLs in JSX:
<img src={getDefaultImageUrl('2024/10/filename.jpg')} />
```

### Conversion Pattern:
- `https://www.adonismedical.com/wp-content/uploads/2024/10/Frame-9-1-1.jpg`
- → `getDefaultImageUrl('2024/10/Frame-9-1-1.jpg')`

## Files Updated
✅ `client/src/utils/imageUrl.ts` - New utility
✅ `client/src/pages/home/components/AboutSection.tsx`
✅ `client/src/pages/home/components/QualitySection.tsx`
✅ `client/src/pages/home/components/HeroSection.tsx`
✅ `client/src/pages/about/page.tsx`
✅ `client/src/components/feature/Header.tsx`
✅ `client/src/components/feature/Footer.tsx`
✅ `client/src/components/cms/ImageSelector.tsx` - Updated with 3 options

## Files Still Needing Updates
- `client/src/pages/quality-assurance/page.tsx`
- `client/src/pages/our-presence/page.tsx`
- `client/src/pages/careers/page.tsx`
- `client/src/pages/production-facility/page.tsx`
- `client/src/pages/products/*/page.tsx` (all product pages)
- All other pages with external URLs

## ImageSelector Component
Now supports 3 options:
1. **Upload** - Upload new image file
2. **Gallery** - Choose from existing uploaded images
3. **URL** - Enter local path (/uploads/YYYY/MM/file.jpg) or external URL (https://...)

## Media API Endpoint
- `GET /api/v1/media` - Get all media (supports filtering by fileType, pagination)
- `GET /api/v1/media/:id` - Get media by ID
- `DELETE /api/v1/media/:id` - Delete media

