-- ============================================
-- Migration: Fix missing columns in tables
-- Description: Add missing columns and fix field name mismatches
-- Created: 2024
-- ============================================

USE adonis_production;

-- Add updated_at column to footer_sections table if it doesn't exist
ALTER TABLE footer_sections 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;

-- Fix request_demo_page_content: The database uses feature_1_icon, feature_2_icon, feature_3_icon
-- But Sequelize with underscored: true converts feature1Icon to feature1_icon (not feature_1_icon)
-- We need to rename the columns to match Sequelize's naming convention
ALTER TABLE request_demo_page_content
CHANGE COLUMN feature_1_icon feature1_icon VARCHAR(100) AFTER intro_text,
CHANGE COLUMN feature_1_text feature1_text VARCHAR(255) AFTER feature1_icon,
CHANGE COLUMN feature_2_icon feature2_icon VARCHAR(100) AFTER feature1_text,
CHANGE COLUMN feature_2_text feature2_text VARCHAR(255) AFTER feature2_icon,
CHANGE COLUMN feature_3_icon feature3_icon VARCHAR(100) AFTER feature2_text,
CHANGE COLUMN feature_3_text feature3_text VARCHAR(255) AFTER feature3_icon;

