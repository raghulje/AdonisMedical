const { OurProductsPageContent, OurProductsItem, Media } = require('../models');
const status = require('../helpers/response');

const findSingle = async (include = []) => {
  return await OurProductsPageContent.findOne({ where: { id: 1 }, include });
};

exports.getPageContent = async (req, res) => {
  try {
    const content = await findSingle([
      { model: Media, as: 'heroImage' },
      { model: Media, as: 'sectionBackgroundImage' }
    ]);
    if (!content) {
      // Create default if not exists
      const newContent = await OurProductsPageContent.create({ id: 1 });
      return status.successResponse(res, "Retrieved", newContent);
    }
    return status.successResponse(res, "Retrieved", content);
  } catch (error) {
    console.error('Get Our Products Page Content Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    let content = await findSingle();
    if (!content) {
      content = await OurProductsPageContent.create({ id: 1, ...req.body });
    } else {
      await content.update(req.body);
    }
    const updated = await findSingle([
      { model: Media, as: 'heroImage' },
      { model: Media, as: 'sectionBackgroundImage' }
    ]);
    return status.successResponse(res, "Our Products Page Content updated", updated);
  } catch (error) {
    console.error('Update Our Products Page Content Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// PRODUCTS ITEMS CRUD
exports.getProductsItems = async (req, res) => {
  try {
    const items = await OurProductsItem.findAll({
      order: [['orderIndex', 'ASC']],
      include: [
        { model: Media, as: 'productImage' },
        { model: Media, as: 'backgroundImage' }
      ]
    });
    return status.successResponse(res, "Retrieved", items);
  } catch (error) {
    console.error('Get Products Items Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createProductsItem = async (req, res) => {
  try {
    const item = await OurProductsItem.create(req.body);
    const created = await OurProductsItem.findByPk(item.id, {
      include: [
        { model: Media, as: 'productImage' },
        { model: Media, as: 'backgroundImage' }
      ]
    });
    return status.createdResponse(res, "Product item created", created);
  } catch (error) {
    console.error('Create Products Item Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateProductsItem = async (req, res) => {
  try {
    const item = await OurProductsItem.findByPk(req.params.id);
    if (!item) {
      return status.notFoundResponse(res, "Product item not found");
    }
    await item.update(req.body);
    const updated = await OurProductsItem.findByPk(item.id, {
      include: [
        { model: Media, as: 'productImage' },
        { model: Media, as: 'backgroundImage' }
      ]
    });
    return status.successResponse(res, "Product item updated", updated);
  } catch (error) {
    console.error('Update Products Item Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteProductsItem = async (req, res) => {
  try {
    const item = await OurProductsItem.findByPk(req.params.id);
    if (!item) {
      return status.notFoundResponse(res, "Product item not found");
    }
    await item.destroy();
    return status.successResponse(res, "Product item deleted", null);
  } catch (error) {
    console.error('Delete Products Item Error:', error);
    return status.errorResponse(res, error.message);
  }
};

