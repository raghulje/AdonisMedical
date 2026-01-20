-- Add overview_image_overlay_text to about_page_content
ALTER TABLE about_page_content
ADD COLUMN overview_image_overlay_text TEXT NULL;

-- Create about_page_overview_paragraphs table
CREATE TABLE IF NOT EXISTS about_page_overview_paragraphs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  order_index INT DEFAULT 0,
  position VARCHAR(20) NULL COMMENT "'before' or 'after' highlights",
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

