const { OurProductsPageContent, Media } = require('../models');
const status = require('../helpers/response');

const findSingle = async (include = []) => {
  return await OurProductsPageContent.findOne({ where: { id: 1 }, include });
};

exports.getPageContent = async (req, res) => {
  try {
    const content = await findSingle([
      { model: Media, as: 'heroImage' }
    ]);
    if (!content) {
      // Create default if not exists
      const newContent = await OurProductsPageContent.create({ id: 1 });
      return status.successResponse(res, "Retrieved", newContent);
    }
    return status.successResponse(res, "Retrieved", content);
  } catch (error) {
    console.error('Get Our Products Page Content Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    let content = await findSingle();
    if (!content) {
      content = await OurProductsPageContent.create({ id: 1, ...req.body });
    } else {
      await content.update(req.body);
    }
    const updated = await findSingle([
      { model: Media, as: 'heroImage' }
    ]);
    return status.successResponse(res, "Our Products Page Content updated", updated);
  } catch (error) {
    console.error('Update Our Products Page Content Error:', error);
    return status.errorResponse(res, error.message);
  }
};

