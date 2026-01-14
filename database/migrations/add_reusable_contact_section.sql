-- Migration: Create reusable_contact_section table for reusable contact component
USE adonis_production;

-- Create reusable_contact_section table
CREATE TABLE IF NOT EXISTS reusable_contact_section (
  id INT PRIMARY KEY AUTO_INCREMENT,
  heading VARCHAR(255) NULL,
  company_name VARCHAR(255) NULL,
  address TEXT NULL,
  phone VARCHAR(50) NULL,
  email VARCHAR(255) NULL,
  image_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default record
INSERT INTO reusable_contact_section (id, heading, company_name, address, phone, email) VALUES
(1, 'Contact Us', 'ADONIS MEDICAL SYSTEMS PVT LTD', 'E-70, PHASE- VIII, INDUSTRIAL AREA, MOHALI, 160071.', '9872003273', 'support@adonismedical.com')
ON DUPLICATE KEY UPDATE heading = heading;

