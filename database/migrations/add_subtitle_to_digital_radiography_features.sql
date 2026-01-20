-- Add subtitle column to digital_radiography_features table
ALTER TABLE digital_radiography_features
ADD COLUMN subtitle VARCHAR(255) NULL AFTER feature_text;

