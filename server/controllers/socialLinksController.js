const { SocialLink } = require('../models');
const status = require('../helpers/response');

exports.getAll = async (req, res) => {
  try {
    const { Media } = require('../models');
    const links = await SocialLink.findAll({
      where: { isActive: true },
      include: [{ model: Media, as: 'icon', required: false }],
      order: [['orderIndex', 'ASC']]
    });
    // Convert to plain objects to ensure proper JSON serialization
    const linksData = links.map(link => link.toJSON());
    return status.successResponse(res, "Retrieved", linksData);
  } catch (error) {
    console.error('Get Social Links Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.create = async (req, res) => {
  try {
    const link = await SocialLink.create(req.body);
    return status.createdResponse(res, "Social link created", link);
  } catch (error) {
    console.error('Create Social Link Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const link = await SocialLink.findByPk(req.params.id);
    if (!link) {
      return status.notFoundResponse(res, "Social link not found");
    }
    await link.update(req.body);
    return status.successResponse(res, "Social link updated", link);
  } catch (error) {
    console.error('Update Social Link Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const link = await SocialLink.findByPk(req.params.id);
    if (!link) {
      return status.notFoundResponse(res, "Social link not found");
    }
    await link.destroy();
    return status.successResponse(res, "Social link deleted");
  } catch (error) {
    console.error('Delete Social Link Error:', error);
    return status.errorResponse(res, error.message);
  }
};

