# Adonis Medical Systems - Backend Server

Complete Node.js/Express backend with MySQL database for Adonis Medical CMS.

## 📦 **What's Included**

### ✅ **Completed Structure:**
- ✅ Database schema (85+ tables) for independent page management
- ✅ Sequelize ORM models architecture
- ✅ JWT authentication & authorization
- ✅ File upload system (images & documents)
- ✅ Core models: User, Media, ActivityLog, LoginHistory
- ✅ Home page models: Hero, About, Stats, Quality sections
- ✅ About page model
- ✅ Auth controller & routes (register, login)
- ✅ Home sections controller & routes
- ✅ Response helpers
- ✅ Middleware: auth, uploadImage, uploadDocument
- ✅ Main server file with CORS, file serving, health check

### 🚧 **To Be Created:**
You need to create models, controllers, and routes for:
- Awards, Careers, Investor Relations, Specialties, Management, Clients, Our Presence, Production Facility, Quality Assurance, Contact, Request Demo pages
- All 7 product pages (HF Mobile, HF Fixed, FPD C-Arm, etc.)
- Testimonials, Navigation, Footer, Contact Info, Form Submissions
- Global Settings, Email Settings

## 🚀 **Quick Setup**

### **1. Install Dependencies**
```bash
cd server
npm install
```

### **2. Configure Database**
Edit `config/config.json`:
```json
{
  "development": {
    "username": "root",
    "password": "YOUR_MYSQL_PASSWORD",
    "database": "adonis_production",
    "host": "localhost",
    "port": 3306,
    "dialect": "mysql"
  }
}
```

### **3. Create Database**
Run the SQL setup file in MySQL:
```bash
mysql -u root -p < ../database/adonis_production_setup.sql
```

Or import via MySQL Workbench:
- Open MySQL Workbench
- File → Run SQL Script
- Select `database/adonis_production_setup.sql`

### **4. Create .env File**
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=3002
DB_HOST=localhost
DB_PORT=3306
DB_NAME=adonis_production
DB_USER=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=your-secret-key-change-in-production
CLIENT_URL=http://localhost:3000
```

### **5. Start Server**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on: `http://localhost:3002`

## 📋 **Creating Additional Models**

All models follow the same pattern. Example for creating a product page model:

### **Example: HF Mobile Product Page Model**

Create `models/hf_mobile_page_content.js`:

```javascript
"use strict";

module.exports = (sequelize, DataTypes) => {
  const HfMobilePageContent = sequelize.define(
    "HfMobilePageContent",
    {
      title: { type: DataTypes.STRING(255), allowNull: true },
      mainImageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'media', key: 'id' }
      },
      deploymentInfo: { type: DataTypes.STRING(255), allowNull: true },
      shortDescription: { type: DataTypes.TEXT, allowNull: true },
      fullDescription: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "hf_mobile_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  HfMobilePageContent.associate = function (models) {
    HfMobilePageContent.belongsTo(models.Media, { 
      foreignKey: 'mainImageId', 
      as: 'mainImage' 
    });
  };

  return HfMobilePageContent;
};
```

### **Create related models:**

`models/hf_mobile_features.js`:
```javascript
"use strict";

module.exports = (sequelize, DataTypes) => {
  const HfMobileFeatures = sequelize.define(
    "HfMobileFeatures",
    {
      featureText: { type: DataTypes.TEXT, allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "hf_mobile_features",
      underscored: true,
      timestamps: true,
    }
  );

  return HfMobileFeatures;
};
```

## 📋 **Creating Controllers**

Create `controllers/hfMobileController.js`:

