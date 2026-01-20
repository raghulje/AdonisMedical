const { EmailSettings } = require('../models');
const status = require('../helpers/response');

// Get email settings
exports.getSettings = async (req, res) => {
  try {
    let settings = await EmailSettings.findOne({ where: { isActive: true } });
    if (!settings) {
      // Create default settings if none exist
      settings = await EmailSettings.create({
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        smtpSecure: false,
        smtpUser: '',
        smtpPassword: '',
        fromEmail: '',
        fromName: 'Adonis Medical',
        contactFormEmail: '',
        requestDemoEmail: '',
        isActive: true
      });
    }
    return status.successResponse(res, "Retrieved", settings);
  } catch (error) {
    console.error('Get Email Settings Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Update email settings
exports.updateSettings = async (req, res) => {
  try {
    let settings = await EmailSettings.findOne({ where: { isActive: true } });
    if (!settings) {
      settings = await EmailSettings.create(req.body);
    } else {
      await settings.update(req.body);
    }
    return status.successResponse(res, "Email settings updated", settings);
  } catch (error) {
    console.error('Update Email Settings Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Test email connection
exports.testConnection = async (req, res) => {
  try {
    const settings = await EmailSettings.findOne({ where: { isActive: true } });
    if (!settings) {
      return status.errorResponse(res, "Email settings not configured");
    }

    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: settings.smtpHost,
      port: settings.smtpPort,
      secure: settings.smtpSecure,
      auth: {
        user: settings.smtpUser,
        pass: settings.smtpPassword
      }
    });

    await transporter.verify();
    return status.successResponse(res, "SMTP connection successful");
  } catch (error) {
    console.error('Test SMTP Connection Error:', error);
    return status.errorResponse(res, error.message || "SMTP connection failed");
  }
};

