-- ============================================
-- ADONIS MEDICAL CMS - GLOBAL DATA SEEDS
-- Run this after creating the database schema
-- ============================================

USE adonis_production;

-- ============================================
-- GLOBAL SETTINGS
-- ============================================

INSERT INTO global_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'Adonis Medical Systems', 'text', 'Site name'),
('site_tagline', 'Excellence In Technology, Dedication in Service', 'text', 'Site tagline'),
('meta_title', 'Adonis Medical Systems - Excellence In Technology, Dedication in Service', 'text', 'Default meta title'),
('meta_description', 'Adonis Medical Systems - Leader in medical imaging with 30+ years of experience in X-ray solutions.', 'textarea', 'Default meta description'),
('meta_keywords', 'medical imaging, x-ray systems, digital radiography, c-arm, medical equipment, healthcare technology', 'textarea', 'Default meta keywords'),
('primary_color', '#7DC244', 'color', 'Primary brand color'),
('secondary_color', '#FF6B35', 'color', 'Secondary brand color'),
('logo_url', 'https://www.adonismedical.com/wp-content/uploads/2024/09/logo_adonis_4x-1.svg', 'text', 'Main logo URL'),
('logo_height', '48', 'number', 'Logo height in pixels'),
('favicon_url', 'https://www.adonismedical.com/wp-content/uploads/2025/11/cropped-adoinis-favicon-270x270.jpg', 'text', 'Favicon URL'),
('footer_logo_url', 'https://www.adonismedical.com/wp-content/uploads/2024/09/logo_adonis_4x-1-1.svg', 'text', 'Footer logo URL'),
('copyright_text', '© Worldwide Copyright Reserved. ADONIS MEDICAL SYSTEMS PVT LTD', 'text', 'Copyright text');

-- ============================================
-- NAVIGATION ITEMS
-- ============================================

-- Main navigation
INSERT INTO navigation_items (id, label, url, parent_id, order_index, is_active) VALUES
(1, 'Home', '/', NULL, 1, TRUE),
(2, 'About Us', '/about', 1, 1, TRUE),
(3, 'Leadership', '/management', 1, 2, TRUE),
(4, 'Our Presence', '/our-presence', 1, 3, TRUE),
(5, 'Production Facility', '/production-facility', 1, 4, TRUE),
(6, 'Quality Assurance & Regulatory', '/quality-assurance', 1, 5, TRUE),
(7, 'Specialties', '/specialties', NULL, 2, TRUE),
(8, 'Our Products', NULL, NULL, 3, TRUE),
(9, 'HF Mobile', '/products/hf-mobile', 8, 1, TRUE),
(10, 'HF Fixed', '/products/hf-fixed', 8, 2, TRUE),
(11, 'FPD-C-Arm', '/products/fpd-c-arm', 8, 3, TRUE),
(12, '1K*1K High End HF C-ARM', '/products/1k1k-high-end-hf-c-arm', 8, 4, TRUE),
(13, 'Line Frequency X-Ray Systems', '/products/line-frequency-x-ray-systems', 8, 5, TRUE),
(14, 'Digital Radiography', '/products/digital-radiography', 8, 6, TRUE),
(15, 'Dream Series-Ceiling Suspended', '/products/dream-series-ceiling-suspended', 8, 7, TRUE),
(16, 'Careers', '/careers', NULL, 4, TRUE),
(17, 'Investor Relations', '/investor-relations', NULL, 5, TRUE),
(18, 'Awards', '/awards', NULL, 6, TRUE),
(19, 'Clients', '/clients', NULL, 7, TRUE);

-- ============================================
-- FOOTER SECTIONS & LINKS
-- ============================================

INSERT INTO footer_sections (id, title, order_index) VALUES
(1, 'Quick Links', 1),
(2, 'Our Products', 2),
(3, 'Contact Information', 3);

