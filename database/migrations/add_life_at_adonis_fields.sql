-- Migration: Add title and background image fields to Life at Adonis Medical section
USE adonis_production;

-- Add title and background image columns to careers_page_content
ALTER TABLE careers_page_content 
ADD COLUMN life_at_adonis_title VARCHAR(255) NULL AFTER intro_image_id,
ADD COLUMN life_at_adonis_background_image_id INT NULL AFTER life_at_adonis_title,
ADD CONSTRAINT fk_careers_life_at_adonis_bg_image 
  FOREIGN KEY (life_at_adonis_background_image_id) REFERENCES media(id) ON DELETE SET NULL;

