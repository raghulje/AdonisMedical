const { ActivityLog, User } = require('../models');
const status = require('../helpers/response');

/**
 * Get activity logs with filters
 */
exports.getLogs = async (req, res) => {
  try {
    const {
      action,
      entityType,
      page,
      userId,
      startDate,
      endDate,
      search,
      limit = 50,
      offset = 0
    } = req.query;

    const where = {};
    if (action && action !== 'all') where.action = action;
    if (entityType) where.entityType = entityType;
    if (page && page !== 'all') where.page = page;
    if (userId) where.userId = userId;

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt[require('sequelize').Op.gte] = new Date(startDate);
      if (endDate) where.createdAt[require('sequelize').Op.lte] = new Date(endDate);
    }

    const queryOptions = {
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'email', 'fullName']
      }]
    };

    // Search functionality
    if (search) {
      queryOptions.where[require('sequelize').Op.or] = [
        { description: { [require('sequelize').Op.like]: `%${search}%` } },
        { page: { [require('sequelize').Op.like]: `%${search}%` } },
        { section: { [require('sequelize').Op.like]: `%${search}%` } },
        { field: { [require('sequelize').Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows: logs } = await ActivityLog.findAndCountAll(queryOptions);

    return status.successResponse(res, "Activity logs retrieved", {
      logs,
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('Get Activity Logs Error:', error);
    return status.errorResponse(res, error.message);
  }
};

/**
 * Get activity log statistics
 */
exports.getStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const where = {};
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt[require('sequelize').Op.gte] = new Date(startDate);
      if (endDate) where.createdAt[require('sequelize').Op.lte] = new Date(endDate);
    }

    const [
      totalActions,
      updates,
      deletions,
      creates,
      restores,
      logins
    ] = await Promise.all([
      ActivityLog.count({ where }),
      ActivityLog.count({ where: { ...where, action: 'update' } }),
      ActivityLog.count({ where: { ...where, action: 'delete' } }),
      ActivityLog.count({ where: { ...where, action: 'create' } }),
      ActivityLog.count({ where: { ...where, action: 'restore' } }),
      ActivityLog.count({ where: { ...where, action: 'login' } })
    ]);

    return status.successResponse(res, "Statistics retrieved", {
      totalActions,
      updates,
      deletions,
      creates,
      restores,
      logins
    });
  } catch (error) {
    console.error('Get Activity Log Stats Error:', error);
    return status.errorResponse(res, error.message);
  }
};

/**
 * Export activity logs as CSV
 */
exports.exportLogs = async (req, res) => {
  try {
    const {
      action,
      entityType,
      page,
      startDate,
      endDate
    } = req.query;

    const where = {};
    if (action && action !== 'all') where.action = action;
    if (entityType) where.entityType = entityType;
    if (page && page !== 'all') where.page = page;

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt[require('sequelize').Op.gte] = new Date(startDate);
      if (endDate) where.createdAt[require('sequelize').Op.lte] = new Date(endDate);
    }

    const logs = await ActivityLog.findAll({
      where,
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        as: 'user',
        attributes: ['username', 'email', 'fullName']
      }],
      limit: 10000 // Max export limit
    });

    // Convert to CSV
    const csvRows = [
      ['Timestamp', 'User', 'Email', 'Action', 'Page', 'Section', 'Field', 'Old Value', 'New Value', 'IP Address', 'Description'].join(',')
    ];

    logs.forEach(log => {
      const row = [
        log.createdAt.toISOString(),
        log.user?.fullName || log.user?.username || 'N/A',
        log.user?.email || 'N/A',
        log.action,
        log.page || 'N/A',
        log.section || 'N/A',
        log.field || 'N/A',
        log.oldValue ? `"${String(log.oldValue).replace(/"/g, '""')}"` : 'N/A',
        log.newValue ? `"${String(log.newValue).replace(/"/g, '""')}"` : 'N/A',
        log.ipAddress || 'N/A',
        log.description ? `"${String(log.description).replace(/"/g, '""')}"` : 'N/A'
      ];
      csvRows.push(row.join(','));
    });

    const csv = csvRows.join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=activity-logs-${new Date().toISOString().split('T')[0]}.csv`);
    res.send(csv);
  } catch (error) {
    console.error('Export Activity Logs Error:', error);
    return status.errorResponse(res, error.message);
  }
};

