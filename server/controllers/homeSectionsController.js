const { 
  HomeHeroSection, 
  HomeAboutSection,
  HomeAboutParagraph,
  HomeStats, 
  HomeQualitySection,
  HomeProductsSection,
  HomeProductsCard,
  HomeSpecialtiesSection,
  HomeTestimonialsSection,
  HomeContactSection,
  Media 
} = require('../models');
const status = require('../helpers/response');

// Helper to find single instance
const findSingle = async (Model, include = []) => {
  return await Model.findOne({ where: { id: 1 }, include });
};

// HERO SECTION
exports.getHeroSection = async (req, res) => {
  try {
    const section = await findSingle(HomeHeroSection, [
      { model: Media, as: 'backgroundImage' }
    ]);
    if (!section) {
      return status.notFoundResponse(res, "Hero Section not found");
    }
    return status.successResponse(res, "Retrieved", section);
  } catch (error) {
    console.error('Get Hero Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateHeroSection = async (req, res) => {
  try {
    const section = await findSingle(HomeHeroSection);
    if (!section) {
      return status.notFoundResponse(res, "Hero Section not found");
    }
    await section.update(req.body);
    const updated = await findSingle(HomeHeroSection, [
      { model: Media, as: 'backgroundImage' }
    ]);
    return status.successResponse(res, "Hero Section updated", updated);
  } catch (error) {
    console.error('Update Hero Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// ABOUT SECTION
exports.getAboutSection = async (req, res) => {
  try {
    const section = await findSingle(HomeAboutSection, [
      { model: Media, as: 'mainImage' }
    ]);
    if (!section) {
      return status.notFoundResponse(res, "About Section not found");
    }
    // Get paragraphs
    const paragraphs = await HomeAboutParagraph.findAll({ 
      order: [['orderIndex', 'ASC']] 
    });
    const sectionData = section.toJSON();
    sectionData.paragraphs = paragraphs;
    return status.successResponse(res, "Retrieved", sectionData);
  } catch (error) {
    console.error('Get About Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateAboutSection = async (req, res) => {
  try {
    const section = await findSingle(HomeAboutSection);
    if (!section) {
      return status.notFoundResponse(res, "About Section not found");
    }
    await section.update(req.body);
    const updated = await findSingle(HomeAboutSection, [
      { model: Media, as: 'mainImage' }
    ]);
    const paragraphs = await HomeAboutParagraph.findAll({ 
      order: [['orderIndex', 'ASC']] 
    });
    const sectionData = updated.toJSON();
    sectionData.paragraphs = paragraphs;
    return status.successResponse(res, "About Section updated", sectionData);
  } catch (error) {
    console.error('Update About Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// ABOUT PARAGRAPHS
exports.getAboutParagraphs = async (req, res) => {
  try {
    const paragraphs = await HomeAboutParagraph.findAll({ 
      order: [['orderIndex', 'ASC']] 
    });
    return status.successResponse(res, "Retrieved", paragraphs);
  } catch (error) {
    console.error('Get About Paragraphs Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createAboutParagraph = async (req, res) => {
  try {
    const paragraph = await HomeAboutParagraph.create(req.body);
    return status.createdResponse(res, "Paragraph created", paragraph);
  } catch (error) {
    console.error('Create About Paragraph Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateAboutParagraph = async (req, res) => {
  try {
    const paragraph = await HomeAboutParagraph.findByPk(req.params.id);
    if (!paragraph) {
      return status.notFoundResponse(res, "Paragraph not found");
    }
    await paragraph.update(req.body);
    return status.successResponse(res, "Paragraph updated", paragraph);
  } catch (error) {
    console.error('Update About Paragraph Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteAboutParagraph = async (req, res) => {
  try {
    const paragraph = await HomeAboutParagraph.findByPk(req.params.id);
    if (!paragraph) {
      return status.notFoundResponse(res, "Paragraph not found");
    }
    await paragraph.destroy();
    return status.successResponse(res, "Paragraph deleted");
  } catch (error) {
    console.error('Delete About Paragraph Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// STATS
exports.getStats = async (req, res) => {
  try {
    const stats = await HomeStats.findAll({ 
      order: [['orderIndex', 'ASC']],
      include: [
        { model: Media, as: 'image' }
      ]
    });
    return status.successResponse(res, "Retrieved", stats);
  } catch (error) {
    console.error('Get Stats Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createStat = async (req, res) => {
  try {
    const stat = await HomeStats.create(req.body);
    const statWithImage = await HomeStats.findByPk(stat.id, {
      include: [
        { model: Media, as: 'image' }
      ]
    });
    return status.createdResponse(res, "Stat created", statWithImage);
  } catch (error) {
    console.error('Create Stat Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateStat = async (req, res) => {
  try {
    const stat = await HomeStats.findByPk(req.params.id);
    if (!stat) {
      return status.notFoundResponse(res, "Stat not found");
    }
    await stat.update(req.body);
    const updatedStat = await HomeStats.findByPk(req.params.id, {
      include: [
        { model: Media, as: 'image' }
      ]
    });
    return status.successResponse(res, "Stat updated", updatedStat);
  } catch (error) {
    console.error('Update Stat Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteStat = async (req, res) => {
  try {
    const stat = await HomeStats.findByPk(req.params.id);
    if (!stat) {
      return status.notFoundResponse(res, "Stat not found");
    }
    await stat.destroy();
    return status.successResponse(res, "Stat deleted");
  } catch (error) {
    console.error('Delete Stat Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// QUALITY SECTION
exports.getQualitySection = async (req, res) => {
  try {
    const section = await findSingle(HomeQualitySection, [
      { model: Media, as: 'backgroundImage' }
    ]);
    if (!section) {
      return status.notFoundResponse(res, "Quality Section not found");
    }
    return status.successResponse(res, "Retrieved", section);
  } catch (error) {
    console.error('Get Quality Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateQualitySection = async (req, res) => {
  try {
    const section = await findSingle(HomeQualitySection);
    if (!section) {
      return status.notFoundResponse(res, "Quality Section not found");
    }
    await section.update(req.body);
    const updated = await findSingle(HomeQualitySection, [
      { model: Media, as: 'backgroundImage' }
    ]);
    return status.successResponse(res, "Quality Section updated", updated);
  } catch (error) {
    console.error('Update Quality Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// PRODUCTS SECTION
exports.getProductsSection = async (req, res) => {
  try {
    const section = await findSingle(HomeProductsSection, [
      { model: Media, as: 'backgroundImage' }
    ]);
    if (!section) {
      // Create default if not exists
      const newSection = await HomeProductsSection.create({ id: 1 });
      return status.successResponse(res, "Retrieved", newSection);
    }
    return status.successResponse(res, "Retrieved", section);
  } catch (error) {
    console.error('Get Products Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateProductsSection = async (req, res) => {
  try {
    let section = await findSingle(HomeProductsSection);
    if (!section) {
      section = await HomeProductsSection.create({ id: 1, ...req.body });
    } else {
      await section.update(req.body);
    }
    const updated = await findSingle(HomeProductsSection, [
      { model: Media, as: 'backgroundImage' }
    ]);
    return status.successResponse(res, "Products Section updated", updated);
  } catch (error) {
    console.error('Update Products Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// PRODUCTS CARDS
exports.getProductsCards = async (req, res) => {
  try {
    const cards = await HomeProductsCard.findAll({
      order: [['orderIndex', 'ASC']],
      include: [
        { model: Media, as: 'backgroundImage' },
        { model: Media, as: 'cardImage' }
      ]
    });
    return status.successResponse(res, "Retrieved", cards);
  } catch (error) {
    console.error('Get Products Cards Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createProductsCard = async (req, res) => {
  try {
    const card = await HomeProductsCard.create(req.body);
    const created = await HomeProductsCard.findByPk(card.id, {
      include: [
        { model: Media, as: 'backgroundImage' },
        { model: Media, as: 'cardImage' }
      ]
    });
    return status.createdResponse(res, "Card created", created);
  } catch (error) {
    console.error('Create Products Card Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateProductsCard = async (req, res) => {
  try {
    const card = await HomeProductsCard.findByPk(req.params.id);
    if (!card) {
      return status.notFoundResponse(res, "Card not found");
    }
    await card.update(req.body);
    const updated = await HomeProductsCard.findByPk(card.id, {
      include: [
        { model: Media, as: 'backgroundImage' },
        { model: Media, as: 'cardImage' }
      ]
    });
    return status.successResponse(res, "Card updated", updated);
  } catch (error) {
    console.error('Update Products Card Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteProductsCard = async (req, res) => {
  try {
    const card = await HomeProductsCard.findByPk(req.params.id);
    if (!card) {
      return status.notFoundResponse(res, "Card not found");
    }
    await card.destroy();
    return status.successResponse(res, "Card deleted");
  } catch (error) {
    console.error('Delete Products Card Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// SPECIALTIES SECTION
exports.getSpecialtiesSection = async (req, res) => {
  try {
    const section = await findSingle(HomeSpecialtiesSection, [
      { model: Media, as: 'image' }
    ]);
    if (!section) {
      // Create default if not exists
      const newSection = await HomeSpecialtiesSection.create({ id: 1 });
      return status.successResponse(res, "Retrieved", newSection);
    }
    return status.successResponse(res, "Retrieved", section);
  } catch (error) {
    console.error('Get Specialties Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateSpecialtiesSection = async (req, res) => {
  try {
    let section = await findSingle(HomeSpecialtiesSection);
    if (!section) {
      section = await HomeSpecialtiesSection.create({ id: 1, ...req.body });
    } else {
      await section.update(req.body);
    }
    const updated = await findSingle(HomeSpecialtiesSection, [
      { model: Media, as: 'image' }
    ]);
    return status.successResponse(res, "Specialties Section updated", updated);
  } catch (error) {
    console.error('Update Specialties Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// TESTIMONIALS SECTION
exports.getTestimonialsSection = async (req, res) => {
  try {
    const section = await findSingle(HomeTestimonialsSection);
    if (!section) {
      // Create default if not exists
      const newSection = await HomeTestimonialsSection.create({ id: 1 });
      return status.successResponse(res, "Retrieved", newSection);
    }
    return status.successResponse(res, "Retrieved", section);
  } catch (error) {
    console.error('Get Testimonials Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateTestimonialsSection = async (req, res) => {
  try {
    let section = await findSingle(HomeTestimonialsSection);
    if (!section) {
      section = await HomeTestimonialsSection.create({ id: 1, ...req.body });
    } else {
      await section.update(req.body);
    }
    const updated = await findSingle(HomeTestimonialsSection);
    return status.successResponse(res, "Testimonials Section updated", updated);
  } catch (error) {
    console.error('Update Testimonials Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// CONTACT SECTION
exports.getContactSection = async (req, res) => {
  try {
    const section = await findSingle(HomeContactSection, [
      { model: Media, as: 'image' }
    ]);
    if (!section) {
      // Create default if not exists
      const newSection = await HomeContactSection.create({ id: 1 });
      return status.successResponse(res, "Retrieved", newSection);
    }
    return status.successResponse(res, "Retrieved", section);
  } catch (error) {
    console.error('Get Contact Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateContactSection = async (req, res) => {
  try {
    let section = await findSingle(HomeContactSection);
    if (!section) {
      section = await HomeContactSection.create({ id: 1, ...req.body });
    } else {
      await section.update(req.body);
    }
    const updated = await findSingle(HomeContactSection, [
      { model: Media, as: 'image' }
    ]);
    return status.successResponse(res, "Contact Section updated", updated);
  } catch (error) {
    console.error('Update Contact Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

