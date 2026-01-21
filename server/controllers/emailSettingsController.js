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
        smtpSecure: 'tls',
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
    const { testEmail } = req.body;
    
    if (!testEmail) {
      return status.errorResponse(res, "Test email address is required");
    }

    const settings = await EmailSettings.findOne({ where: { isActive: true } });
    if (!settings) {
      return status.errorResponse(res, "Email settings not configured");
    }

    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: settings.smtpHost,
      port: settings.smtpPort,
      secure: settings.smtpSecure === 'ssl',
      auth: {
        user: settings.smtpUser,
        pass: settings.smtpPassword
      }
    });

    // Verify connection first
    await transporter.verify();

    // Send test email
    await transporter.sendMail({
      from: `"${settings.fromName}" <${settings.fromEmail}>`,
      to: testEmail,
      subject: 'Test Email from Adonis Medical',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563EB;">SMTP Test Email</h2>
          <p>This is a test email from Adonis Medical to verify that your SMTP configuration is working correctly.</p>
          <p><strong>Configuration Details:</strong></p>
          <ul>
            <li>SMTP Host: ${settings.smtpHost}</li>
            <li>SMTP Port: ${settings.smtpPort}</li>
            <li>From Email: ${settings.fromEmail}</li>
            <li>From Name: ${settings.fromName}</li>
          </ul>
          <p style="color: #059669; font-weight: bold;">✅ If you received this email, your SMTP settings are configured correctly!</p>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 20px 0;">
          <p style="color: #6B7280; font-size: 12px;">This is an automated test email. Please do not reply.</p>
        </div>
      `,
      text: `SMTP Test Email\n\nThis is a test email from Adonis Medical to verify that your SMTP configuration is working correctly.\n\nConfiguration Details:\n- SMTP Host: ${settings.smtpHost}\n- SMTP Port: ${settings.smtpPort}\n- From Email: ${settings.fromEmail}\n- From Name: ${settings.fromName}\n\n✅ If you received this email, your SMTP settings are configured correctly!`
    });

    return status.successResponse(res, `Test email sent successfully to ${testEmail}. Please check your inbox.`);
  } catch (error) {
    console.error('Test SMTP Connection Error:', error);
    return status.errorResponse(res, error.message || "SMTP connection failed");
  }
};

