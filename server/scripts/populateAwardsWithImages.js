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

// Award image paths in order (as per seed file)
const awardImagePaths = [
  '/uploads/2025/04/Award01-1.jpg',
  '/uploads/2025/04/Award02.jpg',
  '/uploads/2025/04/Award03.jpg',
  '/uploads/2025/04/Award04.jpg',
  '/uploads/2025/04/Award05.jpg',
  '/uploads/2025/04/Award06.jpg',
  '/uploads/2025/04/Award07.jpg',
  '/uploads/2025/04/Award08.jpg',
  '/uploads/2025/04/Award09.jpg',
  '/uploads/2025/04/Award10.jpg'
];

async function populateAwardsWithImages() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('✓ Database connection established.\n');

    // Get all awards ordered by order_index
    const [awards] = await sequelize.query(`
      SELECT id, title, image_id, order_index 
      FROM awards 
      ORDER BY order_index
    `);

    console.log(`Found ${awards.length} awards in database.\n`);

    // Get all award images from media table
    const [media] = await sequelize.query(`
      SELECT id, file_path, file_name 
      FROM media 
      WHERE file_path LIKE '%/2025/04/Award%' 
      ORDER BY file_path
    `);

    console.log(`Found ${media.length} award images in media table.\n`);

    // Create a map of file_path to media id
    const mediaMap = new Map();
    media.forEach(m => {
      mediaMap.set(m.file_path, m.id);
    });

    // Update each award with its corresponding image
    let updated = 0;
    let created = 0;
    let skipped = 0;

    for (let i = 0; i < awards.length && i < awardImagePaths.length; i++) {
      const award = awards[i];
      const imagePath = awardImagePaths[i];
      const mediaId = mediaMap.get(imagePath);

      if (!mediaId) {
        console.warn(`⚠ Award ${i + 1} (ID: ${award.id}): Media not found for ${imagePath}`);
        skipped++;
        continue;
      }

      // Check if award already has this image
      if (award.image_id === mediaId) {
        console.log(`✓ Award ${i + 1} (ID: ${award.id}): Already linked to correct image`);
        skipped++;
        continue;
      }

      // Update award with image_id
      await sequelize.query(`
        UPDATE awards 
        SET image_id = :mediaId 
        WHERE id = :awardId
      `, {
        replacements: { mediaId, awardId: award.id }
      });

      console.log(`✓ Award ${i + 1} (ID: ${award.id}): Linked to image (Media ID: ${mediaId}) - ${imagePath}`);
      
      if (award.image_id) {
        updated++;
      } else {
        created++;
      }
    }

    console.log(`\n✓ Summary:`);
    console.log(`  - Updated: ${updated} awards`);
    console.log(`  - Created links: ${created} awards`);
    console.log(`  - Skipped: ${skipped} awards (already linked or media not found)`);

    // Show final state
    console.log(`\nFinal awards state:`);
    const [finalAwards] = await sequelize.query(`
      SELECT a.id, a.title, a.image_id, a.order_index, m.file_path
      FROM awards a
      LEFT JOIN media m ON a.image_id = m.id
      ORDER BY a.order_index
    `);

    finalAwards.forEach((a, i) => {
      const status = a.image_id ? '✓' : '✗';
      console.log(`${status} ${i + 1}. ID: ${a.id}, Title: ${a.title.substring(0, 50)}..., Image: ${a.image_id ? a.file_path : 'NONE'}`);
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

populateAwardsWithImages();

