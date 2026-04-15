const { ContactSubmission, EmailSettings } = require('../models');
const status = require('../helpers/response');
const { getRequestMeta, phoneToDigitsOnly } = require('../helpers/requestMeta');
const { sendToKissflowWebhook } = require('../helpers/kissflowWebhook');
const { validateContactSubmission } = require('../helpers/contactFormValidation');

const WEBSITE_NAME = 'Adonis';

// Helper function to send email
const sendEmail = async (to, subject, htmlContent, textContent) => {
  try {
    const emailSettings = await EmailSettings.findOne({ where: { isActive: true } });
    if (!emailSettings || !emailSettings.contactFormEmail) {
      console.warn('Email settings not configured or contact form email not set');
      return false;
    }

    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: emailSettings.smtpHost,
      port: emailSettings.smtpPort,
      secure: emailSettings.smtpSecure === 'ssl',
      auth: {
        user: emailSettings.smtpUser,
        pass: emailSettings.smtpPassword
      }
    });

    await transporter.sendMail({
      from: `"${emailSettings.fromName}" <${emailSettings.fromEmail}>`,
      to: to,
      subject: subject,
      html: htmlContent,
      text: textContent
    });

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Create a new contact submission
exports.create = async (req, res) => {
  try {
    const validated = validateContactSubmission(req.body);
    if (!validated.ok) {
      return status.badRequestResponse(res, validated.message);
    }
    const { name, email, mobile, message } = validated;
    const { source, company } = req.body || {};

    // Get client IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for']?.split(',')[0];
    const userAgent = req.headers['user-agent'];

    // Kissflow webhook: fire-and-forget (queued, non-blocking)
    const meta = getRequestMeta(req);
    const phoneDigits = phoneToDigitsOnly(mobile);
    const webhookData = {
      name,
      email,
      phone: phoneDigits,
      Phone_Number: phoneDigits,
      company: company ?? '',
      message,
      ...(validated.countryDialCode ? { countryDialCode: validated.countryDialCode } : {}),
      ...meta
    };
    sendToKissflowWebhook(WEBSITE_NAME, 'Contact form', webhookData);

    // Save submission in DB (best-effort - webhook must not be blocked)
    let submission = null;
    try {
      submission = await ContactSubmission.create({
        name,
        email,
        mobile,
        message,
        source: source || 'contact-us',
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
        status: 'new'
      });
    } catch (dbError) {
      console.error('Create Contact Submission DB error (continuing):', dbError);
    }

    // Send email notification (best-effort)
    try {
      const emailSettings = await EmailSettings.findOne({ where: { isActive: true } });
      if (emailSettings && emailSettings.contactFormEmail) {
        const htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">New Contact Form Submission</h2>
            <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Mobile:</strong> ${mobile}</p>
              <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
              <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280; font-size: 12px;">
                <strong>Submitted:</strong> ${new Date().toLocaleString()}<br>
                <strong>Source:</strong> ${req.body.source || 'contact-us'}
              </p>
            </div>
          </div>
        `;
        const textContent = `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}\n\nSubmitted: ${new Date().toLocaleString()}\nSource: ${req.body.source || 'contact-us'}`;
        
        await sendEmail(
          emailSettings.contactFormEmail,
          'New Contact Form Submission - Adonis Medical',
          htmlContent,
          textContent
        );
      }
    } catch (emailError) {
      console.error('Error sending contact form email (continuing):', emailError);
      // Don't fail the request if email fails
    }

    return status.createdResponse(res, "Contact submission received successfully", submission);
  } catch (error) {
    console.error('Create Contact Submission Error:', error);
    // Hardening: even if an unexpected error occurs, do not block the frontend.
    // Leads are best-effort via the Kissflow queue above; failing the request here
    // would cause the UI to show an error and users to resubmit.
    return status.createdResponse(res, "Contact submission received successfully", null);
  }
};

// Get all contact submissions (for admin)
exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 20, status: statusFilter } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (statusFilter) {
      where.status = statusFilter;
    }

    const { count, rows } = await ContactSubmission.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: offset
    });

    return status.successResponse(res, "Retrieved", {
      submissions: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get Contact Submissions Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Get a single contact submission
exports.getById = async (req, res) => {
  try {
    const submission = await ContactSubmission.findByPk(req.params.id);
    if (!submission) {
      return status.notFoundResponse(res, "Contact submission not found");
    }
    return status.successResponse(res, "Retrieved", submission);
  } catch (error) {
    console.error('Get Contact Submission Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Update contact submission status
exports.updateStatus = async (req, res) => {
  try {
    const submission = await ContactSubmission.findByPk(req.params.id);
    if (!submission) {
      return status.notFoundResponse(res, "Contact submission not found");
    }

    if (req.body.status) {
      const allowedStatuses = ['new', 'read', 'replied', 'archived'];
      if (!allowedStatuses.includes(req.body.status)) {
        return status.errorResponse(res, "Invalid status");
      }
      await submission.update({ status: req.body.status });
    }

    return status.successResponse(res, "Contact submission updated", submission);
  } catch (error) {
    console.error('Update Contact Submission Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Delete a contact submission
exports.delete = async (req, res) => {
  try {
    const submission = await ContactSubmission.findByPk(req.params.id);
    if (!submission) {
      return status.notFoundResponse(res, "Contact submission not found");
    }
    await submission.destroy();
    return status.successResponse(res, "Contact submission deleted");
  } catch (error) {
    console.error('Delete Contact Submission Error:', error);
    return status.errorResponse(res, error.message);
  }
};

