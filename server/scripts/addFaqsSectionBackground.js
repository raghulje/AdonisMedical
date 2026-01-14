const mysql = require('mysql2/promise');
const config = require('../config/config.json').development;

async function addSectionBackground() {
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
    
    // Check if column already exists
    const [columns] = await connection.query(`
      SELECT COLUMN_NAME 
      FROM information_schema.COLUMNS 
      WHERE TABLE_SCHEMA = ? 
      AND TABLE_NAME = 'faqs_page' 
      AND COLUMN_NAME = 'section_background_image_id'
    `, [config.database]);
    
    if (columns.length === 0) {
      console.log('Adding section_background_image_id column...');
      await connection.query(`
        ALTER TABLE faqs_page 
        ADD COLUMN section_background_image_id INT NULL AFTER background_image_id
      `);
      
      // Add foreign key constraint
      await connection.query(`
        ALTER TABLE faqs_page 
        ADD CONSTRAINT fk_faqs_section_bg_image 
        FOREIGN KEY (section_background_image_id) REFERENCES media(id) ON DELETE SET NULL
      `);
      console.log('✓ Section background image column added.');
    } else {
      console.log('✓ Section background image column already exists.');
    }
    
    console.log('\n✓ Migration completed successfully!');
    
  } catch (error) {
    console.error('✗ Error:', error.message);
    if (error.sql) {
      console.error('SQL:', error.sql);
    }
    // If foreign key constraint already exists, that's okay
    if (error.code === 'ER_DUP_KEYNAME' || error.message.includes('Duplicate key name')) {
      console.log('Foreign key constraint already exists, continuing...');
    } else {
      process.exit(1);
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n✓ Database connection closed.');
    }
  }
}

addSectionBackground();