```javascript
const { HfMobilePageContent, HfMobileFeatures, HfMobileVariants, Media } = require('../models');
const status = require('../helpers/response');

// Get HF Mobile Page Content
exports.getPageContent = async (req, res) => {
  try {
    const content = await HfMobilePageContent.findOne({
      where: { id: 1 },
      include: [{ model: Media, as: 'mainImage' }]
    });
    if (!content) {
      return status.notFoundResponse(res, "HF Mobile page content not found");
    }
    return status.successResponse(res, "Retrieved", content);
  } catch (error) {
    console.error('Get HF Mobile Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Update HF Mobile Page Content
exports.updatePageContent = async (req, res) => {
  try {
    const content = await HfMobilePageContent.findOne({ where: { id: 1 } });
    if (!content) {
      return status.notFoundResponse(res, "HF Mobile page content not found");
    }
    await content.update(req.body);
    const updated = await HfMobilePageContent.findOne({
      where: { id: 1 },
      include: [{ model: Media, as: 'mainImage' }]
    });
    return status.successResponse(res, "Updated", updated);
  } catch (error) {
    console.error('Update HF Mobile Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Get Features
exports.getFeatures = async (req, res) => {
  try {
    const features = await HfMobileFeatures.findAll({ 
      order: [['orderIndex', 'ASC']] 
    });
    return status.successResponse(res, "Retrieved", features);
  } catch (error) {
    console.error('Get Features Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Create Feature
exports.createFeature = async (req, res) => {
  try {
    const feature = await HfMobileFeatures.create(req.body);
    return status.createdResponse(res, "Feature created", feature);
  } catch (error) {
    console.error('Create Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Update Feature
exports.updateFeature = async (req, res) => {
  try {
    const feature = await HfMobileFeatures.findByPk(req.params.id);
    if (!feature) {
      return status.notFoundResponse(res, "Feature not found");
    }
    await feature.update(req.body);
    return status.successResponse(res, "Feature updated", feature);
  } catch (error) {
    console.error('Update Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Delete Feature
exports.deleteFeature = async (req, res) => {
  try {
    const feature = await HfMobileFeatures.findByPk(req.params.id);
    if (!feature) {
      return status.notFoundResponse(res, "Feature not found");
    }
    await feature.destroy();
    return status.successResponse(res, "Feature deleted");
  } catch (error) {
    console.error('Delete Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};
```

## 📋 **Creating Routes**

Create `routes/hfMobile.js`:

```javascript
const express = require('express');
const router = express.Router();
const controller = require('../controllers/hfMobileController');

// Page content
router.get('/hf-mobile', controller.getPageContent);
router.put('/hf-mobile', controller.updatePageContent);

// Features
router.get('/hf-mobile/features', controller.getFeatures);
router.post('/hf-mobile/features', controller.createFeature);
router.put('/hf-mobile/features/:id', controller.updateFeature);
router.delete('/hf-mobile/features/:id', controller.deleteFeature);

module.exports = router;
```

Then add to `index.js`:
```javascript
app.use("/api/v1", require("./routes/hfMobile"));
```

## 🔐 **Authentication**

### **Register a User**
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@adonismedical.com",
  "password": "SecurePassword123",
  "fullName": "Admin User",
  "role": "super_admin"
}
```

### **Login**
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@adonismedical.com",
  "password": "SecurePassword123"
}
```

Response includes JWT token:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### **Protected Routes**
Use token in Authorization header:
```bash
GET /api/v1/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📦 **File Uploads**

### **Upload Image**
```bash
POST /api/v1/upload/image
Content-Type: multipart/form-data

Form data:
- image: (file)
- altText: (optional string)
```

Response:
```json
{
  "success": true,
  "imageUrl": "/uploads/images/general/general/uuid.jpg",
  "mediaId": 1,
  "media": { ... }
}
```

### **Upload Document**
```bash
POST /api/v1/upload/file
Content-Type: multipart/form-data

