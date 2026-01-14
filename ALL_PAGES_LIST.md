# 📄 Complete List of All Pages

## 🌐 **Website Pages**

### **1. Home Page**
- **Route:** `/` or `/home`
- **API Endpoints:**
  - `GET /api/v1/home-hero-section`
  - `PUT /api/v1/home-hero-section`
  - `GET /api/v1/home-about-section`
  - `PUT /api/v1/home-about-section`
  - `GET /api/v1/home-stats`
  - `POST /api/v1/home-stats`
  - `PUT /api/v1/home-stats/:id`
  - `DELETE /api/v1/home-stats/:id`
  - `GET /api/v1/home-quality-section`
  - `PUT /api/v1/home-quality-section`
- **Controller:** `homeSectionsController.js`
- **Models:** `HomeHeroSection`, `HomeAboutSection`, `HomeStats`, `HomeQualitySection`

---

### **2. About Page**
- **Route:** `/about`
- **API Endpoints:**
  - `GET /api/v1/about`
  - `PUT /api/v1/about`
- **Controller:** `aboutController.js`
- **Model:** `AboutPageContent`, `AboutPageHighlight`

---

### **3. Awards Page**
- **Route:** `/awards`
- **API Endpoints:**
  - `GET /api/v1/awards`
  - `POST /api/v1/awards`
  - `GET /api/v1/awards/:id`
  - `PUT /api/v1/awards/:id`
  - `DELETE /api/v1/awards/:id`
- **Controller:** `awardsController.js`
- **Models:** `AwardsPageContent`, `Award`

---

### **4. Clients Page**
- **Route:** `/clients`
- **API Endpoints:**
  - `GET /api/v1/clients`
  - `POST /api/v1/clients`
  - `GET /api/v1/clients/:id`
  - `PUT /api/v1/clients/:id`
  - `DELETE /api/v1/clients/:id`
- **Controller:** `clientsController.js`
- **Models:** `ClientsPageContent`, `Client`

---

### **5. Management Page**
- **Route:** `/management`
- **API Endpoints:**
  - `GET /api/v1/leaders`
  - `POST /api/v1/leaders`
  - `GET /api/v1/leaders/:id`
  - `PUT /api/v1/leaders/:id`
  - `DELETE /api/v1/leaders/:id`
- **Controller:** `leadersController.js`
- **Models:** `ManagementPageContent`, `Leader`

---

### **6. Careers Page**
- **Route:** `/careers`
- **API Endpoints:**
  - `GET /api/v1/careers`
  - `PUT /api/v1/careers`
  - `GET /api/v1/careers/jobs`
  - `POST /api/v1/careers/jobs`
  - `PUT /api/v1/careers/jobs/:id`
  - `DELETE /api/v1/careers/jobs/:id`
- **Controller:** `careersController.js`
- **Models:** `CareersPageContent`, `Job`

---

### **7. Investor Relations Page**
- **Route:** `/investor-relations`
- **API Endpoints:**
  - `GET /api/v1/investor-relations`
  - `PUT /api/v1/investor-relations`
  - `GET /api/v1/investor-relations/documents`
  - `POST /api/v1/investor-relations/documents`
  - `PUT /api/v1/investor-relations/documents/:id`
  - `DELETE /api/v1/investor-relations/documents/:id`
- **Controller:** `investorRelationsController.js`
- **Models:** `InvestorRelationsPageContent`, `InvestorDocument`

---

### **8. Specialties Page**
- **Route:** `/specialties`
- **API Endpoints:**
  - `GET /api/v1/specialties`
  - `POST /api/v1/specialties`
  - `GET /api/v1/specialties/:id`
  - `PUT /api/v1/specialties/:id`
  - `DELETE /api/v1/specialties/:id`
- **Controller:** `specialtiesController.js`
- **Models:** `SpecialtiesPageContent`, `Specialty`

---

### **9. Our Presence Page**
- **Route:** `/our-presence`
- **API Endpoints:**
  - `GET /api/v1/our-presence`
  - `PUT /api/v1/our-presence`
  - `GET /api/v1/our-presence/locations`
  - `POST /api/v1/our-presence/locations`
  - `PUT /api/v1/our-presence/locations/:id`
  - `DELETE /api/v1/our-presence/locations/:id`
- **Controller:** `ourPresenceController.js`
- **Models:** `OurPresencePageContent`, `OfficeLocation`

---

