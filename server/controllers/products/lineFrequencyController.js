const { LineFrequencyPageContent, LineFrequencyImage, LineFrequencyFeature, LineFrequencyVariant, LineFrequencyHospital, Media } = require('../../models');
const status = require('../../helpers/response');

const findSingle = async (include = []) => {
  return await LineFrequencyPageContent.findOne({ where: { id: 1 }, include });
};

exports.getPageContent = async (req, res) => {
  try {
    const content = await findSingle([{ model: Media, as: 'mainImage' }]);
    if (!content) return status.notFoundResponse(res, "Line Frequency page content not found");
    return status.successResponse(res, "Retrieved", content);
  } catch (error) {
    console.error('Get Line Frequency Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const content = await findSingle();
    if (!content) return status.notFoundResponse(res, "Line Frequency page content not found");
    await content.update(req.body);
    const updated = await findSingle([{ model: Media, as: 'mainImage' }]);
    return status.successResponse(res, "Line Frequency page updated", updated);
  } catch (error) {
    console.error('Update Line Frequency Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await LineFrequencyImage.findAll({
      order: [['orderIndex', 'ASC']],
      include: [{ model: Media, as: 'image' }]
    });
    return status.successResponse(res, "Retrieved", images);
  } catch (error) {
    console.error('Get Line Frequency Images Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createImage = async (req, res) => {
  try {
    const image = await LineFrequencyImage.create(req.body);
    return status.createdResponse(res, "Image added", image);
  } catch (error) {
    console.error('Create Line Frequency Image Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateImage = async (req, res) => {
  try {
    const image = await LineFrequencyImage.findByPk(req.params.id);
    if (!image) return status.notFoundResponse(res, "Image not found");
    await image.update(req.body);
    return status.successResponse(res, "Image updated", image);
  } catch (error) {
    console.error('Update Line Frequency Image Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await LineFrequencyImage.findByPk(req.params.id);
    if (!image) return status.notFoundResponse(res, "Image not found");
    await image.destroy();
    return status.successResponse(res, "Image deleted");
  } catch (error) {
    console.error('Delete Line Frequency Image Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getFeatures = async (req, res) => {
  try {
    const features = await LineFrequencyFeature.findAll({ order: [['orderIndex', 'ASC']] });
    return status.successResponse(res, "Retrieved", features);
  } catch (error) {
    console.error('Get Line Frequency Features Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createFeature = async (req, res) => {
  try {
    const feature = await LineFrequencyFeature.create(req.body);
    return status.createdResponse(res, "Feature created", feature);
  } catch (error) {
    console.error('Create Line Frequency Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateFeature = async (req, res) => {
  try {
    const feature = await LineFrequencyFeature.findByPk(req.params.id);
    if (!feature) return status.notFoundResponse(res, "Feature not found");
    await feature.update(req.body);
    return status.successResponse(res, "Feature updated", feature);
  } catch (error) {
    console.error('Update Line Frequency Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteFeature = async (req, res) => {
  try {
    const feature = await LineFrequencyFeature.findByPk(req.params.id);
    if (!feature) return status.notFoundResponse(res, "Feature not found");
    await feature.destroy();
    return status.successResponse(res, "Feature deleted");
  } catch (error) {
    console.error('Delete Line Frequency Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getVariants = async (req, res) => {
  try {
    const variants = await LineFrequencyVariant.findAll({
      where: { isActive: true },
      order: [['orderIndex', 'ASC']]
    });
    return status.successResponse(res, "Retrieved", variants);
  } catch (error) {
    console.error('Get Line Frequency Variants Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createVariant = async (req, res) => {
  try {
    const variant = await LineFrequencyVariant.create(req.body);
    return status.createdResponse(res, "Variant created", variant);
  } catch (error) {
    console.error('Create Line Frequency Variant Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateVariant = async (req, res) => {
  try {
    const variant = await LineFrequencyVariant.findByPk(req.params.id);
    if (!variant) return status.notFoundResponse(res, "Variant not found");
    await variant.update(req.body);
    return status.successResponse(res, "Variant updated", variant);
  } catch (error) {
    console.error('Update Line Frequency Variant Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteVariant = async (req, res) => {
  try {
    const variant = await LineFrequencyVariant.findByPk(req.params.id);
    if (!variant) return status.notFoundResponse(res, "Variant not found");
    await variant.destroy();
    return status.successResponse(res, "Variant deleted");
  } catch (error) {
    console.error('Delete Line Frequency Variant Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Hospitals
exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await LineFrequencyHospital.findAll({
      where: { isActive: true },
      order: [['orderIndex', 'ASC']],
      include: [{ model: Media, as: 'hospitalLogo', required: false }]
    });
    return status.successResponse(res, "Retrieved", hospitals);
  } catch (error) {
    console.error('Get Line Frequency Hospitals Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createHospital = async (req, res) => {
  try {
    const hospital = await LineFrequencyHospital.create(req.body);
    const created = await LineFrequencyHospital.findByPk(hospital.id, {
      include: [{ model: Media, as: 'hospitalLogo', required: false }]
    });
    return status.createdResponse(res, "Hospital created", created);
  } catch (error) {
    console.error('Create Line Frequency Hospital Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateHospital = async (req, res) => {
  try {
    const hospital = await LineFrequencyHospital.findByPk(req.params.id);
    if (!hospital) return status.notFoundResponse(res, "Hospital not found");
    await hospital.update(req.body);
    const updated = await LineFrequencyHospital.findByPk(req.params.id, {
      include: [{ model: Media, as: 'hospitalLogo', required: false }]
    });
    return status.successResponse(res, "Hospital updated", updated);
  } catch (error) {
    console.error('Update Line Frequency Hospital Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteHospital = async (req, res) => {
  try {
    const hospital = await LineFrequencyHospital.findByPk(req.params.id);
    if (!hospital) return status.notFoundResponse(res, "Hospital not found");
    await hospital.destroy();
    return status.successResponse(res, "Hospital deleted");
  } catch (error) {
    console.error('Delete Line Frequency Hospital Error:', error);
    return status.errorResponse(res, error.message);
  }
};


