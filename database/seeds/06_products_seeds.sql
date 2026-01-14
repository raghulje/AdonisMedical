-- ============================================
-- ADONIS MEDICAL CMS - PRODUCTS SEEDS
-- All 7 Product Pages
-- ============================================

USE adonis_production;

-- ============================================
-- PRODUCT 1: HF MOBILE
-- ============================================

INSERT INTO hf_mobile_page_content (id, title, main_image_id, deployment_info, short_description, full_description) VALUES
(1, 'HF Mobile', NULL, 'Deployed Across 35+ Bases', 'High-frequency mobile X-ray system', 'Adonis HF X-ray systems are suitable for emergency care in ICU and hospital wards with minimal radiation.');

INSERT INTO hf_mobile_features (feature_text, order_index) VALUES
('Easy to manoeuvre and handle High Frequency X-ray system on wheels', 1),
('Compact design with actuator based smooth arm movements', 2),
('200 pre-programmed APR function keys with predefined KVp and mAs values', 3),
('User selectable kVp in steps of 2 kV and single-step increase for mAs', 4),
('Operates in single phase in 15 A sockets', 5),
('12 blank keys for user-based programming and factory recall', 6),
('Microprocessor-based protection and machine self-diagnostics check', 7),
('Special function settings based on specific body part positioning', 8),
('Options available as a fixed X-ray system for outpatient/department applications', 9);

INSERT INTO hf_mobile_variants (variant_name, order_index, is_active) VALUES
('4 KW single phase', 1, TRUE),
('6 KW single phase', 2, TRUE),
('8 KW single phase', 3, TRUE);

-- Main image: https://www.adonismedical.com/wp-content/uploads/2025/05/HF-Mobile-New.jpg

-- ============================================
-- PRODUCT 2: HF FIXED
-- ============================================

INSERT INTO hf_fixed_page_content (id, title, main_image_id, deployment_info, short_description, full_description) VALUES
(1, 'HF Fixed', NULL, 'Deployed Across 35+ Bases', 'High-frequency fixed X-ray system', 'The classic HF fixed X-ray unit, equipped with a robust power supply produces high contrast images.');

INSERT INTO hf_fixed_features (feature_text, order_index) VALUES
('200 pre-programmed APR (Anatomical Program Register) function keys with pre-defined KVp and mAs values.', 1),
('Separate control panel stand with sleek and light weight design.', 2),
('Special function settings for various anatomical framework.', 3),
('12 blank keys for user based programming and factory recall.', 4),
('Microprocessor based protection with machine self diagnostic check.', 5),
('Automatic Bucky stand / table selection.', 6),
('Excellent image quality in Lumbar spine and for specialised applications for obese patients.', 7),
('Short time exposure allows for easy acquisition of instantaneous images. Reduced breathing artifacts.', 8),
('Available in conventional and digital X-ray configurations.', 9);

INSERT INTO hf_fixed_variants (variant_name, order_index, is_active) VALUES
('15KW three phase', 1, TRUE),
('30KW three phase', 2, TRUE),
('40KW three phase', 3, TRUE),
('50KW three phase', 4, TRUE);

-- Gallery images:
-- https://www.adonismedical.com/wp-content/uploads/2025/04/hf-fixed-new.jpg
-- https://www.adonismedical.com/wp-content/uploads/2025/02/02.jpg
-- https://www.adonismedical.com/wp-content/uploads/2025/02/01.jpg
-- https://www.adonismedical.com/wp-content/uploads/2025/02/05.jpg
-- https://www.adonismedical.com/wp-content/uploads/2025/02/03-1-2.jpg

-- ============================================
-- PRODUCT 3: FPD C-ARM
-- ============================================

INSERT INTO fpd_c_arm_page_content (id, title, main_image_id, deployment_info, short_description, full_description) VALUES
(1, 'FPD-C-Arm', NULL, 'Deployed Across 30+ Bases', 'Flat Panel Detector C-Arm system', 'The in-house designed and developed, made-in-India, the FPD C-Arm is an advanced solution to perform high end surgeries.');

