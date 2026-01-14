const express = require('express');
const router = express.Router();
const controller = require('../controllers/ourProductsController');

router.get('/content', controller.getPageContent);
router.put('/content', controller.updatePageContent);

module.exports = router;

