-- Add icon_id to about_page_global_reach_cards table
ALTER TABLE about_page_global_reach_cards
ADD COLUMN icon_id INT NULL,
ADD CONSTRAINT fk_global_reach_icon FOREIGN KEY (icon_id) REFERENCES media(id) ON DELETE SET NULL;

