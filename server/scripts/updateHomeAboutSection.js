const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const config = require('../config/config.json').development;

async function runMigration() {
  let connection;
  
  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
      multipleStatements: true
    });
    
    console.log('✓ Database connection established.\n');
    
    // Check if columns already exist
    const [columns] = await connection.query(`
      SELECT COLUMN_NAME 
      FROM information_schema.COLUMNS 
      WHERE TABLE_SCHEMA = ? 
      AND TABLE_NAME = 'home_about_section' 
      AND COLUMN_NAME IN ('title', 'subtitle')
    `, [config.database]);
    
    if (columns.length >= 2) {
      console.log('✓ Columns title and subtitle already exist in home_about_section table.');
    } else {
      // Read the migration file
      const migrationPath = path.join(__dirname, '../../database/migrations/update_home_about_section.sql');
      const sql = fs.readFileSync(migrationPath, 'utf8');
      
      console.log('Executing migration...');
      await connection.query(sql);
      
      console.log('✓ Migration completed successfully!');
      console.log('  - Added title and subtitle columns to home_about_section table');
      console.log('  - Created home_about_paragraphs table');
    }
    
    // Check if paragraphs table exists
    const [tables] = await connection.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = ? 
      AND TABLE_NAME = 'home_about_paragraphs'
    `, [config.database]);
    
    if (tables.length === 0) {
      await connection.query(`
        CREATE TABLE home_about_paragraphs (
          id INT PRIMARY KEY AUTO_INCREMENT,
          content TEXT NOT NULL,
          order_index INT NOT NULL DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      console.log('  - Created home_about_paragraphs table');
    } else {
      console.log('✓ home_about_paragraphs table already exists.');
    }
    
  } catch (error) {
    console.error('✗ Migration failed:');
    console.error(error.message);
    if (error.sql) {
      console.error('SQL Error:', error.sql);
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n✓ Database connection closed.');
    }
  }
}

runMigration();

