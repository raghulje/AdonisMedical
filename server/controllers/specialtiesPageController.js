const { SpecialtiesPageContent, SpecialtiesPageCard, Media } = require('../models');
const status = require('../helpers/response');

const findPageContent = async (include = []) => {
  return await SpecialtiesPageContent.findOne({ where: { id: 1 }, include });
};

// Page Content
exports.getPageContent = async (req, res) => {
  try {
    const content = await findPageContent([
      { model: Media, as: 'heroImage' }
    ]);
    if (!content) {
      return status.notFoundResponse(res, "Specialties page content not found");
    }
    return status.successResponse(res, "Retrieved", content);
  } catch (error) {
    console.error('Get Specialties Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const content = await findPageContent();
    if (!content) {
      return status.notFoundResponse(res, "Specialties page content not found");
    }
    await content.update(req.body);
    const updated = await findPageContent([
      { model: Media, as: 'heroImage' }
    ]);
    return status.successResponse(res, "Specialties page updated", updated);
  } catch (error) {
    console.error('Update Specialties Page Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Cards
exports.getCards = async (req, res) => {
  try {
    const cards = await SpecialtiesPageCard.findAll({
      where: { isActive: true },
      order: [['orderIndex', 'ASC']],
      include: [
        { model: Media, as: 'backgroundImage' },
        { model: Media, as: 'cardImage' }
      ]
    });
    return status.successResponse(res, "Retrieved", cards);
  } catch (error) {
    console.error('Get Specialties Page Cards Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.getCardById = async (req, res) => {
  try {
    const card = await SpecialtiesPageCard.findByPk(req.params.id, {
      include: [
        { model: Media, as: 'backgroundImage' },
        { model: Media, as: 'cardImage' }
      ]
    });
    if (!card) {
      return status.notFoundResponse(res, "Card not found");
    }
    return status.successResponse(res, "Retrieved", card);
  } catch (error) {
    console.error('Get Card Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.createCard = async (req, res) => {
  try {
    const card = await SpecialtiesPageCard.create(req.body);
    const created = await SpecialtiesPageCard.findByPk(card.id, {
      include: [
        { model: Media, as: 'backgroundImage' },
        { model: Media, as: 'cardImage' }
      ]
    });
    return status.createdResponse(res, "Card created", created);
  } catch (error) {
    console.error('Create Card Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateCard = async (req, res) => {
  try {
    const card = await SpecialtiesPageCard.findByPk(req.params.id);
    if (!card) {
      return status.notFoundResponse(res, "Card not found");
    }
    await card.update(req.body);
    const updated = await SpecialtiesPageCard.findByPk(card.id, {
      include: [
        { model: Media, as: 'backgroundImage' },
        { model: Media, as: 'cardImage' }
      ]
    });
    return status.successResponse(res, "Card updated", updated);
  } catch (error) {
    console.error('Update Card Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await SpecialtiesPageCard.findByPk(req.params.id);
    if (!card) {
      return status.notFoundResponse(res, "Card not found");
    }
    await card.destroy();
    return status.successResponse(res, "Card deleted");
  } catch (error) {
    console.error('Delete Card Error:', error);
    return status.errorResponse(res, error.message);
  }
};

