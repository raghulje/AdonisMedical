const mysql = require('mysql2/promise');
const config = require('../config/config.json').development;

async function addRichTextFields() {
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
    
    // Check if column already exists for terms_and_conditions_page
    const [termsColumns] = await connection.query(`
      SELECT COLUMN_NAME 
      FROM information_schema.COLUMNS 
      WHERE TABLE_SCHEMA = ? 
      AND TABLE_NAME = 'terms_and_conditions_page' 
      AND COLUMN_NAME = 'rich_text_content'
    `, [config.database]);
    
    if (termsColumns.length === 0) {
      console.log('Adding rich_text_content to terms_and_conditions_page...');
      await connection.query(`
        ALTER TABLE terms_and_conditions_page 
        ADD COLUMN rich_text_content LONGTEXT NULL AFTER subtitle
      `);
      console.log('✓ Rich text field added to terms_and_conditions_page.');
    } else {
      console.log('✓ Rich text field already exists in terms_and_conditions_page.');
    }
    
    // Check if column already exists for privacy_policy_page
    const [privacyColumns] = await connection.query(`
      SELECT COLUMN_NAME 
      FROM information_schema.COLUMNS 
      WHERE TABLE_SCHEMA = ? 
      AND TABLE_NAME = 'privacy_policy_page' 
      AND COLUMN_NAME = 'rich_text_content'
    `, [config.database]);
    
    if (privacyColumns.length === 0) {
      console.log('Adding rich_text_content to privacy_policy_page...');
      await connection.query(`
        ALTER TABLE privacy_policy_page 
        ADD COLUMN rich_text_content LONGTEXT NULL AFTER subtitle
      `);
      console.log('✓ Rich text field added to privacy_policy_page.');
    } else {
      console.log('✓ Rich text field already exists in privacy_policy_page.');
    }
    
    console.log('\n✓ Migration completed successfully!');
    
  } catch (error) {
    console.error('✗ Error:', error.message);
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

addRichTextFields();

