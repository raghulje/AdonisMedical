const express = require('express');
const router = express.Router();
const controller = require('../controllers/hospitalsServedController');

// Section settings
router.get('/settings', controller.getSectionSettings);
router.put('/settings', controller.updateSectionSettings);

// Hospitals CRUD
router.get('/', controller.getHospitals); // Public endpoint (active only)
router.get('/all', controller.getAllHospitals); // CMS endpoint (all hospitals)
router.post('/', controller.createHospital);
router.put('/:id', controller.updateHospital);
router.delete('/:id', controller.deleteHospital);
router.put('/reorder', controller.reorderHospitals);

module.exports = router;

