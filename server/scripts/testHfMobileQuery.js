const { sequelize } = require('../models');

async function testQuery() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established.\n');

    // Test direct query
    console.log('Testing direct SQL query...');
    const [results] = await sequelize.query(`
      SELECT id, title, product_gallery_title, our_products_title, hospitals_served_title, enquire_button_text 
      FROM hf_mobile_page_content 
      WHERE id = 1
    `);
    console.log('✓ Direct query successful!');
    console.log('Results:', JSON.stringify(results, null, 2));

    // Test using the model
    console.log('\nTesting Sequelize model query...');
    const { HfMobilePageContent } = require('../models');
    const content = await HfMobilePageContent.findOne({ where: { id: 1 } });
    if (content) {
      console.log('✓ Model query successful!');
      console.log('Content:', JSON.stringify(content.toJSON(), null, 2));
    } else {
      console.log('✗ No content found with id = 1');
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    if (error.sql) {
      console.error('SQL:', error.sql);
    }
    await sequelize.close();
    process.exit(1);
  }
}

testQuery();

