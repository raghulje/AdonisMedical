-- Create email settings table for SMTP configuration
CREATE TABLE IF NOT EXISTS email_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  smtp_host VARCHAR(255) NOT NULL DEFAULT 'smtp.gmail.com',
  smtp_port INT NOT NULL DEFAULT 587,
  smtp_secure BOOLEAN DEFAULT FALSE,
  smtp_user VARCHAR(255) NOT NULL,
  smtp_password VARCHAR(255) NOT NULL,
  from_email VARCHAR(255) NOT NULL,
  from_name VARCHAR(255) NOT NULL DEFAULT 'Adonis Medical',
  contact_form_email VARCHAR(255) NULL COMMENT 'Email to receive contact form submissions',
  request_demo_email VARCHAR(255) NULL COMMENT 'Email to receive request demo form submissions',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

