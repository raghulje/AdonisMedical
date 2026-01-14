const router = require("express").Router();
const { Testimonial, Media } = require('../models');
const status = require('../helpers/response');

router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      where: { isActive: true },
      order: [['orderIndex', 'ASC']],
      include: [{ model: Media, as: 'clientImage' }]
    });
    return status.successResponse(res, "Retrieved", testimonials);
  } catch (error) {
    console.error('Get Testimonials Error:', error);
    return status.errorResponse(res, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id, {
      include: [{ model: Media, as: 'clientImage' }]
    });
    if (!testimonial) {
      return status.notFoundResponse(res, "Testimonial not found");
    }
    return status.successResponse(res, "Retrieved", testimonial);
  } catch (error) {
    console.error('Get Testimonial Error:', error);
    return status.errorResponse(res, error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    return status.createdResponse(res, "Testimonial created", testimonial);
  } catch (error) {
    console.error('Create Testimonial Error:', error);
    return status.errorResponse(res, error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) {
      return status.notFoundResponse(res, "Testimonial not found");
    }
    await testimonial.update(req.body);
    return status.successResponse(res, "Testimonial updated", testimonial);
  } catch (error) {
    console.error('Update Testimonial Error:', error);
    return status.errorResponse(res, error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) {
      return status.notFoundResponse(res, "Testimonial not found");
    }
    await testimonial.destroy();
    return status.successResponse(res, "Testimonial deleted");
  } catch (error) {
    console.error('Delete Testimonial Error:', error);
    return status.errorResponse(res, error.message);
  }
});

module.exports = router;

