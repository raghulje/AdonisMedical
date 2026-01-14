const { AboutPageContent, Media } = require('../models');
const status = require('../helpers/response');

const findSingle = async (include = []) => {
  return await AboutPageContent.findOne({ where: { id: 1 }, include });
};

exports.getPageContent = async (req, res) => {
  try {
    const content = await findSingle([
      { model: Media, as: 'heroImage' },
      { model: Media, as: 'overviewImage' },
      { model: Media, as: 'safetyImage' },
      { model: Media, as: 'excellenceImage' }
    ]);
    if (!content) {
      return status.notFoundResponse(res, "About page content not found");
    }
    return status.successResponse(res, "Retrieved", content);
  } catch (error) {
    console.error('Get About Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const content = await findSingle();
    if (!content) {
      return status.notFoundResponse(res, "About page content not found");
    }
    await content.update(req.body);
    const updated = await findSingle([
      { model: Media, as: 'heroImage' },
      { model: Media, as: 'overviewImage' },
      { model: Media, as: 'safetyImage' },
      { model: Media, as: 'excellenceImage' }
    ]);
    return status.successResponse(res, "About page updated", updated);
  } catch (error) {
    console.error('Update About Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

