const { AboutPageContent, AboutPageHighlight, AboutPageOverviewParagraph, AboutPageGlobalReachCard, Media } = require('../models');
const status = require('../helpers/response');

const findSingle = async (include = []) => {
  return await AboutPageContent.findOne({ where: { id: 1 }, include });
};

exports.getPageContent = async (req, res) => {
  try {
    const content = await findSingle([
      { model: Media, as: 'heroImage' },
      { model: Media, as: 'overviewImage' },
      { model: Media, as: 'backgroundImage', required: false },
      { model: Media, as: 'safetyImage' },
      { model: Media, as: 'excellenceImage' }
    ]);
    if (!content) {
      return status.notFoundResponse(res, "About page content not found");
    }
    // Get highlights
    const highlights = await AboutPageHighlight.findAll({
      where: { sectionName: 'overview' },
      include: [{ model: Media, as: 'icon', required: false }],
      order: [['orderIndex', 'ASC']]
    });
    // Get paragraphs
    const paragraphs = await AboutPageOverviewParagraph.findAll({
      order: [['orderIndex', 'ASC'], ['position', 'ASC']]
    });
    // Get global reach cards
    const globalReachCards = await AboutPageGlobalReachCard.findAll({
      include: [{ model: Media, as: 'icon', required: false }],
      order: [['orderIndex', 'ASC']]
    });
    const contentData = content.toJSON();
    contentData.highlights = highlights.map(h => h.toJSON ? h.toJSON() : h);
    contentData.overviewParagraphs = paragraphs.map(p => p.toJSON ? p.toJSON() : p);
    contentData.globalReachCards = globalReachCards.map(c => c.toJSON ? c.toJSON() : c);
    return status.successResponse(res, "Retrieved", contentData);
  } catch (error) {
    console.error('Get About Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const content = await findSingle();
    if (!content) {
      return status.notFoundResponse(res, "About page content not found");
    }
    await content.update(req.body);
    const updated = await findSingle([
      { model: Media, as: 'heroImage' },
      { model: Media, as: 'overviewImage' },
      { model: Media, as: 'backgroundImage', required: false },
      { model: Media, as: 'safetyImage' },
      { model: Media, as: 'excellenceImage' }
    ]);
    // Get highlights
    const highlights = await AboutPageHighlight.findAll({
      where: { sectionName: 'overview' },
      include: [{ model: Media, as: 'icon', required: false }],
      order: [['orderIndex', 'ASC']]
    });
    // Get paragraphs
    const paragraphs = await AboutPageOverviewParagraph.findAll({
      order: [['orderIndex', 'ASC'], ['position', 'ASC']]
    });
    // Get global reach cards
    const globalReachCards = await AboutPageGlobalReachCard.findAll({
      include: [{ model: Media, as: 'icon', required: false }],
      order: [['orderIndex', 'ASC']]
    });
    const updatedData = updated.toJSON();
    updatedData.highlights = highlights.map(h => h.toJSON ? h.toJSON() : h);
    updatedData.overviewParagraphs = paragraphs.map(p => p.toJSON ? p.toJSON() : p);
    updatedData.globalReachCards = globalReachCards.map(c => c.toJSON ? c.toJSON() : c);
    return status.successResponse(res, "About page updated", updatedData);
  } catch (error) {
    console.error('Update About Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// HIGHLIGHTS
exports.getHighlights = async (req, res) => {
  try {
    const highlights = await AboutPageHighlight.findAll({
      where: { sectionName: 'overview' },
      include: [{ model: Media, as: 'icon', required: false }],
      order: [['orderIndex', 'ASC']]
    });
    return status.successResponse(res, "Retrieved", highlights);
  } catch (error) {
    console.error('Get Highlights Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createHighlight = async (req, res) => {
  try {
    const { text, iconId, iconClass, sectionName = 'overview' } = req.body;
    const maxOrder = await AboutPageHighlight.max('orderIndex', { where: { sectionName } });
    const orderIndex = (maxOrder || -1) + 1;
    
    const highlight = await AboutPageHighlight.create({
      text,
      iconId,
      iconClass,
      sectionName,
      orderIndex
    });
    
    const created = await AboutPageHighlight.findByPk(highlight.id, {
      include: [{ model: Media, as: 'icon', required: false }]
    });
    
    return status.createdResponse(res, "Highlight created", created);
  } catch (error) {
    console.error('Create Highlight Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateHighlight = async (req, res) => {
  try {
    const { id } = req.params;
    const highlight = await AboutPageHighlight.findByPk(id);
    if (!highlight) {
      return status.notFoundResponse(res, "Highlight not found");
    }
    await highlight.update(req.body);
    const updated = await AboutPageHighlight.findByPk(id, {
      include: [{ model: Media, as: 'icon', required: false }]
    });
    return status.successResponse(res, "Highlight updated", updated);
  } catch (error) {
    console.error('Update Highlight Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteHighlight = async (req, res) => {
  try {
    const { id } = req.params;
    const highlight = await AboutPageHighlight.findByPk(id);
    if (!highlight) {
      return status.notFoundResponse(res, "Highlight not found");
    }
    await highlight.destroy();
    return status.successResponse(res, "Highlight deleted");
  } catch (error) {
    console.error('Delete Highlight Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.reorderHighlights = async (req, res) => {
  try {
    const { highlights } = req.body; // Array of { id, orderIndex }
    
    if (!Array.isArray(highlights)) {
      return status.errorResponse(res, "Invalid highlights array");
    }
    
    await Promise.all(
      highlights.map(({ id, orderIndex }) =>
        AboutPageHighlight.update({ orderIndex }, { where: { id } })
      )
    );
    
    const updated = await AboutPageHighlight.findAll({
      where: { sectionName: 'overview' },
      include: [{ model: Media, as: 'icon', required: false }],
      order: [['orderIndex', 'ASC']]
    });
    
    return status.successResponse(res, "Highlights reordered", updated);
  } catch (error) {
    console.error('Reorder Highlights Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// OVERVIEW PARAGRAPHS
exports.getOverviewParagraphs = async (req, res) => {
  try {
    const paragraphs = await AboutPageOverviewParagraph.findAll({
      order: [['orderIndex', 'ASC'], ['position', 'ASC']]
    });
    return status.successResponse(res, "Retrieved", paragraphs);
  } catch (error) {
    console.error('Get Overview Paragraphs Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createOverviewParagraph = async (req, res) => {
  try {
    const { content, position = 'before' } = req.body;
    const maxOrder = await AboutPageOverviewParagraph.max('orderIndex', {
      where: { position }
    });
    const orderIndex = (maxOrder || -1) + 1;
    
    const paragraph = await AboutPageOverviewParagraph.create({
      content,
      position,
      orderIndex
    });
    
    return status.createdResponse(res, "Paragraph created", paragraph);
  } catch (error) {
    console.error('Create Overview Paragraph Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateOverviewParagraph = async (req, res) => {
  try {
    const { id } = req.params;
    const paragraph = await AboutPageOverviewParagraph.findByPk(id);
    if (!paragraph) {
      return status.notFoundResponse(res, "Paragraph not found");
    }
    await paragraph.update(req.body);
    return status.successResponse(res, "Paragraph updated", paragraph);
  } catch (error) {
    console.error('Update Overview Paragraph Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteOverviewParagraph = async (req, res) => {
  try {
    const { id } = req.params;
    const paragraph = await AboutPageOverviewParagraph.findByPk(id);
    if (!paragraph) {
      return status.notFoundResponse(res, "Paragraph not found");
    }
    await paragraph.destroy();
    return status.successResponse(res, "Paragraph deleted");
  } catch (error) {
    console.error('Delete Overview Paragraph Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.reorderOverviewParagraphs = async (req, res) => {
  try {
    const { paragraphs } = req.body; // Array of { id, orderIndex }
    
    if (!Array.isArray(paragraphs)) {
      return status.errorResponse(res, "Invalid paragraphs array");
    }
    
    await Promise.all(
      paragraphs.map(({ id, orderIndex }) =>
        AboutPageOverviewParagraph.update({ orderIndex }, { where: { id } })
      )
    );
    
    const updated = await AboutPageOverviewParagraph.findAll({
      order: [['orderIndex', 'ASC'], ['position', 'ASC']]
    });
    
    return status.successResponse(res, "Paragraphs reordered", updated);
  } catch (error) {
    console.error('Reorder Overview Paragraphs Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// GLOBAL REACH CARDS
exports.getGlobalReachCards = async (req, res) => {
  try {
    const cards = await AboutPageGlobalReachCard.findAll({
      include: [{ model: Media, as: 'icon', required: false }],
      order: [['orderIndex', 'ASC']]
    });
    return status.successResponse(res, "Retrieved", cards);
  } catch (error) {
    console.error('Get Global Reach Cards Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createGlobalReachCard = async (req, res) => {
  try {
    const { iconClass, iconId, content } = req.body;
    const maxOrder = await AboutPageGlobalReachCard.max('orderIndex');
    const orderIndex = (maxOrder || -1) + 1;
    
    const card = await AboutPageGlobalReachCard.create({
      iconClass,
      iconId,
      content,
      orderIndex
    });
    
    const created = await AboutPageGlobalReachCard.findByPk(card.id, {
      include: [{ model: Media, as: 'icon', required: false }]
    });
    
    return status.createdResponse(res, "Card created", created);
  } catch (error) {
    console.error('Create Global Reach Card Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateGlobalReachCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await AboutPageGlobalReachCard.findByPk(id);
    if (!card) {
      return status.notFoundResponse(res, "Card not found");
    }
    await card.update(req.body);
    const updated = await AboutPageGlobalReachCard.findByPk(id, {
      include: [{ model: Media, as: 'icon', required: false }]
    });
    return status.successResponse(res, "Card updated", updated);
  } catch (error) {
    console.error('Update Global Reach Card Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteGlobalReachCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await AboutPageGlobalReachCard.findByPk(id);
    if (!card) {
      return status.notFoundResponse(res, "Card not found");
    }
    await card.destroy();
    return status.successResponse(res, "Card deleted");
  } catch (error) {
    console.error('Delete Global Reach Card Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.reorderGlobalReachCards = async (req, res) => {
  try {
    const { cards } = req.body; // Array of { id, orderIndex }
    
    if (!Array.isArray(cards)) {
      return status.errorResponse(res, "Invalid cards array");
    }
    
    await Promise.all(
      cards.map(({ id, orderIndex }) =>
        AboutPageGlobalReachCard.update({ orderIndex }, { where: { id } })
      )
    );
    
    const updated = await AboutPageGlobalReachCard.findAll({
      include: [{ model: Media, as: 'icon', required: false }],
      order: [['orderIndex', 'ASC']]
    });
    
    return status.successResponse(res, "Cards reordered", updated);
  } catch (error) {
    console.error('Reorder Global Reach Cards Error:', error);
    return status.errorResponse(res, error.message);
  }
};

