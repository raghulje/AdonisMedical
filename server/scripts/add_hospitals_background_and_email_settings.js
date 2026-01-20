const fs = require('fs');
const path = require('path');
const { sequelize } = require('../models');

async function runMigrations() {
  try {
    console.log('Starting migrations...');
    
    // Migration 1: Add hospitals background to products
    const hospitalsBgFile = path.join(__dirname, '../../database/migrations/add_hospitals_background_to_products.sql');
    const hospitalsBgSql = fs.readFileSync(hospitalsBgFile, 'utf8');
    const hospitalsBgStatements = hospitalsBgSql.split(';').filter(stmt => stmt.trim().length > 0);
    
    for (const statement of hospitalsBgStatements) {
      if (statement.trim()) {
        try {
          await sequelize.query(statement.trim() + ';');
          console.log('✓ Executed hospitals background statement');
        } catch (error) {
          if (error.message.includes('already exists') || error.message.includes('Duplicate')) {
            console.log('⚠ Column already exists, skipping...');
          } else if (error.message.includes("doesn't exist")) {
            console.log('⚠ Table does not exist, skipping...');
          } else {
            console.log('⚠ Error (non-critical):', error.message);
          }
        }
      }
    }
    
    // Migration 2: Add email settings table
    const emailSettingsFile = path.join(__dirname, '../../database/migrations/add_email_settings_table.sql');
    const emailSettingsSql = fs.readFileSync(emailSettingsFile, 'utf8');
    const emailSettingsStatements = emailSettingsSql.split(';').filter(stmt => stmt.trim().length > 0);
    
    for (const statement of emailSettingsStatements) {
      if (statement.trim()) {
        try {
          await sequelize.query(statement.trim() + ';');
          console.log('✓ Executed email settings statement');
        } catch (error) {
          if (error.message.includes('already exists') || error.message.includes('Duplicate')) {
            console.log('⚠ Table already exists, skipping...');
          } else {
            throw error;
          }
        }
      }
    }
    
    console.log('✓ All migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();

