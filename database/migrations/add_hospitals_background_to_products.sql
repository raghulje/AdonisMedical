-- Add hospitals background image to product page content tables
ALTER TABLE digital_radiography_page_content 
ADD COLUMN hospitals_background_image_id INT NULL,
ADD FOREIGN KEY (hospitals_background_image_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE hf_mobile_page_content 
ADD COLUMN hospitals_background_image_id INT NULL,
ADD FOREIGN KEY (hospitals_background_image_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE hf_fixed_page_content 
ADD COLUMN hospitals_background_image_id INT NULL,
ADD FOREIGN KEY (hospitals_background_image_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE fpd_c_arm_page_content 
ADD COLUMN hospitals_background_image_id INT NULL,
ADD FOREIGN KEY (hospitals_background_image_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE line_frequency_page_content 
ADD COLUMN hospitals_background_image_id INT NULL,
ADD FOREIGN KEY (hospitals_background_image_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE dream_series_page_content 
ADD COLUMN hospitals_background_image_id INT NULL,
ADD FOREIGN KEY (hospitals_background_image_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE one_k_one_k_high_end_hf_c_arm_page_content 
ADD COLUMN hospitals_background_image_id INT NULL,
ADD FOREIGN KEY (hospitals_background_image_id) REFERENCES media(id) ON DELETE SET NULL;

