-- Migration: Add section background image to FAQs page
USE adonis_production;

ALTER TABLE faqs_page 
ADD COLUMN section_background_image_id INT NULL AFTER background_image_id,
ADD FOREIGN KEY (section_background_image_id) REFERENCES media(id) ON DELETE SET NULL;

