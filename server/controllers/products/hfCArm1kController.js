const { HfCArm1kPageContent, HfCArm1kImage, HfCArm1kFeature, HfCArm1kVariant, HfCArm1kHospital, Media } = require('../../models');
const status = require('../../helpers/response');

const findSingle = async (include = []) => {
  return await HfCArm1kPageContent.findOne({ where: { id: 1 }, include });
};

exports.getPageContent = async (req, res) => {
  try {
    const content = await findSingle([{ model: Media, as: 'mainImage' }]);
    if (!content) return status.notFoundResponse(res, "1K*1K High End HF C-ARM page content not found");
    return status.successResponse(res, "Retrieved", content);
  } catch (error) {
    console.error('Get 1K*1K High End HF C-ARM Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const content = await findSingle();
    if (!content) return status.notFoundResponse(res, "1K*1K High End HF C-ARM page content not found");
    await content.update(req.body);
    const updated = await findSingle([{ model: Media, as: 'mainImage' }]);
    return status.successResponse(res, "1K*1K High End HF C-ARM page updated", updated);
  } catch (error) {
    console.error('Update 1K*1K High End HF C-ARM Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await HfCArm1kImage.findAll({
      order: [['orderIndex', 'ASC']],
      include: [{ model: Media, as: 'image' }]
    });
    return status.successResponse(res, "Retrieved", images);
  } catch (error) {
    console.error('Get 1K*1K High End HF C-ARM Images Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createImage = async (req, res) => {
  try {
    const image = await HfCArm1kImage.create(req.body);
    return status.createdResponse(res, "Image added", image);
  } catch (error) {
    console.error('Create 1K*1K High End HF C-ARM Image Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateImage = async (req, res) => {
  try {
    const image = await HfCArm1kImage.findByPk(req.params.id);
    if (!image) return status.notFoundResponse(res, "Image not found");
    await image.update(req.body);
    return status.successResponse(res, "Image updated", image);
  } catch (error) {
    console.error('Update 1K*1K High End HF C-ARM Image Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await HfCArm1kImage.findByPk(req.params.id);
    if (!image) return status.notFoundResponse(res, "Image not found");
    await image.destroy();
    return status.successResponse(res, "Image deleted");
  } catch (error) {
    console.error('Delete 1K*1K High End HF C-ARM Image Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getFeatures = async (req, res) => {
  try {
    const features = await HfCArm1kFeature.findAll({ order: [['orderIndex', 'ASC']] });
    return status.successResponse(res, "Retrieved", features);
  } catch (error) {
    console.error('Get 1K*1K High End HF C-ARM Features Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createFeature = async (req, res) => {
  try {
    const feature = await HfCArm1kFeature.create(req.body);
    return status.createdResponse(res, "Feature created", feature);
  } catch (error) {
    console.error('Create 1K*1K High End HF C-ARM Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateFeature = async (req, res) => {
  try {
    const feature = await HfCArm1kFeature.findByPk(req.params.id);
    if (!feature) return status.notFoundResponse(res, "Feature not found");
    await feature.update(req.body);
    return status.successResponse(res, "Feature updated", feature);
  } catch (error) {
    console.error('Update 1K*1K High End HF C-ARM Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteFeature = async (req, res) => {
  try {
    const feature = await HfCArm1kFeature.findByPk(req.params.id);
    if (!feature) return status.notFoundResponse(res, "Feature not found");
    await feature.destroy();
    return status.successResponse(res, "Feature deleted");
  } catch (error) {
    console.error('Delete 1K*1K High End HF C-ARM Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getVariants = async (req, res) => {
  try {
    const variants = await HfCArm1kVariant.findAll({
      where: { isActive: true },
      order: [['orderIndex', 'ASC']]
    });
    return status.successResponse(res, "Retrieved", variants);
  } catch (error) {
    console.error('Get 1K*1K High End HF C-ARM Variants Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createVariant = async (req, res) => {
  try {
    const variant = await HfCArm1kVariant.create(req.body);
    return status.createdResponse(res, "Variant created", variant);
  } catch (error) {
    console.error('Create 1K*1K High End HF C-ARM Variant Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateVariant = async (req, res) => {
  try {
    const variant = await HfCArm1kVariant.findByPk(req.params.id);
    if (!variant) return status.notFoundResponse(res, "Variant not found");
    await variant.update(req.body);
    return status.successResponse(res, "Variant updated", variant);
  } catch (error) {
    console.error('Update 1K*1K High End HF C-ARM Variant Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteVariant = async (req, res) => {
  try {
    const variant = await HfCArm1kVariant.findByPk(req.params.id);
    if (!variant) return status.notFoundResponse(res, "Variant not found");
    await variant.destroy();
    return status.successResponse(res, "Variant deleted");
  } catch (error) {
    console.error('Delete 1K*1K High End HF C-ARM Variant Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Hospitals
exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await HfCArm1kHospital.findAll({
      where: { isActive: true },
      order: [['orderIndex', 'ASC']],
      include: [{ model: Media, as: 'hospitalLogo', required: false }]
    });
    return status.successResponse(res, "Retrieved", hospitals);
  } catch (error) {
    console.error('Get 1K*1K High End HF C-ARM Hospitals Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createHospital = async (req, res) => {
  try {
    const hospital = await HfCArm1kHospital.create(req.body);
    const created = await HfCArm1kHospital.findByPk(hospital.id, {
      include: [{ model: Media, as: 'hospitalLogo', required: false }]
    });
    return status.createdResponse(res, "Hospital created", created);
  } catch (error) {
    console.error('Create 1K*1K High End HF C-ARM Hospital Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateHospital = async (req, res) => {
  try {
    const hospital = await HfCArm1kHospital.findByPk(req.params.id);
    if (!hospital) return status.notFoundResponse(res, "Hospital not found");
    await hospital.update(req.body);
    const updated = await HfCArm1kHospital.findByPk(req.params.id, {
      include: [{ model: Media, as: 'hospitalLogo', required: false }]
    });
    return status.successResponse(res, "Hospital updated", updated);
  } catch (error) {
    console.error('Update 1K*1K High End HF C-ARM Hospital Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteHospital = async (req, res) => {
  try {
    const hospital = await HfCArm1kHospital.findByPk(req.params.id);
    if (!hospital) return status.notFoundResponse(res, "Hospital not found");
    await hospital.destroy();
    return status.successResponse(res, "Hospital deleted");
  } catch (error) {
    console.error('Delete 1K*1K High End HF C-ARM Hospital Error:', error);
    return status.errorResponse(res, error.message);
  }
};


