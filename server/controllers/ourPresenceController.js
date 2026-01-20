const { OurPresencePageContent, OfficeLocation, Media } = require('../models');
const status = require('../helpers/response');

const findSingle = async (include = []) => {
  return await OurPresencePageContent.findOne({ where: { id: 1 }, include });
};

exports.getPageContent = async (req, res) => {
  try {
    const content = await findSingle([
      { model: Media, as: 'heroImage' },
      { model: Media, as: 'mapImage' },
      { model: Media, as: 'mapBackgroundImage' },
      { model: Media, as: 'salesServiceImage' }
    ]);
    if (!content) {
      return status.notFoundResponse(res, "Our Presence page content not found");
    }
    return status.successResponse(res, "Retrieved", content);
  } catch (error) {
    console.error('Get Our Presence Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const content = await findSingle();
    if (!content) {
      return status.notFoundResponse(res, "Our Presence page content not found");
    }
    await content.update(req.body);
    const updated = await findSingle([
      { model: Media, as: 'heroImage' },
      { model: Media, as: 'mapImage' },
      { model: Media, as: 'salesServiceImage' }
    ]);
    return status.successResponse(res, "Our Presence page updated", updated);
  } catch (error) {
    console.error('Update Our Presence Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Office Locations
exports.getLocations = async (req, res) => {
  try {
    const locations = await OfficeLocation.findAll({
      where: { isActive: true },
      order: [['city', 'ASC']]
    });
    return status.successResponse(res, "Retrieved", locations);
  } catch (error) {
    console.error('Get Office Locations Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createLocation = async (req, res) => {
  try {
    const location = await OfficeLocation.create(req.body);
    return status.createdResponse(res, "Location created", location);
  } catch (error) {
    console.error('Create Office Location Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const location = await OfficeLocation.findByPk(req.params.id);
    if (!location) {
      return status.notFoundResponse(res, "Location not found");
    }
    await location.update(req.body);
    return status.successResponse(res, "Location updated", location);
  } catch (error) {
    console.error('Update Office Location Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const location = await OfficeLocation.findByPk(req.params.id);
    if (!location) {
      return status.notFoundResponse(res, "Location not found");
    }
    await location.destroy();
    return status.successResponse(res, "Location deleted");
  } catch (error) {
    console.error('Delete Office Location Error:', error);
    return status.errorResponse(res, error.message);
  }
};

