-- Migration: Create tables for Terms and Conditions and Privacy Policy pages
USE adonis_production;

-- Terms and Conditions Page Content
CREATE TABLE IF NOT EXISTS terms_and_conditions_page (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) DEFAULT 'Terms and Conditions',
  subtitle TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Terms and Conditions Paragraphs
CREATE TABLE IF NOT EXISTS terms_and_conditions_paragraphs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  terms_and_conditions_page_id INT NOT NULL,
  content TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (terms_and_conditions_page_id) REFERENCES terms_and_conditions_page(id) ON DELETE CASCADE,
  INDEX idx_page_order (terms_and_conditions_page_id, order_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Privacy Policy Page Content
CREATE TABLE IF NOT EXISTS privacy_policy_page (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) DEFAULT 'Privacy Policy',
  subtitle TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Privacy Policy Paragraphs
CREATE TABLE IF NOT EXISTS privacy_policy_paragraphs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  privacy_policy_page_id INT NOT NULL,
  content TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (privacy_policy_page_id) REFERENCES privacy_policy_page(id) ON DELETE CASCADE,
  INDEX idx_page_order (privacy_policy_page_id, order_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default records
INSERT INTO terms_and_conditions_page (id, title, subtitle) VALUES
(1, 'Terms and Conditions', 'Please read these terms carefully before using our services')
ON DUPLICATE KEY UPDATE title = title;

INSERT INTO privacy_policy_page (id, title, subtitle) VALUES
(1, 'Privacy Policy', 'Your privacy is important to us. Learn how we protect your information.')
ON DUPLICATE KEY UPDATE title = title;