### **10. Production Facility Page**
- **Route:** `/production-facility`
- **API Endpoints:**
  - `GET /api/v1/production-facility`
  - `PUT /api/v1/production-facility`
  - `GET /api/v1/production-facility/features`
  - `POST /api/v1/production-facility/features`
  - `PUT /api/v1/production-facility/features/:id`
  - `DELETE /api/v1/production-facility/features/:id`
- **Controller:** `productionFacilityController.js`
- **Models:** `ProductionFacilityPageContent`, `ProductionFacilityFeature`

---

### **11. Quality Assurance Page**
- **Route:** `/quality-assurance`
- **API Endpoints:**
  - `GET /api/v1/quality-assurance`
  - `PUT /api/v1/quality-assurance`
  - `GET /api/v1/quality-assurance/certifications`
  - `POST /api/v1/quality-assurance/certifications`
  - `PUT /api/v1/quality-assurance/certifications/:id`
  - `DELETE /api/v1/quality-assurance/certifications/:id`
- **Controller:** `qualityAssuranceController.js`
- **Models:** `QualityAssurancePageContent`, `Certification`

---

### **12. Contact Us Page**
- **Route:** `/contact-us`
- **API Endpoints:**
  - `GET /api/v1/contact-us`
  - `PUT /api/v1/contact-us`
- **Controller:** `contactUsController.js`
- **Model:** `ContactUsPageContent`

---

### **13. Request Demo Page**
- **Route:** `/request-demo`
- **API Endpoints:**
  - `GET /api/v1/request-demo`
  - `PUT /api/v1/request-demo`
- **Controller:** `requestDemoController.js`
- **Model:** `RequestDemoPageContent`

---

## 🛍️ **Product Pages (7 Independent Products)**

### **14. HF Mobile Product Page**
- **Route:** `/products/hf-mobile`
- **API Endpoints:**
  - `GET /api/v1/products/hf-mobile`
  - `PUT /api/v1/products/hf-mobile`
  - `GET /api/v1/products/hf-mobile/images`
  - `POST /api/v1/products/hf-mobile/images`
  - `PUT /api/v1/products/hf-mobile/images/:id`
  - `DELETE /api/v1/products/hf-mobile/images/:id`
  - `GET /api/v1/products/hf-mobile/features`
  - `POST /api/v1/products/hf-mobile/features`
  - `PUT /api/v1/products/hf-mobile/features/:id`
  - `DELETE /api/v1/products/hf-mobile/features/:id`
  - `GET /api/v1/products/hf-mobile/variants`
  - `POST /api/v1/products/hf-mobile/variants`
  - `PUT /api/v1/products/hf-mobile/variants/:id`
  - `DELETE /api/v1/products/hf-mobile/variants/:id`
- **Controller:** `hfMobileController.js`
- **Models:** `HfMobilePageContent`, `HfMobileImage`, `HfMobileFeature`, `HfMobileVariant`

---

### **15. HF Fixed Product Page**
- **Route:** `/products/hf-fixed`
- **API Endpoints:**
  - `GET /api/v1/products/hf-fixed`
  - `PUT /api/v1/products/hf-fixed`
  - `GET /api/v1/products/hf-fixed/images`
  - `POST /api/v1/products/hf-fixed/images`
  - `PUT /api/v1/products/hf-fixed/images/:id`
  - `DELETE /api/v1/products/hf-fixed/images/:id`
  - `GET /api/v1/products/hf-fixed/features`
  - `POST /api/v1/products/hf-fixed/features`
  - `PUT /api/v1/products/hf-fixed/features/:id`
  - `DELETE /api/v1/products/hf-fixed/features/:id`
  - `GET /api/v1/products/hf-fixed/variants`
  - `POST /api/v1/products/hf-fixed/variants`
  - `PUT /api/v1/products/hf-fixed/variants/:id`
  - `DELETE /api/v1/products/hf-fixed/variants/:id`
- **Controller:** `hfFixedController.js`
- **Models:** `HfFixedPageContent`, `HfFixedImage`, `HfFixedFeature`, `HfFixedVariant`

---

