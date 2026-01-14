-- Migration: Create FAQs page tables
USE adonis_production;

-- FAQs Page Hero Section
CREATE TABLE IF NOT EXISTS faqs_page (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hero_title VARCHAR(255) NULL,
  hero_subtitle TEXT NULL,
  background_image_id INT NULL,
  title_color VARCHAR(7) DEFAULT '#FFFFFF',
  subtitle_color VARCHAR(7) DEFAULT '#FFFFFF',
  overlay_opacity INT DEFAULT 40,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (background_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- FAQs Items
CREATE TABLE IF NOT EXISTS faqs_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  image_id INT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default record
INSERT INTO faqs_page (id, hero_title, hero_subtitle) VALUES
(1, 'Frequently Asked Questions', 'Find answers to common questions about our products and services.')
ON DUPLICATE KEY UPDATE hero_title = hero_title;

