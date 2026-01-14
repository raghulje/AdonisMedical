-- ============================================
-- ADONIS MEDICAL CMS - AWARDS & CAREERS PAGES
-- ============================================

USE adonis_production;

-- ============================================
-- AWARDS PAGE CONTENT
-- ============================================

INSERT INTO awards_page_content (id, hero_title, hero_subtitle, hero_image_id, intro_text) VALUES
(1, 'Awards & Recognition', 'Excellence and Innovation Recognized Globally', NULL, 'Adonis Medical Systems has been honored with numerous awards and certifications, recognizing our commitment to quality, innovation, and excellence in medical imaging technology.');

-- ============================================
-- AWARDS
-- ============================================

INSERT INTO awards (title, description, image_id, award_date, order_index, is_active) VALUES
('Partner of the Year 2013 - Asia SonoScape Award', 'Recognition for outstanding partnership and sales performance', NULL, '2013-01-01', 1, TRUE),
('CURA Certificate of Excellence', 'Excellence in medical equipment manufacturing', NULL, NULL, 2, TRUE),
('FICCI TANCARE Award', 'Innovation and quality in healthcare technology', NULL, NULL, 3, TRUE),
('Sunbhakam Communi Ltd Award', 'Outstanding contribution to medical imaging', NULL, NULL, 4, TRUE),
('Excellence Award', 'Overall excellence in medical device manufacturing', NULL, NULL, 5, TRUE),
('Medical Equipment Award', 'Best medical equipment supplier', NULL, NULL, 6, TRUE),
('Quality Recognition Award', 'Outstanding quality management systems', NULL, NULL, 7, TRUE),
('Industry Excellence Certificate', 'Industry leadership and innovation', NULL, NULL, 8, TRUE),
('Healthcare Innovation Award', 'Innovation in healthcare solutions', NULL, NULL, 9, TRUE),
('Medical Technology Award', 'Advanced medical technology development', NULL, NULL, 10, TRUE);

-- Award image URLs (for reference):
-- Award 1: https://www.adonismedical.com/wp-content/uploads/2025/04/Award01-1.jpg
-- Award 2: https://www.adonismedical.com/wp-content/uploads/2025/04/Award02.jpg
-- Award 3: https://www.adonismedical.com/wp-content/uploads/2025/04/Award03.jpg
-- Award 4: https://www.adonismedical.com/wp-content/uploads/2025/04/Award04.jpg
-- Award 5: https://www.adonismedical.com/wp-content/uploads/2025/04/Award05.jpg
-- Award 6: https://www.adonismedical.com/wp-content/uploads/2025/04/Award06.jpg
-- Award 7: https://www.adonismedical.com/wp-content/uploads/2025/04/Award07.jpg
-- Award 8: https://www.adonismedical.com/wp-content/uploads/2025/04/Award08.jpg
-- Award 9: https://www.adonismedical.com/wp-content/uploads/2025/04/Award09.jpg
-- Award 10: https://www.adonismedical.com/wp-content/uploads/2025/04/Award10.jpg

-- ============================================
-- CAREERS PAGE CONTENT
-- ============================================

INSERT INTO careers_page_content (id, hero_title, hero_subtitle, hero_image_id, intro_text, intro_image_id, life_at_adonis_image_id) VALUES
(1, 'Careers', 'Unlock Your Potential', NULL, 'Join a vibrant team where your skills matter. Unlock your potential at Adonis, where innovation thrives, and every contribution makes a meaningful impact.', NULL, NULL);

-- Image URLs (for reference):
-- hero_image: https://www.adonismedical.com/wp-content/uploads/2024/10/image-51-2-1.jpg
-- intro_image: https://www.adonismedical.com/wp-content/uploads/elementor/thumbs/carrer-img-r2avejplb0pkwcgxj99aock57lyrri8v03bloxlctc.jpeg
-- life_at_adonis_image: https://www.adonismedical.com/wp-content/uploads/2025/03/team-collage02.png

-- ============================================
-- JOB OPENINGS (Example - currently none active)
-- ============================================

-- INSERT INTO jobs (title, department, location, employment_type, description, requirements, responsibilities, is_active, posted_date) VALUES
-- ('Senior X-Ray Technician', 'Engineering', 'Mohali, Punjab', 'Full-time', 'We are looking for an experienced X-Ray Technician...', 'Bachelor''s degree in Engineering...', 'Maintain and repair X-Ray equipment...', TRUE, CURDATE());

-- ============================================
-- AWARDS & CAREERS PAGES SEEDING COMPLETE
-- ============================================

