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
    
    // Check current URL
    const [current] = await connection.query(`
      SELECT id, label, url 
      FROM navigation_items 
      WHERE id = 8 AND label = 'Our Products'
    `);
    
    if (current.length === 0) {
      console.log('⚠ Navigation item "Our Products" (id: 8) not found.');
      return;
    }
    
    if (current[0].url === '/our-products') {
      console.log('✓ Navigation URL is already set to /our-products.');
      return;
    }
    
    // Read the migration file
    const migrationPath = path.join(__dirname, '../../database/migrations/update_our_products_navigation_url.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Executing migration...');
    console.log(`  Current URL: ${current[0].url || 'NULL'}`);
    await connection.query(sql);
    
    // Verify update
    const [updated] = await connection.query(`
      SELECT id, label, url 
      FROM navigation_items 
      WHERE id = 8
    `);
    
    console.log('✓ Migration completed successfully!');
    console.log(`  Updated URL: ${updated[0].url}`);
    console.log('  "Our Products" in header will now link to /our-products page');
    
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

