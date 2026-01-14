const { ContactUsPageContent } = require('../models');
const status = require('../helpers/response');

const findSingle = async () => {
  return await ContactUsPageContent.findOne({ where: { id: 1 } });
};

exports.getPageContent = async (req, res) => {
  try {
    const content = await findSingle();
    if (!content) {
      return status.notFoundResponse(res, "Contact Us page content not found");
    }
    return status.successResponse(res, "Retrieved", content);
  } catch (error) {
    console.error('Get Contact Us Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const content = await findSingle();
    if (!content) {
      return status.notFoundResponse(res, "Contact Us page content not found");
    }
    await content.update(req.body);
    return status.successResponse(res, "Contact Us page updated", content);
  } catch (error) {
    console.error('Update Contact Us Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

