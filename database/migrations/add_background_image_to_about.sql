-- Add background_image_id to about_page_content table
ALTER TABLE about_page_content
ADD COLUMN background_image_id INT NULL,
ADD CONSTRAINT fk_about_bg_img FOREIGN KEY (background_image_id) REFERENCES media(id) ON DELETE SET NULL;

