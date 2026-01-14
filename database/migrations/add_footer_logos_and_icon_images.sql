-- Migration: Add footer logos table and icon image support to footer links
USE adonis_production;

-- Create footer_logos table for managing Refex and Adonis logos
CREATE TABLE IF NOT EXISTS footer_logos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE COMMENT 'refex or adonis',
  logo_image_id INT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (logo_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add icon_image_id column to footer_links for image uploads (in addition to iconSvg)
ALTER TABLE footer_links 
ADD COLUMN icon_image_id INT NULL AFTER icon_svg,
ADD CONSTRAINT fk_footer_links_icon_image 
  FOREIGN KEY (icon_image_id) REFERENCES media(id) ON DELETE SET NULL;

