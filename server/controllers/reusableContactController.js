const { ReusableContactSection, Media } = require('../models');
const status = require('../helpers/response');

const allowedUpdateFields = [
    'heading', 'companyName', 'address', 'phone', 'email',
    'imageId', 'backgroundImageId', 'phoneIconId', 'emailIconId'
];

exports.getSection = async (req, res) => {
    try {
        let section = await ReusableContactSection.findOne({
            where: { id: 1 },
            include: [
                { model: Media, as: 'image' },
                { model: Media, as: 'backgroundImage' },
                { model: Media, as: 'phoneIcon' },
                { model: Media, as: 'emailIcon' }
            ]
        });
        if (!section) {
            // Create default record if not exists
            await ReusableContactSection.create({
                id: 1,
                heading: 'Contact Us',
                companyName: 'ADONIS MEDICAL SYSTEMS PVT LTD',
                address: 'E-70, PHASE- VIII, INDUSTRIAL AREA,\nMOHALI, 160071.',
                phone: '9872003273',
                email: 'support@adonismedical.com'
            });
            section = await ReusableContactSection.findByPk(1, {
                include: [
                    { model: Media, as: 'image' },
                    { model: Media, as: 'backgroundImage' },
                    { model: Media, as: 'phoneIcon' },
                    { model: Media, as: 'emailIcon' }
                ]
            });
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
            section = await ReusableContactSection.create({ id: 1 });
        }
        const updateData = {};
        allowedUpdateFields.forEach(field => {
            if (req.body.hasOwnProperty(field)) {
                updateData[field] = req.body[field] === '' ? null : req.body[field];
            }
        });
        await section.update(updateData);
        const updated = await ReusableContactSection.findByPk(1, {
            include: [
                { model: Media, as: 'image' },
                { model: Media, as: 'backgroundImage' },
                { model: Media, as: 'phoneIcon' },
                { model: Media, as: 'emailIcon' }
            ]
        });
        return status.successResponse(res, "Reusable contact section updated", updated);
    } catch (error) {
        console.error('Update Reusable Contact Section Error:', error);
        return status.errorResponse(res, error.message);
    }
};
