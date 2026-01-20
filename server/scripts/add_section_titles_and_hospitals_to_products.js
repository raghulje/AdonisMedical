const fs = require('fs');
const path = require('path');
const { sequelize } = require('../models');

async function runMigration() {
  try {
    console.log('Starting migration: Add section titles and hospitals to products...');
    
    const sqlFile = path.join(__dirname, '../../database/migrations/add_section_titles_and_hospitals_to_products.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await sequelize.query(statement.trim() + ';');
          console.log('✓ Executed statement');
        } catch (error) {
          // Ignore "Duplicate column" errors if migration was already run
          if (error.message.includes('Duplicate column') || error.message.includes('already exists')) {
            console.log('⚠ Column/table already exists, skipping...');
          } else {
            throw error;
          }
        }
      }
    }
    
    console.log('✓ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();

