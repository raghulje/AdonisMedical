const { HomeContactSection, Media } = require('../models');
const status = require('../helpers/response');

exports.getSection = async (req, res) => {
    try {
        const section = await HomeContactSection.findOne({
            where: { id: 1 },
            include: [
                { model: Media, as: 'image' },
                { model: Media, as: 'backgroundImage' }
            ]
        });
        if (!section) {
            return status.notFoundResponse(res, "Reusable contact section not found");
        }
        return status.successResponse(res, "Retrieved", section);
    } catch (error) {
        console.error('Get Reusable Contact Section Error:', error);
        return status.errorResponse(res, error.message);
    }
};

exports.updateSection = async (req, res) => {
    try {
        const section = await HomeContactSection.findOne({ where: { id: 1 } });
        if (!section) {
            return status.notFoundResponse(res, "Reusable contact section not found");
        }
        await section.update(req.body);
        return status.successResponse(res, "Reusable contact section updated", section);
    } catch (error) {
        console.error('Update Reusable Contact Section Error:', error);
        return status.errorResponse(res, error.message);
    }
};
