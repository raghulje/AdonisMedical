const { InvestorRelationsPageContent, InvestorDocument, Media } = require('../models');
const status = require('../helpers/response');

const findSingle = async (include = []) => {
  return await InvestorRelationsPageContent.findOne({ where: { id: 1 }, include });
};

exports.getPageContent = async (req, res) => {
  try {
    const content = await findSingle([
      { model: Media, as: 'heroImage' }
    ]);
    if (!content) {
      return status.notFoundResponse(res, "Investor Relations page content not found");
    }
    return status.successResponse(res, "Retrieved", content);
  } catch (error) {
    console.error('Get Investor Relations Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const content = await findSingle();
    if (!content) {
      return status.notFoundResponse(res, "Investor Relations page content not found");
    }
    await content.update(req.body);
    const updated = await findSingle([
      { model: Media, as: 'heroImage' }
    ]);
    return status.successResponse(res, "Investor Relations page updated", updated);
  } catch (error) {
    console.error('Update Investor Relations Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Investor Documents
exports.getDocuments = async (req, res) => {
  try {
    const documents = await InvestorDocument.findAll({
      where: { isActive: true },
      order: [['orderIndex', 'ASC']],
      include: [{ model: Media, as: 'file' }]
    });
    return status.successResponse(res, "Retrieved", documents);
  } catch (error) {
    console.error('Get Investor Documents Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createDocument = async (req, res) => {
  try {
    const document = await InvestorDocument.create(req.body);
    return status.createdResponse(res, "Document created", document);
  } catch (error) {
    console.error('Create Investor Document Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const document = await InvestorDocument.findByPk(req.params.id);
    if (!document) {
      return status.notFoundResponse(res, "Document not found");
    }
    await document.update(req.body);
    return status.successResponse(res, "Document updated", document);
  } catch (error) {
    console.error('Update Investor Document Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const document = await InvestorDocument.findByPk(req.params.id);
    if (!document) {
      return status.notFoundResponse(res, "Document not found");
    }
    await document.destroy();
    return status.successResponse(res, "Document deleted");
  } catch (error) {
    console.error('Delete Investor Document Error:', error);
    return status.errorResponse(res, error.message);
  }
};

