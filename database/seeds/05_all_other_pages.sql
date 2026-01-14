-- ============================================
-- ADONIS MEDICAL CMS - ALL OTHER PAGES SEEDS
-- ============================================

USE adonis_production;

-- ============================================
-- INVESTOR RELATIONS PAGE
-- ============================================

INSERT INTO investor_relations_page_content (id, hero_title, hero_subtitle, hero_image_id, intro_text) VALUES
(1, 'Investor Relations', 'Building Trust Through Transparency', NULL, 'Welcome to Adonis Medical Systems Investor Relations. We are committed to transparent communication with our stakeholders.');

INSERT INTO investor_documents (title, description, file_id, document_type, publish_date, order_index, is_active) VALUES
('Newspaper Advertisement for meeting of the unsecured creditors', NULL, NULL, 'notice', '2025-05-01', 1, TRUE),
('Notice of the Meeting of unsecured Creditors', NULL, NULL, 'notice', '2025-05-01', 2, TRUE);

-- Document URLs:
-- Doc 1: https://www.adonismedical.com/wp-content/uploads/2025/05/Newspaper-Advertisement-Business-Standard-and-Makkal_compressed.pdf
-- Doc 2: https://www.adonismedical.com/wp-content/uploads/2025/05/Notice-and-explanatory-statement-along-with-Annexure-Adonis_compressed.pdf

-- ============================================
-- SPECIALTIES PAGE
-- ============================================

INSERT INTO specialties_page_content (id, hero_title, hero_subtitle, hero_image_id, intro_text) VALUES
(1, 'Our Specialties', 'Comprehensive Healthcare Solutions', NULL, 'Discover our selection of healthcare consulting services designed to support you in reaching clinical excellence and operational efficiency, enhancing financial performance, and delivering high-quality patient care.');

-- Specialties already inserted in 01_global_data.sql

-- ============================================
-- MANAGEMENT PAGE
-- ============================================

INSERT INTO management_page_content (id, hero_title, hero_subtitle, hero_image_id, intro_text) VALUES
(1, 'Leadership Team', 'Meet Our Visionary Leaders', NULL, 'Our leadership team brings together decades of experience in medical technology and healthcare innovation.');

INSERT INTO leaders (full_name, position, department, bio, image_id, order_index, is_active) VALUES
('ARUN KAUL', 'Director', 'Executive', 'Arun has over 30 years of rich experience in the medical instrumentation and equipment manufacturing industry especially in the radiographic field. He is one of the founding leaders of Adonis Medical Systems. Arun started his career with Toshiba overlooking sales of ultrasound and CT machines in India. An industry stalwart with immense knowledge of CT machines right from the nascent stages when this technology was new to India.\n\nArun was part of Adonis Medical Equipment during the late 90s which solemnly manufactured multi-format cameras for ultrasound machines and distributed them to all major hospitals across the country. He is one of the founders of Adonis Medical Systems dedicated to manufacturing state-of-the-art X-ray machines with many novel technologies like mobile units, and high-frequency units and diversified into manufacturing BIS and AERB-certified high-frequency C-arm X-ray machines. Adonis X-ray machines are exported to several countries such as Bangladesh, Nigeria, Guinea, and Nepal. Under Arun''s imminent leadership, the company grew to partner with governmental organizations like the Indian Army for their medical equipment needs.\n\nAcademically, Arun has completed his Electronics and Electrical Engineering from Birla Institute of University of Technology and Science (BITS).', NULL, 1, TRUE),
('VIRENDER SINGH BEDI', 'Director', 'Executive', 'Bedi brings over 30 years of experience in the medical instrumentation and equipment manufacturing industry, with deep expertise in radiographic technology. As one of the founding leaders of Adonis Medical Systems, he has played a pivotal role in shaping the company''s direction, innovation, and growth.\n\nBedi began his career with Toshiba, where he oversaw the sales of ultrasound and CT machines across India. His extensive knowledge and hands-on experience in radiography helped accelerate Adonis Medical Systems'' growth at a time when advanced imaging technology was still emerging in the country.\n\nIn the late 1990s, Bedi was associated with Adonis Medical Equipment, which specialized in manufacturing multi-format cameras for ultrasound machines—a product widely supplied to major hospitals nationwide. As a founder of Adonis Medical Systems, he expanded the company''s vision toward developing state-of-the-art X-ray systems, including mobile X-ray units, high-frequency X-ray systems, and BIS & AERB-certified high-frequency C-Arm machines.\n\nUnder his leadership, Adonis has grown into a global supplier, exporting X-ray systems to Bangladesh, Nigeria, Guinea, Nepal, and more. His guidance also enabled the company to partner with major government organizations, including the Indian Army, for their specialized medical equipment requirements.\n\nBedi holds a degree in Electrical Engineering from Punjab Engineering College, grounding his leadership in strong technical expertise and a commitment to advancing radiology solutions.', NULL, 2, TRUE),
('MANMOHAN SINGH', 'Sales Director North', 'Sales', 'Manmohan Singh is a distinguished leader within our organization, bringing over 25 years of invaluable experience to the company. With a strong foundation in finance, backed by a post-graduate degree in the field, he has consistently demonstrated strategic insight and leadership excellence. His dedication and expertise have played a pivotal role in shaping the company''s financial strategies and fostering growth. Manmohan''s vision and guidance continue to inspire both his team and the organization as a whole.', NULL, 3, TRUE),
('SANJEEV KAUL', 'Sales Director – South', 'Sales', 'Sanjeev Kaul is a seasoned leader with over 20 years of dedicated experience in our company. His journey has been marked by consistent excellence, strategic vision, and a deep commitment to driving growth and innovation.\n\nHolding a Bachelor of Technology (B.Tech) degree, Sanjeev combines technical expertise with strong leadership skills, playing a pivotal role in shaping the organization''s success. His ability to inspire teams and implement forward-thinking solutions has made him a cornerstone of our leadership team.\n\nWe are proud to have Sanjeev Kaul leading the way as we continue to strive for excellence and innovation in all that we do.', NULL, 4, TRUE);

