const { Leader, Media } = require('../models');
const status = require('../helpers/response');

exports.getAll = async (req, res) => {
  try {
    const leaders = await Leader.findAll({
      where: { isActive: true },
      order: [['orderIndex', 'ASC']],
      include: [{ model: Media, as: 'image' }]
    });
    return status.successResponse(res, "Retrieved", leaders);
  } catch (error) {
    console.error('Get Leaders Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const leader = await Leader.findByPk(req.params.id, {
      include: [{ model: Media, as: 'image' }]
    });
    if (!leader) {
      return status.notFoundResponse(res, "Leader not found");
    }
    return status.successResponse(res, "Retrieved", leader);
  } catch (error) {
    console.error('Get Leader Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.create = async (req, res) => {
  try {
    const leader = await Leader.create(req.body);
    return status.createdResponse(res, "Leader created", leader);
  } catch (error) {
    console.error('Create Leader Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const leader = await Leader.findByPk(req.params.id);
    if (!leader) {
      return status.notFoundResponse(res, "Leader not found");
    }
    await leader.update(req.body);
    return status.successResponse(res, "Leader updated", leader);
  } catch (error) {
    console.error('Update Leader Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const leader = await Leader.findByPk(req.params.id);
    if (!leader) {
      return status.notFoundResponse(res, "Leader not found");
    }
    await leader.destroy();
    return status.successResponse(res, "Leader deleted");
  } catch (error) {
    console.error('Delete Leader Error:', error);
    return status.errorResponse(res, error.message);
  }
};

