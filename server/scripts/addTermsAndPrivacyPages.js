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
    
    // Read the migration file
    const migrationPath = path.join(__dirname, '../../database/migrations/add_terms_and_privacy_pages.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Executing migration...');
    await connection.query(sql);
    
    console.log('✓ Migration completed successfully!');
    console.log('  Created tables:');
    console.log('    - terms_and_conditions_page');
    console.log('    - terms_and_conditions_paragraphs');
    console.log('    - privacy_policy_page');
    console.log('    - privacy_policy_paragraphs');
    console.log('  Default records inserted.');
    
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

