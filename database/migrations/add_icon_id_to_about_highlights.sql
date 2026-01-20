-- Add icon_id to about_page_highlights table
ALTER TABLE about_page_highlights
ADD COLUMN icon_id INT NULL,
ADD CONSTRAINT fk_about_highlight_icon FOREIGN KEY (icon_id) REFERENCES media(id) ON DELETE SET NULL;