INSERT INTO footer_links (footer_section_id, label, url, order_index) VALUES
-- Quick Links
(1, 'Home', '/', 1),
(1, 'About Us', '/about', 2),
(1, 'Management', '/management', 3),
(1, 'Our Presence', '/our-presence', 4),
(1, 'Quality Assurance', '/quality-assurance', 5),
(1, 'Careers', '/careers', 6),
(1, 'Our Specialties', '/specialties', 7),
(1, 'FAQ', '/faq', 8),
-- Our Products
(2, 'HF Mobile', '/products/hf-mobile', 1),
(2, 'HF Fixed', '/products/hf-fixed', 2),
(2, '1K*1K High End HF C-ARM', '/products/1k1k-high-end-hf-c-arm', 3),
(2, 'Line Frequency X-Ray Systems', '/products/line-frequency-x-ray-systems', 4),
(2, 'Digital Radiography', '/products/digital-radiography', 5),
(2, 'Dream Series-Ceiling Suspended', '/products/dream-series-ceiling-suspended', 6),
(2, 'FPD-C-Arm', '/products/fpd-c-arm', 7);

-- ============================================
-- SOCIAL LINKS
-- ============================================

INSERT INTO social_links (platform, url, icon_class, order_index, is_active) VALUES
('Facebook', 'https://facebook.com/adonismedical', 'ri-facebook-fill', 1, TRUE),
('Twitter', 'https://twitter.com/adonismedical', 'ri-twitter-fill', 2, TRUE),
('LinkedIn', 'https://linkedin.com/company/adonismedical', 'ri-linkedin-fill', 3, TRUE),
('Instagram', 'https://instagram.com/adonismedical', 'ri-instagram-line', 4, TRUE);

-- ============================================
-- CONTACT INFORMATION
-- ============================================

INSERT INTO contact_info (company_name, address_line1, address_line2, city, state, postal_code, country, phone, email, support_email, google_maps_embed_url) VALUES
('ADONIS MEDICAL SYSTEMS PVT LTD', 'E-70, PHASE- VIII', 'INDUSTRIAL AREA', 'MOHALI', 'Punjab', '160071', 'India', '9872003273', 'info@adonismedical.com', 'support@adonismedical.com', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8662069534!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzU3LjciTiA4MMKwMTYnMTQuNSJF!5e0!3m2!1sen!2sin!4v1234567890');

-- ============================================
-- SPECIALTIES (for home page and specialties page)
-- ============================================

INSERT INTO specialties (name, slug, description, image_id, icon_class, order_index, is_active) VALUES
('Radiology', 'radiology', 'Comprehensive radiological imaging solutions', NULL, 'ri-heart-pulse-line', 1, TRUE),
('Urology', 'urology', 'Specialized urological imaging equipment', NULL, 'ri-capsule-line', 2, TRUE),
('Neurology', 'neurology', 'Advanced neurological imaging systems', NULL, 'ri-brain-line', 3, TRUE),
('Orthopedic', 'orthopedic', 'Orthopedic imaging and diagnostics', NULL, 'ri-bone-line', 4, TRUE),
('Gastroenterology', 'gastroenterology', 'Gastrointestinal imaging solutions', NULL, 'ri-stethoscope-line', 5, TRUE);

-- Image URLs (for reference when uploading):
-- Radiology: https://www.adonismedical.com/wp-content/uploads/2024/10/radiology.png
-- Urology: https://www.adonismedical.com/wp-content/uploads/2024/10/urology.png
-- Neurology: https://www.adonismedical.com/wp-content/uploads/2024/10/neurology.png
-- Orthopedic: https://www.adonismedical.com/wp-content/uploads/2024/10/orthopedic.png
-- Gastroenterology: https://www.adonismedical.com/wp-content/uploads/2024/10/gastroenterology.png

-- ============================================
-- TESTIMONIALS
-- ============================================

INSERT INTO testimonials (client_name, client_position, client_company, client_image_id, testimonial_text, rating, order_index, is_featured, is_active) VALUES
('Dr. S. Karthik', 'Surgeon', 'Global Ortho & Trauma Hospital', NULL, 'What sets ADONIS apart from other medical suppliers is their willingness to go the extra mile. The customer support I got was exemplary and they answered all of my queries patiently just to ensure I was completely satisfied.', 5, 1, TRUE, TRUE),
('Dr. U. Sai Kiran', 'Medical Director', 'Life Care Multi Speciality Hospital', NULL, 'My association with ADONIS has been for a ten years. The products I have used till date 26-10-2024 are of superior quality and long term durability. My complete satisfaction with their products peoples me to further recommend to others.', 5, 2, TRUE, TRUE);

-- Note: Update client_image_id after inserting images to media table

-- ============================================
-- GLOBAL DATA SEEDING COMPLETE
-- ============================================

