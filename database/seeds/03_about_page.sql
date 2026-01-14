-- ============================================
-- ADONIS MEDICAL CMS - ABOUT PAGE SEEDS
-- ============================================

USE adonis_production;

-- ============================================
-- ABOUT PAGE CONTENT
-- ============================================

INSERT INTO about_page_content (
  id, 
  hero_title, 
  hero_subtitle, 
  hero_image_id,
  overview_heading, 
  overview_content, 
  overview_image_id,
  safety_heading, 
  safety_content, 
  safety_image_id,
  excellence_heading, 
  excellence_content, 
  excellence_image_id
) VALUES (
  1,
  'About Us',
  'Delivering advanced, affordable medical imaging solutions for more than 30 years.',
  NULL,
  'Company Overview',
  'Adonis Medical Systems, a professionally managed private limited company based in Mohali, India, has been delivering quality medical imaging solutions since 1998. We specialize in a range of advanced imaging technologies, including line-frequency X-rays, high-frequency X-rays, and surgical C-ARMs, all designed with a focus on affordability and precision.\n\nWe don''t just build equipment; we build trust. Our production facility reflects our commitment to delivering exceptional value through state-of-the-art technology and customer-centric service.\n\nOur motivation comes from empowering healthcare providers with the tools they need to make a difference.',
  NULL,
  'Our Commitment to Safety and Innovation',
  'At Adonis, safety is our top priority. We ensure the well-being of our customers, their patients, and our dedicated team members through rigorous quality control measures. Our products are certified by AERB, BIS, and ISO, CDSCO 13485 reflecting our adherence to the highest standards in the industry. With a relentless focus on modern image processing techniques and ergonomic designs, we continuously innovate to meet the evolving needs of the medical community.',
  NULL,
  'Excellence in Technology, Dedication in Service',
  'Our motto, "Excellence in Technology, Dedication in Service," is brought to life by our highly motivated service personnel and around-the-clock support staff. We believe that our success is measured not by sales figures, but by the positive impact we make on the lives of our customers and their patients.\n\nFor over 30 years, we have been building a market share founded on trust, quality, and well-being.',
  NULL
);

-- Image URLs (for reference when uploading to media library):
-- hero_image: https://www.adonismedical.com/wp-content/uploads/2024/10/image-1-1.jpg
-- overview_image: https://www.adonismedical.com/wp-content/uploads/2024/09/Frame-97-3-1.jpg
-- safety_image: https://www.adonismedical.com/wp-content/uploads/2024/10/Frame-32-3-1.jpg
-- excellence_image: https://www.adonismedical.com/wp-content/uploads/2024/10/Frame-32-4-1.jpg

-- ============================================
-- ABOUT PAGE HIGHLIGHTS
-- ============================================

INSERT INTO about_page_highlights (icon_class, text, order_index, section_name) VALUES
('ri-checkbox-circle-fill', 'Unmatched product reliability', 1, 'overview'),
('ri-checkbox-circle-fill', 'Continuous innovation in radiology', 2, 'overview'),
('ri-checkbox-circle-fill', 'A growing global network of satisfied clients', 3, 'overview');

-- ============================================
-- ABOUT PAGE SEEDING COMPLETE
-- ============================================

