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
    
    // Check if table already exists
    const [tables] = await connection.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = ? 
      AND TABLE_NAME = 'reusable_contact_section'
    `, [config.database]);
    
    if (tables.length > 0) {
      console.log('✓ Table reusable_contact_section already exists.');
      return;
    }
    
    // Read the migration file
    const migrationPath = path.join(__dirname, '../../database/migrations/add_reusable_contact_section.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Executing migration...');
    await connection.query(sql);
    
    console.log('✓ Migration completed successfully!');
    console.log('  - Created reusable_contact_section table');
    console.log('  - Added foreign key constraint for image');
    console.log('  - Inserted default record');
    
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