### **16. FPD C-Arm Product Page**
- **Route:** `/products/fpd-c-arm`
- **API Endpoints:**
  - `GET /api/v1/products/fpd-c-arm`
  - `PUT /api/v1/products/fpd-c-arm`
  - `GET /api/v1/products/fpd-c-arm/images`
  - `POST /api/v1/products/fpd-c-arm/images`
  - `PUT /api/v1/products/fpd-c-arm/images/:id`
  - `DELETE /api/v1/products/fpd-c-arm/images/:id`
  - `GET /api/v1/products/fpd-c-arm/features`
  - `POST /api/v1/products/fpd-c-arm/features`
  - `PUT /api/v1/products/fpd-c-arm/features/:id`
  - `DELETE /api/v1/products/fpd-c-arm/features/:id`
  - `GET /api/v1/products/fpd-c-arm/variants`
  - `POST /api/v1/products/fpd-c-arm/variants`
  - `PUT /api/v1/products/fpd-c-arm/variants/:id`
  - `DELETE /api/v1/products/fpd-c-arm/variants/:id`
- **Controller:** `fpdCArmController.js`
- **Models:** `FpdCArmPageContent`, `FpdCArmImage`, `FpdCArmFeature`, `FpdCArmVariant`

---

### **17. 1K*1K High End HF C-ARM Product Page**
- **Route:** `/products/hf-c-arm-1k`
- **API Endpoints:**
  - `GET /api/v1/products/hf-c-arm-1k`
  - `PUT /api/v1/products/hf-c-arm-1k`
  - `GET /api/v1/products/hf-c-arm-1k/images`
  - `POST /api/v1/products/hf-c-arm-1k/images`
  - `PUT /api/v1/products/hf-c-arm-1k/images/:id`
  - `DELETE /api/v1/products/hf-c-arm-1k/images/:id`
  - `GET /api/v1/products/hf-c-arm-1k/features`
  - `POST /api/v1/products/hf-c-arm-1k/features`
  - `PUT /api/v1/products/hf-c-arm-1k/features/:id`
  - `DELETE /api/v1/products/hf-c-arm-1k/features/:id`
  - `GET /api/v1/products/hf-c-arm-1k/variants`
  - `POST /api/v1/products/hf-c-arm-1k/variants`
  - `PUT /api/v1/products/hf-c-arm-1k/variants/:id`
  - `DELETE /api/v1/products/hf-c-arm-1k/variants/:id`
- **Controller:** `hfCArm1kController.js`
- **Models:** `HfCArm1kPageContent`, `HfCArm1kImage`, `HfCArm1kFeature`, `HfCArm1kVariant`

---

### **18. Line Frequency Product Page**
- **Route:** `/products/line-frequency`
- **API Endpoints:**
  - `GET /api/v1/products/line-frequency`
  - `PUT /api/v1/products/line-frequency`
  - `GET /api/v1/products/line-frequency/images`
  - `POST /api/v1/products/line-frequency/images`
  - `PUT /api/v1/products/line-frequency/images/:id`
  - `DELETE /api/v1/products/line-frequency/images/:id`
  - `GET /api/v1/products/line-frequency/features`
  - `POST /api/v1/products/line-frequency/features`
  - `PUT /api/v1/products/line-frequency/features/:id`
  - `DELETE /api/v1/products/line-frequency/features/:id`
  - `GET /api/v1/products/line-frequency/variants`
  - `POST /api/v1/products/line-frequency/variants`
  - `PUT /api/v1/products/line-frequency/variants/:id`
  - `DELETE /api/v1/products/line-frequency/variants/:id`
- **Controller:** `lineFrequencyController.js`
- **Models:** `LineFrequencyPageContent`, `LineFrequencyImage`, `LineFrequencyFeature`, `LineFrequencyVariant`

---

### **19. Digital Radiography Product Page**
- **Route:** `/products/digital-radiography`
- **API Endpoints:**
  - `GET /api/v1/products/digital-radiography`
  - `PUT /api/v1/products/digital-radiography`
  - `GET /api/v1/products/digital-radiography/images`
  - `POST /api/v1/products/digital-radiography/images`
  - `PUT /api/v1/products/digital-radiography/images/:id`
  - `DELETE /api/v1/products/digital-radiography/images/:id`
  - `GET /api/v1/products/digital-radiography/features`
  - `POST /api/v1/products/digital-radiography/features`
  - `PUT /api/v1/products/digital-radiography/features/:id`
  - `DELETE /api/v1/products/digital-radiography/features/:id`
  - `GET /api/v1/products/digital-radiography/variants`
  - `POST /api/v1/products/digital-radiography/variants`
  - `PUT /api/v1/products/digital-radiography/variants/:id`
  - `DELETE /api/v1/products/digital-radiography/variants/:id`
