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
    
    // Check if tables already exist
    const [tables] = await connection.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = ? 
      AND TABLE_NAME IN ('request_demo_paragraphs', 'request_demo_features')
    `, [config.database]);
    
    const existingTables = tables.map(t => t.TABLE_NAME);
    
    if (existingTables.includes('request_demo_paragraphs') && existingTables.includes('request_demo_features')) {
      console.log('✓ Tables already exist.');
      return;
    }
    
    // Read the migration file
    const migrationPath = path.join(__dirname, '../../database/migrations/add_request_demo_paragraphs_and_features.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Executing migration...');
    await connection.query(sql);
    
    console.log('✓ Migration completed successfully!');
    if (!existingTables.includes('request_demo_paragraphs')) {
      console.log('  - Created request_demo_paragraphs table');
    }
    if (!existingTables.includes('request_demo_features')) {
      console.log('  - Created request_demo_features table');
    }
    console.log('  - Added foreign key constraints');
    
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

