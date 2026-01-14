-- Migration: Add background_image_id to home_products_section table
USE adonis_production;

-- Add background_image_id column
ALTER TABLE home_products_section 
ADD COLUMN background_image_id INT NULL AFTER cta_url;

-- Add foreign key constraint
ALTER TABLE home_products_section
ADD CONSTRAINT fk_home_products_section_background_image
FOREIGN KEY (background_image_id) REFERENCES media(id) ON DELETE SET NULL;

