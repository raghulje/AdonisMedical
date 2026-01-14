# 📦 Adonis Medical CMS - Database Seeds

Complete seed data for all pages and sections extracted from the client.

## 📋 **Seed Files Overview**

### **Order of Execution:**

1. **`01_global_data.sql`** - Global settings, navigation, footer, social links, contact info, specialties, testimonials
2. **`02_home_page.sql`** - Home page hero, about, stats, quality sections
3. **`03_about_page.sql`** - About page content and highlights
4. **`04_awards_careers_pages.sql`** - Awards and Careers pages
5. **`05_all_other_pages.sql`** - Investor Relations, Specialties, Management, Clients, Our Presence, Production Facility, Quality Assurance, Contact Us, Request Demo
6. **`06_products_seeds.sql`** - All 7 product pages with features and variants

## 🚀 **How to Run Seeds**

### **Method 1: MySQL Command Line**

```bash
cd database/seeds

# Run in order:
mysql -u raghul -p adonis_production < 01_global_data.sql
mysql -u raghul -p adonis_production < 02_home_page.sql
mysql -u raghul -p adonis_production < 03_about_page.sql
mysql -u raghul -p adonis_production < 04_awards_careers_pages.sql
mysql -u raghul -p adonis_production < 05_all_other_pages.sql
mysql -u raghul -p adonis_production < 06_products_seeds.sql
```

### **Method 2: All at Once**

```bash
cd database/seeds
cat *.sql | mysql -u raghul -p adonis_production
```

### **Method 3: MySQL Workbench**

1. Open MySQL Workbench
2. Connect to `adonis_production` database
3. File → Run SQL Script
4. Select each seed file in order
5. Execute

## 📊 **What's Seeded**

### ✅ **Global Data (01_global_data.sql)**
- Global settings (site name, colors, logos, etc.)
- **19 Navigation items** (with parent-child relationships)
- **3 Footer sections** with **15 footer links**
- **4 Social links** (Facebook, Twitter, LinkedIn, Instagram)
- **Contact information** (company details, address, phone, email)
- **5 Specialties** (Radiology, Urology, Neurology, Orthopedic, Gastroenterology)
- **2 Testimonials** (Dr. S. Karthik, Dr. U. Sai Kiran)

### ✅ **Home Page (02_home_page.sql)**
- Home Hero section (title, subtitle, background image)
- Home About section (intro text, CTA)
- **4 Home Stats** (8000+ Installations, 30+ Years, 2 Facilities, 150,000 X-Rays)
- Home Quality section (heading, description, CTA)
- Home Products section (heading, description, CTA)

### ✅ **About Page (03_about_page.sql)**
- Hero section
- Company Overview section
- Safety & Innovation section
- Excellence section
- **3 Highlights** (bullet points)

### ✅ **Awards & Careers (04_awards_careers_pages.sql)**
- Awards page hero
- **10 Awards** (Partner of Year 2013, CURA Excellence, FICCI TANCARE, etc.)
- Careers page hero and content
- Job openings structure (ready for data)

### ✅ **Other Pages (05_all_other_pages.sql)**
- **Investor Relations** - 2 documents
- **Specialties** - Page content
- **Management** - 4 leaders (ARUN KAUL, VIRENDER SINGH BEDI, MANMOHAN SINGH, SANJEEV KAUL)
- **Clients** - 24 client entries
- **Our Presence** - Page content, 1 office location (Mohali HQ)
- **Production Facility** - Page content, 3 features
- **Quality Assurance** - Page content, 5 certifications (ISO, BIS, AERB, Make in India, CDSCO)
- **Contact Us** - Page content
- **Request Demo** - Page content with 3 features

### ✅ **Products (06_products_seeds.sql)**

Each product includes:
- Page content (title, description, deployment info)
- Features list (9-12 features per product)
- Variants list (3-4 variants per product)

