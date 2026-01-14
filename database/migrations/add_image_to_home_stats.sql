-- Migration: Add image_id field to home_stats table
USE adonis_production;

-- Add image_id column to home_stats table
ALTER TABLE home_stats 
ADD COLUMN image_id INT NULL AFTER icon_class,
ADD CONSTRAINT fk_home_stats_image 
  FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL;