-- Leader image URLs:
-- https://www.adonismedical.com/wp-content/uploads/2024/09/Frame-299.png
-- https://www.adonismedical.com/wp-content/uploads/2024/09/Frame-299-1.png
-- https://www.adonismedical.com/wp-content/uploads/2025/02/manmohan-singh.png
-- https://www.adonismedical.com/wp-content/uploads/2025/02/sanjeev.png

-- ============================================
-- CLIENTS PAGE
-- ============================================

INSERT INTO clients_page_content (id, hero_title, hero_subtitle, hero_image_id, intro_text) VALUES
(1, 'Our Clients', 'Trusted by Healthcare Leaders Worldwide', NULL, 'We are proud to serve leading healthcare institutions across the globe with our state-of-the-art medical imaging solutions.');

INSERT INTO clients (name, logo_id, order_index, is_active) VALUES
('Client 1', NULL, 1, TRUE),
('Client 2', NULL, 2, TRUE),
('Client 3', NULL, 3, TRUE),
('Client 4', NULL, 4, TRUE),
('Client 5', NULL, 5, TRUE),
('Client 6', NULL, 6, TRUE),
('Client 7', NULL, 7, TRUE),
('Client 8', NULL, 8, TRUE),
('Client 9', NULL, 9, TRUE),
('Client 10', NULL, 10, TRUE),
('Client 11', NULL, 11, TRUE),
('Client 12', NULL, 12, TRUE),
('Client 13', NULL, 13, TRUE),
('Client 14', NULL, 14, TRUE),
('Client 15', NULL, 15, TRUE),
('Client 16', NULL, 16, TRUE),
('Client 17', NULL, 17, TRUE),
('Client 18', NULL, 18, TRUE),
('Client 19', NULL, 19, TRUE),
('Client 20', NULL, 20, TRUE),
('Client 21', NULL, 21, TRUE),
('Client 22', NULL, 22, TRUE),
('Client 23', NULL, 23, TRUE),
('Client 24', NULL, 24, TRUE);

-- Client logo URLs (in order):
-- https://www.adonismedical.com/wp-content/uploads/2025/03/logo06.jpg through logo24.jpg

-- ============================================
-- OUR PRESENCE PAGE
-- ============================================

INSERT INTO our_presence_page_content (id, hero_title, hero_subtitle, hero_image_id, intro_text, map_image_id, sales_service_heading, sales_service_content, sales_service_image_id) VALUES
(1, 'Our Global Presence', 'Serving Healthcare Worldwide', NULL, 'Adonis Medical Systems, a leader in medical imaging since 1998, delivers advanced, ergonomically designed X-ray solutions with a strong commitment to safety, innovation, and exceptional customer service.', NULL, 'Well-connected sales and service teams', 'At the heart of our regional offices are our proficient sales and service teams. Positioned strategically, these teams ensure that our clientele receives the support they need promptly. Whether it''s addressing current customers'' inquiries or extending a helping hand to those considering our services, Adonis ensures a consistent and reliable experience throughout.\n\nThis robust infrastructure not only enhances our operational efficiency but also reflects our dedication to being accessible and responsive in every market we serve. By strategically placing our regional offices, we aim to create a synergy that fosters lasting relationships with our customers, making Adonis a trusted partner in their journey towards success.', NULL);

INSERT INTO office_locations (office_type, city, state, country, address, phone, email, latitude, longitude, is_active) VALUES
('headquarters', 'Mohali', 'Punjab', 'India', 'E-70, PHASE- VIII, INDUSTRIAL AREA, MOHALI, 160071', '9872003273', 'support@adonismedical.com', 30.7046, 76.7179, TRUE);

-- ============================================
-- PRODUCTION FACILITY PAGE
-- ============================================

