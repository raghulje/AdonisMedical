# CMS Migration Scripts

This directory contains scripts for migrating and populating the CMS database with existing data.

## Available Scripts

### 1. `checkDatabaseData.js`
**Purpose:** Lists all database tables and their record counts.

**Usage:**
```bash
node scripts/checkDatabaseData.js
```

**What it does:**
- Connects to the database
- Lists all 72 tables
- Shows record count for each table
- Displays sample column structure

---

### 2. `analyzeDataStructure.js`
**Purpose:** Analyzes the database structure and identifies potential issues.

**Usage:**
```bash
node scripts/analyzeDataStructure.js
```

**What it does:**
- Checks media table status
- Identifies orphaned image_id references
- Analyzes product data (features, variants, images)
- Checks related data (certifications, locations, etc.)
- Provides summary and action items

---

### 3. `populateMediaFromUploads.js`
**Purpose:** Scans the uploads folder and creates media records for all existing files.

**Usage:**
```bash
node scripts/populateMediaFromUploads.js
```

**What it does:**
- Recursively scans `/server/uploads/` directory
- Identifies image and document files
- Creates media records in the database
- Handles duplicates (skips existing records)
- Creates records in batches for performance

**Output:**
- Creates media records with:
  - `fileName`: Original filename
  - `filePath`: Path relative to uploads (e.g., `/uploads/2025/05/image.jpg`)
  - `fileType`: 'image', 'document', or 'svg'
  - `mimeType`: MIME type of the file
  - `fileSize`: File size in bytes
  - `altText`: Generated from filename

**Note:** This script should be run after uploading files to the uploads folder.

---

### 4. `checkImageReferences.js`
**Purpose:** Checks image_id references in content tables.

**Usage:**
```bash
node scripts/checkImageReferences.js
```

**What it does:**
- Checks all image_id columns in content tables
- Identifies NULL references
- Lists alternative image storage methods
- Helps identify data migration needs

---

### 5. `verifyDataIntegrity.js`
**Purpose:** Comprehensive verification of all CMS data.

**Usage:**
```bash
node scripts/verifyDataIntegrity.js
```

**What it does:**
- Verifies users exist
- Checks media records
- Validates page content
- Validates product content
- Checks navigation and footer
- Verifies related data
- Provides overall status report

**Output:**
- ✓ Success items
- ⚠ Warnings
- ✗ Issues that need attention

---

### 6. `migrateAll.js` (Master Script)
**Purpose:** Runs all migration scripts in the correct order.

**Usage:**
```bash
node scripts/migrateAll.js
```

**What it does:**
- Runs all scripts sequentially:
  1. Check Database Structure
  2. Analyze Data Structure
  3. Populate Media from Uploads
  4. Verify Data Integrity
- Provides progress updates
- Continues even if one script fails
- Provides final summary

---

## Migration Workflow

### Initial Setup (First Time)
```bash
# 1. Check what's in the database
node scripts/checkDatabaseData.js

# 2. Analyze the structure
node scripts/analyzeDataStructure.js

# 3. Populate media from uploads folder
node scripts/populateMediaFromUploads.js

# 4. Verify everything is correct
node scripts/verifyDataIntegrity.js
```

### Or Run All at Once
```bash
node scripts/migrateAll.js
```

---

## Current Database Status

Based on the latest verification:

### ✅ Complete
- **Users:** 2 records
- **Media:** 869 records (789 images, 15 documents, 65 SVG)
- **Page Content:** 11/11 pages have content
- **Product Content:** 7/7 products have content
- **Navigation:** 19 items
- **Footer:** 3 sections, 15 links
- **Social Links:** 4 records
- **Related Data:**
  - Awards: 10
  - Clients: 24
  - Testimonials: 2
  - Leaders: 4
  - Certifications: 5
  - Office Locations: 1
  - Investor Documents: 2
  - Production Facility Features: 3
  - Product Features/Variants/Images: 81 records

### 📝 Notes
- All image_id columns are currently NULL (this is fine - we use URL utility)
- Images are served directly from `/uploads/YYYY/MM/` structure
- The CMS can work without image_id references thanks to the URL conversion utility
- Media gallery is fully populated and ready to use

---

## Troubleshooting

### Media table is empty
**Solution:** Run `populateMediaFromUploads.js`

### Orphaned image_id references
**Solution:** These are automatically handled by the URL utility. No action needed.

### Missing page content
**Solution:** Content should be created through the CMS admin dashboard.

### Database connection errors
**Solution:** Check `.env` file and database configuration in `config/config.json`

---

## File Structure

```
server/
├── scripts/
│   ├── checkDatabaseData.js
│   ├── analyzeDataStructure.js
│   ├── populateMediaFromUploads.js
│   ├── checkImageReferences.js
│   ├── verifyDataIntegrity.js
│   ├── migrateAll.js
│   └── README.md (this file)
└── uploads/
    ├── 2024/
    │   ├── 09/
    │   ├── 10/
    │   └── ...
    ├── 2025/
    │   ├── 01/
    │   ├── 02/
    │   └── ...
    └── ...
```

---

## Next Steps After Migration

1. **Start the server:**
   ```bash
   cd server
   npm run dev
   ```

2. **Access CMS Admin:**
   - Navigate to `/admin/login`
   - Login with existing user credentials

3. **Verify CMS Functionality:**
   - Check all pages load correctly
   - Test image uploads
   - Test media gallery
   - Verify navigation and footer

4. **Test Frontend:**
   - All pages should display correctly
   - Images should load from local paths
   - CMS changes should reflect on frontend

---

## Support

If you encounter any issues:
1. Check the script output for error messages
2. Verify database connection
3. Ensure uploads folder exists and has files
4. Check file permissions

