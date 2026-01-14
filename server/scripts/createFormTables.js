"use strict";

require("dotenv").config();
const { sequelize, ContactSubmission, DemoRequest } = require("../models");

async function createTables() {
  try {
    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("✓ Database connection established.\n");

    // Check if tables already exist
    const tableNames = await sequelize.getQueryInterface().showAllTables();
    const hasContactSubmissions = tableNames.some(t => t.toLowerCase() === "contact_submissions");
    const hasDemoRequests = tableNames.some(t => t.toLowerCase() === "demo_requests");

    if (hasContactSubmissions && hasDemoRequests) {
      console.log("✓ Both tables already exist!");
      console.log("  - contact_submissions");
      console.log("  - demo_requests");
      process.exit(0);
    }

    console.log("Creating tables using Sequelize sync...\n");

    // Create contact_submissions table
    if (!hasContactSubmissions) {
      console.log("Creating contact_submissions table...");
      await ContactSubmission.sync({ alter: false, force: false });
      console.log("✓ contact_submissions table created");
    } else {
      console.log("✓ contact_submissions table already exists");
    }

    // Create demo_requests table
    if (!hasDemoRequests) {
      console.log("Creating demo_requests table...");
      await DemoRequest.sync({ alter: false, force: false });
      console.log("✓ demo_requests table created");
    } else {
      console.log("✓ demo_requests table already exists");
    }

    // Verify tables
    console.log("\nVerifying tables...");
    const finalTableNames = await sequelize.getQueryInterface().showAllTables();
    const finalHasContactSubmissions = finalTableNames.some(t => t.toLowerCase() === "contact_submissions");
    const finalHasDemoRequests = finalTableNames.some(t => t.toLowerCase() === "demo_requests");

    if (finalHasContactSubmissions) {
      console.log("✓ contact_submissions table verified");
    } else {
      console.log("✗ contact_submissions table not found");
    }

    if (finalHasDemoRequests) {
      console.log("✓ demo_requests table verified");
    } else {
      console.log("✗ demo_requests table not found");
    }

    if (finalHasContactSubmissions && finalHasDemoRequests) {
      console.log("\n✓ All tables created successfully!");
    } else {
      console.log("\n⚠ Some tables may not have been created");
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("\n✗ Error:", error.message);
    console.error(error);
    await sequelize.close();
    process.exit(1);
  }
}

createTables();

