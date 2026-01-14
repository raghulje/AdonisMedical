const { Award, Media, AwardsPageContent } = require('../models');
const status = require('../helpers/response');

const findPageContent = async (include = []) => {
  const options = { where: { id: 1 } };
  if (include && include.length > 0) {
    options.include = include;
  }
  return await AwardsPageContent.findOne(options);
};

// Page Content
exports.getPageContent = async (req, res) => {
  try {
    const content = await findPageContent([
      { model: Media, as: 'heroImage', required: false }
    ]);
    // Return default content if not found (instead of 404)
    if (!content) {
      return status.successResponse(res, "Retrieved", {
        id: null,
        heroTitle: null,
        heroSubtitle: null,
        heroImageId: null,
        introText: null,
        heroImage: null
      });
    }
    // Convert to plain object to ensure proper JSON serialization
    const responseData = content.toJSON();
    return status.successResponse(res, "Retrieved", responseData);
  } catch (error) {
    console.error('Get Awards Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    let content = await findPageContent();
    
    // If content doesn't exist, create it
    if (!content) {
      content = await AwardsPageContent.create({
        id: 1,
        heroTitle: req.body.heroTitle || null,
        heroSubtitle: req.body.heroSubtitle || null,
        heroImageId: req.body.heroImageId || null,
        introText: req.body.introText || null
      });
    } else {
      // Update existing content
      await content.update(req.body);
    }
    
    // Fetch updated content with associations
    const updated = await findPageContent([
      { model: Media, as: 'heroImage', required: false }
    ]);
    
    // Convert to plain object to ensure proper JSON serialization
    const responseData = updated ? updated.toJSON() : null;
    
    return status.successResponse(res, "Awards page updated", responseData);
  } catch (error) {
    console.error('Update Awards Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Awards
exports.getAll = async (req, res) => {
  try {
    // Check if this is a CMS request (authenticated) - show all awards including inactive
    // Public requests (frontend) should only show active awards
    const isAuthenticated = req.user && req.user.id;
    const whereClause = isAuthenticated ? {} : { isActive: true };
    
    const awards = await Award.findAll({
      where: whereClause,
      order: [['orderIndex', 'ASC']],
      include: [{ model: Media, as: 'image', required: false }]
    });
    // Convert to plain objects to ensure proper JSON serialization
    const awardsData = awards.map(award => award.toJSON());
    return status.successResponse(res, "Retrieved", awardsData);
  } catch (error) {
    console.error('Get Awards Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const award = await Award.findByPk(req.params.id, {
      include: [{ model: Media, as: 'image', required: false }]
    });
    if (!award) {
      return status.notFoundResponse(res, "Award not found");
    }
    // Convert to plain object to ensure proper JSON serialization
    return status.successResponse(res, "Retrieved", award.toJSON());
  } catch (error) {
    console.error('Get Award Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.create = async (req, res) => {
  try {
    const award = await Award.create(req.body);
    return status.createdResponse(res, "Award created", award);
  } catch (error) {
    console.error('Create Award Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const award = await Award.findByPk(req.params.id);
    if (!award) {
      return status.notFoundResponse(res, "Award not found");
    }
    await award.update(req.body);
    // Return updated award with associations
    const updated = await Award.findByPk(req.params.id, {
      include: [{ model: Media, as: 'image', required: false }]
    });
    return status.successResponse(res, "Award updated", updated ? updated.toJSON() : award.toJSON());
  } catch (error) {
    console.error('Update Award Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const award = await Award.findByPk(req.params.id);
    if (!award) {
      return status.notFoundResponse(res, "Award not found");
    }
    await award.destroy();
    return status.successResponse(res, "Award deleted");
  } catch (error) {
    console.error('Delete Award Error:', error);
    return status.errorResponse(res, error.message);
  }
};

