-- ============================================
-- ADONIS MEDICAL CMS - MASTER SEED SCRIPT
-- Runs all seeds in correct order
-- ============================================

-- Ensure we're using the correct database
USE adonis_production;

-- Disable foreign key checks for seeding
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================
-- GLOBAL DATA
-- ============================================
SOURCE 01_global_data.sql;

-- ============================================
-- HOME PAGE
-- ============================================
SOURCE 02_home_page.sql;

-- ============================================
-- ABOUT PAGE
-- ============================================
SOURCE 03_about_page.sql;

-- ============================================
-- AWARDS & CAREERS
-- ============================================
SOURCE 04_awards_careers_pages.sql;

-- ============================================
-- ALL OTHER PAGES
-- ============================================
SOURCE 05_all_other_pages.sql;

-- ============================================
-- PRODUCTS
-- ============================================
SOURCE 06_products_seeds.sql;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- VERIFICATION
-- ============================================

SELECT '✅ SEEDING COMPLETE!' as status;

-- Show counts
SELECT 'global_settings' as table_name, COUNT(*) as records FROM global_settings
UNION ALL
SELECT 'navigation_items', COUNT(*) FROM navigation_items
UNION ALL
SELECT 'footer_sections', COUNT(*) FROM footer_sections
UNION ALL
SELECT 'footer_links', COUNT(*) FROM footer_links
UNION ALL
SELECT 'social_links', COUNT(*) FROM social_links
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
SELECT 'hf_mobile_variants', COUNT(*) FROM hf_mobile_variants
UNION ALL
SELECT 'hf_fixed_features', COUNT(*) FROM hf_fixed_features
UNION ALL
SELECT 'hf_fixed_variants', COUNT(*) FROM hf_fixed_variants;

-- ============================================
-- NEXT STEPS
-- ============================================
SELECT '
============================================
✅ DATABASE SEEDED SUCCESSFULLY!
============================================

NEXT STEPS:
1. Upload images via CMS (/api/v1/upload/image)
2. Update *_image_id foreign keys
3. Create API endpoints to fetch data
4. Connect React frontend to API
5. Test all pages in CMS

See database/seeds/README.md for details
============================================
' as next_steps;