Form data:
- file: (document file)
- altText: (optional string)
```

## 🗄️ **Database Schema Overview**

### **Core Tables:**
- `users` - CMS admin users
- `media` - File library
- `activity_logs` - User activity tracking
- `login_history` - Login audit trail

### **Global Tables:**
- `global_settings` - Site-wide settings
- `navigation_items` - Header navigation (with parent-child)
- `footer_sections` & `footer_links` - Footer organization
- `social_links` - Social media links
- `contact_info` - Company contact details

### **Home Page Tables:**
- `home_hero_section`
- `home_about_section`
- `home_stats`
- `home_quality_section`
- `home_products_section`

### **Other Page Tables (each independent):**
- `about_page_content` & `about_page_highlights`
- `awards_page_content` & `awards`
- `careers_page_content` & `jobs`
- `investor_relations_page_content` & `investor_documents`
- `specialties_page_content` & `specialties`
- `management_page_content` & `leaders`
- `clients_page_content` & `clients`
- `our_presence_page_content` & `office_locations`
- `production_facility_page_content` & `production_facility_features`
- `quality_assurance_page_content` & `certifications`
- `contact_us_page_content`
- `request_demo_page_content`

### **Product Page Tables (7 independent product pages):**
Each product has 4 tables:
1. `{product}_page_content` - Main content
2. `{product}_images` - Image gallery
3. `{product}_features` - Feature list
4. `{product}_variants` - Product variants

Products:
- HF Mobile
- HF Fixed
- FPD C-Arm
- HF C-ARM 1K
- Line Frequency
- Digital Radiography
- Dream Series

### **Shared Content Tables:**
- `testimonials` - Customer testimonials

### **Form Submissions:**
- `form_submissions_contact`
- `form_submissions_demo`

## 📝 **API Endpoints**

### **Authentication**
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user profile

### **Home Sections**
- `GET /api/v1/home-hero-section` - Get hero section
- `PUT /api/v1/home-hero-section` - Update hero section
- `GET /api/v1/home-about-section` - Get about section
- `PUT /api/v1/home-about-section` - Update about section
- `GET /api/v1/home-stats` - Get stats list
- `POST /api/v1/home-stats` - Create stat
- `PUT /api/v1/home-stats/:id` - Update stat
- `DELETE /api/v1/home-stats/:id` - Delete stat
- `GET /api/v1/home-quality-section` - Get quality section
- `PUT /api/v1/home-quality-section` - Update quality section

### **Uploads**
- `POST /api/v1/upload/image` - Upload image
- `POST /api/v1/upload/file` - Upload document

### **System**
- `GET /api/v1/health` - Health check

## 🏗️ **Project Structure**

```
server/
├── config/
│   └── config.json          # Database configuration
├── controllers/
│   ├── authController.js    # Auth logic
│   └── homeSectionsController.js
├── helpers/
│   └── response.js          # Standard API responses
├── middlewares/
│   ├── auth.js              # JWT authentication
│   ├── uploadImage.js       # Image upload handler
│   └── uploadDocument.js    # Document upload handler
├── models/
│   ├── index.js             # Sequelize auto-loader
│   ├── user.js
│   ├── media.js
│   ├── home_hero_section.js
│   └── ... (create more as needed)
├── routes/
│   ├── auth.js
│   └── homeSections.js
├── services/
│   └── (email service, etc.)
├── utils/
│   ├── jwt.js               # JWT utilities
│   └── password.js          # Password hashing
├── uploads/
│   ├── images/
│   └── documents/
├── .env.example
├── .gitignore
├── package.json
├── index.js                 # Main server file
└── README.md
```

## 🎯 **Next Steps**

1. ✅ Database is set up
2. ✅ Core server structure complete
3. 🚧 Create remaining models (follow examples above)
4. 🚧 Create controllers for each page/feature
5. 🚧 Create routes for all endpoints
6. 🚧 Connect React client to API
7. 🚧 Build CMS UI in admin dashboard

## 📚 **Resources**

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize ORM Documentation](https://sequelize.org/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT Documentation](https://jwt.io/)

## 🐛 **Troubleshooting**

### Database Connection Issues
- Verify MySQL is running: `mysql -u root -p`
- Check credentials in `config/config.json`
- Ensure `adonis_production` database exists

### Port Already in Use
- Change PORT in `.env` file
- Kill existing process: `lsof -i :3002` (Mac/Linux) or `netstat -ano | findstr :3002` (Windows)

### Model Not Found Errors
- Ensure model files are in `models/` directory
- Check model name matches the table name
- Restart server after adding new models

---

**Created by:** Adonis Medical Systems Development Team
**Last Updated:** January 2026

