"use strict";

require("dotenv").config();
const { sequelize } = require("../models");

async function verifyTables() {
  try {
    await sequelize.authenticate();
    console.log("✓ Database connection established.\n");

    // Check contact_submissions table
    console.log("Checking contact_submissions table...");
    const [contactColumns] = await sequelize.query("DESCRIBE contact_submissions");
    console.log("  Columns:", contactColumns.length);
    console.log("  -", contactColumns.map(c => c.Field).join(", "));
    
    // Check demo_requests table
    console.log("\nChecking demo_requests table...");
    const [demoColumns] = await sequelize.query("DESCRIBE demo_requests");
    console.log("  Columns:", demoColumns.length);
    console.log("  -", demoColumns.map(c => c.Field).join(", "));

    // Check indexes
    console.log("\nChecking indexes...");
    const [contactIndexes] = await sequelize.query("SHOW INDEXES FROM contact_submissions");
    console.log("  contact_submissions indexes:", contactIndexes.length);
    
    const [demoIndexes] = await sequelize.query("SHOW INDEXES FROM demo_requests");
    console.log("  demo_requests indexes:", demoIndexes.length);

    console.log("\n✓ All tables verified successfully!");
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("\n✗ Error:", error.message);
    await sequelize.close();
    process.exit(1);
  }
}

verifyTables();

