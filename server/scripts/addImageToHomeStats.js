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
    
    // Check if column already exists
    const [columns] = await connection.query(`
      SELECT COLUMN_NAME 
      FROM information_schema.COLUMNS 
      WHERE TABLE_SCHEMA = ? 
      AND TABLE_NAME = 'home_stats' 
      AND COLUMN_NAME = 'image_id'
    `, [config.database]);
    
    if (columns.length > 0) {
      console.log('✓ Column image_id already exists in home_stats table.');
      return;
    }
    
    // Read the migration file
    const migrationPath = path.join(__dirname, '../../database/migrations/add_image_to_home_stats.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Executing migration...');
    await connection.query(sql);
    
    console.log('✓ Migration completed successfully!');
    console.log('  - Added image_id column to home_stats table');
    console.log('  - Added foreign key constraint to media table');
    
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

