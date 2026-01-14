-- Migration: Add icon_svg column to footer_links table
-- This allows footer links to have SVG icons (e.g., for Contact Information section)

ALTER TABLE footer_links
ADD COLUMN IF NOT EXISTS icon_svg TEXT NULL DEFAULT NULL
COMMENT 'SVG icon code or path for the link'
AFTER url;

