const { NavigationItem } = require('../models');
const status = require('../helpers/response');

exports.getAll = async (req, res) => {
  try {
    // Check if this is a CMS request (authenticated) - show all items including inactive
    // Public requests (frontend) should only show active items
    const isAuthenticated = req.user && req.user.id;
    const whereClause = isAuthenticated ? {} : { isActive: true };
    const childrenWhereClause = isAuthenticated ? {} : { isActive: true };
    
    const items = await NavigationItem.findAll({
      where: whereClause,
      order: [['orderIndex', 'ASC']],
      include: [{ 
        model: NavigationItem, 
        as: 'children',
        where: childrenWhereClause,
        required: false,
        order: [['orderIndex', 'ASC']]
      }]
    });
    
    // Convert to plain objects to ensure proper JSON serialization
    const itemsData = items.map(item => item.toJSON());
    
    return status.successResponse(res, "Retrieved", itemsData);
  } catch (error) {
    console.error('Get Navigation Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await NavigationItem.findByPk(req.params.id, {
      include: [{ model: NavigationItem, as: 'children' }]
    });
    if (!item) {
      return status.notFoundResponse(res, "Navigation item not found");
    }
    return status.successResponse(res, "Retrieved", item);
  } catch (error) {
    console.error('Get Navigation Item Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.create = async (req, res) => {
  try {
    const item = await NavigationItem.create(req.body);
    return status.createdResponse(res, "Navigation item created", item);
  } catch (error) {
    console.error('Create Navigation Item Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const item = await NavigationItem.findByPk(req.params.id);
    if (!item) {
      return status.notFoundResponse(res, "Navigation item not found");
    }
    await item.update(req.body);
    return status.successResponse(res, "Navigation item updated", item);
  } catch (error) {
    console.error('Update Navigation Item Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await NavigationItem.findByPk(req.params.id);
    if (!item) {
      return status.notFoundResponse(res, "Navigation item not found");
    }
    await item.destroy();
    return status.successResponse(res, "Navigation item deleted");
  } catch (error) {
    console.error('Delete Navigation Item Error:', error);
    return status.errorResponse(res, error.message);
  }
};

