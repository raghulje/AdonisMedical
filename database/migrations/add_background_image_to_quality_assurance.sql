-- Add background_image_id to quality_assurance_page_content table
ALTER TABLE quality_assurance_page_content
ADD COLUMN background_image_id INT NULL;

-- Add foreign key constraint
ALTER TABLE quality_assurance_page_content
ADD CONSTRAINT fk_quality_assurance_background_image
FOREIGN KEY (background_image_id) REFERENCES media(id)
ON UPDATE CASCADE ON DELETE SET NULL;

