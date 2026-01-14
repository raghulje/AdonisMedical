-- Migration: Update home_about_section to add title, subtitle and paragraphs support
USE adonis_production;

-- Add title and subtitle columns to home_about_section
ALTER TABLE home_about_section 
ADD COLUMN title VARCHAR(255) NULL AFTER id,
ADD COLUMN subtitle VARCHAR(255) NULL AFTER title;

-- Create table for addable paragraphs
CREATE TABLE IF NOT EXISTS home_about_paragraphs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  content TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

