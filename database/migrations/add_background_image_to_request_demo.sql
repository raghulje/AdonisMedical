-- Migration: Add background_image_id to request_demo_page_content table
USE adonis_production;

-- Add background_image_id column
ALTER TABLE request_demo_page_content
ADD COLUMN background_image_id INT NULL AFTER feature3_text;

-- Add foreign key constraint
ALTER TABLE request_demo_page_content
ADD CONSTRAINT fk_request_demo_background_image
FOREIGN KEY (background_image_id) REFERENCES media(id) ON DELETE SET NULL;