INSERT INTO fpd_c_arm_features (feature_text, order_index) VALUES
('Applications in Orthopedics, Urology, Neurology, Gastrointestinal and in Pain management.', 1),
('Cesium iodide based Flat Panel Detector (FPD) provides high resolution and contrast imaging.', 2),
('Large Field of View (FOV): Captures more anatomical details in a single image.', 3),
('Reduced radiation dose for high quality images.', 4),
('Advanced dose management settings to optimize radiation exposure.', 5),
('More efficient workflow with ADONIS TIALIC technology (Time-Independent Adaptive Low-dose Image Correction) to optimize radiation exposure.', 6),
('Low signal to noise ratio, provides uniform image clarity.', 7),
('Wireless and digital storage for easy integration with PACs and hospital networks.', 8),
('Compact design enables flexibility of use in small spaces and integration with other hospital systems.', 9);

INSERT INTO fpd_c_arm_variants (variant_name, order_index, is_active) VALUES
('3.5 KW single phase', 1, TRUE),
('6 KW single phase', 2, TRUE);

-- Gallery images:
-- https://www.adonismedical.com/wp-content/uploads/2025/02/ADN0321-copy-2.jpg
-- https://www.adonismedical.com/wp-content/uploads/2025/02/ADN0352-copy-1.jpg
-- https://www.adonismedical.com/wp-content/uploads/2025/02/ADN0391-copy-1.jpg

-- ============================================
-- PRODUCT 4: 1K*1K HIGH END HF C-ARM
-- ============================================

INSERT INTO hf_c_arm_1k_page_content (id, title, main_image_id, deployment_info, short_description, full_description) VALUES
(1, '1K*1K High End HF C-ARM', NULL, 'Deployed Across 40+ Bases', 'High-resolution 1K*1K C-ARM system', 'High resolution images with the 1kx1K camera technology');

INSERT INTO hf_c_arm_1k_features (feature_text, order_index) VALUES
('High resolution images with the 1kx1K camera technology', 1),
('Smooth and ergonomically compact design', 2),
('High definition 1K x 1K CCD camera', 3),
('Accurate and silent vertical actuator movement', 4),
('Easy user adjustable handle locks', 5),
('Soft and effortless horizontal slider movement', 6),
('Rigid design to withstand environmental conditions', 7),
('In-built rubber buffers and limiters for moving parts', 8),
('Applications in Orthopedics, Urology, Gastrointestinal and in Pain management.', 9);

INSERT INTO hf_c_arm_1k_variants (variant_name, order_index, is_active) VALUES
('6KW single phase', 1, TRUE),
('10 KW single phase', 2, TRUE),
('30KW single phase', 3, TRUE);

-- Gallery images:
-- https://www.adonismedical.com/wp-content/uploads/2025/02/02-1.jpg
-- https://www.adonismedical.com/wp-content/uploads/2025/02/ADN0352-copy-1.jpg
-- https://www.adonismedical.com/wp-content/uploads/2025/04/o.5k-img1.jpg

-- ============================================
-- PRODUCT 5: LINE FREQUENCY X-RAY SYSTEMS
-- ============================================

INSERT INTO line_frequency_page_content (id, title, main_image_id, deployment_info, short_description, full_description) VALUES
(1, 'Line Frequency X-Ray Systems', NULL, 'Deployed Across 34+ Bases', 'Rugged line frequency X-ray systems', 'Experience the ruggedness of line frequency technology X-ray system');

INSERT INTO line_frequency_features (feature_text, order_index) VALUES
('Line frequency-based technology for optimum exposure', 1),
('In case the main control panel fails', 2),
('Exposures counter to keep track of all the exposures taken', 3),
('CR/DR compatible', 4),
('Automatic bucky selection', 5),
('Mobile Carriage optional selection', 6);

INSERT INTO line_frequency_variants (variant_name, order_index, is_active) VALUES
('100mA', 1, TRUE),
('150mA', 2, TRUE),
('300mA', 3, TRUE),
('500mA', 4, TRUE);

