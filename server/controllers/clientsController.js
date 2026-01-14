const { Client, Media, ClientsPageContent } = require('../models');
const status = require('../helpers/response');

const findPageContent = async (include = []) => {
  const options = { where: { id: 1 } };
  if (include && include.length > 0) {
    options.include = include;
  }
  return await ClientsPageContent.findOne(options);
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
    console.error('Get Clients Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    let content = await findPageContent();
    
    // If content doesn't exist, create it
    if (!content) {
      content = await ClientsPageContent.create({
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
    
    return status.successResponse(res, "Clients page updated", responseData);
  } catch (error) {
    console.error('Update Clients Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Clients
exports.getAll = async (req, res) => {
  try {
    // Check if this is a CMS request (authenticated) - show all clients including inactive
    // Public requests (frontend) should only show active clients
    const isAuthenticated = req.user && req.user.id;
    const whereClause = isAuthenticated ? {} : { isActive: true };
    
    const clients = await Client.findAll({
      where: whereClause,
      order: [['orderIndex', 'ASC']],
      include: [{ model: Media, as: 'logo', required: false }]
    });
    // Convert to plain objects to ensure proper JSON serialization
    const clientsData = clients.map(client => client.toJSON());
    return status.successResponse(res, "Retrieved", clientsData);
  } catch (error) {
    console.error('Get Clients Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id, {
      include: [{ model: Media, as: 'logo', required: false }]
    });
    if (!client) {
      return status.notFoundResponse(res, "Client not found");
    }
    // Convert to plain object to ensure proper JSON serialization
    return status.successResponse(res, "Retrieved", client.toJSON());
  } catch (error) {
    console.error('Get Client Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.create = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    return status.createdResponse(res, "Client created", client);
  } catch (error) {
    console.error('Create Client Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return status.notFoundResponse(res, "Client not found");
    }
    await client.update(req.body);
    return status.successResponse(res, "Client updated", client);
  } catch (error) {
    console.error('Update Client Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return status.notFoundResponse(res, "Client not found");
    }
    await client.destroy();
    return status.successResponse(res, "Client deleted");
  } catch (error) {
    console.error('Delete Client Error:', error);
    return status.errorResponse(res, error.message);
  }
};

