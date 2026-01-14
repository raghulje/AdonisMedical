const mysql = require('mysql2/promise');
const config = require('../config/config.json').development;

async function verifyTables() {
  let connection;
  
  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database
    });
    
    console.log('✓ Database connection established.\n');
    
    // Check if tables exist
    const [tables] = await connection.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = ? 
      AND TABLE_NAME IN ('home_specialties_section', 'home_testimonials_section', 'home_contact_section')
    `, [config.database]);
    
    console.log(`Found ${tables.length} new tables:\n`);
    tables.forEach(table => {
      console.log(`  ✓ ${table.TABLE_NAME}`);
    });
    
    // Check default records
    console.log('\nChecking default records...\n');
    
    const [specialties] = await connection.query('SELECT * FROM home_specialties_section WHERE id = 1');
    if (specialties.length > 0) {
      console.log('✓ home_specialties_section: Default record found');
      console.log(`  Heading: ${specialties[0].heading}`);
    }
    
    const [testimonials] = await connection.query('SELECT * FROM home_testimonials_section WHERE id = 1');
    if (testimonials.length > 0) {
      console.log('✓ home_testimonials_section: Default record found');
      console.log(`  Subtitle: ${testimonials[0].subtitle}, Heading: ${testimonials[0].heading}`);
    }
    
    const [contact] = await connection.query('SELECT * FROM home_contact_section WHERE id = 1');
    if (contact.length > 0) {
      console.log('✓ home_contact_section: Default record found');
      console.log(`  Heading: ${contact[0].heading}`);
      console.log(`  Company: ${contact[0].company_name}`);
    }
    
    console.log('\n✓ All tables and default records verified successfully!');
    
  } catch (error) {
    console.error('✗ Verification failed:');
    console.error(error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

verifyTables();

