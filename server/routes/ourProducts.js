const express = require('express');
const router = express.Router();
const controller = require('../controllers/ourProductsController');

router.get('/content', controller.getPageContent);
router.put('/content', controller.updatePageContent);

// Products Items CRUD
router.get('/items', controller.getProductsItems);
router.post('/items', controller.createProductsItem);
router.put('/items/:id', controller.updateProductsItem);
router.delete('/items/:id', controller.deleteProductsItem);

module.exports = router;

