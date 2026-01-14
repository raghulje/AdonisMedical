const { sequelize } = require('../models');

async function analyzeDataStructure() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established.\n');

    console.log('='.repeat(80));
    console.log('DATABASE DATA ANALYSIS');
    console.log('='.repeat(80));
    console.log();

    // 1. Check Media table
    console.log('1. MEDIA TABLE ANALYSIS');
    console.log('-'.repeat(80));
    const [mediaCount] = await sequelize.query('SELECT COUNT(*) as count FROM media');
    console.log(`   Total media records: ${mediaCount[0].count}`);
    
    // Check for image_id references that don't exist in media table
    const tablesWithImageIds = [
      { table: 'home_hero_section', column: 'background_image_id' },
      { table: 'home_about_section', column: 'main_image_id' },
      { table: 'home_quality_section', column: 'background_image_id' },
      { table: 'about_page_content', column: 'hero_image_id' },
      { table: 'about_page_content', column: 'overview_image_id' },
      { table: 'about_page_content', column: 'safety_image_id' },
      { table: 'about_page_content', column: 'excellence_image_id' },
      { table: 'awards', column: 'image_id' },
      { table: 'clients', column: 'logo_id' },
      { table: 'testimonials', column: 'client_image_id' },
      { table: 'leaders', column: 'image_id' },
      { table: 'careers_page_content', column: 'hero_image_id' },
      { table: 'careers_page_content', column: 'intro_image_id' },
      { table: 'careers_page_content', column: 'life_at_adonis_image_id' },
      { table: 'investor_relations_page_content', column: 'hero_image_id' },
      { table: 'our_presence_page_content', column: 'hero_image_id' },
      { table: 'our_presence_page_content', column: 'map_image_id' },
      { table: 'our_presence_page_content', column: 'sales_service_image_id' },
      { table: 'production_facility_page_content', column: 'hero_image_id' },
      { table: 'production_facility_page_content', column: 'flexibility_image_id' },
      { table: 'production_facility_page_content', column: 'quality_image_id' },
      { table: 'quality_assurance_page_content', column: 'hero_image_id' },
      { table: 'quality_assurance_page_content', column: 'main_image_id' },
      { table: 'contact_us_page_content', column: 'hero_image_id' },
      // Product pages
      { table: 'hf_mobile_page_content', column: 'main_image_id' },
      { table: 'hf_fixed_page_content', column: 'main_image_id' },
      { table: 'fpd_c_arm_page_content', column: 'main_image_id' },
      { table: 'hf_c_arm_1k_page_content', column: 'main_image_id' },
      { table: 'line_frequency_page_content', column: 'main_image_id' },
      { table: 'digital_radiography_page_content', column: 'main_image_id' },
      { table: 'dream_series_page_content', column: 'main_image_id' }
    ];

    console.log('\n   Checking for orphaned image_id references...');
    let orphanedCount = 0;
    for (const { table, column } of tablesWithImageIds) {
      try {
        const [orphaned] = await sequelize.query(`
          SELECT COUNT(*) as count 
          FROM ${table} 
          WHERE ${column} IS NOT NULL 
          AND ${column} NOT IN (SELECT id FROM media)
        `);
        if (orphaned[0].count > 0) {
          console.log(`   ⚠ ${table}.${column}: ${orphaned[0].count} orphaned references`);
          orphanedCount += orphaned[0].count;
        }
      } catch (error) {
        // Table or column might not exist, skip
      }
    }
    if (orphanedCount === 0) {
      console.log('   ✓ No orphaned image_id references found');
    }

    // 2. Check Product Images, Features, Variants
    console.log('\n2. PRODUCT DATA ANALYSIS');
    console.log('-'.repeat(80));
    const productTables = [
      'hf_mobile_images', 'hf_mobile_features', 'hf_mobile_variants',
      'hf_fixed_images', 'hf_fixed_features', 'hf_fixed_variants',
      'fpd_c_arm_images', 'fpd_c_arm_features', 'fpd_c_arm_variants',
      'hf_c_arm_1k_images', 'hf_c_arm_1k_features', 'hf_c_arm_1k_variants',
      'line_frequency_images', 'line_frequency_features', 'line_frequency_variants',
      'digital_radiography_images', 'digital_radiography_features', 'digital_radiography_variants',
      'dream_series_images', 'dream_series_features', 'dream_series_variants'
    ];

    for (const table of productTables) {
      try {
        const [count] = await sequelize.query(`SELECT COUNT(*) as count FROM ${table}`);
        if (count[0].count > 0) {
          console.log(`   ✓ ${table.padEnd(40)} : ${count[0].count} records`);
        }
      } catch (error) {
        // Table might not exist
      }
    }

    // 3. Check Related Data
    console.log('\n3. RELATED DATA ANALYSIS');
    console.log('-'.repeat(80));
    const relatedTables = [
      { name: 'certifications', parent: 'quality_assurance' },
      { name: 'office_locations', parent: 'our_presence' },
      { name: 'investor_documents', parent: 'investor_relations' },
      { name: 'production_facility_features', parent: 'production_facility' },
      { name: 'jobs', parent: 'careers' },
      { name: 'about_page_highlights', parent: 'about' }
    ];

    for (const { name, parent } of relatedTables) {
      try {
        const [count] = await sequelize.query(`SELECT COUNT(*) as count FROM ${name}`);
        if (count[0].count > 0) {
          console.log(`   ✓ ${name.padEnd(40)} : ${count[0].count} records (for ${parent})`);
        }
      } catch (error) {
        // Table might not exist
      }
    }

    // 4. Summary
    console.log('\n' + '='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));
    
    const [totalUsers] = await sequelize.query('SELECT COUNT(*) as count FROM users');
    const [totalPages] = await sequelize.query(`
      SELECT COUNT(*) as count FROM (
        SELECT 'home_hero' as page UNION ALL
        SELECT 'home_about' UNION ALL
        SELECT 'home_quality' UNION ALL
        SELECT 'about' UNION ALL
        SELECT 'careers' UNION ALL
        SELECT 'investor_relations' UNION ALL
        SELECT 'our_presence' UNION ALL
        SELECT 'production_facility' UNION ALL
        SELECT 'quality_assurance' UNION ALL
        SELECT 'contact_us' UNION ALL
        SELECT 'request_demo'
      ) as pages
    `);
    
    console.log(`   Users: ${totalUsers[0].count}`);
    console.log(`   Media records: ${mediaCount[0].count}`);
    console.log(`   Page content records: ~${totalPages[0].count}`);
    console.log(`   Orphaned image references: ${orphanedCount}`);
    
    if (orphanedCount > 0) {
      console.log('\n   ⚠ ACTION REQUIRED: Create media records for orphaned image_id references');
    }
    
    if (mediaCount[0].count === 0) {
      console.log('\n   ⚠ ACTION REQUIRED: Media table is empty - need to create media records');
    }

    console.log('\n✓ Analysis completed!');

  } catch (error) {
    console.error('✗ Error:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

analyzeDataStructure();

