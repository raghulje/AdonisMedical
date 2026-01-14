-- Migration: Create our_products_page_content table
USE adonis_production;

-- Create our_products_page_content table
CREATE TABLE IF NOT EXISTS our_products_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hero_title VARCHAR(255) NULL,
  hero_subtitle TEXT NULL,
  hero_image_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hero_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default record
INSERT INTO our_products_page_content (id, hero_title, hero_subtitle) VALUES
(1, 'Our Products', 'Explore our comprehensive range of medical imaging solutions')
ON DUPLICATE KEY UPDATE hero_title = hero_title;

