-- ============================================
-- Migration: Add updated_at column to social_links table
-- Description: Add missing updated_at column to match Sequelize timestamps: true
-- Created: 2024
-- ============================================

USE adonis_production;

-- Add updated_at column to social_links table if it doesn't exist
ALTER TABLE social_links 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
AFTER created_at;

