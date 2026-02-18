const { VersionHistory, User } = require('../models');
const status = require('../helpers/response');
const { getVersionHistory, getVersionById, compareVersions } = require('../utils/versionTracker');

/**
 * Get version history for an entity
 */
exports.getHistory = async (req, res) => {
  try {
    const { entityType, entityId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    const versions = await getVersionHistory(entityType, entityId, {
      limit: parseInt(limit),
      offset: parseInt(offset),
      includeCreator: true
    });

    return status.successResponse(res, "Version history retrieved", versions);
  } catch (error) {
    console.error('Get Version History Error:', error);
    return status.errorResponse(res, error.message);
  }
};

/**
 * Get all version history with filters
 */
exports.getAllHistory = async (req, res) => {
  try {
    const {
      page,
      section,
      entityType,
      limit = 50,
      offset = 0
    } = req.query;

    const where = {};
    if (entityType) where.entityType = entityType;

    // Extract page/section from entityType if needed
    // This is a simplified approach - can be enhanced

    const queryOptions = {
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'username', 'email', 'fullName']
      }]
    };

    const { count, rows: versions } = await VersionHistory.findAndCountAll(queryOptions);

    // Transform to match UI expectations
    const transformedVersions = versions.map(v => {
      const entityTypeParts = v.entityType.split('_');
      return {
        id: v.id,
        page: page || entityTypeParts[0] || 'Unknown',
        section: section || v.entityType.replace(/_/g, ' ') || 'Unknown',
        versionNumber: v.versionNumber,
        createdBy: v.creator?.email || 'Unknown',
        createdAt: v.createdAt,
        changes: v.changes ? v.changes.split('\n') : [],
        data: v.data
      };
    });

    return status.successResponse(res, "Version history retrieved", {
      versions: transformedVersions,
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('Get All Version History Error:', error);
    return status.errorResponse(res, error.message);
  }
};

/**
 * Get a specific version
 */
exports.getVersion = async (req, res) => {
  try {
    const { id } = req.params;
    const version = await getVersionById(id);

    if (!version) {
      return status.notFoundResponse(res, "Version not found");
    }

    return status.successResponse(res, "Version retrieved", version);
  } catch (error) {
    console.error('Get Version Error:', error);
    return status.errorResponse(res, error.message);
  }
};

/**
 * Compare two versions
 */
exports.compareVersions = async (req, res) => {
  try {
    const { versionId1, versionId2 } = req.body;

    const version1 = await getVersionById(versionId1);
    const version2 = await getVersionById(versionId2);

    if (!version1 || !version2) {
      return status.notFoundResponse(res, "One or both versions not found");
    }

    const differences = compareVersions(version1, version2);

    return status.successResponse(res, "Versions compared", {
      version1,
      version2,
      differences
    });
  } catch (error) {
    console.error('Compare Versions Error:', error);
    return status.errorResponse(res, error.message);
  }
};

/**
 * Get version statistics
 */
exports.getStats = async (req, res) => {
  try {
    const totalVersions = await VersionHistory.count();
    const uniquePages = await VersionHistory.count({
      distinct: true,
      col: 'entity_type'
    });
    const latestVersion = await VersionHistory.findOne({
      order: [['createdAt', 'DESC']]
    });

    return status.successResponse(res, "Statistics retrieved", {
      totalVersions,
      pagesTracked: uniquePages,
      latestUpdate: latestVersion?.createdAt || null
    });
  } catch (error) {
    console.error('Get Version Stats Error:', error);
    return status.errorResponse(res, error.message);
  }
};