**7 Products:**
1. **HF Mobile** - 9 features, 3 variants
2. **HF Fixed** - 9 features, 4 variants
3. **FPD C-Arm** - 9 features, 2 variants
4. **1K*1K High End HF C-ARM** - 9 features, 3 variants
5. **Line Frequency** - 6 features, 4 variants
6. **Digital Radiography** - 12 features, 1 variant
7. **Dream Series** - 7 features, 3 variants

## 📝 **Total Data Seeded**

- **1 Site configuration**
- **19 Navigation items**
- **18 Footer links** (3 sections)
- **4 Social links**
- **1 Contact info entry**
- **5 Specialties**
- **2 Testimonials**
- **1 Home page** (4 sections + 4 stats)
- **1 About page** (3 sections + 3 highlights)
- **10 Awards**
- **1 Careers page**
- **2 Investor documents**
- **4 Leaders**
- **24 Clients**
- **1 Office location**
- **3 Production features**
- **5 Certifications**
- **7 Product pages** (59 features + 20 variants total)

**Grand Total: ~150+ database records**

## 🖼️ **Images Still Need Upload**

All image URLs are referenced in comments. You'll need to:

1. Download images from the URLs in comments
2. Upload them via the CMS image uploader (`POST /api/v1/upload/image`)
3. Update the `*_image_id` fields with the returned `mediaId`

**Image URLs are provided in SQL comments** for each section like:
```sql
-- Main image: https://www.adonismedical.com/wp-content/uploads/...
-- Note: Update main_image_id after uploading
```

## 🔄 **Next Steps After Seeding**

1. ✅ Run all seed files in order
2. 🚧 Create image upload script to populate media table
3. 🚧 Update foreign key references (`*_image_id` fields)
4. 🚧 Create API endpoints to fetch this data
5. 🚧 Update React components to use API instead of hardcoded data

## ⚠️ **Important Notes**

- All foreign keys to `media` table are set to `NULL` initially
- Image URLs are documented in SQL comments
- Testimonial images need to be uploaded separately
- Award images need to be uploaded separately
- Product gallery images need to be uploaded separately
- Leader profile images need to be uploaded separately
- Client logos need to be uploaded separately

## 🛠️ **Verify Seeds**

After running seeds, verify with:

```sql
USE adonis_production;

-- Check row counts
SELECT 'global_settings' as table_name, COUNT(*) as count FROM global_settings
UNION ALL
SELECT 'navigation_items', COUNT(*) FROM navigation_items
UNION ALL
SELECT 'footer_links', COUNT(*) FROM footer_links
UNION ALL
SELECT 'specialties', COUNT(*) FROM specialties
UNION ALL
SELECT 'testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'home_stats', COUNT(*) FROM home_stats
UNION ALL
SELECT 'awards', COUNT(*) FROM awards
UNION ALL
SELECT 'leaders', COUNT(*) FROM leaders
UNION ALL
SELECT 'clients', COUNT(*) FROM clients
UNION ALL
SELECT 'certifications', COUNT(*) FROM certifications
UNION ALL
SELECT 'hf_mobile_features', COUNT(*) FROM hf_mobile_features
UNION ALL
SELECT 'hf_fixed_features', COUNT(*) FROM hf_fixed_features;
```

Expected output:
- global_settings: 12
- navigation_items: 19
- footer_links: 15
- specialties: 5
- testimonials: 2
- home_stats: 4
- awards: 10
- leaders: 4
- clients: 24
- certifications: 5
- hf_mobile_features: 9
- hf_fixed_features: 9
- (and more for other products)

## 📚 **Data Source**

All data extracted from:
- `client/src/pages/home/components/*.tsx`
- `client/src/pages/about/page.tsx`
- `client/src/pages/*/page.tsx` (all page files)
- `client/src/components/feature/Header.tsx`
- `client/src/components/feature/Footer.tsx`

**All data is 100% accurate** as confirmed by user.

---

**Ready to seed! 🌱**

