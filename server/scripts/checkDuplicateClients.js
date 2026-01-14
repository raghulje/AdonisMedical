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

async function checkDuplicateClients() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('✓ Database connection established.\n');

    // Get all clients
    const [clients] = await sequelize.query(`
      SELECT id, name, logo_id, order_index, is_active 
      FROM clients 
      ORDER BY order_index, id
    `);

    console.log(`Total clients in database: ${clients.length}\n`);
    console.log('Client list:');
    clients.forEach((c, i) => {
      console.log(`${i + 1}. ID: ${c.id}, Name: "${c.name}", Logo ID: ${c.logo_id || 'NULL'}, Order: ${c.order_index}, Active: ${c.is_active}`);
    });

    // Check for duplicates by name and logo_id
    const duplicates = [];
    const seen = new Map();
    
    clients.forEach(client => {
      const key = `${client.name}_${client.logo_id}`;
      if (seen.has(key)) {
        duplicates.push(client);
      } else {
        seen.set(key, client);
      }
    });

    if (duplicates.length > 0) {
      console.log(`\n⚠ Found ${duplicates.length} possible duplicate clients:`);
      duplicates.forEach(dup => {
        console.log(`  - ID: ${dup.id}, Name: "${dup.name}", Logo ID: ${dup.logo_id}`);
      });
    } else {
      console.log('\n✓ No duplicates found by name/logo combination.');
    }

    // Check if there are exactly 24 or 48 clients
    if (clients.length === 48) {
      console.log('\n⚠ You have 48 clients. This suggests duplicates may exist.');
      console.log('If you expected only 24 clients, we can help remove duplicates.');
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    await sequelize.close();
    process.exit(1);
  }
}

checkDuplicateClients();

