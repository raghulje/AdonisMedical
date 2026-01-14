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

// List of fallback logos that should be client entries
const fallbackLogos = [
  '2025/03/logo06.jpg',
  '2025/03/logo03.jpg',
  '2025/03/logo14.jpg',
  '2025/03/logo11.jpg',
  '2025/03/logo02.jpg',
  '2025/03/logo16.jpg',
  '2025/03/logo18.jpg',
  '2025/03/logo01.jpg',
  '2025/03/logo22.jpg',
  '2025/03/logo13.jpg',
  '2025/03/logo09.jpg',
  '2025/03/logo17.jpg',
  '2025/03/logo23.jpg',
  '2025/03/logo15.jpg',
  '2025/03/logo08.jpg',
  '2025/03/logo10.jpg',
  '2025/03/logo12.jpg',
  '2025/03/logo21.jpg',
  '2025/03/logo04.jpg',
  '2025/03/logo05.jpg',
  '2025/03/logo24.jpg',
  '2025/03/logo19.jpg',
  '2025/03/logo07.jpg',
  '2025/03/logo20.jpg'
];

async function populateClientsFromFallbacks() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('✓ Database connection established.');

    console.log('Finding media entries for fallback logos...');
    
    for (let i = 0; i < fallbackLogos.length; i++) {
      const logoPath = fallbackLogos[i];
      const fileName = logoPath.split('/').pop();
      const filePath = `/uploads/${logoPath}`;
      
      // Find media entry for this logo
      const [mediaResults] = await sequelize.query(`
        SELECT id FROM media WHERE file_path = :filePath LIMIT 1
      `, {
        replacements: { filePath }
      });
      
      let mediaId = null;
      if (mediaResults.length > 0) {
        mediaId = mediaResults[0].id;
        console.log(`✓ Found media for ${fileName} (ID: ${mediaId})`);
      } else {
        console.log(`⚠ Media not found for ${fileName}, skipping...`);
        continue;
      }
      
      // Check if client already exists with this logo
      const [existingClients] = await sequelize.query(`
        SELECT id FROM clients WHERE logo_id = :mediaId LIMIT 1
      `, {
        replacements: { mediaId }
      });
      
      if (existingClients.length > 0) {
        console.log(`✓ Client already exists with logo ${fileName}`);
        continue;
      }
      
      // Extract client name from filename (e.g., "logo03.jpg" -> "Logo 03")
      const nameMatch = fileName.match(/logo(\d+)/i);
      const clientName = nameMatch 
        ? `Client ${nameMatch[1].padStart(2, '0')}` 
        : fileName.replace(/\.(jpg|jpeg|png|gif|svg)$/i, '').replace(/[-_]/g, ' ');
      
      // Create client entry
      await sequelize.query(`
        INSERT INTO clients (name, logo_id, order_index, is_active)
        VALUES (:name, :logoId, :orderIndex, TRUE)
        ON DUPLICATE KEY UPDATE logo_id = :logoId
      `, {
        replacements: {
          name: clientName,
          logoId: mediaId,
          orderIndex: i + 1
        }
      });
      
      console.log(`✓ Created/updated client: ${clientName}`);
    }
    
    console.log('\n✓ Client population completed!');
    
    // Show summary
    const [summary] = await sequelize.query(`
      SELECT COUNT(*) as total, 
             SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active
      FROM clients
    `);
    
    console.log('\nClient Summary:', {
      total: summary[0].total,
      active: summary[0].active,
      inactive: summary[0].total - summary[0].active
    });

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error(error);
    await sequelize.close();
    process.exit(1);
  }
}

populateClientsFromFallbacks();

