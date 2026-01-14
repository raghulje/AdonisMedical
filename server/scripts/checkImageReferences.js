const { sequelize } = require('../models');

async function checkImageReferences() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established.\n');

    console.log('Checking image_id references in database...\n');
    console.log('='.repeat(80));

    // Check home sections
    console.log('HOME SECTIONS:');
    const [hero] = await sequelize.query('SELECT id, background_image_id FROM home_hero_section LIMIT 1');
    const [about] = await sequelize.query('SELECT id, main_image_id FROM home_about_section LIMIT 1');
    const [quality] = await sequelize.query('SELECT id, background_image_id FROM home_quality_section LIMIT 1');
    
    console.log(`  Hero Section - background_image_id: ${hero[0]?.background_image_id || 'NULL'}`);
    console.log(`  About Section - main_image_id: ${about[0]?.main_image_id || 'NULL'}`);
    console.log(`  Quality Section - background_image_id: ${quality[0]?.background_image_id || 'NULL'}`);

    // Check about page
    console.log('\nABOUT PAGE:');
    const [aboutPage] = await sequelize.query('SELECT id, hero_image_id, overview_image_id, safety_image_id, excellence_image_id FROM about_page_content LIMIT 1');
    if (aboutPage[0]) {
      console.log(`  hero_image_id: ${aboutPage[0].hero_image_id || 'NULL'}`);
      console.log(`  overview_image_id: ${aboutPage[0].overview_image_id || 'NULL'}`);
      console.log(`  safety_image_id: ${aboutPage[0].safety_image_id || 'NULL'}`);
      console.log(`  excellence_image_id: ${aboutPage[0].excellence_image_id || 'NULL'}`);
    }

    // Check awards
    console.log('\nAWARDS:');
    const [awards] = await sequelize.query('SELECT id, image_id FROM awards LIMIT 5');
    awards.forEach((a, i) => {
      console.log(`  Award ${i + 1} - image_id: ${a.image_id || 'NULL'}`);
    });

    // Check clients
    console.log('\nCLIENTS:');
    const [clients] = await sequelize.query('SELECT id, name, logo_id FROM clients LIMIT 5');
    clients.forEach((c, i) => {
      console.log(`  ${c.name} - logo_id: ${c.logo_id || 'NULL'}`);
    });

    // Check product pages
    console.log('\nPRODUCT PAGES:');
    const products = ['hf_mobile', 'hf_fixed', 'fpd_c_arm', 'hf_c_arm_1k', 'line_frequency', 'digital_radiography', 'dream_series'];
    for (const product of products) {
      const [content] = await sequelize.query(`SELECT id, title, main_image_id FROM ${product}_page_content LIMIT 1`);
      if (content[0]) {
        console.log(`  ${product} - main_image_id: ${content[0].main_image_id || 'NULL'}`);
      }
    }

    // Check if there are any file_path or image_url columns
    console.log('\n' + '='.repeat(80));
    console.log('Checking for alternative image storage methods...\n');
    
    // Check if any tables have file_path or url columns
    const [tables] = await sequelize.query(`
      SELECT TABLE_NAME, COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = DATABASE()
      AND (COLUMN_NAME LIKE '%file_path%' OR COLUMN_NAME LIKE '%image_url%' OR COLUMN_NAME LIKE '%url%')
      AND TABLE_NAME NOT LIKE '%_links'
      ORDER BY TABLE_NAME, COLUMN_NAME
    `);
    
    if (tables.length > 0) {
      console.log('Tables with file_path/image_url/url columns:');
      tables.forEach(t => {
        console.log(`  ${t.TABLE_NAME}.${t.COLUMN_NAME}`);
      });
    } else {
      console.log('No file_path or image_url columns found in content tables');
    }

    console.log('\n✓ Check completed!');

  } catch (error) {
    console.error('✗ Error:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

checkImageReferences();

