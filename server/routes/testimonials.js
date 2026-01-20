const router = require("express").Router();
const { Testimonial, Media } = require('../models');
const status = require('../helpers/response');

router.get("/", async (req, res) => {
  try {
    // If includeAll query param is true, return all testimonials (for CMS)
    // Otherwise, return only active testimonials (for public display)
    const includeAll = req.query.includeAll === 'true';
    const whereClause = includeAll ? {} : { isActive: true };
    
    const testimonials = await Testimonial.findAll({
      where: whereClause,
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
    // Fetch with image association
    const created = await Testimonial.findByPk(testimonial.id, {
      include: [{ model: Media, as: 'clientImage' }]
    });
    return status.createdResponse(res, "Testimonial created", created);
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
    // Fetch updated testimonial with image association
    const updated = await Testimonial.findByPk(req.params.id, {
      include: [{ model: Media, as: 'clientImage' }]
    });
    return status.successResponse(res, "Testimonial updated", updated);
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

