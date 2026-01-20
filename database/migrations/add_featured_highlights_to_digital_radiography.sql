-- Add featured highlights table for Digital Radiography
CREATE TABLE IF NOT EXISTS digital_radiography_highlights (
  id INT PRIMARY KEY AUTO_INCREMENT,
  subtitle VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