-- Gallery images:
-- https://www.adonismedical.com/wp-content/uploads/2025/05/Line-Frequency-New.jpg
-- https://www.adonismedical.com/wp-content/uploads/2025/03/3rd.jpg

-- ============================================
-- PRODUCT 6: DIGITAL RADIOGRAPHY
-- ============================================

INSERT INTO digital_radiography_page_content (id, title, main_image_id, deployment_info, short_description, full_description) VALUES
(1, 'Digital Radiography', NULL, 'Deployed Across 25+ Bases', 'Advanced digital radiography system', 'High-speed digital radiography with wireless FPD');

INSERT INTO digital_radiography_features (feature_text, order_index) VALUES
('TRANSFER IN A FLASH: With specialized antenna design, our product can achieve fast transfer and receive strong signal at anytime and anywhere. Full image can be received within 2 seconds, achieving one of the fastest in the world.', 1),
('FEATHERWEIGHT DESIGN: In order to enhance the mobility, the Panel weight only 2.7kg Including battery, making it effortless to carry around.', 2),
('EASY CLEANING: The detector is IPX6-rated for water resistant, allowing user to clean it easily.', 3),
('AWARDS: 1) Excellence awards by MSMECCII 2) Silver award in the Micro & Small Enterprise category in the First CII-AMTZ MedTech Quality Champion Award, 2024.', 4),
('High Frequency X-Ray Machines are powered to meet all Radiological needs at an affordable price. APR (Anatomical Program Register) based High Frequency makes System precise and complete.', 5),
('Soft Touch Key Pad with Auto Programmable Features with option to Reprogram the settings.', 6),
('Microprocessor Based System with Digital Display of Applied Factors on LCD.', 7),
('14" x 17" portable Wi-Fi FPD', 8),
('Reconstruction of images <2 seconds', 9),
('Mobile patient table', 10),
('Dicom compatibility', 11),
('Dual Battery: Hot Swap – 60s, Image Never Loss, Always Watching.', 12);

INSERT INTO digital_radiography_variants (variant_name, order_index, is_active) VALUES
('Standard Model', 1, TRUE);

-- Gallery images:
-- https://www.adonismedical.com/wp-content/uploads/2025/05/Digital-Radiography-New.jpg
-- https://www.adonismedical.com/wp-content/uploads/2025/02/untitled-76.jpg
-- https://www.adonismedical.com/wp-content/uploads/2025/02/New-Project.jpg
-- https://www.adonismedical.com/wp-content/uploads/2025/02/New-Project-1.jpg
-- https://www.adonismedical.com/wp-content/uploads/2025/02/New-Project-2.jpg

-- ============================================
-- PRODUCT 7: DREAM SERIES CEILING SUSPENDED
-- ============================================

INSERT INTO dream_series_page_content (id, title, main_image_id, deployment_info, short_description, full_description) VALUES
(1, 'Dream Series-Ceiling Suspended', NULL, NULL, 'Ceiling-suspended X-ray system', 'Single detector tube mounted on a 3D ceiling Mount for vertical Auto Tracking and Auto positioning');

INSERT INTO dream_series_features (feature_text, order_index) VALUES
('Single detector', 1),
('Tube mounted on a 3D ceiling Mount for vertical Auto Tracking and Auto positioning', 2),
('Superior image quality through high-spatial resolution', 3),
('Auto exposure settings and reset programs for faster patient throughput', 4),
('Vertical movement (motorized and manual) for ease of positioning', 5),
('Wired/wireless detectors', 6),
('Auto-stitching option available', 7);

INSERT INTO dream_series_variants (variant_name, order_index, is_active) VALUES
('6KW single phase', 1, TRUE),
('10 KW single phase', 2, TRUE),
('30KW single phase', 3, TRUE);

-- Main image:
-- https://www.adonismedical.com/wp-content/uploads/2025/03/Dream_series.jpg

-- ============================================
-- PRODUCTS SEEDING COMPLETE
-- ============================================

