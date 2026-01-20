const { sequelize } = require('../models');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  try {
    console.log('Starting migration: Add icon_id to social_links table...');
    
    // Read the migration SQL file
    const migrationPath = path.join(__dirname, '../../database/migrations/add_icon_id_to_social_links.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = sql.split(';').filter(s => s.trim().length > 0);
    
    for (const statement of statements) {
      if (statement.trim()) {
        await sequelize.query(statement.trim(), { raw: true });
        console.log('Executed:', statement.trim().substring(0, 50) + '...');
      }
    }
    
    console.log('✅ Migration completed successfully!');
    console.log('Added icon_id column to social_links table');
    console.log('Made url column nullable');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error.message);
    if (error.original) {
      console.error('Original error:', error.original.message);
    }
    process.exit(1);
  }
}

runMigration();

