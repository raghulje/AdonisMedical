# ⚡ Quick Seed Guide - 3 Commands

## 🚀 **Seed Your Database in 3 Steps**

### **Step 1: Navigate to Seeds Directory**
```bash
cd database/seeds
```

### **Step 2: Run Seeds**
```bash
mysql -u raghul -p adonis_production < run_all_seeds.sql
```

### **Step 3: Verify**
```bash
mysql -u raghul -p adonis_production -e "SELECT COUNT(*) as home_stats FROM home_stats; SELECT COUNT(*) as awards FROM awards; SELECT COUNT(*) as leaders FROM leaders;"
```

**Done! ✅**

---

## 📊 **What Got Seeded**

- 19 navigation items
- 15 footer links  
- 4 social links
- 5 specialties
- 2 testimonials
- 4 home stats
- 10 awards
- 4 leaders (with full bios)
- 24 clients
- 5 certifications
- 7 products (59 features + 20 variants)
- All 15 pages content

**Total: ~150+ records** with 100% accurate data! 🎉

---

## 🎯 **Next Steps**

1. ✅ Seeds complete
2. 🚧 Create API endpoints (see `server/README.md`)
3. 🚧 Upload images
4. 🚧 Connect frontend

---

See `SEEDS_COMPLETE.md` for full documentation.

