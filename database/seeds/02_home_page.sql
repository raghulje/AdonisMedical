-- ============================================
-- ADONIS MEDICAL CMS - HOME PAGE SEEDS
-- ============================================

USE adonis_production;

-- ============================================
-- HOME HERO SECTION
-- ============================================

INSERT INTO home_hero_section (id, title, subtitle, background_image_id, title_color, subtitle_color, overlay_opacity, is_active) VALUES
(1, 'Adonis Medical Systems', 'Excellence In Technology, Dedication in Service', NULL, '#FFFFFF', '#FFFFFF', 40, TRUE);

-- Note: Update background_image_id after inserting images
-- Background image URL: https://www.adonismedical.com/wp-content/uploads/2024/09/hospital-hallway-with-people-walking-down-it-1-1.jpg

-- ============================================
-- HOME ABOUT SECTION
-- ============================================

INSERT INTO home_about_section (id, intro_text, main_image_id, cta_text, cta_url) VALUES
(1, 'Adonis Medical Systems, a leader in medical imaging has more than 30 years of experience in delivering advanced, ergonomically designed X-ray solutions with a strong commitment to safety, innovation, and exceptional customer service.', NULL, 'More About Us', '/about');

-- Note: Update main_image_id after inserting images
-- Main image URL: https://www.adonismedical.com/wp-content/uploads/2024/09/Frame-97-3-1.jpg

-- ============================================
-- HOME STATS
-- ============================================

INSERT INTO home_stats (icon_class, number, label, order_index) VALUES
('ri-building-line', '8000+', 'Installations', 1),
('ri-time-line', '30+', 'Years of Experience', 2),
('ri-factory-line', '2', 'Manufacturing and R&D facilities', 3),
('ri-hospital-line', '150,000', 'X-Rays Everyday', 4);

-- ============================================
-- HOME QUALITY SECTION
-- ============================================

INSERT INTO home_quality_section (id, heading, description, background_image_id, cta_text, cta_url) VALUES
(1, 'Quality Assurance', 'Certified to the highest national and international standards, our equipment delivers flawless performance backed by rigorous in-house testing.', NULL, 'Explore our quality assurance solutions', '/quality-assurance');

-- Note: Update background_image_id after inserting images
-- Background image URL: https://www.adonismedical.com/wp-content/uploads/2024/10/Frame-9-1-1.jpg

-- ============================================
-- HOME PRODUCTS SECTION
-- ============================================

INSERT INTO home_products_section (id, heading, description, cta_text, cta_url) VALUES
(1, 'Our Products', 'Explore our full suite of Medical Imaging Products', 'View All Products', '/products');

-- ============================================
-- HOME PAGE SEEDING COMPLETE
-- ============================================

