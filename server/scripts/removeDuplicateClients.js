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

async function removeDuplicateClients() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('✓ Database connection established.\n');

    // Find clients with NULL logos (these are the old placeholder entries)
    const [clientsWithoutLogos] = await sequelize.query(`
      SELECT id, name, logo_id, order_index 
      FROM clients 
      WHERE logo_id IS NULL
      ORDER BY id
    `);

    console.log(`Found ${clientsWithoutLogos.length} clients without logos (to be removed):\n`);
    clientsWithoutLogos.forEach(c => {
      console.log(`  - ID: ${c.id}, Name: "${c.name}", Order: ${c.order_index}`);
    });

    if (clientsWithoutLogos.length === 0) {
      console.log('No clients without logos found. Nothing to remove.');
      await sequelize.close();
      process.exit(0);
    }

    // Delete clients without logos
    const idsToDelete = clientsWithoutLogos.map(c => c.id);
    await sequelize.query(`
      DELETE FROM clients 
      WHERE id IN (${idsToDelete.join(',')})
    `);

    console.log(`\n✓ Removed ${clientsWithoutLogos.length} clients without logos.\n`);

    // Update order_index for remaining clients to be sequential
    const [remainingClients] = await sequelize.query(`
      SELECT id FROM clients WHERE logo_id IS NOT NULL ORDER BY order_index, id
    `);

    for (let i = 0; i < remainingClients.length; i++) {
      await sequelize.query(`
        UPDATE clients SET order_index = :orderIndex WHERE id = :id
      `, {
        replacements: { orderIndex: i + 1, id: remainingClients[i].id }
      });
    }

    console.log(`✓ Updated order_index for ${remainingClients.length} remaining clients.\n`);

    // Show final count
    const [finalCount] = await sequelize.query(`
      SELECT COUNT(*) as total FROM clients
    `);

    console.log(`✓ Final client count: ${finalCount[0].total} clients (all with logos)`);

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error(error);
    await sequelize.close();
    process.exit(1);
  }
}

removeDuplicateClients();

