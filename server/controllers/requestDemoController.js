const { RequestDemoPageContent, RequestDemoParagraph, RequestDemoFeature, Media } = require('../models');
const status = require('../helpers/response');

const findSingle = async (include = []) => {
  return await RequestDemoPageContent.findOne({ 
    where: { id: 1 },
    include
  });
};

exports.getPageContent = async (req, res) => {
  try {
    const content = await findSingle([
      { model: Media, as: 'backgroundImage' },
      { model: RequestDemoParagraph, as: 'paragraphs', order: [['orderIndex', 'ASC']] },
      { model: RequestDemoFeature, as: 'features', include: [{ model: Media, as: 'iconImage' }], order: [['orderIndex', 'ASC']] }
    ]);
    if (!content) {
      return status.notFoundResponse(res, "Request Demo page content not found");
    }
    return status.successResponse(res, "Retrieved", content);
  } catch (error) {
    console.error('Get Request Demo Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const content = await findSingle();
    if (!content) {
      return status.notFoundResponse(res, "Request Demo page content not found");
    }
    await content.update(req.body);
    const updated = await findSingle([
      { model: Media, as: 'backgroundImage' },
      { model: RequestDemoParagraph, as: 'paragraphs', order: [['orderIndex', 'ASC']] },
      { model: RequestDemoFeature, as: 'features', include: [{ model: Media, as: 'iconImage' }], order: [['orderIndex', 'ASC']] }
    ]);
    return status.successResponse(res, "Request Demo page updated", updated);
  } catch (error) {
    console.error('Update Request Demo Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Paragraphs
exports.getParagraphs = async (req, res) => {
  try {
    const paragraphs = await RequestDemoParagraph.findAll({
      where: { pageContentId: 1 },
      order: [['orderIndex', 'ASC']]
    });
    return status.successResponse(res, "Retrieved", paragraphs);
  } catch (error) {
    console.error('Get Paragraphs Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createParagraph = async (req, res) => {
  try {
    const paragraph = await RequestDemoParagraph.create({ ...req.body, pageContentId: 1 });
    return status.createdResponse(res, "Paragraph created", paragraph);
  } catch (error) {
    console.error('Create Paragraph Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateParagraph = async (req, res) => {
  try {
    const paragraph = await RequestDemoParagraph.findByPk(req.params.id);
    if (!paragraph) {
      return status.notFoundResponse(res, "Paragraph not found");
    }
    await paragraph.update(req.body);
    return status.successResponse(res, "Paragraph updated", paragraph);
  } catch (error) {
    console.error('Update Paragraph Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteParagraph = async (req, res) => {
  try {
    const paragraph = await RequestDemoParagraph.findByPk(req.params.id);
    if (!paragraph) {
      return status.notFoundResponse(res, "Paragraph not found");
    }
    await paragraph.destroy();
    return status.successResponse(res, "Paragraph deleted");
  } catch (error) {
    console.error('Delete Paragraph Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Features
exports.getFeatures = async (req, res) => {
  try {
    const features = await RequestDemoFeature.findAll({
      where: { pageContentId: 1 },
      include: [{ model: Media, as: 'iconImage' }],
      order: [['orderIndex', 'ASC']]
    });
    return status.successResponse(res, "Retrieved", features);
  } catch (error) {
    console.error('Get Features Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createFeature = async (req, res) => {
  try {
    const feature = await RequestDemoFeature.create({ ...req.body, pageContentId: 1 });
    const created = await RequestDemoFeature.findByPk(feature.id, {
      include: [{ model: Media, as: 'iconImage' }]
    });
    return status.createdResponse(res, "Feature created", created);
  } catch (error) {
    console.error('Create Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateFeature = async (req, res) => {
  try {
    const feature = await RequestDemoFeature.findByPk(req.params.id);
    if (!feature) {
      return status.notFoundResponse(res, "Feature not found");
    }
    await feature.update(req.body);
    const updated = await RequestDemoFeature.findByPk(feature.id, {
      include: [{ model: Media, as: 'iconImage' }]
    });
    return status.successResponse(res, "Feature updated", updated);
  } catch (error) {
    console.error('Update Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteFeature = async (req, res) => {
  try {
    const feature = await RequestDemoFeature.findByPk(req.params.id);
    if (!feature) {
      return status.notFoundResponse(res, "Feature not found");
    }
    await feature.destroy();
    return status.successResponse(res, "Feature deleted");
  } catch (error) {
    console.error('Delete Feature Error:', error);
    return status.errorResponse(res, error.message);
  }
};

