-- Add background_image_id to home_about_section table
ALTER TABLE home_about_section
ADD COLUMN background_image_id INT NULL,
ADD CONSTRAINT fk_home_about_bg_img FOREIGN KEY (background_image_id) REFERENCES media(id) ON DELETE SET NULL;

