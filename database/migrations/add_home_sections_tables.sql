-- Migration: Add missing home page section tables
-- Run this migration to add tables for home_specialties_section, home_testimonials_section, and home_contact_section

USE adonis_production;

-- Home Page: Specialties Section
CREATE TABLE IF NOT EXISTS home_specialties_section (
  id INT PRIMARY KEY AUTO_INCREMENT,
  heading VARCHAR(255),
  description TEXT,
  image_id INT,
  cta_text VARCHAR(100),
  cta_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Home Page: Testimonials Section
CREATE TABLE IF NOT EXISTS home_testimonials_section (
  id INT PRIMARY KEY AUTO_INCREMENT,
  subtitle VARCHAR(255),
  heading VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Home Page: Contact Section
CREATE TABLE IF NOT EXISTS home_contact_section (
  id INT PRIMARY KEY AUTO_INCREMENT,
  heading VARCHAR(255),
  company_name VARCHAR(255),
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  image_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default records
INSERT INTO home_specialties_section (id, heading, description, cta_text, cta_url) VALUES
(1, 'Our Specialties', NULL, 'Explore our full suite of', '/products')
ON DUPLICATE KEY UPDATE heading = heading;

INSERT INTO home_testimonials_section (id, subtitle, heading) VALUES
(1, 'Testimonial', 'Client Stories & Experiences')
ON DUPLICATE KEY UPDATE subtitle = subtitle;

INSERT INTO home_contact_section (id, heading, company_name, address, phone, email) VALUES
(1, 'Contact Us', 'ADONIS MEDICAL SYSTEMS PVT LTD', 'E-70, PHASE- VIII, INDUSTRIAL AREA,\nMOHALI, 160071.', '9872003273', 'support@adonismedical.com')
ON DUPLICATE KEY UPDATE heading = heading;

