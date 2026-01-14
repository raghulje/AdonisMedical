const { DemoRequest } = require('../models');
const status = require('../helpers/response');

// Create a new demo request
exports.create = async (req, res) => {
  try {
    // Get client IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for']?.split(',')[0];
    const userAgent = req.headers['user-agent'];

    const demoRequest = await DemoRequest.create({
      name: req.body.name,
      hospitalName: req.body.hospitalName,
      email: req.body.email,
      mobile: req.body.mobile,
      product: req.body.product,
      preferredDate: req.body.preferredDate || req.body.date,
      message: req.body.message || null,
      ipAddress: ipAddress || null,
      userAgent: userAgent || null,
      status: 'pending'
    });

    return status.createdResponse(res, "Demo request received successfully", demoRequest);
  } catch (error) {
    console.error('Create Demo Request Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Get all demo requests (for admin)
exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 20, status: statusFilter } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (statusFilter) {
      where.status = statusFilter;
    }

    const { count, rows } = await DemoRequest.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: offset
    });

    return status.successResponse(res, "Retrieved", {
      requests: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get Demo Requests Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Get a single demo request
exports.getById = async (req, res) => {
  try {
    const request = await DemoRequest.findByPk(req.params.id);
    if (!request) {
      return status.notFoundResponse(res, "Demo request not found");
    }
    return status.successResponse(res, "Retrieved", request);
  } catch (error) {
    console.error('Get Demo Request Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Update demo request status
exports.updateStatus = async (req, res) => {
  try {
    const request = await DemoRequest.findByPk(req.params.id);
    if (!request) {
      return status.notFoundResponse(res, "Demo request not found");
    }

    if (req.body.status) {
      const allowedStatuses = ['pending', 'scheduled', 'completed', 'cancelled'];
      if (!allowedStatuses.includes(req.body.status)) {
        return status.errorResponse(res, "Invalid status");
      }
      await request.update({ status: req.body.status });
    }

    if (req.body.preferredDate) {
      await request.update({ preferredDate: req.body.preferredDate });
    }

    return status.successResponse(res, "Demo request updated", request);
  } catch (error) {
    console.error('Update Demo Request Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Delete a demo request
exports.delete = async (req, res) => {
  try {
    const request = await DemoRequest.findByPk(req.params.id);
    if (!request) {
      return status.notFoundResponse(res, "Demo request not found");
    }
    await request.destroy();
    return status.successResponse(res, "Demo request deleted");
  } catch (error) {
    console.error('Delete Demo Request Error:', error);
    return status.errorResponse(res, error.message);
  }
};

