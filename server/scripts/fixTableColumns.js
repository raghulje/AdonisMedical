"use strict";

require("dotenv").config();
const { sequelize } = require("../models");

async function fixTableColumns() {
  try {
    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("✓ Database connection established.\n");

    // Fix footer_sections table - add updated_at column
    console.log("Fixing footer_sections table...");
    try {
      await sequelize.query(`
        ALTER TABLE footer_sections 
        ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
        AFTER created_at
      `, { raw: true });
      console.log("✓ Added updated_at column to footer_sections");
    } catch (error) {
      if (error.message.includes("Duplicate column") || error.message.includes("already exists")) {
        console.log("  ⚠ updated_at column already exists (skipping)");
      } else {
        throw error;
      }
    }

    // Fix request_demo_page_content table - rename feature columns
    console.log("\nFixing request_demo_page_content table...");
    try {
      // Check which columns exist first
      const [columns] = await sequelize.query(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = 'adonis_production' 
        AND TABLE_NAME = 'request_demo_page_content'
        AND COLUMN_NAME LIKE 'feature%'
      `, { raw: true });

      const columnNames = columns.map(c => c.COLUMN_NAME);

      // Rename columns if they exist in the old format
      if (columnNames.includes('feature_1_icon')) {
        await sequelize.query(`
          ALTER TABLE request_demo_page_content
          CHANGE COLUMN feature_1_icon feature1_icon VARCHAR(100),
          CHANGE COLUMN feature_1_text feature1_text VARCHAR(255),
          CHANGE COLUMN feature_2_icon feature2_icon VARCHAR(100),
          CHANGE COLUMN feature_2_text feature2_text VARCHAR(255),
          CHANGE COLUMN feature_3_icon feature3_icon VARCHAR(100),
          CHANGE COLUMN feature_3_text feature3_text VARCHAR(255)
        `, { raw: true });
        console.log("✓ Renamed feature columns in request_demo_page_content");
      } else if (columnNames.includes('feature1_icon')) {
        console.log("  ⚠ Columns already in correct format (skipping)");
      } else {
        // Columns don't exist, create them
        await sequelize.query(`
          ALTER TABLE request_demo_page_content
          ADD COLUMN feature1_icon VARCHAR(100) AFTER intro_text,
          ADD COLUMN feature1_text VARCHAR(255) AFTER feature1_icon,
          ADD COLUMN feature2_icon VARCHAR(100) AFTER feature1_text,
          ADD COLUMN feature2_text VARCHAR(255) AFTER feature2_icon,
          ADD COLUMN feature3_icon VARCHAR(100) AFTER feature2_text,
          ADD COLUMN feature3_text VARCHAR(255) AFTER feature3_icon
        `, { raw: true });
        console.log("✓ Added feature columns to request_demo_page_content");
      }
    } catch (error) {
      if (error.message.includes("Duplicate column") || error.message.includes("already exists")) {
        console.log("  ⚠ Columns already exist (skipping)");
      } else {
        console.error("  ⚠ Error fixing request_demo_page_content:", error.message);
      }
    }

    console.log("\n✓ Table fixes completed!");
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("\n✗ Error:", error.message);
    console.error(error);
    await sequelize.close();
    process.exit(1);
  }
}

fixTableColumns();

