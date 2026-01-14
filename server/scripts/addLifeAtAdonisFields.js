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
      AND TABLE_NAME = 'careers_page_content' 
      AND COLUMN_NAME IN ('life_at_adonis_title', 'life_at_adonis_background_image_id')
    `, [config.database]);
    
    if (columns.length >= 2) {
      console.log('✓ Columns already exist in careers_page_content table.');
      return;
    }
    
    // Read the migration file
    const migrationPath = path.join(__dirname, '../../database/migrations/add_life_at_adonis_fields.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Executing migration...');
    await connection.query(sql);
    
    console.log('✓ Migration completed successfully!');
    console.log('  - Added life_at_adonis_title column');
    console.log('  - Added life_at_adonis_background_image_id column');
    console.log('  - Added foreign key constraint');
    
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

