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

async function runMigration() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('✓ Database connection established.');

    console.log('Running migration 004: Add permissions column to users table...');
    
    // Check if column already exists
    const [results] = await sequelize.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = '${config.database}' 
      AND TABLE_NAME = 'users' 
      AND COLUMN_NAME = 'permissions'
    `);

    if (results.length > 0) {
      console.log('✓ Permissions column already exists. Skipping migration.');
    } else {
      // Add the column
      await sequelize.query(`
        ALTER TABLE users 
        ADD COLUMN permissions JSON NULL DEFAULT NULL 
        COMMENT 'Custom permissions that override role-based defaults. Format: { page: { view: bool, edit: bool, delete: bool } }'
        AFTER last_login_at
      `);
      console.log('✓ Permissions column added successfully!');
    }

    // Verify the column was added
    const [verifyResults] = await sequelize.query(`
      DESCRIBE users
    `);
    
    const permissionsColumn = verifyResults.find(col => col.Field === 'permissions');
    if (permissionsColumn) {
      console.log('\n✓ Migration completed successfully!');
      console.log('Column details:', {
        Field: permissionsColumn.Field,
        Type: permissionsColumn.Type,
        Null: permissionsColumn.Null,
        Default: permissionsColumn.Default
      });
    } else {
      console.log('⚠ Warning: Could not verify permissions column.');
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

runMigration();