INSERT INTO production_facility_page_content (id, hero_title, hero_subtitle, hero_image_id, intro_text, flexibility_heading, flexibility_content, flexibility_image_id, quality_heading, quality_content, quality_image_id) VALUES
(1, 'Production Facility', 'State-of-the-Art Manufacturing Excellence', NULL, 'Our Mohali facility is more than just a production site—it''s a fully integrated manufacturing hub. From initial design to final assembly, every step is managed in-house, ensuring complete quality control and operational efficiency.', 'Flexibility in Manufacturing', 'Adonis Medical Systems thrives on adaptability. Whether fulfilling routine orders or responding to urgent demands, our facility is designed to manage all production scenarios with ease.\n\nOur facility can switch between scheduled orders and emergency short-call orders without compromising on quality.\n\nOur agile approach ensures that we meet your needs promptly, regardless of the complexity or volume of the order.', NULL, 'Rigorous Quality Assurance', 'Our quality assurance protocols are meticulously designed to ensure that every product meets both national and international standards.\n\nProcess Overview:\n1. Initial Material Inspection: Every raw material undergoes a thorough inspection.\n2. In-Process Quality Checks: Multiple checkpoints during production.\n3. Final Testing: Comprehensive testing in our in-house quality lab.\n\nBy following these stringent protocols, we ensure that our products are reliable, accurate, and ready to perform.', NULL);

INSERT INTO production_facility_features (icon_class, heading, description, order_index) VALUES
('ri-settings-3-line', 'Full vertical integration', 'Complete control over the manufacturing process', 1),
('ri-flow-chart', 'Streamlined processes', 'Efficient workflow from design to delivery', 2),
('ri-shield-check-line', 'Controlled quality from start to finish', 'Rigorous quality checks at every stage', 3);

-- ============================================
-- QUALITY ASSURANCE PAGE
-- ============================================

INSERT INTO quality_assurance_page_content (id, hero_title, hero_subtitle, hero_image_id, intro_text, main_heading, main_content, main_image_id) VALUES
(1, 'Quality Assurance & Regulatory', 'Certified Excellence in Medical Imaging', NULL, 'At Adonis Medical Systems, we are dedicated to delivering the very best in technology, application, support, and service. Our products are designed for unbeatable, trouble-free performance, offering exceptional value and reliability for years to come.', 'All ADONIS products are certified to meet national and international quality standards.', 'Each equipment manufactured at ADONIS is carefully designed and tested in our own Quality Lab to ensure the utmost accuracy and reliability. Much of the equipment incorporates ADONIS''s own indigenous development. The Precision and Image Quality are constantly being improved and incorporated into the new system.', NULL);

INSERT INTO certifications (name, abbreviation, logo_id, description, order_index, is_active) VALUES
('ISO 13485:2016', 'ISO', NULL, 'International Organization of Standards', 1, TRUE),
('Bureau of Indian Standards', 'BIS', NULL, 'National standards body of India', 2, TRUE),
('Atomic Energy Regulatory Board', 'AERB', NULL, 'Indian regulatory authority for radiation safety', 3, TRUE),
('Make in India', 'MII', NULL, 'Indian government initiative', 4, TRUE),
('Central Drugs Standard Control Organisation', 'CDSCO', NULL, 'Medical device regulatory authority', 5, TRUE);

-- Certification logo URLs:
-- https://www.adonismedical.com/wp-content/uploads/2024/10/image-56.svg (ISO)
-- https://www.adonismedical.com/wp-content/uploads/2024/10/image-57.svg (BIS)
-- https://www.adonismedical.com/wp-content/uploads/2024/10/RS3-removebg-preview-1.svg (AERB)
-- https://www.adonismedical.com/wp-content/uploads/2024/10/image-58.svg (Make in India)
-- https://www.adonismedical.com/wp-content/uploads/2025/02/cdsco-logo.png (CDSCO)

-- ============================================
-- CONTACT US PAGE
-- ============================================

INSERT INTO contact_us_page_content (id, hero_title, hero_subtitle, intro_text) VALUES
(1, 'Contact Us', 'Get in Touch with Our Team', 'We''re here to help. Reach out to us for any inquiries, support, or information about our products and services.');

-- ============================================
-- REQUEST DEMO PAGE
-- ============================================

INSERT INTO request_demo_page_content (id, hero_title, intro_text, feature_1_icon, feature_1_text, feature_2_icon, feature_2_text, feature_3_icon, feature_3_text) VALUES
(1, 'Request a Product Demo', 'Experience our advanced medical imaging solutions firsthand. Schedule a personalized demonstration with our expert team.', 'ri-calendar-check-line', 'Schedule at your convenience', 'ri-user-heart-line', 'Personalized demonstration', 'ri-service-line', 'Expert product guidance');

-- ============================================
-- ALL OTHER PAGES SEEDING COMPLETE
-- ============================================

