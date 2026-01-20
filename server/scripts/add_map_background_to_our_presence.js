const fs = require('fs');
const path = require('path');
const { sequelize } = require('../models');

async function runMigration() {
  try {
    console.log('Starting migration: Add map background image to Our Presence...');
    
    const sqlFile = path.join(__dirname, '../../database/migrations/add_map_background_to_our_presence.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    
    const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await sequelize.query(statement.trim() + ';');
          console.log('✓ Executed statement');
        } catch (error) {
          if (error.message.includes('already exists') || error.message.includes('Duplicate')) {
            console.log('⚠ Column already exists, skipping...');
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

