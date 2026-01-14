-- Migration: Add request_demo_paragraphs and request_demo_features tables
USE adonis_production;

-- Create request_demo_paragraphs table
CREATE TABLE IF NOT EXISTS request_demo_paragraphs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  content TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  page_content_id INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (page_content_id) REFERENCES request_demo_page_content(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create request_demo_features table
CREATE TABLE IF NOT EXISTS request_demo_features (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  icon_image_id INT NULL,
  order_index INT NOT NULL DEFAULT 0,
  page_content_id INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (page_content_id) REFERENCES request_demo_page_content(id) ON DELETE CASCADE,
  FOREIGN KEY (icon_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

