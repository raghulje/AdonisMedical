const express = require('express');
const router = express.Router();
const controller = require('../controllers/reusableContactController');

router.get('/', controller.getSection);
router.put('/', controller.updateSection);

module.exports = router;

