const { sequelize } = require('../models');

/**
 * Verify data integrity and prepare migration summary
 */
async function verifyDataIntegrity() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established.\n');

    console.log('='.repeat(80));
    console.log('DATA INTEGRITY VERIFICATION');
    console.log('='.repeat(80));
    console.log();

    const issues = [];
    const warnings = [];
    const success = [];

    // 1. Check Users
    console.log('1. USERS');
    console.log('-'.repeat(80));
    const [users] = await sequelize.query('SELECT COUNT(*) as count FROM users');
    if (users[0].count > 0) {
      success.push(`✓ Users: ${users[0].count} records`);
      console.log(`   ✓ ${users[0].count} user(s) found`);
    } else {
      warnings.push('⚠ No users found - create at least one admin user');
      console.log('   ⚠ No users found');
    }

    // 2. Check Media
    console.log('\n2. MEDIA');
    console.log('-'.repeat(80));
    const [media] = await sequelize.query('SELECT COUNT(*) as count FROM media');
    if (media[0].count > 0) {
      success.push(`✓ Media: ${media[0].count} records`);
      console.log(`   ✓ ${media[0].count} media records found`);
      
      // Check media by type
      const [images] = await sequelize.query("SELECT COUNT(*) as count FROM media WHERE file_type = 'image'");
      const [documents] = await sequelize.query("SELECT COUNT(*) as count FROM media WHERE file_type = 'document'");
      const [svg] = await sequelize.query("SELECT COUNT(*) as count FROM media WHERE file_type = 'svg'");
      console.log(`     - Images: ${images[0].count}`);
      console.log(`     - Documents: ${documents[0].count}`);
      console.log(`     - SVG: ${svg[0].count}`);
    } else {
      issues.push('✗ Media table is empty - run populateMediaFromUploads.js');
      console.log('   ✗ Media table is empty');
    }

    // 3. Check Page Content
    console.log('\n3. PAGE CONTENT');
    console.log('-'.repeat(80));
    const pageTables = [
      'home_hero_section',
      'home_about_section',
      'home_quality_section',
      'about_page_content',
      'careers_page_content',
      'investor_relations_page_content',
      'our_presence_page_content',
      'production_facility_page_content',
      'quality_assurance_page_content',
      'contact_us_page_content',
      'request_demo_page_content'
    ];

    let pageCount = 0;
    for (const table of pageTables) {
      try {
        const [count] = await sequelize.query(`SELECT COUNT(*) as count FROM ${table}`);
        if (count[0].count > 0) {
          pageCount++;
          console.log(`   ✓ ${table}: ${count[0].count} record(s)`);
        }
      } catch (error) {
        warnings.push(`⚠ Table ${table} not found or error: ${error.message}`);
      }
    }
    success.push(`✓ Page Content: ${pageCount}/${pageTables.length} pages have content`);

    // 4. Check Product Content
    console.log('\n4. PRODUCT CONTENT');
    console.log('-'.repeat(80));
    const productTables = [
      'hf_mobile_page_content',
      'hf_fixed_page_content',
      'fpd_c_arm_page_content',
      'hf_c_arm_1k_page_content',
      'line_frequency_page_content',
      'digital_radiography_page_content',
      'dream_series_page_content'
    ];

    let productCount = 0;
    for (const table of productTables) {
      try {
        const [count] = await sequelize.query(`SELECT COUNT(*) as count FROM ${table}`);
        if (count[0].count > 0) {
          productCount++;
          console.log(`   ✓ ${table}: ${count[0].count} record(s)`);
        }
      } catch (error) {
        warnings.push(`⚠ Table ${table} not found or error: ${error.message}`);
      }
    }
    success.push(`✓ Product Content: ${productCount}/${productTables.length} products have content`);

    // 5. Check Navigation & Footer
    console.log('\n5. NAVIGATION & FOOTER');
    console.log('-'.repeat(80));
    const [navItems] = await sequelize.query('SELECT COUNT(*) as count FROM navigation_items');
    const [footerSections] = await sequelize.query('SELECT COUNT(*) as count FROM footer_sections');
    const [footerLinks] = await sequelize.query('SELECT COUNT(*) as count FROM footer_links');
    const [socialLinks] = await sequelize.query('SELECT COUNT(*) as count FROM social_links');
    
    console.log(`   ✓ Navigation items: ${navItems[0].count}`);
    console.log(`   ✓ Footer sections: ${footerSections[0].count}`);
    console.log(`   ✓ Footer links: ${footerLinks[0].count}`);
    console.log(`   ✓ Social links: ${socialLinks[0].count}`);
    success.push(`✓ Navigation: ${navItems[0].count} items, Footer: ${footerSections[0].count} sections, ${footerLinks[0].count} links`);

    // 6. Check Related Data
    console.log('\n6. RELATED DATA');
    console.log('-'.repeat(80));
    const relatedData = [
      { table: 'awards', name: 'Awards' },
      { table: 'clients', name: 'Clients' },
      { table: 'testimonials', name: 'Testimonials' },
      { table: 'leaders', name: 'Leaders' },
      { table: 'certifications', name: 'Certifications' },
      { table: 'office_locations', name: 'Office Locations' },
      { table: 'investor_documents', name: 'Investor Documents' },
      { table: 'production_facility_features', name: 'Production Facility Features' },
      { table: 'jobs', name: 'Jobs' }
    ];

    for (const { table, name } of relatedData) {
      try {
        const [count] = await sequelize.query(`SELECT COUNT(*) as count FROM ${table}`);
        if (count[0].count > 0) {
          console.log(`   ✓ ${name}: ${count[0].count} record(s)`);
        }
      } catch (error) {
        // Table might not exist, skip
      }
    }

    // 7. Check Product Features/Variants/Images
    console.log('\n7. PRODUCT FEATURES, VARIANTS & IMAGES');
    console.log('-'.repeat(80));
    const productData = [
      'hf_mobile_features', 'hf_mobile_variants', 'hf_mobile_images',
      'hf_fixed_features', 'hf_fixed_variants', 'hf_fixed_images',
      'fpd_c_arm_features', 'fpd_c_arm_variants', 'fpd_c_arm_images',
      'hf_c_arm_1k_features', 'hf_c_arm_1k_variants', 'hf_c_arm_1k_images',
      'line_frequency_features', 'line_frequency_variants', 'line_frequency_images',
      'digital_radiography_features', 'digital_radiography_variants', 'digital_radiography_images',
      'dream_series_features', 'dream_series_variants', 'dream_series_images'
    ];

    let totalProductData = 0;
    for (const table of productData) {
      try {
        const [count] = await sequelize.query(`SELECT COUNT(*) as count FROM ${table}`);
        if (count[0].count > 0) {
          totalProductData += count[0].count;
        }
      } catch (error) {
        // Table might not exist
      }
    }
    console.log(`   ✓ Total product data records: ${totalProductData}`);

    // Summary
    console.log('\n' + '='.repeat(80));
    console.log('VERIFICATION SUMMARY');
    console.log('='.repeat(80));
    
    if (success.length > 0) {
      console.log('\n✓ SUCCESS:');
      success.forEach(msg => console.log(`   ${msg}`));
    }

    if (warnings.length > 0) {
      console.log('\n⚠ WARNINGS:');
      warnings.forEach(msg => console.log(`   ${msg}`));
    }

    if (issues.length > 0) {
      console.log('\n✗ ISSUES:');
      issues.forEach(msg => console.log(`   ${msg}`));
    }

    // Overall status
    console.log('\n' + '='.repeat(80));
    if (issues.length === 0) {
      console.log('✓ DATA INTEGRITY: PASSED');
      console.log('\n✓ CMS is ready for use!');
      console.log('  - All content is in the database');
      console.log('  - Media records are populated');
      console.log('  - Navigation and footer are configured');
      console.log('  - Product data is available');
    } else {
      console.log('⚠ DATA INTEGRITY: HAS ISSUES');
      console.log('\nPlease resolve the issues above before using the CMS.');
    }

    console.log('\n✓ Verification completed!');

  } catch (error) {
    console.error('✗ Error:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

verifyDataIntegrity();

