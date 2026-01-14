-- Migration: Update "Our Products" navigation item URL to /our-products
USE adonis_production;

-- Update the "Our Products" navigation item (id: 8) to have URL /our-products
UPDATE navigation_items 
SET url = '/our-products' 
WHERE id = 8 AND label = 'Our Products';

