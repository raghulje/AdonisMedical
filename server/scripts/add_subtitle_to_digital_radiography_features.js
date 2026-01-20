const { sequelize } = require('../models');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  try {
    const sql = fs.readFileSync(
      path.join(__dirname, '../../database/migrations/add_subtitle_to_digital_radiography_features.sql'),
      'utf8'
    );
    
    await sequelize.query(sql);
    console.log('✅ Successfully added subtitle column to digital_radiography_features table');
  } catch (error) {
    if (error.message.includes('Duplicate column name')) {
      console.log('ℹ️  Column subtitle already exists in digital_radiography_features table');
    } else {
      console.error('❌ Error running migration:', error);
      throw error;
    }
  } finally {
    await sequelize.close();
  }
}

runMigration();

