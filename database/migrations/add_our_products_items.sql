-- Migration: Create our_products_items table for Our Products page
USE adonis_production;

-- Add section background image to our_products_page_content
ALTER TABLE our_products_page_content
  ADD COLUMN section_background_image_id INT NULL COMMENT 'Background PNG for the products section' AFTER hero_image_id,
  ADD FOREIGN KEY (section_background_image_id) REFERENCES media(id) ON DELETE SET NULL;

-- Create our_products_items table
CREATE TABLE IF NOT EXISTS our_products_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  product_image_id INT NULL COMMENT 'Main product image',
  background_image_id INT NULL COMMENT 'Background PNG for product card',
  internal_link VARCHAR(500) NULL COMMENT 'Link to internal product page',
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_image_id) REFERENCES media(id) ON DELETE SET NULL,
  FOREIGN KEY (background_image_id) REFERENCES media(id) ON DELETE SET NULL,
  INDEX idx_order (order_index),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

