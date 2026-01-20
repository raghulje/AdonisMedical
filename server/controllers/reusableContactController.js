const { ReusableContactSection, Media } = require('../models');
const status = require('../helpers/response');

const findSingle = async (include = []) => {
  return await ReusableContactSection.findOne({ 
    where: { id: 1 }, 
    include: include.length > 0 ? include : undefined
  });
};

exports.getSection = async (req, res) => {
  try {
    const section = await ReusableContactSection.findOne({ 
      where: { id: 1 },
      include: [
        { model: Media, as: 'image', required: false },
        { model: Media, as: 'backgroundImage', required: false },
        { model: Media, as: 'phoneIcon', required: false },
        { model: Media, as: 'emailIcon', required: false }
      ]
    });
    if (!section) {
      // Create default if not exists
      const newSection = await ReusableContactSection.create({ id: 1 });
      return status.successResponse(res, "Retrieved", newSection);
    }
    return status.successResponse(res, "Retrieved", section);
  } catch (error) {
    console.error('Get Reusable Contact Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.updateSection = async (req, res) => {
  try {
    let section = await ReusableContactSection.findOne({ where: { id: 1 } });
    if (!section) {
      section = await ReusableContactSection.create({ id: 1, ...req.body });
    } else {
      await section.update(req.body);
    }
    const updated = await ReusableContactSection.findOne({ 
      where: { id: 1 },
      include: [
        { model: Media, as: 'image', required: false },
        { model: Media, as: 'backgroundImage', required: false },
        { model: Media, as: 'phoneIcon', required: false },
        { model: Media, as: 'emailIcon', required: false }
      ]
    });
    return status.successResponse(res, "Reusable Contact Section updated", updated);
  } catch (error) {
    console.error('Update Reusable Contact Section Error:', error);
    return status.errorResponse(res, error.message);
  }
};

