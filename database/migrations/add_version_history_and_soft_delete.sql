-- Migration: Add version history and soft delete support
USE adonis_production;

-- Create version_history table
CREATE TABLE IF NOT EXISTS version_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  entity_type VARCHAR(100) NOT NULL COMMENT 'Type of entity (e.g., home_hero_section, product, etc.)',
  entity_id INT NOT NULL COMMENT 'ID of the entity',
  version_number INT NOT NULL DEFAULT 1 COMMENT 'Version number for this entity',
  data JSON NOT NULL COMMENT 'Full snapshot of entity data at this version',
  changes TEXT NULL COMMENT 'Description of changes made',
  created_by INT NULL COMMENT 'User ID who created this version',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_created_at (created_at),
  INDEX idx_created_by (created_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add deleted_at column to key tables for soft delete
-- Note: Only adding to main content tables, not junction/relationship tables

ALTER TABLE home_hero_section ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE home_about_section ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE home_products_section ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE home_quality_section ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE home_specialties_section ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE home_testimonials_section ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE home_contact_section ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;

ALTER TABLE home_products_cards ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE home_stats ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE home_about_paragraphs ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;

ALTER TABLE about_page_content ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE about_page_highlights ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE about_page_overview_paragraphs ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE about_page_global_reach_cards ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;

ALTER TABLE awards ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE jobs ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE clients ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE testimonials ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE specialties ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE leaders ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE certifications ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE office_locations ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;

ALTER TABLE navigation_items ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE footer_sections ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE footer_links ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE footer_logos ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;

ALTER TABLE our_products_items ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE hospitals_served ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;

ALTER TABLE faqs_items ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;

-- Product tables
ALTER TABLE hf_mobile_page_content ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE hf_mobile_images ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE hf_mobile_features ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE hf_mobile_variants ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE hf_mobile_hospitals ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;

ALTER TABLE hf_fixed_page_content ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE hf_fixed_images ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE hf_fixed_features ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE hf_fixed_variants ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE hf_fixed_hospitals ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;

ALTER TABLE fpd_c_arm_page_content ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE fpd_c_arm_images ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE fpd_c_arm_features ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE fpd_c_arm_variants ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE fpd_c_arm_hospitals ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;

ALTER TABLE hf_c_arm_1k_page_content ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE hf_c_arm_1k_images ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE hf_c_arm_1k_features ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE hf_c_arm_1k_variants ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE hf_c_arm_1k_hospitals ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;

ALTER TABLE line_frequency_page_content ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE line_frequency_images ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE line_frequency_features ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE line_frequency_variants ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE line_frequency_hospitals ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;

ALTER TABLE digital_radiography_page_content ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE digital_radiography_images ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE digital_radiography_features ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE digital_radiography_variants ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE digital_radiography_hospitals ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE digital_radiography_highlights ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;

ALTER TABLE dream_series_page_content ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE dream_series_images ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE dream_series_features ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE dream_series_variants ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;
ALTER TABLE dream_series_hospitals ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL AFTER updated_at;

-- Add indexes for soft delete queries
CREATE INDEX idx_deleted_at ON home_products_cards(deleted_at);
CREATE INDEX idx_deleted_at ON awards(deleted_at);
CREATE INDEX idx_deleted_at ON jobs(deleted_at);
CREATE INDEX idx_deleted_at ON clients(deleted_at);
CREATE INDEX idx_deleted_at ON testimonials(deleted_at);
CREATE INDEX idx_deleted_at ON our_products_items(deleted_at);
CREATE INDEX idx_deleted_at ON hospitals_served(deleted_at);
CREATE INDEX idx_deleted_at ON faqs_items(deleted_at);

-- Enhance activity_logs table with additional fields
ALTER TABLE activity_logs 
  ADD COLUMN IF NOT EXISTS page VARCHAR(100) NULL COMMENT 'Page name (e.g., Home, About)' AFTER entityType,
  ADD COLUMN IF NOT EXISTS section VARCHAR(100) NULL COMMENT 'Section name (e.g., Hero Section)' AFTER page,
  ADD COLUMN IF NOT EXISTS field VARCHAR(100) NULL COMMENT 'Field name that was changed' AFTER section,
  ADD COLUMN IF NOT EXISTS old_value TEXT NULL COMMENT 'Previous value' AFTER field,
  ADD COLUMN IF NOT EXISTS new_value TEXT NULL COMMENT 'New value' AFTER old_value,
  ADD COLUMN IF NOT EXISTS metadata JSON NULL COMMENT 'Additional metadata' AFTER userAgent;

-- Add indexes for activity logs queries
CREATE INDEX IF NOT EXISTS idx_activity_user ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_activity_action ON activity_logs(action);
CREATE INDEX IF NOT EXISTS idx_activity_created_at ON activity_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_activity_page ON activity_logs(page);

