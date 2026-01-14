require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { sequelize } = require("./models");
const status = require("./helpers/response");

const app = express();

// CORS Configuration
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} from origin: ${req.headers.origin || 'no-origin'}`);

  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Pragma');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200
}));

// Middleware - increased limits for large file uploads (200MB)
app.use(express.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

// Routes
// Authentication routes (public)
app.use("/api/v1/auth", require("./routes/auth"));

// User management routes (requires authentication)
app.use("/api/v1/users", require("./routes/users"));

// Media gallery routes (requires authentication)
app.use("/api/v1/media", require("./routes/media"));

// Home page sections routes
app.use("/api/v1", require("./routes/homeSections"));

// Content routes
app.use("/api/v1/awards", require("./routes/awards"));
app.use("/api/v1/leaders", require("./routes/leaders"));
app.use("/api/v1/clients", require("./routes/clients"));
app.use("/api/v1/specialties", require("./routes/specialties"));
app.use("/api/v1/testimonials", require("./routes/testimonials"));

// Page routes
app.use("/api/v1/about", require("./routes/about"));
app.use("/api/v1/navigation", require("./routes/navigation"));
app.use("/api/v1/footer", require("./routes/footer"));
app.use("/api/v1/contact-info", require("./routes/contactInfo"));
app.use("/api/v1/global-settings", require("./routes/globalSettings"));
app.use("/api/v1/social-links", require("./routes/socialLinks"));
app.use("/api/v1/careers", require("./routes/careers"));
app.use("/api/v1/investor-relations", require("./routes/investorRelations"));
app.use("/api/v1/our-presence", require("./routes/ourPresence"));
app.use("/api/v1/our-products", require("./routes/ourProducts"));
app.use("/api/v1/production-facility", require("./routes/productionFacility"));
app.use("/api/v1/quality-assurance", require("./routes/qualityAssurance"));
app.use("/api/v1/contact-us", require("./routes/contactUs"));
app.use("/api/v1/reusable-contact-section", require("./routes/reusableContact"));
app.use("/api/v1/request-demo", require("./routes/requestDemo"));
app.use("/api/v1/terms-privacy", require("./routes/termsAndPrivacy"));
app.use("/api/v1/faqs", require("./routes/faqs"));

// Form submission routes
app.use("/api/v1/contact-submissions", require("./routes/contactSubmissions"));
app.use("/api/v1/demo-requests", require("./routes/demoRequests"));

// Product routes (7 products)
app.use("/api/v1/products/hf-mobile", require("./routes/products/hfMobile"));
app.use("/api/v1/products/hf-fixed", require("./routes/products/hfFixed"));
app.use("/api/v1/products/fpd-c-arm", require("./routes/products/fpdCArm"));
app.use("/api/v1/products/hf-c-arm-1k", require("./routes/products/hfCArm1k"));
app.use("/api/v1/products/line-frequency", require("./routes/products/lineFrequency"));
app.use("/api/v1/products/digital-radiography", require("./routes/products/digitalRadiography"));
app.use("/api/v1/products/dream-series", require("./routes/products/dreamSeries"));

// Image upload endpoint
const uploadImage = require('./middlewares/uploadImage');
const uploadDocument = require('./middlewares/uploadDocument');
const multer = require('multer');

app.post('/api/v1/upload/image', uploadImage.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Build year/month path structure: /uploads/YYYY/MM/filename
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    
    const imageUrl = `/uploads/${year}/${month}/${req.file.filename}`;
    const localPath = path.join(__dirname, 'uploads', year, month, req.file.filename);

    // Create Media record
    try {
      const { Media } = require('./models');
      const ext = path.extname(req.file.originalname || req.file.filename).toLowerCase();
      let fileType = 'image';
      if (['.pdf', '.doc', '.docx'].includes(ext)) {
        fileType = 'document';
      } else if (ext === '.svg') {
        fileType = 'svg';
      }

      const media = await Media.create({
        fileName: req.file.originalname || req.file.filename,
        filePath: imageUrl,
        fileType: fileType,
        mimeType: req.file.mimetype,
        fileSize: req.file.size,
        altText: req.body.altText || req.file.originalname?.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || '',
        pageName: null,
        sectionName: null
      });

      res.json({
        success: true,
        imageUrl: imageUrl,
        filename: req.file.filename,
        localPath: localPath,
        mediaId: media.id,
        media: media
      });
    } catch (mediaError) {
      console.warn('Media record creation failed:', mediaError);
      res.json({
        success: true,
        imageUrl: imageUrl,
        filename: req.file.filename,
        localPath: localPath,
        warning: 'Media record not created'
      });
    }
  } catch (error) {
    console.error('Image upload error:', error);
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size exceeds 200MB limit' });
      }
      return res.status(400).json({ error: error.message || 'File upload error' });
    }
    const errorMessage = error.message || 'Failed to upload image';
    res.status(500).json({ error: errorMessage });
  }
});

// Document upload endpoint
app.post('/api/v1/upload/file', uploadDocument.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No document file provided' });
    }

    // Build year/month path structure: /uploads/YYYY/MM/filename
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    
    const fileUrl = `/uploads/${year}/${month}/${req.file.filename}`;
    const localPath = path.join(__dirname, 'uploads', year, month, req.file.filename);

    // Create Media record
    try {
      const { Media } = require('./models');
      const media = await Media.create({
        fileName: req.file.originalname || req.file.filename,
        filePath: fileUrl,
        fileType: 'document',
        mimeType: req.file.mimetype,
        fileSize: req.file.size,
        altText: req.body.altText || req.file.originalname?.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || '',
        pageName: null,
        sectionName: null
      });

      res.json({
        success: true,
        fileUrl: fileUrl,
        filename: req.file.filename,
        localPath: localPath,
        mediaId: media.id,
        media: media
      });
    } catch (mediaError) {
      console.warn('Media record creation failed:', mediaError);
      res.json({
        success: true,
        fileUrl: fileUrl,
        filename: req.file.filename,
        localPath: localPath,
        warning: 'Media record not created'
      });
    }
  } catch (error) {
    console.error('Document upload error:', error);
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size exceeds 200MB limit' });
      }
      return res.status(400).json({ error: error.message || 'File upload error' });
    }
    const errorMessage = error.message || 'Failed to upload document';
    res.status(500).json({ error: errorMessage });
  }
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '1d',
  etag: true,
  lastModified: true
}));

// Health check
app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    message: "Adonis Medical Server is running",
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.all("/api/v1/*", (req, res) => {
  return status.responseStatus(res, 404, "Endpoint Not Found");
});

// Start server
const PORT = process.env.PORT || 3002;

console.log("Starting database connection...");

// Check if sync should be disabled (for production with imported database)
const SKIP_SYNC = process.env.SKIP_DB_SYNC === 'true' || process.env.NODE_ENV === 'production';

if (SKIP_SYNC) {
  console.log("Database sync skipped (SKIP_DB_SYNC=true or NODE_ENV=production). Using existing database schema.");
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection established.");
      startServer();
    })
    .catch((err) => {
      console.error("Database connection failed:", err);
      process.exit(1);
    });
} else {
  // Check if tables already exist
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection established.");
      return sequelize.getQueryInterface().showAllTables();
    })
    .then((tables) => {
      const hasMediaTable = tables.some(table => 
        table.toLowerCase() === 'media' || table === 'Media' || table === 'media'
      );
      
      if (hasMediaTable && tables.length > 0) {
        console.log(`Database already has ${tables.length} tables. Skipping sync (using existing schema).`);
        return Promise.resolve();
      } else {
        console.log("No existing tables found. Running sync to create tables...");
        return sequelize.sync({ force: false, alter: false });
      }
    })
    .then(() => {
      console.log("Database ready.");
      startServer();
    })
    .catch((err) => {
      console.error("Error syncing database:", err);
      console.log("Attempting to start server anyway (tables may already exist)...");
      startServer();
    });
}

// Helper function to start the server
function startServer() {
  app.listen(PORT, () => {
    console.log(`✓ Adonis Medical Server is running on port ${PORT}`);
    console.log(`✓ API URL: http://localhost:${PORT}/api/v1`);
    console.log(`✓ Health Check: http://localhost:${PORT}/api/v1/health`);
  });
}

