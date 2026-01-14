const express = require('express');
const router = express.Router();
const controller = require('../controllers/homeSectionsController');

// Home Hero Section
router.get('/home-hero-section', controller.getHeroSection);
router.put('/home-hero-section', controller.updateHeroSection);

// Home About Section
router.get('/home-about-section', controller.getAboutSection);
router.put('/home-about-section', controller.updateAboutSection);

// Home About Paragraphs
router.get('/home-about-paragraphs', controller.getAboutParagraphs);
router.post('/home-about-paragraphs', controller.createAboutParagraph);
router.put('/home-about-paragraphs/:id', controller.updateAboutParagraph);
router.delete('/home-about-paragraphs/:id', controller.deleteAboutParagraph);

// Home Stats
router.get('/home-stats', controller.getStats);
router.post('/home-stats', controller.createStat);
router.put('/home-stats/:id', controller.updateStat);
router.delete('/home-stats/:id', controller.deleteStat);

// Home Quality Section
router.get('/home-quality-section', controller.getQualitySection);
router.put('/home-quality-section', controller.updateQualitySection);

// Home Products Section
router.get('/home-products-section', controller.getProductsSection);
router.put('/home-products-section', controller.updateProductsSection);

// Home Products Cards
router.get('/home-products-cards', controller.getProductsCards);
router.post('/home-products-cards', controller.createProductsCard);
router.put('/home-products-cards/:id', controller.updateProductsCard);
router.delete('/home-products-cards/:id', controller.deleteProductsCard);

// Home Specialties Section
router.get('/home-specialties-section', controller.getSpecialtiesSection);
router.put('/home-specialties-section', controller.updateSpecialtiesSection);

// Home Testimonials Section
router.get('/home-testimonials-section', controller.getTestimonialsSection);
router.put('/home-testimonials-section', controller.updateTestimonialsSection);

// Home Contact Section
router.get('/home-contact-section', controller.getContactSection);
router.put('/home-contact-section', controller.updateContactSection);

module.exports = router;

