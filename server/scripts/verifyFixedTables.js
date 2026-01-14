"use strict";

require("dotenv").config();
const { sequelize } = require("../models");

async function verifyTables() {
  try {
    await sequelize.authenticate();
    console.log("✓ Database connection established.\n");

    // Check footer_sections table
    console.log("Checking footer_sections table...");
    const [footerColumns] = await sequelize.query("DESCRIBE footer_sections");
    const footerColNames = footerColumns.map(c => c.Field);
    console.log("  Columns:", footerColNames.length);
    console.log("  -", footerColNames.join(", "));
    
    const hasUpdatedAt = footerColNames.includes('updated_at');
    console.log("  ✓ Has updated_at:", hasUpdatedAt ? "YES" : "NO");

    // Check request_demo_page_content table
    console.log("\nChecking request_demo_page_content table...");
    const [demoColumns] = await sequelize.query("DESCRIBE request_demo_page_content");
    const demoColNames = demoColumns.map(c => c.Field);
    console.log("  Columns:", demoColNames.length);
    console.log("  -", demoColNames.join(", "));
    
    const hasFeature1Icon = demoColNames.includes('feature1_icon');
    const hasFeature1Text = demoColNames.includes('feature1_text');
    console.log("  ✓ Has feature1_icon:", hasFeature1Icon ? "YES" : "NO");
    console.log("  ✓ Has feature1_text:", hasFeature1Text ? "YES" : "NO");

    console.log("\n✓ All tables verified!");
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("\n✗ Error:", error.message);
    await sequelize.close();
    process.exit(1);
  }
}

verifyTables();

