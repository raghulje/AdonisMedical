-- Add global_reach_heading to about_page_content
ALTER TABLE about_page_content
ADD COLUMN global_reach_heading VARCHAR(255) NULL;

-- Create about_page_global_reach_cards table
CREATE TABLE IF NOT EXISTS about_page_global_reach_cards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  icon_class VARCHAR(100) NULL,
  content TEXT NOT NULL,
  order_index INT DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

