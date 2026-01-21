-- Migration: Create shared Hospitals Served section
USE adonis_production;

-- Create hospitals_served_section_settings table for section-level settings (background image)
CREATE TABLE IF NOT EXISTS hospitals_served_section_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  background_image_id INT NULL COMMENT 'Background SVG/image for the section',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (background_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create hospitals_served table for hospital cards
CREATE TABLE IF NOT EXISTS hospitals_served (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hospital_name VARCHAR(255) NOT NULL,
  city_state VARCHAR(255) NOT NULL COMMENT 'Format: "City name, State name"',
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_order (order_index),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default section settings (single row)
INSERT INTO hospitals_served_section_settings (id) VALUES (1)
ON DUPLICATE KEY UPDATE id = id;

-- Insert default hospitals (4 cards as requested)
INSERT INTO hospitals_served (hospital_name, city_state, order_index, is_active) VALUES
('Hospital Name', 'City name, State name', 0, TRUE),
('Hospital Name', 'City name, State name', 1, TRUE),
('Hospital Name', 'City name, State name', 2, TRUE),
('Hospital Name', 'City name, State name', 3, TRUE)
ON DUPLICATE KEY UPDATE hospital_name = hospital_name;

