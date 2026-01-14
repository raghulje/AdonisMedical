const { sequelize, Media } = require('../models');
const fs = require('fs');
const path = require('path');

/**
 * Scan uploads folder and create media records for all existing images
 * This will populate the media table so the gallery feature works
 */
async function populateMediaFromUploads() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established.\n');

    const uploadsDir = path.join(__dirname, '..', 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      console.log('✗ Uploads directory does not exist');
      process.exit(1);
    }

    console.log('Scanning uploads folder structure...\n');
    console.log('='.repeat(80));

    const mediaRecords = [];
    let totalFiles = 0;
    let skippedFiles = 0;

    // Function to recursively scan directory
    function scanDirectory(dir, relativePath = '') {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativeFilePath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

        if (entry.isDirectory()) {
          // Recursively scan subdirectories
          scanDirectory(fullPath, relativeFilePath);
        } else if (entry.isFile()) {
          totalFiles++;
          
          // Check if it's an image file
          const ext = path.extname(entry.name).toLowerCase();
          const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
          const documentExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];

          if (imageExtensions.includes(ext) || documentExtensions.includes(ext)) {
            const stats = fs.statSync(fullPath);
            const fileType = imageExtensions.includes(ext) 
              ? (ext === '.svg' ? 'svg' : 'image')
              : 'document';

            // Determine mime type
            const mimeTypes = {
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png',
              '.gif': 'image/gif',
              '.webp': 'image/webp',
              '.svg': 'image/svg+xml',
              '.pdf': 'application/pdf',
              '.doc': 'application/msword',
              '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              '.xls': 'application/vnd.ms-excel',
              '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              '.ppt': 'application/vnd.ms-powerpoint',
              '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            };

            const filePath = `/uploads/${relativeFilePath}`;
            
            // Check if media record already exists
            const existingMedia = mediaRecords.find(m => m.filePath === filePath);
            if (!existingMedia) {
              mediaRecords.push({
                fileName: entry.name,
                filePath: filePath,
                fileType: fileType,
                mimeType: mimeTypes[ext] || 'application/octet-stream',
                fileSize: stats.size,
                altText: entry.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
                pageName: null,
                sectionName: null,
                uploadedBy: null
              });
            }
          } else {
            skippedFiles++;
          }
        }
      }
    }

    // Start scanning from uploads root
    scanDirectory(uploadsDir);

    console.log(`\nScan Results:`);
    console.log(`  Total files found: ${totalFiles}`);
    console.log(`  Media files to create: ${mediaRecords.length}`);
    console.log(`  Skipped files: ${skippedFiles}`);
    console.log();

    if (mediaRecords.length === 0) {
      console.log('No media files found in uploads folder.');
      process.exit(0);
    }

    // Check existing media records
    const existingMedia = await Media.findAll();
    const existingPaths = new Set(existingMedia.map(m => m.filePath));
    
    const newMediaRecords = mediaRecords.filter(m => !existingPaths.has(m.filePath));
    const duplicateCount = mediaRecords.length - newMediaRecords.length;

    if (duplicateCount > 0) {
      console.log(`⚠ ${duplicateCount} media records already exist (will skip)`);
    }

    console.log(`\nCreating ${newMediaRecords.length} new media records...\n`);

    // Create media records in batches
    const batchSize = 50;
    let created = 0;
    let errors = 0;

    for (let i = 0; i < newMediaRecords.length; i += batchSize) {
      const batch = newMediaRecords.slice(i, i + batchSize);
      
      try {
        await Media.bulkCreate(batch, { ignoreDuplicates: true });
        created += batch.length;
        process.stdout.write(`\r  Progress: ${created}/${newMediaRecords.length} records created...`);
      } catch (error) {
        console.error(`\n  Error creating batch ${i / batchSize + 1}:`, error.message);
        errors += batch.length;
      }
    }

    console.log('\n');
    console.log('='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));
    console.log(`  Files scanned: ${totalFiles}`);
    console.log(`  Media records created: ${created}`);
    console.log(`  Duplicates skipped: ${duplicateCount}`);
    if (errors > 0) {
      console.log(`  Errors: ${errors}`);
    }
    console.log();

    // Verify
    const [finalCount] = await sequelize.query('SELECT COUNT(*) as count FROM media');
    console.log(`  Total media records in database: ${finalCount[0].count}`);
    console.log('\n✓ Media population completed!');

  } catch (error) {
    console.error('✗ Error:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

populateMediaFromUploads();

