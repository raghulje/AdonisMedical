# Upload File Structure

## Overview
All uploaded files (images and documents) are now stored in a year/month folder structure to match the WordPress structure for easy migration.

## Structure
```
uploads/
├── 2024/
│   ├── 09/
│   │   ├── filename1.jpg
│   │   └── filename2.pdf
│   └── 10/
│       ├── filename3.jpg
│       └── filename4.jpg
├── 2025/
│   ├── 01/
│   ├── 02/
│   ├── 03/
│   ├── 04/
│   ├── 05/
│   │   └── Line-Frequency-New-1024x683.jpg
│   └── ...
```

## Path Format
- **Upload Path**: `/uploads/YYYY/MM/filename.ext`
- **Example**: `/uploads/2025/05/Line-Frequency-New-1024x683.jpg`

## URL Conversion
Old WordPress URLs are automatically converted:
- **Old**: `https://www.adonismedical.com/wp-content/uploads/2025/05/Line-Frequency-New-1024x683.jpg`
- **New**: `http://localhost:3002/uploads/2025/05/Line-Frequency-New-1024x683.jpg`

## Upload Behavior
1. **Images** (`/api/v1/upload/image`):
   - Stored in: `/uploads/YYYY/MM/filename.ext`
   - Uses current year and month automatically
   - Original filename is sanitized (special chars → hyphens, lowercased)

2. **Documents** (`/api/v1/upload/file`):
   - Stored in: `/uploads/YYYY/MM/filename.ext`
   - Same structure as images
   - Original filename is preserved (sanitized)

## Migration Notes
- Existing images in the uploads folder should follow the same structure
- The `getImageUrl()` utility automatically converts old URLs to new paths
- No database migration needed - paths are stored as-is in the `file_path` column

