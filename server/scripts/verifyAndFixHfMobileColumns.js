const { sequelize } = require('../models');

async function verifyAndFixColumns() {
  try {
    console.log('Verifying hf_mobile_page_content table columns...');
    await sequelize.authenticate();
    console.log('✓ Database connection established.\n');

    // Check current columns
    const [columns] = await sequelize.query("DESCRIBE hf_mobile_page_content");
    const columnNames = columns.map(c => c.Field);
    console.log('Current columns:', columnNames.join(', '));

    // Columns that should exist
    const requiredColumns = [
      { name: 'product_gallery_title', type: "VARCHAR(255) DEFAULT 'Product Gallery'" },
      { name: 'our_products_title', type: "VARCHAR(255) DEFAULT 'Our Products'" },
      { name: 'hospitals_served_title', type: "VARCHAR(255) DEFAULT 'Hospitals Served'" },
      { name: 'enquire_button_text', type: "VARCHAR(100) DEFAULT 'Enquire Now'" }
    ];

    console.log('\nChecking for missing columns...');
    for (const col of requiredColumns) {
      if (!columnNames.includes(col.name)) {
        console.log(`✗ Missing column: ${col.name}`);
        try {
          await sequelize.query(`
            ALTER TABLE hf_mobile_page_content 
            ADD COLUMN ${col.name} ${col.type}
          `);
          console.log(`✓ Added column: ${col.name}`);
        } catch (error) {
          console.error(`✗ Failed to add ${col.name}:`, error.message);
        }
      } else {
        console.log(`✓ Column exists: ${col.name}`);
      }
    }

    // Verify again
    console.log('\nVerifying final state...');
    const [finalColumns] = await sequelize.query("DESCRIBE hf_mobile_page_content");
    const finalColumnNames = finalColumns.map(c => c.Field);
    console.log('Final columns:', finalColumnNames.join(', '));

    const allPresent = requiredColumns.every(col => finalColumnNames.includes(col.name));
    if (allPresent) {
      console.log('\n✓ All required columns are present!');
    } else {
      console.log('\n✗ Some columns are still missing!');
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Error:', error);
    await sequelize.close();
    process.exit(1);
  }
}

verifyAndFixColumns();

