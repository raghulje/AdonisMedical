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

async function ensureClientsPageContent() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('✓ Database connection established.');

    console.log('Checking clients_page_content table...');
    
    // Check if record exists
    const [results] = await sequelize.query(`
      SELECT id FROM clients_page_content WHERE id = 1
    `);

    if (results.length === 0) {
      console.log('Creating clients page content record...');
      await sequelize.query(`
        INSERT INTO clients_page_content (id, hero_title, hero_subtitle, hero_image_id, intro_text) 
        VALUES (1, NULL, NULL, NULL, NULL)
      `);
      console.log('✓ Clients page content record created!');
    } else {
      console.log('✓ Clients page content record already exists.');
    }

    // Verify the record
    const [verify] = await sequelize.query(`
      SELECT * FROM clients_page_content WHERE id = 1
    `);
    
    if (verify.length > 0) {
      console.log('\n✓ Verification successful!');
      console.log('Record details:', {
        id: verify[0].id,
        hero_title: verify[0].hero_title,
        hero_subtitle: verify[0].hero_subtitle,
        hero_image_id: verify[0].hero_image_id,
        intro_text: verify[0].intro_text ? 'Set' : 'NULL'
      });
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    if (error.message.includes("doesn't exist")) {
      console.log('\n⚠ The clients_page_content table does not exist.');
      console.log('Please run the database migrations first.');
    }
    await sequelize.close();
    process.exit(1);
  }
}

ensureClientsPageContent();

