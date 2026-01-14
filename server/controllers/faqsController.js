const { FaqsPage, FaqsItem, Media } = require('../models');
const status = require('../helpers/response');

// Helper to find single instance
const findSingle = async (Model, include = []) => {
  return await Model.findOne({ where: { id: 1 }, include });
};

// Get FAQs page content
exports.getFaqsPage = async (req, res) => {
  try {
    const page = await findSingle(FaqsPage, [
      { model: Media, as: 'backgroundImage' },
      { model: Media, as: 'sectionBackgroundImage' }
    ]);
    
    if (!page) {
      return status.notFoundResponse(res, 'FAQs page not found');
    }
    
    return status.successResponse(res, 'Retrieved', page);
  } catch (error) {
    console.error('Get FAQs Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Update FAQs page content
exports.updateFaqsPage = async (req, res) => {
  try {
    const { heroTitle, heroSubtitle, backgroundImageId, sectionBackgroundImageId, titleColor, subtitleColor, overlayOpacity } = req.body;
    
    let page = await FaqsPage.findOne({ where: { id: 1 } });
    
    if (!page) {
      page = await FaqsPage.create({
        id: 1,
        heroTitle,
        heroSubtitle,
        backgroundImageId,
        sectionBackgroundImageId,
        titleColor,
        subtitleColor,
        overlayOpacity
      });
    } else {
      await page.update({
        heroTitle,
        heroSubtitle,
        backgroundImageId,
        sectionBackgroundImageId,
        titleColor,
        subtitleColor,
        overlayOpacity
      });
    }
    
    const updated = await findSingle(FaqsPage, [
      { model: Media, as: 'backgroundImage' },
      { model: Media, as: 'sectionBackgroundImage' }
    ]);
    
    return status.successResponse(res, 'FAQs page updated', updated);
  } catch (error) {
    console.error('Update FAQs Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Get all FAQs items
exports.getFaqsItems = async (req, res) => {
  try {
    const items = await FaqsItem.findAll({
      where: { isActive: true },
      include: [
        { model: Media, as: 'image' }
      ],
      order: [['orderIndex', 'ASC']]
    });
    
    return status.successResponse(res, 'Retrieved', items);
  } catch (error) {
    console.error('Get FAQs Items Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Get single FAQs item
exports.getFaqsItem = async (req, res) => {
  try {
    const item = await FaqsItem.findByPk(req.params.id, {
      include: [
        { model: Media, as: 'image' }
      ]
    });
    
    if (!item) {
      return status.notFoundResponse(res, 'FAQs item not found');
    }
    
    return status.successResponse(res, 'Retrieved', item);
  } catch (error) {
    console.error('Get FAQs Item Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Create FAQs item
exports.createFaqsItem = async (req, res) => {
  try {
    const { question, answer, imageId, orderIndex, isActive } = req.body;
    
    const maxOrder = await FaqsItem.max('orderIndex');
    const newOrderIndex = orderIndex !== undefined ? orderIndex : (maxOrder || 0) + 1;
    
    const item = await FaqsItem.create({
      question,
      answer,
      imageId,
      orderIndex: newOrderIndex,
      isActive: isActive !== undefined ? isActive : true
    });
    
    const created = await FaqsItem.findByPk(item.id, {
      include: [
        { model: Media, as: 'image' }
      ]
    });
    
    return status.createdResponse(res, 'FAQs item created', created);
  } catch (error) {
    console.error('Create FAQs Item Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Update FAQs item
exports.updateFaqsItem = async (req, res) => {
  try {
    const item = await FaqsItem.findByPk(req.params.id);
    
    if (!item) {
      return status.notFoundResponse(res, 'FAQs item not found');
    }
    
    const { question, answer, imageId, orderIndex, isActive } = req.body;
    
    await item.update({
      question,
      answer,
      imageId,
      orderIndex,
      isActive
    });
    
    const updated = await FaqsItem.findByPk(item.id, {
      include: [
        { model: Media, as: 'image' }
      ]
    });
    
    return status.successResponse(res, 'FAQs item updated', updated);
  } catch (error) {
    console.error('Update FAQs Item Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Delete FAQs item
exports.deleteFaqsItem = async (req, res) => {
  try {
    const item = await FaqsItem.findByPk(req.params.id);
    
    if (!item) {
      return status.notFoundResponse(res, 'FAQs item not found');
    }
    
    await item.destroy();
    
    return status.successResponse(res, 'FAQs item deleted successfully');
  } catch (error) {
    console.error('Delete FAQs Item Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Reorder FAQs items
exports.reorderFaqsItems = async (req, res) => {
  try {
    const { items } = req.body; // Array of { id, orderIndex }
    
    if (!Array.isArray(items)) {
      return status.badRequestResponse(res, 'Items must be an array');
    }
    
    await Promise.all(
      items.map(({ id, orderIndex }) =>
        FaqsItem.update({ orderIndex }, { where: { id } })
      )
    );
    
    const updated = await FaqsItem.findAll({
      where: { isActive: true },
      include: [
        { model: Media, as: 'image' }
      ],
      order: [['orderIndex', 'ASC']]
    });
    
    return status.successResponse(res, 'FAQs items reordered', updated);
  } catch (error) {
    console.error('Reorder FAQs Items Error:', error);
    return status.errorResponse(res, error.message);
  }
};

