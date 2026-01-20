-- Add background_image_id and highlighted_box_text to production_facility_page_content table
ALTER TABLE production_facility_page_content
ADD COLUMN intro_background_image_id INT NULL,
ADD COLUMN quality_background_image_id INT NULL,
ADD COLUMN highlighted_box_text TEXT NULL;

-- Add foreign key constraints
ALTER TABLE production_facility_page_content
ADD CONSTRAINT fk_production_facility_intro_background_image
FOREIGN KEY (intro_background_image_id) REFERENCES media(id)
ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE production_facility_page_content
ADD CONSTRAINT fk_production_facility_quality_background_image
FOREIGN KEY (quality_background_image_id) REFERENCES media(id)
ON UPDATE CASCADE ON DELETE SET NULL;

