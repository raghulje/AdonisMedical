const { sequelize } = require('../models');

async function runMigration() {
  console.log('Starting migration: add_contact_and_demo_emails_to_email_settings');

  const query = `
    ALTER TABLE email_settings
      ADD COLUMN contact_form_email VARCHAR(255) NULL COMMENT 'Email to receive contact form submissions' AFTER from_name,
      ADD COLUMN request_demo_email VARCHAR(255) NULL COMMENT 'Email to receive request demo form submissions' AFTER contact_form_email;
  `;

  try {
    await sequelize.query(query);
    console.log('✓ Columns contact_form_email and request_demo_email added to email_settings');
  } catch (error) {
    if (error.message.includes('Duplicate column name')) {
      console.warn('⚠ Columns already exist on email_settings, skipping.');
    } else {
      console.error('✗ Migration failed:', error);
      process.exit(1);
    }
  } finally {
    await sequelize.close();
  }

  console.log('✓ Migration completed.');
  process.exit(0);
}

runMigration();


