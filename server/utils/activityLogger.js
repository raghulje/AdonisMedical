const { ActivityLog } = require('../models');

/**
 * Log an activity to the activity logs table
 * @param {Object} options - Activity log options
 * @param {number} options.userId - User ID who performed the action
 * @param {string} options.action - Action type (create, update, delete, restore, login, logout)
 * @param {string} options.entityType - Type of entity (e.g., 'home_hero_section', 'product')
 * @param {number} options.entityId - ID of the entity
 * @param {string} options.page - Page name (e.g., 'Home', 'About')
 * @param {string} options.section - Section name (e.g., 'Hero Section')
 * @param {string} options.field - Field name that was changed
 * @param {string} options.oldValue - Previous value
 * @param {string} options.newValue - New value
 * @param {string} options.description - Description of the action
 * @param {string} options.ipAddress - IP address of the user
 * @param {string} options.userAgent - User agent string
 * @param {Object} options.metadata - Additional metadata
 */
async function logActivity({
  userId = null,
  action,
  entityType = null,
  entityId = null,
  page = null,
  section = null,
  field = null,
  oldValue = null,
  newValue = null,
  description = null,
  ipAddress = null,
  userAgent = null,
  metadata = null
}) {
  try {
    await ActivityLog.create({
      userId,
      action,
      entityType,
      entityId,
      page,
      section,
      field,
      oldValue: oldValue ? String(oldValue).substring(0, 5000) : null, // Limit length
      newValue: newValue ? String(newValue).substring(0, 5000) : null, // Limit length
      description,
      ipAddress,
      userAgent,
      metadata
    });
  } catch (error) {
    // Don't throw error - logging should not break the main operation
    console.error('Error logging activity:', error);
  }
}

/**
 * Get client IP address from request
 */
function getClientIp(req) {
  return req.ip || 
         req.connection.remoteAddress || 
         req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         null;
}

/**
 * Get user agent from request
 */
function getUserAgent(req) {
  return req.headers['user-agent'] || null;
}

module.exports = {
  logActivity,
  getClientIp,
  getUserAgent
};

