const { sequelize } = require('../models');

async function checkDatabaseData() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established.\n');

    // Check key tables for existing data
    const tablesToCheck = [
      'users',
      'media',
      'home_hero_section',
      'home_about_section',
      'home_quality_section',
      'home_stats',
      'about_page_content',
      'navigation_items',
      'footer_sections',
      'footer_links',
      'social_links',
      'contact_info',
      'global_settings',
      'awards',
      'clients',
      'testimonials',
      'specialties',
      'leaders',
      'jobs',
      'careers_page_content',
      'investor_relations_page_content',
      'our_presence_page_content',
      'production_facility_page_content',
      'quality_assurance_page_content',
      'contact_us_page_content',
      'request_demo_page_content',
      // Product tables
      'hf_mobile_page_content',
      'hf_fixed_page_content',
      'fpd_c_arm_page_content',
      'hf_c_arm_1k_page_content',
      'line_frequency_page_content',
      'digital_radiography_page_content',
      'dream_series_page_content'
    ];

    console.log('Checking existing data in key tables...\n');
    console.log('='.repeat(80));

    for (const tableName of tablesToCheck) {
      try {
        const [results] = await sequelize.query(`SELECT COUNT(*) as count FROM ${tableName}`);
        const count = results[0]?.count || 0;
        
        if (count > 0) {
          // Get sample data
          const [sample] = await sequelize.query(`SELECT * FROM ${tableName} LIMIT 1`);
          console.log(`✓ ${tableName.padEnd(40)} : ${count.toString().padStart(4)} records`);
          
          // Show column names for reference
          if (sample.length > 0) {
            const columns = Object.keys(sample[0]).join(', ');
            console.log(`  Columns: ${columns.substring(0, 60)}...`);
          }
        } else {
          console.log(`○ ${tableName.padEnd(40)} : ${count.toString().padStart(4)} records (empty)`);
        }
      } catch (error) {
        console.log(`✗ ${tableName.padEnd(40)} : Error - ${error.message}`);
      }
    }

    console.log('\n' + '='.repeat(80));
    console.log('\n✓ Database check completed!');

  } catch (error) {
    console.error('✗ Error:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

checkDatabaseData();