- **Controller:** `digitalRadiographyController.js`
- **Models:** `DigitalRadiographyPageContent`, `DigitalRadiographyImage`, `DigitalRadiographyFeature`, `DigitalRadiographyVariant`

---

### **20. Dream Series Product Page**
- **Route:** `/products/dream-series`
- **API Endpoints:**
  - `GET /api/v1/products/dream-series`
  - `PUT /api/v1/products/dream-series`
  - `GET /api/v1/products/dream-series/images`
  - `POST /api/v1/products/dream-series/images`
  - `PUT /api/v1/products/dream-series/images/:id`
  - `DELETE /api/v1/products/dream-series/images/:id`
  - `GET /api/v1/products/dream-series/features`
  - `POST /api/v1/products/dream-series/features`
  - `PUT /api/v1/products/dream-series/features/:id`
  - `DELETE /api/v1/products/dream-series/features/:id`
  - `GET /api/v1/products/dream-series/variants`
  - `POST /api/v1/products/dream-series/variants`
  - `PUT /api/v1/products/dream-series/variants/:id`
  - `DELETE /api/v1/products/dream-series/variants/:id`
- **Controller:** `dreamSeriesController.js`
- **Models:** `DreamSeriesPageContent`, `DreamSeriesImage`, `DreamSeriesFeature`, `DreamSeriesVariant`

---

## 🔧 **Shared/Global Pages**

### **21. Navigation Management**
- **API Endpoints:**
  - `GET /api/v1/navigation`
  - `POST /api/v1/navigation`
  - `GET /api/v1/navigation/:id`
  - `PUT /api/v1/navigation/:id`
  - `DELETE /api/v1/navigation/:id`
- **Controller:** `navigationController.js`
- **Model:** `NavigationItem`

---

### **22. Footer Management**
- **API Endpoints:**
  - `GET /api/v1/footer/sections`
  - `POST /api/v1/footer/sections`
  - `PUT /api/v1/footer/sections/:id`
  - `DELETE /api/v1/footer/sections/:id`
  - `GET /api/v1/footer/links`
  - `POST /api/v1/footer/links`
  - `PUT /api/v1/footer/links/:id`
  - `DELETE /api/v1/footer/links/:id`
- **Controller:** `footerController.js`
- **Models:** `FooterSection`, `FooterLink`

---

### **23. Contact Information**
- **API Endpoints:**
  - `GET /api/v1/contact-info`
  - `PUT /api/v1/contact-info`
- **Controller:** `contactInfoController.js`
- **Model:** `ContactInfo`

---

### **24. Global Settings**
- **API Endpoints:**
  - `GET /api/v1/global-settings`
  - `POST /api/v1/global-settings`
  - `GET /api/v1/global-settings/key/:key`
  - `PUT /api/v1/global-settings/:id`
  - `DELETE /api/v1/global-settings/:id`
- **Controller:** `globalSettingsController.js`
- **Model:** `GlobalSetting`

---

### **25. Social Links**
- **API Endpoints:**
  - `GET /api/v1/social-links`
  - `POST /api/v1/social-links`
  - `PUT /api/v1/social-links/:id`
  - `DELETE /api/v1/social-links/:id`
- **Controller:** `socialLinksController.js`
- **Model:** `SocialLink`

---

### **26. Testimonials (Shared Content)**
- **API Endpoints:**
  - `GET /api/v1/testimonials`
  - `POST /api/v1/testimonials`
  - `GET /api/v1/testimonials/:id`
  - `PUT /api/v1/testimonials/:id`
  - `DELETE /api/v1/testimonials/:id`
- **Controller:** `testimonials.js` (route file)
- **Model:** `Testimonial`

---

## 📊 **Summary**

### **Total Pages:** 20 Main Pages
- ✅ 1 Home Page
- ✅ 12 Content Pages (About, Awards, Clients, Management, Careers, Investor Relations, Specialties, Our Presence, Production Facility, Quality Assurance, Contact Us, Request Demo)
- ✅ 7 Product Pages (HF Mobile, HF Fixed, FPD C-Arm, 1K1K High End, Line Frequency, Digital Radiography, Dream Series)

### **Global/Shared:** 6 Management Sections
- ✅ Navigation
- ✅ Footer
- ✅ Contact Info
- ✅ Global Settings
- ✅ Social Links
- ✅ Testimonials

---

**Total: 26 independent page/section entities, each with full CRUD functionality!** ✅

