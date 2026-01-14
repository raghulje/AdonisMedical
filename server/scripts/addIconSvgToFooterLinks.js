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

async function addIconSvgToFooterLinks() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('✓ Database connection established.\n');

    console.log('Adding icon_svg column to footer_links table...');
    
    const [results] = await sequelize.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = '${config.database}' 
      AND TABLE_NAME = 'footer_links' 
      AND COLUMN_NAME = 'icon_svg'
    `);

    if (results.length > 0) {
      console.log('✓ icon_svg column already exists. Skipping migration.');
    } else {
      await sequelize.query(`
        ALTER TABLE footer_links
        ADD COLUMN icon_svg TEXT NULL DEFAULT NULL
        COMMENT 'SVG icon code or path for the link'
        AFTER url
      `);
      console.log('✓ icon_svg column added successfully!');
    }

    const [verifyResults] = await sequelize.query(`DESCRIBE footer_links`);
    const iconSvgColumn = verifyResults.find(col => col.Field === 'icon_svg');
    if (iconSvgColumn) {
      console.log('\n✓ Migration completed successfully!');
      console.log('Column details:', {
        Field: iconSvgColumn.Field,
        Type: iconSvgColumn.Type,
        Null: iconSvgColumn.Null,
        Default: iconSvgColumn.Default
      });
    } else {
      console.log('⚠ Warning: Could not verify icon_svg column.');
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

addIconSvgToFooterLinks();

