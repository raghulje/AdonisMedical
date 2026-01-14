const { Sequelize } = require('sequelize');
const config = require('../config/config.json').development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false
  }
);

async function fixSocialLinksUpdatedAt() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('✓ Database connection established.');

    console.log('Checking social_links table for updated_at column...');
    
    // Check if column already exists
    const [results] = await sequelize.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = '${config.database}' 
      AND TABLE_NAME = 'social_links' 
      AND COLUMN_NAME = 'updated_at'
    `);

    if (results.length > 0) {
      console.log('✓ updated_at column already exists. Skipping migration.');
    } else {
      // Add the column
      await sequelize.query(`
        ALTER TABLE social_links 
        ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
        AFTER created_at
      `);
      console.log('✓ updated_at column added successfully!');
    }

    // Verify the column was added
    const [verifyResults] = await sequelize.query(`
      DESCRIBE social_links
    `);
    
    const updatedAtColumn = verifyResults.find(col => col.Field === 'updated_at');
    if (updatedAtColumn) {
      console.log('\n✓ Migration completed successfully!');
      console.log('Column details:', {
        Field: updatedAtColumn.Field,
        Type: updatedAtColumn.Type,
        Null: updatedAtColumn.Null,
        Default: updatedAtColumn.Default
      });
    } else {
      console.log('⚠ Warning: Could not verify updated_at column.');
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('✗ Migration failed:', error.message);
    if (error.message.includes('Duplicate column name')) {
      console.log('✓ Column already exists. Migration not needed.');
      await sequelize.close();
      process.exit(0);
    } else {
      await sequelize.close();
      process.exit(1);
    }
  }
}

fixSocialLinksUpdatedAt();

