# Database Migrations

This directory contains SQL migration files for creating and updating database tables.

## 📋 Available Migrations

### 001_create_contact_submissions_table.sql
Creates the `contact_submissions` table for storing contact form submissions.

**Table Structure:**
- Stores submissions from Contact Us and About pages
- Tracks: name, email, mobile, message, source, IP address, user agent
- Status: 'new', 'read', 'replied', 'archived'
- Includes indexes for efficient querying

### 002_create_demo_requests_table.sql
Creates the `demo_requests` table for storing demo request submissions.

**Table Structure:**
- Stores submissions from Request Demo page
- Tracks: name, hospital name, email, mobile, product, preferred date, message
- Status: 'pending', 'scheduled', 'completed', 'cancelled'
- Includes indexes for efficient querying

## 🚀 How to Run Migrations

### Option 1: Run All Migrations (Recommended)

```bash
cd database/migrations
mysql -u root -p adonis_production < run_all_migrations.sql
```

### Option 2: Run Individual Migrations

```bash
# Run contact submissions migration
mysql -u root -p adonis_production < database/migrations/001_create_contact_submissions_table.sql

# Run demo requests migration
mysql -u root -p adonis_production < database/migrations/002_create_demo_requests_table.sql
```

### Option 3: Via MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Select the `adonis_production` database
4. File → Run SQL Script
5. Select the migration file(s) you want to run
6. Click "Run"

### Option 4: Via MySQL Command Line

```bash
mysql -u root -p
USE adonis_production;
SOURCE database/migrations/001_create_contact_submissions_table.sql;
SOURCE database/migrations/002_create_demo_requests_table.sql;
EXIT;
```

## ✅ Verify Migrations

After running migrations, verify the tables were created:

```sql
USE adonis_production;

-- Check if tables exist
SHOW TABLES LIKE 'contact_submissions';
SHOW TABLES LIKE 'demo_requests';

-- Check table structure
DESCRIBE contact_submissions;
DESCRIBE demo_requests;

-- Check indexes
SHOW INDEXES FROM contact_submissions;
SHOW INDEXES FROM demo_requests;
```

## 📊 Table Details

### contact_submissions

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key (auto-increment) |
| name | VARCHAR(255) | Submitter's name |
| email | VARCHAR(255) | Submitter's email |
| mobile | VARCHAR(50) | Submitter's mobile number |
| message | TEXT | Optional message |
| source | VARCHAR(100) | Source page (contact-us, about) |
| ip_address | VARCHAR(45) | Client IP address |
| user_agent | TEXT | Client user agent |
| status | ENUM | Submission status |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes:**
- `idx_email` - For searching by email
- `idx_status` - For filtering by status
- `idx_source` - For filtering by source page
- `idx_created_at` - For sorting by date

### demo_requests

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key (auto-increment) |
| name | VARCHAR(255) | Requester's name |
| hospital_name | VARCHAR(255) | Hospital/clinic name |
| email | VARCHAR(255) | Requester's email |
| mobile | VARCHAR(50) | Requester's mobile number |
| product | VARCHAR(255) | Product of interest |
| preferred_date | DATE | Preferred demo date |
| message | TEXT | Optional message |
| ip_address | VARCHAR(45) | Client IP address |
| user_agent | TEXT | Client user agent |
| status | ENUM | Request status |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes:**
- `idx_email` - For searching by email
- `idx_status` - For filtering by status
- `idx_product` - For filtering by product
- `idx_preferred_date` - For filtering by date
- `idx_created_at` - For sorting by date

## 🔄 Migration Status

- ✅ Migration 001: contact_submissions table
- ✅ Migration 002: demo_requests table

## 📝 Notes

- All migrations use `CREATE TABLE IF NOT EXISTS` to avoid errors if tables already exist
- All tables use InnoDB engine for better performance and foreign key support
- Character set is utf8mb4 for full Unicode support
- Timestamps are automatically managed by MySQL
- Indexes are optimized for common query patterns

## 🆘 Troubleshooting

If you encounter errors:

1. **Table already exists**: The migrations use `IF NOT EXISTS` so this should not be an issue. If it is, you can drop the table first:
   ```sql
   DROP TABLE IF EXISTS contact_submissions;
   DROP TABLE IF EXISTS demo_requests;
   ```

2. **Database doesn't exist**: Make sure you've created the `adonis_production` database first:
   ```sql
   CREATE DATABASE IF NOT EXISTS adonis_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Permission errors**: Make sure your MySQL user has CREATE privileges:
   ```sql
   GRANT ALL PRIVILEGES ON adonis_production.* TO 'your_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

