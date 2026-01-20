-- Add icon_id to social_links table
ALTER TABLE social_links
ADD COLUMN icon_id INT NULL,
ADD CONSTRAINT fk_social_link_icon FOREIGN KEY (icon_id) REFERENCES media(id) ON DELETE SET NULL;

-- Make url column nullable (if not already)
ALTER TABLE social_links
MODIFY COLUMN url VARCHAR(500) NULL;

