const express = require('express');
const router = express.Router();
const controller = require('../controllers/recycleBinController');
const { authenticate } = require('../middlewares/auth');

// All routes require authentication
router.use(authenticate);

router.get('/', controller.getDeletedItems);
router.post('/restore/:id', controller.restoreItem);
router.delete('/:id', controller.permanentDelete);
router.delete('/', controller.emptyBin);

module.exports = router;

