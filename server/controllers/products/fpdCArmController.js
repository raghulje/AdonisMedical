const { FpdCArmPageContent, FpdCArmImage, FpdCArmFeature, FpdCArmVariant, Media } = require('../../models');
const status = require('../../helpers/response');

const findSingle = async (include = []) => {
  return await FpdCArmPageContent.findOne({ where: { id: 1 }, include });
};

exports.getPageContent = async (req, res) => {
  try {
    const content = await findSingle([{ model: Media, as: 'mainImage' }]);
    if (!content) return status.notFoundResponse(res, "FPD C-Arm page content not found");
    return status.successResponse(res, "Retrieved", content);
  } catch (error) {
    console.error('Get FPD C-Arm Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const content = await findSingle();
    if (!content) return status.notFoundResponse(res, "FPD C-Arm page content not found");
    await content.update(req.body);
    const updated = await findSingle([{ model: Media, as: 'mainImage' }]);
    return status.successResponse(res, "FPD C-Arm page updated", updated);
  } catch (error) {
    console.error('Update FPD C-Arm Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await FpdCArmImage.findAll({
      order: [['orderIndex', 'ASC']],
      include: [{ model: Media, as: 'image' }]
    });
    return status.successResponse(res, "Retrieved", images);
  } catch (error) {
    console.error('Get FPD C-Arm Images Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createImage = async (req, res) => {
  try {
    const image = await FpdCArmImage.create(req.body);
    return status.createdResponse(res, "Image added", image);
  } catch (error) {
    console.error('Create FPD C-Arm Image Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateImage = async (req, res) => {
  try {
    const image = await FpdCArmImage.findByPk(req.params.id);
    if (!image) return status.notFoundResponse(res, "Image not found");
    await image.update(req.body);
    return status.successResponse(res, "Image updated", image);
  } catch (error) {
    console.error('Update FPD C-Arm Image Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await FpdCArmImage.findByPk(req.params.id);
    if (!image) return status.notFoundResponse(res, "Image not found");
    await image.destroy();
    return status.successResponse(res, "Image deleted");
  } catch (error) {
    console.error('Delete FPD C-Arm Image Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getFeatures = async (req, res) => {
  try {
    const features = await FpdCArmFeature.findAll({ order: [['orderIndex', 'ASC']] });
    return status.successResponse(res, "Retrieved", features);
  } catch (error) {
    console.error('Get FPD C-Arm Features Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createFeature = async (req, res) => {
  try {
    const feature = await FpdCArmFeature.create(req.body);
    return status.createdResponse(res, "Feature created", feature);
  } catch (error) {
    console.error('Create FPD C-Arm Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateFeature = async (req, res) => {
  try {
    const feature = await FpdCArmFeature.findByPk(req.params.id);
    if (!feature) return status.notFoundResponse(res, "Feature not found");
    await feature.update(req.body);
    return status.successResponse(res, "Feature updated", feature);
  } catch (error) {
    console.error('Update FPD C-Arm Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteFeature = async (req, res) => {
  try {
    const feature = await FpdCArmFeature.findByPk(req.params.id);
    if (!feature) return status.notFoundResponse(res, "Feature not found");
    await feature.destroy();
    return status.successResponse(res, "Feature deleted");
  } catch (error) {
    console.error('Delete FPD C-Arm Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getVariants = async (req, res) => {
  try {
    const variants = await FpdCArmVariant.findAll({
      where: { isActive: true },
      order: [['orderIndex', 'ASC']]
    });
    return status.successResponse(res, "Retrieved", variants);
  } catch (error) {
    console.error('Get FPD C-Arm Variants Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createVariant = async (req, res) => {
  try {
    const variant = await FpdCArmVariant.create(req.body);
    return status.createdResponse(res, "Variant created", variant);
  } catch (error) {
    console.error('Create FPD C-Arm Variant Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateVariant = async (req, res) => {
  try {
    const variant = await FpdCArmVariant.findByPk(req.params.id);
    if (!variant) return status.notFoundResponse(res, "Variant not found");
    await variant.update(req.body);
    return status.successResponse(res, "Variant updated", variant);
  } catch (error) {
    console.error('Update FPD C-Arm Variant Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteVariant = async (req, res) => {
  try {
    const variant = await FpdCArmVariant.findByPk(req.params.id);
    if (!variant) return status.notFoundResponse(res, "Variant not found");
    await variant.destroy();
    return status.successResponse(res, "Variant deleted");
  } catch (error) {
    console.error('Delete FPD C-Arm Variant Error:', error);
    return status.errorResponse(res, error.message);
  }
};


