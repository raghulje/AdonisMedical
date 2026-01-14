-- Migration: Add rich text content field to Terms and Privacy pages
USE adonis_production;

-- Add rich_text_content to terms_and_conditions_page
ALTER TABLE terms_and_conditions_page 
ADD COLUMN rich_text_content LONGTEXT NULL AFTER subtitle;

-- Add rich_text_content to privacy_policy_page
ALTER TABLE privacy_policy_page 
ADD COLUMN rich_text_content LONGTEXT NULL AFTER subtitle;

