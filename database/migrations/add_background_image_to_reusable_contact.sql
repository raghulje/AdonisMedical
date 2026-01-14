-- Migration: Add background_image_id to reusable_contact_section table
USE adonis_production;

-- Add background_image_id column
ALTER TABLE reusable_contact_section 
ADD COLUMN background_image_id INT NULL AFTER image_id;

-- Add foreign key constraint
ALTER TABLE reusable_contact_section
ADD CONSTRAINT fk_reusable_contact_background_image
FOREIGN KEY (background_image_id) REFERENCES media(id) ON DELETE SET NULL;

