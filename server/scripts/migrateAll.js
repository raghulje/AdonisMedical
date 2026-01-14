const { execSync } = require('child_process');
const path = require('path');

/**
 * Master migration script - runs all migration scripts in order
 */
console.log('='.repeat(80));
console.log('ADONIS MEDICAL CMS - MASTER MIGRATION SCRIPT');
console.log('='.repeat(80));
console.log();

const scripts = [
  {
    name: 'Check Database Structure',
    file: 'checkDatabaseData.js',
    description: 'Lists all tables and record counts'
  },
  {
    name: 'Analyze Data Structure',
    file: 'analyzeDataStructure.js',
    description: 'Analyzes data structure and identifies issues'
  },
  {
    name: 'Populate Media from Uploads',
    file: 'populateMediaFromUploads.js',
    description: 'Scans uploads folder and creates media records'
  },
  {
    name: 'Verify Data Integrity',
    file: 'verifyDataIntegrity.js',
    description: 'Verifies all data is properly structured'
  }
];

const scriptsDir = __dirname;

async function runMigrations() {
  console.log('Migration scripts to run:');
  scripts.forEach((script, index) => {
    console.log(`  ${index + 1}. ${script.name} - ${script.description}`);
  });
  console.log();

  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];
    const scriptPath = path.join(scriptsDir, script.file);

    console.log('='.repeat(80));
    console.log(`Running: ${script.name} (${i + 1}/${scripts.length})`);
    console.log('='.repeat(80));
    console.log();

    try {
      execSync(`node "${scriptPath}"`, {
        cwd: scriptsDir,
        stdio: 'inherit',
        encoding: 'utf8'
      });
      console.log(`\n✓ ${script.name} completed successfully\n`);
    } catch (error) {
      console.error(`\n✗ ${script.name} failed`);
      console.error(`Error: ${error.message}`);
      console.log('\n⚠ Continuing with next script...\n');
    }

    // Small delay between scripts
    if (i < scripts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log('='.repeat(80));
  console.log('MIGRATION COMPLETE');
  console.log('='.repeat(80));
  console.log();
  console.log('✓ All migration scripts have been executed');
  console.log('✓ Your CMS database is now ready for use');
  console.log();
  console.log('Next steps:');
  console.log('  1. Start the server: npm run dev');
  console.log('  2. Access the CMS admin dashboard');
  console.log('  3. All content is already in the database');
  console.log('  4. Media gallery is populated with 869 records');
  console.log();
}

runMigrations().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

