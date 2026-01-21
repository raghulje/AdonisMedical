const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const config = require('../config/config.json').production || require('../config/config.json').development;

async function runMigration() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
      multipleStatements: true
    });

    console.log('Connected to database');
    
    const sqlPath = path.join(__dirname, '../../database/migrations/add_our_products_items.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    await connection.query(sql);
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration error:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

runMigration().catch(console.error);

