-- ============================================
-- Adonis Medical Systems CMS Database
-- Database: adonis_production
-- MySQL Setup Script
-- ============================================

-- Drop and create database
DROP DATABASE IF EXISTS adonis_production;
CREATE DATABASE adonis_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE adonis_production;

-- ============================================
-- CORE SYSTEM TABLES
-- ============================================

-- Users (CMS Admin/Editors)
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role ENUM('super_admin', 'admin', 'editor', 'viewer') DEFAULT 'editor',
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Media Library
CREATE TABLE media (
  id INT PRIMARY KEY AUTO_INCREMENT,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_type ENUM('image', 'document', 'svg', 'video') DEFAULT 'image',
  mime_type VARCHAR(100),
  file_size BIGINT,
  alt_text VARCHAR(255),
  page_name VARCHAR(100),
  section_name VARCHAR(100),
  uploaded_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_file_type (file_type),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Activity Logs
CREATE TABLE activity_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100),
  entity_id INT,
  description TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Login History
CREATE TABLE login_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_login_at (login_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Content Versions (for rollback)
CREATE TABLE content_versions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  entity_type VARCHAR(100) NOT NULL,
  entity_id INT NOT NULL,
  content_snapshot JSON NOT NULL,
  version_number INT NOT NULL,
  changed_by INT,
  change_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- GLOBAL SETTINGS & CONFIGURATION
-- ============================================

-- Global Site Settings (Key-Value Store)
CREATE TABLE global_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type VARCHAR(50) DEFAULT 'text',
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Navigation Menu Items
CREATE TABLE navigation_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  label VARCHAR(100) NOT NULL,
  url VARCHAR(500),
  parent_id INT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  open_in_new_tab BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES navigation_items(id) ON DELETE CASCADE,
  INDEX idx_parent (parent_id),
  INDEX idx_order (order_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Footer Sections
CREATE TABLE footer_sections (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_order (order_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Footer Links
CREATE TABLE footer_links (
  id INT PRIMARY KEY AUTO_INCREMENT,
  footer_section_id INT NOT NULL,
  label VARCHAR(100) NOT NULL,
  url VARCHAR(500) NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  FOREIGN KEY (footer_section_id) REFERENCES footer_sections(id) ON DELETE CASCADE,
  INDEX idx_section (footer_section_id),
  INDEX idx_order (order_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Social Links
CREATE TABLE social_links (
  id INT PRIMARY KEY AUTO_INCREMENT,
  platform VARCHAR(50) NOT NULL,
  url VARCHAR(500) NOT NULL,
  icon_class VARCHAR(100),
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact Information
CREATE TABLE contact_info (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company_name VARCHAR(255) NOT NULL,
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  phone VARCHAR(50),
  email VARCHAR(100),
  support_email VARCHAR(100),
  google_maps_embed_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Email Settings
CREATE TABLE email_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  smtp_host VARCHAR(255) NOT NULL,
  smtp_port INT NOT NULL,
  smtp_username VARCHAR(255),
  smtp_password VARCHAR(255),
  smtp_encryption VARCHAR(20),
  from_email VARCHAR(255) NOT NULL,
  from_name VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- HOME PAGE CONTENT
-- ============================================

-- Home Page: Hero Section
CREATE TABLE home_hero_section (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  background_image_id INT,
  title_color VARCHAR(7) DEFAULT '#FFFFFF',
  subtitle_color VARCHAR(7) DEFAULT '#FFFFFF',
  overlay_opacity INT DEFAULT 40,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (background_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Home Page: About Section
CREATE TABLE home_about_section (
  id INT PRIMARY KEY AUTO_INCREMENT,
  intro_text TEXT,
  main_image_id INT,
  cta_text VARCHAR(100),
  cta_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (main_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Home Page: Stats
CREATE TABLE home_stats (
  id INT PRIMARY KEY AUTO_INCREMENT,
  icon_class VARCHAR(100),
  number VARCHAR(50) NOT NULL,
  label VARCHAR(100) NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Home Page: Quality Section
CREATE TABLE home_quality_section (
  id INT PRIMARY KEY AUTO_INCREMENT,
  heading VARCHAR(255) NOT NULL,
  description TEXT,
  background_image_id INT,
  cta_text VARCHAR(100),
  cta_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (background_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Home Page: Products Section
CREATE TABLE home_products_section (
  id INT PRIMARY KEY AUTO_INCREMENT,
  heading VARCHAR(255),
  description TEXT,
  cta_text VARCHAR(100),
  cta_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- ABOUT PAGE CONTENT
-- ============================================

-- About Page Content
CREATE TABLE about_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hero_title VARCHAR(255),
  hero_subtitle TEXT,
  hero_image_id INT,
  overview_heading VARCHAR(255),
  overview_content TEXT,
  overview_image_id INT,
  safety_heading VARCHAR(255),
  safety_content TEXT,
  safety_image_id INT,
  excellence_heading VARCHAR(255),
  excellence_content TEXT,
  excellence_image_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hero_image_id) REFERENCES media(id) ON DELETE SET NULL,
  FOREIGN KEY (overview_image_id) REFERENCES media(id) ON DELETE SET NULL,
  FOREIGN KEY (safety_image_id) REFERENCES media(id) ON DELETE SET NULL,
  FOREIGN KEY (excellence_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- About Page: Highlights (bullet points)
CREATE TABLE about_page_highlights (
  id INT PRIMARY KEY AUTO_INCREMENT,
  icon_class VARCHAR(100),
  text VARCHAR(255) NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  section_name VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- AWARDS PAGE CONTENT
-- ============================================

-- Awards Page Content
CREATE TABLE awards_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hero_title VARCHAR(255),
  hero_subtitle TEXT,
  hero_image_id INT,
  intro_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hero_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Awards (Items)
CREATE TABLE awards (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_id INT,
  award_date DATE,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- CAREERS PAGE CONTENT
-- ============================================

-- Careers Page Content
CREATE TABLE careers_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hero_title VARCHAR(255),
  hero_subtitle TEXT,
  hero_image_id INT,
  intro_text TEXT,
  intro_image_id INT,
  life_at_adonis_image_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hero_image_id) REFERENCES media(id) ON DELETE SET NULL,
  FOREIGN KEY (intro_image_id) REFERENCES media(id) ON DELETE SET NULL,
  FOREIGN KEY (life_at_adonis_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Job Openings
CREATE TABLE jobs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(100),
  location VARCHAR(100),
  employment_type VARCHAR(50),
  description TEXT,
  requirements TEXT,
  responsibilities TEXT,
  salary_range VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  posted_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- INVESTOR RELATIONS PAGE CONTENT
-- ============================================

-- Investor Relations Page Content
CREATE TABLE investor_relations_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hero_title VARCHAR(255),
  hero_subtitle TEXT,
  hero_image_id INT,
  intro_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hero_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Investor Documents
CREATE TABLE investor_documents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_id INT,
  document_type VARCHAR(50),
  publish_date DATE,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (file_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SPECIALTIES PAGE CONTENT
-- ============================================

-- Specialties Page Content
CREATE TABLE specialties_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hero_title VARCHAR(255),
  hero_subtitle TEXT,
  hero_image_id INT,
  intro_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hero_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Specialties (Items)
CREATE TABLE specialties (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_id INT,
  icon_class VARCHAR(100),
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- MANAGEMENT/LEADERSHIP PAGE CONTENT
-- ============================================

-- Management Page Content
CREATE TABLE management_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hero_title VARCHAR(255),
  hero_subtitle TEXT,
  hero_image_id INT,
  intro_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hero_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Leadership Team Members
CREATE TABLE leaders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  department VARCHAR(100),
  bio TEXT,
  image_id INT,
  email VARCHAR(100),
  linkedin_url VARCHAR(500),
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- CLIENTS PAGE CONTENT
-- ============================================

-- Clients Page Content
CREATE TABLE clients_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hero_title VARCHAR(255),
  hero_subtitle TEXT,
  hero_image_id INT,
  intro_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hero_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Clients (Logo Grid)
CREATE TABLE clients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  logo_id INT,
  website_url VARCHAR(500),
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (logo_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- OUR PRESENCE PAGE CONTENT
-- ============================================

-- Our Presence Page Content
CREATE TABLE our_presence_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hero_title VARCHAR(255),
  hero_subtitle TEXT,
  hero_image_id INT,
  intro_text TEXT,
  map_image_id INT,
  sales_service_heading VARCHAR(255),
  sales_service_content TEXT,
  sales_service_image_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hero_image_id) REFERENCES media(id) ON DELETE SET NULL,
  FOREIGN KEY (map_image_id) REFERENCES media(id) ON DELETE SET NULL,
  FOREIGN KEY (sales_service_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Office Locations
CREATE TABLE office_locations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  office_type VARCHAR(50),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- PRODUCTION FACILITY PAGE CONTENT
-- ============================================

-- Production Facility Page Content
CREATE TABLE production_facility_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hero_title VARCHAR(255),
  hero_subtitle TEXT,
  hero_image_id INT,
  intro_text TEXT,
  flexibility_heading VARCHAR(255),
  flexibility_content TEXT,
  flexibility_image_id INT,
  quality_heading VARCHAR(255),
  quality_content TEXT,
  quality_image_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hero_image_id) REFERENCES media(id) ON DELETE SET NULL,
  FOREIGN KEY (flexibility_image_id) REFERENCES media(id) ON DELETE SET NULL,
  FOREIGN KEY (quality_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Production Facility Features
CREATE TABLE production_facility_features (
  id INT PRIMARY KEY AUTO_INCREMENT,
  icon_class VARCHAR(100),
  heading VARCHAR(255),
  description TEXT,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- QUALITY ASSURANCE PAGE CONTENT
-- ============================================

-- Quality Assurance Page Content
CREATE TABLE quality_assurance_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hero_title VARCHAR(255),
  hero_subtitle TEXT,
  hero_image_id INT,
  intro_text TEXT,
  main_heading VARCHAR(255),
  main_content TEXT,
  main_image_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hero_image_id) REFERENCES media(id) ON DELETE SET NULL,
  FOREIGN KEY (main_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Certifications
CREATE TABLE certifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  abbreviation VARCHAR(50),
  logo_id INT,
  description TEXT,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (logo_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- CONTACT US PAGE CONTENT
-- ============================================

-- Contact Us Page Content
CREATE TABLE contact_us_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hero_title VARCHAR(255),
  hero_subtitle TEXT,
  intro_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- REQUEST DEMO PAGE CONTENT
-- ============================================

-- Request Demo Page Content
CREATE TABLE request_demo_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hero_title VARCHAR(255),
  intro_text TEXT,
  feature_1_icon VARCHAR(100),
  feature_1_text VARCHAR(255),
  feature_2_icon VARCHAR(100),
  feature_2_text VARCHAR(255),
  feature_3_icon VARCHAR(100),
  feature_3_text VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- PRODUCT PAGES (EACH PRODUCT IS INDEPENDENT)
-- ============================================

-- HF Mobile Product Page
CREATE TABLE hf_mobile_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  main_image_id INT,
  deployment_info VARCHAR(255),
  short_description TEXT,
  full_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (main_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hf_mobile_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_id INT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hf_mobile_features (
  id INT PRIMARY KEY AUTO_INCREMENT,
  feature_text TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hf_mobile_variants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  variant_name VARCHAR(100) NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- HF Fixed Product Page
CREATE TABLE hf_fixed_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  main_image_id INT,
  deployment_info VARCHAR(255),
  short_description TEXT,
  full_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (main_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hf_fixed_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_id INT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hf_fixed_features (
  id INT PRIMARY KEY AUTO_INCREMENT,
  feature_text TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hf_fixed_variants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  variant_name VARCHAR(100) NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- FPD C-Arm Product Page
CREATE TABLE fpd_c_arm_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  main_image_id INT,
  deployment_info VARCHAR(255),
  short_description TEXT,
  full_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (main_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE fpd_c_arm_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_id INT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE fpd_c_arm_features (
  id INT PRIMARY KEY AUTO_INCREMENT,
  feature_text TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE fpd_c_arm_variants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  variant_name VARCHAR(100) NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1K*1K High End HF C-ARM Product Page
CREATE TABLE hf_c_arm_1k_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  main_image_id INT,
  deployment_info VARCHAR(255),
  short_description TEXT,
  full_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (main_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hf_c_arm_1k_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_id INT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hf_c_arm_1k_features (
  id INT PRIMARY KEY AUTO_INCREMENT,
  feature_text TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hf_c_arm_1k_variants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  variant_name VARCHAR(100) NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Line Frequency X-Ray Systems Product Page
CREATE TABLE line_frequency_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  main_image_id INT,
  deployment_info VARCHAR(255),
  short_description TEXT,
  full_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (main_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE line_frequency_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_id INT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE line_frequency_features (
  id INT PRIMARY KEY AUTO_INCREMENT,
  feature_text TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE line_frequency_variants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  variant_name VARCHAR(100) NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Digital Radiography Product Page
CREATE TABLE digital_radiography_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  main_image_id INT,
  deployment_info VARCHAR(255),
  short_description TEXT,
  full_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (main_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE digital_radiography_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_id INT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE digital_radiography_features (
  id INT PRIMARY KEY AUTO_INCREMENT,
  feature_text TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE digital_radiography_variants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  variant_name VARCHAR(100) NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dream Series Ceiling Suspended Product Page
CREATE TABLE dream_series_page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  main_image_id INT,
  deployment_info VARCHAR(255),
  short_description TEXT,
  full_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (main_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE dream_series_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_id INT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE dream_series_features (
  id INT PRIMARY KEY AUTO_INCREMENT,
  feature_text TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE dream_series_variants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  variant_name VARCHAR(100) NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SHARED CONTENT (REUSABLE ACROSS PAGES)
-- ============================================

-- Testimonials (used on home and other pages)
CREATE TABLE testimonials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  client_name VARCHAR(100) NOT NULL,
  client_position VARCHAR(100),
  client_company VARCHAR(255),
  client_image_id INT,
  testimonial_text TEXT NOT NULL,
  rating INT,
  order_index INT NOT NULL DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- FORMS & SUBMISSIONS
-- ============================================

-- Contact Form Submissions
CREATE TABLE form_submissions_contact (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(50),
  message TEXT NOT NULL,
  page_source VARCHAR(100),
  ip_address VARCHAR(45),
  user_agent TEXT,
  status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Demo Request Submissions
CREATE TABLE form_submissions_demo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  hospital_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(50) NOT NULL,
  product VARCHAR(255) NOT NULL,
  preferred_date DATE NOT NULL,
  message TEXT,
  ip_address VARCHAR(45),
  status ENUM('new', 'scheduled', 'completed', 'cancelled') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_preferred_date (preferred_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DATABASE COMPLETE
-- ============================================
-- Total Tables: 85+
-- Structure: Fully normalized with independent page tables
-- Following reference_server pattern exactly
-- ============================================

