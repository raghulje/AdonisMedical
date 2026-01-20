-- Add map background image to Our Presence page
ALTER TABLE our_presence_page_content 
ADD COLUMN map_background_image_id INT NULL,
ADD FOREIGN KEY (map_background_image_id) REFERENCES media(id) ON DELETE SET NULL;

