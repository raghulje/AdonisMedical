const { FooterSection, FooterLink, FooterLogo, Media } = require('../models');
const status = require('../helpers/response');

// Footer Sections
exports.getSections = async (req, res) => {
  try {
    const sections = await FooterSection.findAll({
      order: [['orderIndex', 'ASC']],
      include: [{ 
        model: FooterLink, 
        as: 'links', 
        separate: true,
        order: [['orderIndex', 'ASC']],
        include: [{ model: Media, as: 'iconImage' }]
      }]
    });
    // Convert to plain objects to ensure proper JSON serialization
    const sectionsData = sections.map(section => section.toJSON());
    return status.successResponse(res, "Retrieved", sectionsData);
  } catch (error) {
    console.error('Get Footer Sections Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createSection = async (req, res) => {
  try {
    const section = await FooterSection.create(req.body);
    return status.createdResponse(res, "Footer section created", section);
  } catch (error) {
    console.error('Create Footer Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateSection = async (req, res) => {
  try {
    const section = await FooterSection.findByPk(req.params.id);
    if (!section) {
      return status.notFoundResponse(res, "Footer section not found");
    }
    await section.update(req.body);
    return status.successResponse(res, "Footer section updated", section);
  } catch (error) {
    console.error('Update Footer Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const section = await FooterSection.findByPk(req.params.id);
    if (!section) {
      return status.notFoundResponse(res, "Footer section not found");
    }
    await section.destroy();
    return status.successResponse(res, "Footer section deleted");
  } catch (error) {
    console.error('Delete Footer Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Footer Links
exports.getLinks = async (req, res) => {
  try {
    const links = await FooterLink.findAll({
      order: [['orderIndex', 'ASC']]
    });
    return status.successResponse(res, "Retrieved", links);
  } catch (error) {
    console.error('Get Footer Links Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createLink = async (req, res) => {
  try {
    const link = await FooterLink.create(req.body);
    return status.createdResponse(res, "Footer link created", link);
  } catch (error) {
    console.error('Create Footer Link Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateLink = async (req, res) => {
  try {
    const link = await FooterLink.findByPk(req.params.id);
    if (!link) {
      return status.notFoundResponse(res, "Footer link not found");
    }
    await link.update(req.body);
    return status.successResponse(res, "Footer link updated", link);
  } catch (error) {
    console.error('Update Footer Link Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteLink = async (req, res) => {
  try {
    const link = await FooterLink.findByPk(req.params.id);
    if (!link) {
      return status.notFoundResponse(res, "Footer link not found");
    }
    await link.destroy();
    return status.successResponse(res, "Footer link deleted");
  } catch (error) {
    console.error('Delete Footer Link Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Footer Logos
exports.getLogos = async (req, res) => {
  try {
    const logos = await FooterLogo.findAll({
      order: [['orderIndex', 'ASC']],
      include: [{ model: Media, as: 'logoImage' }]
    });
    return status.successResponse(res, "Retrieved", logos);
  } catch (error) {
    console.error('Get Footer Logos Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getLogoById = async (req, res) => {
  try {
    const logo = await FooterLogo.findByPk(req.params.id, {
      include: [{ model: Media, as: 'logoImage' }]
    });
    if (!logo) {
      return status.notFoundResponse(res, "Footer logo not found");
    }
    return status.successResponse(res, "Retrieved", logo);
  } catch (error) {
    console.error('Get Footer Logo Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createLogo = async (req, res) => {
  try {
    const logo = await FooterLogo.create(req.body);
    const created = await FooterLogo.findByPk(logo.id, {
      include: [{ model: Media, as: 'logoImage' }]
    });
    return status.createdResponse(res, "Footer logo created", created);
  } catch (error) {
    console.error('Create Footer Logo Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateLogo = async (req, res) => {
  try {
    const logo = await FooterLogo.findByPk(req.params.id);
    if (!logo) {
      return status.notFoundResponse(res, "Footer logo not found");
    }
    await logo.update(req.body);
    const updated = await FooterLogo.findByPk(logo.id, {
      include: [{ model: Media, as: 'logoImage' }]
    });
    return status.successResponse(res, "Footer logo updated", updated);
  } catch (error) {
    console.error('Update Footer Logo Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteLogo = async (req, res) => {
  try {
    const logo = await FooterLogo.findByPk(req.params.id);
    if (!logo) {
      return status.notFoundResponse(res, "Footer logo not found");
    }
    await logo.destroy();
    return status.successResponse(res, "Footer logo deleted");
  } catch (error) {
    console.error('Delete Footer Logo Error:', error);
    return status.errorResponse(res, error.message);
  }
};

