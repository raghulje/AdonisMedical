# ⚡ Adonis Medical - Quick Start Commands

## 🚀 **Setup in 5 Steps (5 minutes)**

### **1. Create Database**
```bash
mysql -u root -p < database/adonis_production_setup.sql
```
Enter your MySQL password when prompted.

### **2. Install Dependencies**
```bash
cd server
npm install
```

### **3. Configure Database**
Edit `server/config/config.json`:
```json
{
  "development": {
    "username": "root",
    "password": "YOUR_PASSWORD_HERE",
    "database": "adonis_production",
    "host": "localhost"
  }
}
```

### **4. Start Server**
```bash
npm run dev
```

### **5. Test It**
Open browser: http://localhost:3002/api/v1/health

✅ **Done! Server is running.**

---

## 📝 **Common Commands**

### **Server Commands**
```bash
# Start development server (with auto-reload)
npm run dev

# Start production server
npm start

# Stop server
Ctrl + C
```

### **Database Commands**
```bash
# Login to MySQL
mysql -u root -p

# Use database
USE adonis_production;

# Show all tables
SHOW TABLES;

# Show table structure
DESCRIBE users;

# Exit MySQL
EXIT;
```

### **API Testing**

#### **Register Admin User**
```bash
curl -X POST http://localhost:3002/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@adonismedical.com","password":"Admin@123","fullName":"Admin User","role":"super_admin"}'
```

#### **Login**
```bash
curl -X POST http://localhost:3002/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@adonismedical.com","password":"Admin@123"}'
```

#### **Get Home Hero Section**
```bash
curl http://localhost:3002/api/v1/home-hero-section
```

#### **Update Home Hero Section**
```bash
curl -X PUT http://localhost:3002/api/v1/home-hero-section \
  -H "Content-Type: application/json" \
  -d '{"title":"New Title","subtitle":"New Subtitle"}'
```

#### **Upload Image**
```bash
curl -X POST http://localhost:3002/api/v1/upload/image \
  -F "image=@/path/to/your/image.jpg" \
  -F "altText=Image description"
```

---

## 📁 **Project Structure**

```
D:\Adonis_Antigravity\
├── client/           # React frontend
├── server/           # Node.js backend ⭐ NEW
├── database/         # SQL schema
└── reference_server/ # Reference code
```

---

## 🛠️ **What's Built**

### ✅ **Complete:**
- ✅ Database (85+ tables)
- ✅ Server infrastructure
- ✅ Authentication (JWT)
- ✅ File uploads
- ✅ Home page API
- ✅ Core models

### 🚧 **To Build:**
- 🚧 Remaining page models
- 🚧 Product page APIs
- 🚧 Frontend API integration
- 🚧 Admin CMS functionality

---

## 📚 **Documentation**

- **Detailed Setup:** `SETUP_GUIDE.md`
- **Server Docs:** `server/README.md`
- **Database Schema:** `database/adonis_production_setup.sql`

---

## 🐛 **Quick Fixes**

### **Port in use:**
```bash
# Change port in server/.env
PORT=3003
```

### **Database connection failed:**
```bash
# Check MySQL is running
mysql -u root -p

# Verify credentials in config/config.json
```

### **Model not found:**
```bash
# Restart server after adding models
Ctrl + C
npm run dev
```

---

## 🎯 **Next Steps**

1. **Test the server** - Try the API commands above
2. **Create remaining models** - Follow examples in `server/README.md`
3. **Build controllers** - Copy pattern from `homeSectionsController.js`
4. **Connect frontend** - Update React to fetch from API

---

## 🆘 **Need Help?**

- Check `SETUP_GUIDE.md` for detailed instructions
- See `server/README.md` for model/controller examples
- Look at `reference_server/` for working examples
- Check database schema in `database/adonis_production_setup.sql`

---

**🎉 You're all set! Start building!**

