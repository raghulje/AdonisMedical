const { Specialty, Media } = require('../models');
const status = require('../helpers/response');

exports.getAll = async (req, res) => {
  try {
    const specialties = await Specialty.findAll({
      where: { isActive: true },
      order: [['orderIndex', 'ASC']],
      include: [{ model: Media, as: 'image' }]
    });
    return status.successResponse(res, "Retrieved", specialties);
  } catch (error) {
    console.error('Get Specialties Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const specialty = await Specialty.findByPk(req.params.id, {
      include: [{ model: Media, as: 'image' }]
    });
    if (!specialty) {
      return status.notFoundResponse(res, "Specialty not found");
    }
    return status.successResponse(res, "Retrieved", specialty);
  } catch (error) {
    console.error('Get Specialty Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getBySlug = async (req, res) => {
  try {
    const specialty = await Specialty.findOne({
      where: { slug: req.params.slug, isActive: true },
      include: [{ model: Media, as: 'image' }]
    });
    if (!specialty) {
      return status.notFoundResponse(res, "Specialty not found");
    }
    return status.successResponse(res, "Retrieved", specialty);
  } catch (error) {
    console.error('Get Specialty Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.create = async (req, res) => {
  try {
    const specialty = await Specialty.create(req.body);
    return status.createdResponse(res, "Specialty created", specialty);
  } catch (error) {
    console.error('Create Specialty Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const specialty = await Specialty.findByPk(req.params.id);
    if (!specialty) {
      return status.notFoundResponse(res, "Specialty not found");
    }
    await specialty.update(req.body);
    return status.successResponse(res, "Specialty updated", specialty);
  } catch (error) {
    console.error('Update Specialty Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const specialty = await Specialty.findByPk(req.params.id);
    if (!specialty) {
      return status.notFoundResponse(res, "Specialty not found");
    }
    await specialty.destroy();
    return status.successResponse(res, "Specialty deleted");
  } catch (error) {
    console.error('Delete Specialty Error:', error);
    return status.errorResponse(res, error.message);
  }
};

