-- ============================================
-- Migration: Create demo_requests table
-- Description: Stores demo request submissions from Request Demo page
-- Created: 2024
-- ============================================

USE adonis_production;

-- Demo Requests
CREATE TABLE IF NOT EXISTS demo_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  hospital_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(50) NOT NULL,
  product VARCHAR(255) NOT NULL,
  preferred_date DATE NOT NULL,
  message TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  status ENUM('pending', 'scheduled', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_product (product),
  INDEX idx_preferred_date (preferred_date),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

