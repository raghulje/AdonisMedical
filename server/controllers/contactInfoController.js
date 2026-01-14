const { ContactInfo } = require('../models');
const status = require('../helpers/response');

const findSingle = async () => {
  return await ContactInfo.findOne({ where: { id: 1 } });
};

exports.get = async (req, res) => {
  try {
    const info = await findSingle();
    if (!info) {
      // Return default structure if not found instead of 404
      return status.successResponse(res, "Retrieved", {
        id: null,
        companyName: null,
        addressLine1: null,
        addressLine2: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
        phone: null,
        email: null,
        supportEmail: null,
        googleMapsEmbedUrl: null,
        address: null
      });
    }
    // Convert to plain object and ensure address is constructed
    const data = info.toJSON();
    // Construct full address from address components for backward compatibility
    const addressParts = [
      data.addressLine1,
      data.addressLine2,
      data.city,
      data.state,
      data.postalCode,
      data.country
    ].filter(Boolean);
    data.address = addressParts.length > 0 ? addressParts.join(', ') : null;
    
    return status.successResponse(res, "Retrieved", data);
  } catch (error) {
    console.error('Get Contact Info Error:', error);
    return status.errorResponse(res, error.message);
  }
};

exports.update = async (req, res) => {
  try {
    let info = await findSingle();
    
    // If contact info doesn't exist, create it with id = 1
    if (!info) {
      info = await ContactInfo.create({
        id: 1,
        companyName: req.body.companyName || 'ADONIS MEDICAL SYSTEMS PVT LTD',
        addressLine1: req.body.addressLine1 || null,
        addressLine2: req.body.addressLine2 || null,
        city: req.body.city || null,
        state: req.body.state || null,
        postalCode: req.body.postalCode || null,
        country: req.body.country || null,
        phone: req.body.phone || null,
        email: req.body.email || null,
        supportEmail: req.body.supportEmail || null,
        googleMapsEmbedUrl: req.body.googleMapsEmbedUrl || null
      });
    } else {
      await info.update(req.body);
    }
    
    // Fetch updated info and format response
    const updated = await findSingle();
    const data = updated.toJSON();
    // Construct full address from address components
    const addressParts = [
      data.addressLine1,
      data.addressLine2,
      data.city,
      data.state,
      data.postalCode,
      data.country
    ].filter(Boolean);
    data.address = addressParts.length > 0 ? addressParts.join(', ') : null;
    
    return status.successResponse(res, "Contact information updated", data);
  } catch (error) {
    console.error('Update Contact Info Error:', error);
    return status.errorResponse(res, error.message);
  }
};

