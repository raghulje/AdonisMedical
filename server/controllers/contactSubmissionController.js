const { ContactSubmission } = require('../models');
const status = require('../helpers/response');

// Create a new contact submission
exports.create = async (req, res) => {
  try {
    // Get client IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for']?.split(',')[0];
    const userAgent = req.headers['user-agent'];

    const submission = await ContactSubmission.create({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      message: req.body.message || null,
      source: req.body.source || 'contact-us',
      ipAddress: ipAddress || null,
      userAgent: userAgent || null,
      status: 'new'
    });

    return status.createdResponse(res, "Contact submission received successfully", submission);
  } catch (error) {
    console.error('Create Contact Submission Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Get all contact submissions (for admin)
exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 20, status: statusFilter } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (statusFilter) {
      where.status = statusFilter;
    }

    const { count, rows } = await ContactSubmission.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: offset
    });

    return status.successResponse(res, "Retrieved", {
      submissions: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get Contact Submissions Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Get a single contact submission
exports.getById = async (req, res) => {
  try {
    const submission = await ContactSubmission.findByPk(req.params.id);
    if (!submission) {
      return status.notFoundResponse(res, "Contact submission not found");
    }
    return status.successResponse(res, "Retrieved", submission);
  } catch (error) {
    console.error('Get Contact Submission Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Update contact submission status
exports.updateStatus = async (req, res) => {
  try {
    const submission = await ContactSubmission.findByPk(req.params.id);
    if (!submission) {
      return status.notFoundResponse(res, "Contact submission not found");
    }

    if (req.body.status) {
      const allowedStatuses = ['new', 'read', 'replied', 'archived'];
      if (!allowedStatuses.includes(req.body.status)) {
        return status.errorResponse(res, "Invalid status");
      }
      await submission.update({ status: req.body.status });
    }

    return status.successResponse(res, "Contact submission updated", submission);
  } catch (error) {
    console.error('Update Contact Submission Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Delete a contact submission
exports.delete = async (req, res) => {
  try {
    const submission = await ContactSubmission.findByPk(req.params.id);
    if (!submission) {
      return status.notFoundResponse(res, "Contact submission not found");
    }
    await submission.destroy();
    return status.successResponse(res, "Contact submission deleted");
  } catch (error) {
    console.error('Delete Contact Submission Error:', error);
    return status.errorResponse(res, error.message);
  }
};

