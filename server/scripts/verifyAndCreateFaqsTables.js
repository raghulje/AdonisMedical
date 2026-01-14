const mysql = require('mysql2/promise');
const config = require('../config/config.json').development;

async function verifyAndCreateTables() {
  let connection;
  
  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database
    });
    
    console.log('✓ Database connection established.\n');
    
    // Check if tables exist
    const [tables] = await connection.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = ? 
      AND TABLE_NAME IN ('faqs_page', 'faqs_items')
    `, [config.database]);
    
    const existingTables = tables.map(t => t.TABLE_NAME);
    console.log('Existing tables:', existingTables);
    
    // Create faqs_page table if it doesn't exist
    if (!existingTables.includes('faqs_page')) {
      console.log('Creating faqs_page table...');
      await connection.query(`
        CREATE TABLE faqs_page (
          id INT PRIMARY KEY AUTO_INCREMENT,
          hero_title VARCHAR(255) NULL,
          hero_subtitle TEXT NULL,
          background_image_id INT NULL,
          title_color VARCHAR(7) DEFAULT '#FFFFFF',
          subtitle_color VARCHAR(7) DEFAULT '#FFFFFF',
          overlay_opacity INT DEFAULT 40,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (background_image_id) REFERENCES media(id) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      console.log('✓ faqs_page table created.');
    } else {
      console.log('✓ faqs_page table already exists.');
    }
    
    // Create faqs_items table if it doesn't exist
    if (!existingTables.includes('faqs_items')) {
      console.log('Creating faqs_items table...');
      await connection.query(`
        CREATE TABLE faqs_items (
          id INT PRIMARY KEY AUTO_INCREMENT,
          question TEXT NOT NULL,
          answer TEXT NOT NULL,
          image_id INT NULL,
          order_index INT NOT NULL DEFAULT 0,
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      console.log('✓ faqs_items table created.');
    } else {
      console.log('✓ faqs_items table already exists.');
    }
    
    // Insert default record if it doesn't exist
    const [existingPage] = await connection.query(
      'SELECT id FROM faqs_page WHERE id = 1'
    );
    
    if (existingPage.length === 0) {
      console.log('Inserting default FAQs page record...');
      await connection.query(`
        INSERT INTO faqs_page (id, hero_title, hero_subtitle) VALUES
        (1, 'Frequently Asked Questions', 'Find answers to common questions about our products and services.')
      `);
      console.log('✓ Default FAQs page record inserted.');
    } else {
      console.log('✓ Default FAQs page record already exists.');
    }
    
    console.log('\n✓ All FAQs tables verified and ready!');
    
  } catch (error) {
    console.error('✗ Error:', error.message);
    if (error.sql) {
      console.error('SQL:', error.sql);
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n✓ Database connection closed.');
    }
  }
}

verifyAndCreateTables();

