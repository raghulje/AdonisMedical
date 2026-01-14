"use strict";

require("dotenv").config();
const { sequelize } = require("../models");
const fs = require("fs");
const path = require("path");

async function runMigrations() {
  try {
    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("✓ Database connection established.");

    // Read migration files
    const migrationsPath = path.join(__dirname, "../../database/migrations");
    const migrationFiles = [
      "001_create_contact_submissions_table.sql",
      "002_create_demo_requests_table.sql"
    ];

    for (const file of migrationFiles) {
      const filePath = path.join(migrationsPath, file);
      if (!fs.existsSync(filePath)) {
        console.log(`⚠ Skipping ${file} (file not found)`);
        continue;
      }

      console.log(`\nRunning migration: ${file}...`);
      const sql = fs.readFileSync(filePath, "utf8");
      
      // Execute SQL queries (split by semicolon and execute each)
      const queries = sql
        .split(";")
        .map((q) => q.trim())
        .filter((q) => q && !q.startsWith("--") && !q.startsWith("USE"));

      for (const query of queries) {
        if (query) {
          try {
            await sequelize.query(query, { raw: true });
          } catch (error) {
            // Ignore "table already exists" errors
            if (error.message.includes("already exists") || error.message.includes("Duplicate")) {
              console.log(`  ⚠ Table already exists (skipping)`);
            } else {
              throw error;
            }
          }
        }
      }
      console.log(`✓ ${file} completed`);
    }

    // Verify tables were created
    console.log("\nVerifying tables...");
    
    const tableNames = await sequelize.getQueryInterface().showAllTables();
    const hasContactSubmissions = tableNames.some(t => t.toLowerCase() === "contact_submissions");
    const hasDemoRequests = tableNames.some(t => t.toLowerCase() === "demo_requests");

    if (hasContactSubmissions) {
      console.log("✓ contact_submissions table exists");
    } else {
      console.log("✗ contact_submissions table not found");
    }

    if (hasDemoRequests) {
      console.log("✓ demo_requests table exists");
    } else {
      console.log("✗ demo_requests table not found");
    }

    console.log("\n✓ Migrations completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\n✗ Migration error:", error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run migrations
runMigrations();

