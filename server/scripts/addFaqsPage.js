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
      database: config.database
    });
    
    console.log('✓ Database connection established.\n');
    
    const migrationSQL = fs.readFileSync(
      path.join(__dirname, '../../database/migrations/add_faqs_page.sql'),
      'utf8'
    );
    
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('USE'));
    
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.query(statement);
      }
    }
    
    console.log('✓ FAQs page tables created successfully!');
    
  } catch (error) {
    console.error('✗ Migration failed:');
    console.error(error.message);
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

runMigration();

