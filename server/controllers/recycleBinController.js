const status = require('../helpers/response');
const { Op } = require('sequelize');

/**
 * Get all soft-deleted items across different tables
 */
exports.getDeletedItems = async (req, res) => {
  try {
    const { type, limit = 50, offset = 0 } = req.query;
    const models = require('../models');
    const deletedItems = [];

    // Define tables to check for soft deletes
    const tables = [
      { model: models.HomeProductsCard, type: 'product', page: 'Home', section: 'Products Section', titleField: 'name' },
      { model: models.Award, type: 'award', page: 'Awards', section: 'Awards List', titleField: 'title' },
      { model: models.Job, type: 'job', page: 'Careers', section: 'Job Openings', titleField: 'title' },
      { model: models.Client, type: 'client', page: 'Clients', section: 'Clients List', titleField: 'name' },
      { model: models.Testimonial, type: 'testimonial', page: 'Home', section: 'Testimonials', titleField: 'authorName' },
      { model: models.OurProductsItem, type: 'product', page: 'Our Products', section: 'Products Section', titleField: 'name' },
      { model: models.HospitalsServed, type: 'hospital', page: 'Products', section: 'Hospitals Served', titleField: 'hospitalName' },
      { model: models.FaqsItem, type: 'faq', page: 'FAQs', section: 'FAQs List', titleField: 'question' },
    ];

    for (const table of tables) {
      if (type && type !== 'all' && table.type !== type) continue;

      try {
        const items = await table.model.findAll({
          where: {
            deletedAt: { [Op.ne]: null }
          },
          order: [['deletedAt', 'DESC']],
          limit: parseInt(limit),
          offset: parseInt(offset),
          paranoid: false // Include soft-deleted items
        });

        for (const item of items) {
          deletedItems.push({
            id: `${table.model.name}_${item.id}`,
            type: table.type,
            page: table.page,
            section: table.section,
            title: item[table.titleField] || `Item ${item.id}`,
            deletedBy: item.deletedBy || null,
            deletedAt: item.deletedAt,
            data: item.toJSON(),
            originalId: item.id,
            modelName: table.model.name
          });
        }
      } catch (error) {
        // Skip tables that don't have deletedAt column yet
        console.warn(`Error fetching deleted items from ${table.model.name}:`, error.message);
      }
    }

    // Sort by deletedAt descending
    deletedItems.sort((a, b) => new Date(b.deletedAt) - new Date(a.deletedAt));

    // Apply limit and offset after combining
    const total = deletedItems.length;
    const paginatedItems = deletedItems.slice(parseInt(offset), parseInt(offset) + parseInt(limit));

    return status.successResponse(res, "Deleted items retrieved", {
      items: paginatedItems,
      total,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('Get Deleted Items Error:', error);
    return status.errorResponse(res, error.message);
  }
};

/**
 * Restore a soft-deleted item
 */
exports.restoreItem = async (req, res) => {
  try {
    const { id } = req.params;
    const [modelName, itemId] = id.split('_');

    const models = require('../models');
    const Model = models[modelName];

    if (!Model) {
      return status.notFoundResponse(res, "Model not found");
    }

    const item = await Model.findOne({
      where: { id: itemId },
      paranoid: false
    });

    if (!item) {
      return status.notFoundResponse(res, "Item not found");
    }

    if (!item.deletedAt) {
      return status.errorResponse(res, "Item is not deleted");
    }

    // Restore the item
    item.deletedAt = null;
    await item.save();

    // Log the restore action
    const { logActivity, getClientIp, getUserAgent } = require('../utils/activityLogger');
    await logActivity({
      userId: req.user?.id || null,
      action: 'restore',
      entityType: modelName,
      entityId: itemId,
      description: `Restored ${modelName} #${itemId}`,
      ipAddress: getClientIp(req),
      userAgent: getUserAgent(req)
    });

    return status.successResponse(res, "Item restored successfully", item);
  } catch (error) {
    console.error('Restore Item Error:', error);
    return status.errorResponse(res, error.message);
  }
};

/**
 * Permanently delete an item
 */
exports.permanentDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const [modelName, itemId] = id.split('_');

    const models = require('../models');
    const Model = models[modelName];

    if (!Model) {
      return status.notFoundResponse(res, "Model not found");
    }

    const item = await Model.findOne({
      where: { id: itemId },
      paranoid: false
    });

    if (!item) {
      return status.notFoundResponse(res, "Item not found");
    }

    // Permanently delete
    await item.destroy({ force: true });

    // Log the permanent delete action
    const { logActivity, getClientIp, getUserAgent } = require('../utils/activityLogger');
    await logActivity({
      userId: req.user?.id || null,
      action: 'delete',
      entityType: modelName,
      entityId: itemId,
      description: `Permanently deleted ${modelName} #${itemId}`,
      ipAddress: getClientIp(req),
      userAgent: getUserAgent(req)
    });

    return status.successResponse(res, "Item permanently deleted");
  } catch (error) {
    console.error('Permanent Delete Error:', error);
    return status.errorResponse(res, error.message);
  }
};

/**
 * Empty recycle bin (permanently delete all items older than 30 days)
 */
exports.emptyBin = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));

    const models = require('../models');
    const tables = [
      models.HomeProductsCard,
      models.Award,
      models.Job,
      models.Client,
      models.Testimonial,
      models.OurProductsItem,
      models.HospitalsServed,
      models.FaqsItem,
    ];

    let totalDeleted = 0;

    for (const Model of tables) {
      try {
        const deleted = await Model.destroy({
          where: {
            deletedAt: { [Op.lte]: cutoffDate }
          },
          force: true
        });
        totalDeleted += deleted;
      } catch (error) {
        console.warn(`Error emptying ${Model.name}:`, error.message);
      }
    }

    // Log the action
    const { logActivity, getClientIp, getUserAgent } = require('../utils/activityLogger');
    await logActivity({
      userId: req.user?.id || null,
      action: 'delete',
      entityType: 'recycle_bin',
      description: `Emptied recycle bin - permanently deleted ${totalDeleted} items older than ${days} days`,
      ipAddress: getClientIp(req),
      userAgent: getUserAgent(req)
    });

    return status.successResponse(res, "Recycle bin emptied", { totalDeleted });
  } catch (error) {
    console.error('Empty Recycle Bin Error:', error);
    return status.errorResponse(res, error.message);
  }
};

