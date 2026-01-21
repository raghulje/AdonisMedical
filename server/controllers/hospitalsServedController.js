const { HospitalsServedSectionSetting, HospitalsServed, Media } = require('../models');
const status = require('../helpers/response');

// Get section settings
exports.getSectionSettings = async (req, res) => {
  try {
    let settings = await HospitalsServedSectionSetting.findByPk(1, {
      include: [{ model: Media, as: 'backgroundImage' }]
    });
    if (!settings) {
      settings = await HospitalsServedSectionSetting.create({ id: 1 });
    }
    return status.successResponse(res, "Retrieved", settings);
  } catch (error) {
    console.error('Get Hospitals Served Section Settings Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Update section settings
exports.updateSectionSettings = async (req, res) => {
  try {
    let settings = await HospitalsServedSectionSetting.findByPk(1);
    if (!settings) {
      settings = await HospitalsServedSectionSetting.create({ id: 1, ...req.body });
    } else {
      await settings.update(req.body);
    }
    const updated = await HospitalsServedSectionSetting.findByPk(1, {
      include: [{ model: Media, as: 'backgroundImage' }]
    });
    return status.successResponse(res, "Settings updated", updated);
  } catch (error) {
    console.error('Update Hospitals Served Section Settings Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Get all hospitals
exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await HospitalsServed.findAll({
      where: { isActive: true },
      order: [['orderIndex', 'ASC']]
    });
    return status.successResponse(res, "Retrieved", hospitals);
  } catch (error) {
    console.error('Get Hospitals Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Get all hospitals (including inactive - for CMS)
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await HospitalsServed.findAll({
      order: [['orderIndex', 'ASC']]
    });
    return status.successResponse(res, "Retrieved", hospitals);
  } catch (error) {
    console.error('Get All Hospitals Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Create hospital
exports.createHospital = async (req, res) => {
  try {
    const hospital = await HospitalsServed.create(req.body);
    return status.createdResponse(res, "Hospital created", hospital);
  } catch (error) {
    console.error('Create Hospital Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Update hospital
exports.updateHospital = async (req, res) => {
  try {
    const hospital = await HospitalsServed.findByPk(req.params.id);
    if (!hospital) {
      return status.notFoundResponse(res, "Hospital not found");
    }
    await hospital.update(req.body);
    return status.successResponse(res, "Hospital updated", hospital);
  } catch (error) {
    console.error('Update Hospital Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Delete hospital
exports.deleteHospital = async (req, res) => {
  try {
    const hospital = await HospitalsServed.findByPk(req.params.id);
    if (!hospital) {
      return status.notFoundResponse(res, "Hospital not found");
    }
    await hospital.destroy();
    return status.successResponse(res, "Hospital deleted");
  } catch (error) {
    console.error('Delete Hospital Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Reorder hospitals
exports.reorderHospitals = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      return status.errorResponse(res, "Invalid request body. 'ids' must be an array.");
    }
    for (let i = 0; i < ids.length; i++) {
      await HospitalsServed.update(
        { orderIndex: i },
        { where: { id: ids[i] } }
      );
    }
    return status.successResponse(res, "Hospitals reordered successfully");
  } catch (error) {
    console.error('Reorder Hospitals Error:', error);
    return status.errorResponse(res, error.message);
  }
};

