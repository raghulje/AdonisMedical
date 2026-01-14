const { DigitalRadiographyPageContent, DigitalRadiographyImage, DigitalRadiographyFeature, DigitalRadiographyVariant, Media } = require('../../models');
const status = require('../../helpers/response');

const findSingle = async (include = []) => {
  return await DigitalRadiographyPageContent.findOne({ where: { id: 1 }, include });
};

exports.getPageContent = async (req, res) => {
  try {
    const content = await findSingle([{ model: Media, as: 'mainImage' }]);
    if (!content) return status.notFoundResponse(res, "Digital Radiography page content not found");
    return status.successResponse(res, "Retrieved", content);
  } catch (error) {
    console.error('Get Digital Radiography Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const content = await findSingle();
    if (!content) return status.notFoundResponse(res, "Digital Radiography page content not found");
    await content.update(req.body);
    const updated = await findSingle([{ model: Media, as: 'mainImage' }]);
    return status.successResponse(res, "Digital Radiography page updated", updated);
  } catch (error) {
    console.error('Update Digital Radiography Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await DigitalRadiographyImage.findAll({
      order: [['orderIndex', 'ASC']],
      include: [{ model: Media, as: 'image' }]
    });
    return status.successResponse(res, "Retrieved", images);
  } catch (error) {
    console.error('Get Digital Radiography Images Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createImage = async (req, res) => {
  try {
    const image = await DigitalRadiographyImage.create(req.body);
    return status.createdResponse(res, "Image added", image);
  } catch (error) {
    console.error('Create Digital Radiography Image Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateImage = async (req, res) => {
  try {
    const image = await DigitalRadiographyImage.findByPk(req.params.id);
    if (!image) return status.notFoundResponse(res, "Image not found");
    await image.update(req.body);
    return status.successResponse(res, "Image updated", image);
  } catch (error) {
    console.error('Update Digital Radiography Image Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await DigitalRadiographyImage.findByPk(req.params.id);
    if (!image) return status.notFoundResponse(res, "Image not found");
    await image.destroy();
    return status.successResponse(res, "Image deleted");
  } catch (error) {
    console.error('Delete Digital Radiography Image Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getFeatures = async (req, res) => {
  try {
    const features = await DigitalRadiographyFeature.findAll({ order: [['orderIndex', 'ASC']] });
    return status.successResponse(res, "Retrieved", features);
  } catch (error) {
    console.error('Get Digital Radiography Features Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createFeature = async (req, res) => {
  try {
    const feature = await DigitalRadiographyFeature.create(req.body);
    return status.createdResponse(res, "Feature created", feature);
  } catch (error) {
    console.error('Create Digital Radiography Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateFeature = async (req, res) => {
  try {
    const feature = await DigitalRadiographyFeature.findByPk(req.params.id);
    if (!feature) return status.notFoundResponse(res, "Feature not found");
    await feature.update(req.body);
    return status.successResponse(res, "Feature updated", feature);
  } catch (error) {
    console.error('Update Digital Radiography Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteFeature = async (req, res) => {
  try {
    const feature = await DigitalRadiographyFeature.findByPk(req.params.id);
    if (!feature) return status.notFoundResponse(res, "Feature not found");
    await feature.destroy();
    return status.successResponse(res, "Feature deleted");
  } catch (error) {
    console.error('Delete Digital Radiography Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getVariants = async (req, res) => {
  try {
    const variants = await DigitalRadiographyVariant.findAll({
      where: { isActive: true },
      order: [['orderIndex', 'ASC']]
    });
    return status.successResponse(res, "Retrieved", variants);
  } catch (error) {
    console.error('Get Digital Radiography Variants Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createVariant = async (req, res) => {
  try {
    const variant = await DigitalRadiographyVariant.create(req.body);
    return status.createdResponse(res, "Variant created", variant);
  } catch (error) {
    console.error('Create Digital Radiography Variant Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateVariant = async (req, res) => {
  try {
    const variant = await DigitalRadiographyVariant.findByPk(req.params.id);
    if (!variant) return status.notFoundResponse(res, "Variant not found");
    await variant.update(req.body);
    return status.successResponse(res, "Variant updated", variant);
  } catch (error) {
    console.error('Update Digital Radiography Variant Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteVariant = async (req, res) => {
  try {
    const variant = await DigitalRadiographyVariant.findByPk(req.params.id);
    if (!variant) return status.notFoundResponse(res, "Variant not found");
    await variant.destroy();
    return status.successResponse(res, "Variant deleted");
  } catch (error) {
    console.error('Delete Digital Radiography Variant Error:', error);
    return status.errorResponse(res, error.message);
  }
};


