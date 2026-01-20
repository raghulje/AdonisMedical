-- Add section title and button text fields to all product content tables
-- HF Mobile
ALTER TABLE hf_mobile_page_content 
ADD COLUMN product_gallery_title VARCHAR(255) DEFAULT 'Product Gallery',
ADD COLUMN our_products_title VARCHAR(255) DEFAULT 'Our Products',
ADD COLUMN hospitals_served_title VARCHAR(255) DEFAULT 'Hospitals Served',
ADD COLUMN enquire_button_text VARCHAR(100) DEFAULT 'Enquire Now';

-- HF Fixed
ALTER TABLE hf_fixed_page_content 
ADD COLUMN product_gallery_title VARCHAR(255) DEFAULT 'Product Gallery',
ADD COLUMN our_products_title VARCHAR(255) DEFAULT 'Our Products',
ADD COLUMN hospitals_served_title VARCHAR(255) DEFAULT 'Hospitals Served',
ADD COLUMN enquire_button_text VARCHAR(100) DEFAULT 'Enquire Now';

-- FPD C-Arm
ALTER TABLE fpd_c_arm_page_content 
ADD COLUMN product_gallery_title VARCHAR(255) DEFAULT 'Product Gallery',
ADD COLUMN our_products_title VARCHAR(255) DEFAULT 'Our Products',
ADD COLUMN hospitals_served_title VARCHAR(255) DEFAULT 'Hospitals Served',
ADD COLUMN enquire_button_text VARCHAR(100) DEFAULT 'Enquire Now';

-- HF C-Arm 1K
ALTER TABLE hf_c_arm_1k_page_content 
ADD COLUMN product_gallery_title VARCHAR(255) DEFAULT 'Product Gallery',
ADD COLUMN our_products_title VARCHAR(255) DEFAULT 'Our Products',
ADD COLUMN hospitals_served_title VARCHAR(255) DEFAULT 'Hospitals Served',
ADD COLUMN enquire_button_text VARCHAR(100) DEFAULT 'Enquire Now';

-- Line Frequency
ALTER TABLE line_frequency_page_content 
ADD COLUMN product_gallery_title VARCHAR(255) DEFAULT 'Product Gallery',
ADD COLUMN our_products_title VARCHAR(255) DEFAULT 'Our Products',
ADD COLUMN hospitals_served_title VARCHAR(255) DEFAULT 'Hospitals Served',
ADD COLUMN enquire_button_text VARCHAR(100) DEFAULT 'Enquire Now';

-- Digital Radiography
ALTER TABLE digital_radiography_page_content 
ADD COLUMN product_gallery_title VARCHAR(255) DEFAULT 'Product Gallery',
ADD COLUMN our_products_title VARCHAR(255) DEFAULT 'Our Products',
ADD COLUMN hospitals_served_title VARCHAR(255) DEFAULT 'Hospitals Served',
ADD COLUMN enquire_button_text VARCHAR(100) DEFAULT 'Enquire Now';

-- Dream Series
ALTER TABLE dream_series_page_content 
ADD COLUMN product_gallery_title VARCHAR(255) DEFAULT 'Product Gallery',
ADD COLUMN our_products_title VARCHAR(255) DEFAULT 'Our Products',
ADD COLUMN hospitals_served_title VARCHAR(255) DEFAULT 'Hospitals Served',
ADD COLUMN enquire_button_text VARCHAR(100) DEFAULT 'Enquire Now';

-- Create hospitals_served tables for each product
-- HF Mobile Hospitals
CREATE TABLE IF NOT EXISTS hf_mobile_hospitals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hospital_name VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  state VARCHAR(100),
  hospital_logo_id INT NULL,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hospital_logo_id) REFERENCES media(id) ON DELETE SET NULL
);

-- HF Fixed Hospitals
CREATE TABLE IF NOT EXISTS hf_fixed_hospitals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hospital_name VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  state VARCHAR(100),
  hospital_logo_id INT NULL,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hospital_logo_id) REFERENCES media(id) ON DELETE SET NULL
);

-- FPD C-Arm Hospitals
CREATE TABLE IF NOT EXISTS fpd_c_arm_hospitals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hospital_name VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  state VARCHAR(100),
  hospital_logo_id INT NULL,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hospital_logo_id) REFERENCES media(id) ON DELETE SET NULL
);

-- HF C-Arm 1K Hospitals
CREATE TABLE IF NOT EXISTS hf_c_arm_1k_hospitals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hospital_name VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  state VARCHAR(100),
  hospital_logo_id INT NULL,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hospital_logo_id) REFERENCES media(id) ON DELETE SET NULL
);

-- Line Frequency Hospitals
CREATE TABLE IF NOT EXISTS line_frequency_hospitals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hospital_name VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  state VARCHAR(100),
  hospital_logo_id INT NULL,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hospital_logo_id) REFERENCES media(id) ON DELETE SET NULL
);

-- Digital Radiography Hospitals
CREATE TABLE IF NOT EXISTS digital_radiography_hospitals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hospital_name VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  state VARCHAR(100),
  hospital_logo_id INT NULL,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hospital_logo_id) REFERENCES media(id) ON DELETE SET NULL
);

-- Dream Series Hospitals
CREATE TABLE IF NOT EXISTS dream_series_hospitals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hospital_name VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  state VARCHAR(100),
  hospital_logo_id INT NULL,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hospital_logo_id) REFERENCES media(id) ON DELETE SET NULL
);

