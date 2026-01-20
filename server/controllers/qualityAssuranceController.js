const { QualityAssurancePageContent, Certification, Media } = require('../models');
const status = require('../helpers/response');

const findSingle = async (include = []) => {
  return await QualityAssurancePageContent.findOne({ where: { id: 1 }, include });
};

exports.getPageContent = async (req, res) => {
  try {
    const content = await findSingle([
      { model: Media, as: 'heroImage' },
      { model: Media, as: 'backgroundImage' },
      { model: Media, as: 'mainImage' }
    ]);
    if (!content) {
      return status.notFoundResponse(res, "Quality Assurance page content not found");
    }
    return status.successResponse(res, "Retrieved", content);
  } catch (error) {
    console.error('Get Quality Assurance Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const content = await findSingle();
    if (!content) {
      return status.notFoundResponse(res, "Quality Assurance page content not found");
    }
    await content.update(req.body);
    const updated = await findSingle([
      { model: Media, as: 'heroImage' },
      { model: Media, as: 'backgroundImage' },
      { model: Media, as: 'mainImage' }
    ]);
    return status.successResponse(res, "Quality Assurance page updated", updated);
  } catch (error) {
    console.error('Update Quality Assurance Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Certifications
exports.getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.findAll({
      where: { isActive: true },
      order: [['orderIndex', 'ASC']],
      include: [{ model: Media, as: 'logo' }]
    });
    return status.successResponse(res, "Retrieved", certifications);
  } catch (error) {
    console.error('Get Certifications Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createCertification = async (req, res) => {
  try {
    const certification = await Certification.create(req.body);
    return status.createdResponse(res, "Certification created", certification);
  } catch (error) {
    console.error('Create Certification Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateCertification = async (req, res) => {
  try {
    const certification = await Certification.findByPk(req.params.id);
    if (!certification) {
      return status.notFoundResponse(res, "Certification not found");
    }
    await certification.update(req.body);
    return status.successResponse(res, "Certification updated", certification);
  } catch (error) {
    console.error('Update Certification Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteCertification = async (req, res) => {
  try {
    const certification = await Certification.findByPk(req.params.id);
    if (!certification) {
      return status.notFoundResponse(res, "Certification not found");
    }
    await certification.destroy();
    return status.successResponse(res, "Certification deleted");
  } catch (error) {
    console.error('Delete Certification Error:', error);
    return status.errorResponse(res, error.message);
  }
};

