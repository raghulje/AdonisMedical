const { ProductionFacilityPageContent, ProductionFacilityFeature, Media } = require('../models');
const status = require('../helpers/response');

const findSingle = async (include = []) => {
  return await ProductionFacilityPageContent.findOne({ where: { id: 1 }, include });
};

exports.getPageContent = async (req, res) => {
  try {
    const content = await findSingle([
      { model: Media, as: 'heroImage' },
      { model: Media, as: 'flexibilityImage' },
      { model: Media, as: 'qualityImage' }
    ]);
    if (!content) {
      return status.notFoundResponse(res, "Production Facility page content not found");
    }
    return status.successResponse(res, "Retrieved", content);
  } catch (error) {
    console.error('Get Production Facility Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const content = await findSingle();
    if (!content) {
      return status.notFoundResponse(res, "Production Facility page content not found");
    }
    await content.update(req.body);
    const updated = await findSingle([
      { model: Media, as: 'heroImage' },
      { model: Media, as: 'flexibilityImage' },
      { model: Media, as: 'qualityImage' }
    ]);
    return status.successResponse(res, "Production Facility page updated", updated);
  } catch (error) {
    console.error('Update Production Facility Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Production Facility Features
exports.getFeatures = async (req, res) => {
  try {
    const features = await ProductionFacilityFeature.findAll({
      order: [['orderIndex', 'ASC']]
    });
    return status.successResponse(res, "Retrieved", features);
  } catch (error) {
    console.error('Get Production Facility Features Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createFeature = async (req, res) => {
  try {
    const feature = await ProductionFacilityFeature.create(req.body);
    return status.createdResponse(res, "Feature created", feature);
  } catch (error) {
    console.error('Create Production Facility Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateFeature = async (req, res) => {
  try {
    const feature = await ProductionFacilityFeature.findByPk(req.params.id);
    if (!feature) {
      return status.notFoundResponse(res, "Feature not found");
    }
    await feature.update(req.body);
    return status.successResponse(res, "Feature updated", feature);
  } catch (error) {
    console.error('Update Production Facility Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteFeature = async (req, res) => {
  try {
    const feature = await ProductionFacilityFeature.findByPk(req.params.id);
    if (!feature) {
      return status.notFoundResponse(res, "Feature not found");
    }
    await feature.destroy();
    return status.successResponse(res, "Feature deleted");
  } catch (error) {
    console.error('Delete Production Facility Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

