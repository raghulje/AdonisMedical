-- ============================================
-- Run All Migrations
-- Description: Master script to run all database migrations
-- Usage: mysql -u root -p adonis_production < database/migrations/run_all_migrations.sql
-- ============================================

USE adonis_production;

-- ============================================
-- Migration 001: Create contact_submissions table
-- ============================================

CREATE TABLE IF NOT EXISTS contact_submissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(50) NOT NULL,
  message TEXT,
  source VARCHAR(100) DEFAULT 'contact-us',
  ip_address VARCHAR(45),
  user_agent TEXT,
  status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_source (source),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Migration 002: Create demo_requests table
-- ============================================

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

-- ============================================
-- Migration 003: Fix table columns
-- ============================================

SOURCE database/migrations/003_fix_table_columns.sql;

-- ============================================
-- Migration 004: Add permissions to users table
-- ============================================

SOURCE database/migrations/004_add_permissions_to_users.sql;

-- ============================================
-- Migration Summary
-- ============================================

SELECT 'Migrations completed successfully!' AS status;
