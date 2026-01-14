const express = require('express');
const router = express.Router();
const controller = require('../controllers/faqsController');
const { authenticate } = require('../middlewares/auth');

// Public routes
router.get('/page', controller.getFaqsPage);
router.get('/items', controller.getFaqsItems);

// Protected routes
router.put('/page', authenticate, controller.updateFaqsPage);
router.get('/items/:id', authenticate, controller.getFaqsItem);
router.post('/items', authenticate, controller.createFaqsItem);
router.put('/items/:id', authenticate, controller.updateFaqsItem);
router.delete('/items/:id', authenticate, controller.deleteFaqsItem);
router.post('/items/reorder', authenticate, controller.reorderFaqsItems);

module.exports = router;

