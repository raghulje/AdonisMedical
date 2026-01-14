-- ============================================
-- Migration: Add permissions column to users table
-- Description: Add JSON column to store custom permissions that override role-based defaults
-- Created: 2024
-- ============================================

USE adonis_production;

-- Add permissions column to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS permissions JSON NULL DEFAULT NULL 
COMMENT 'Custom permissions that override role-based defaults. Format: { page: { view: bool, edit: bool, delete: bool } }'
AFTER last_login_at;

