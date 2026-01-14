-- Migration: Create home_products_cards table for home page products section cards
USE adonis_production;

-- Create home_products_cards table
CREATE TABLE IF NOT EXISTS home_products_cards (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  background_image_id INT NULL,
  card_image_id INT NULL,
  internal_link VARCHAR(500) NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (background_image_id) REFERENCES media(id) ON DELETE SET NULL,
  FOREIGN KEY (card_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

