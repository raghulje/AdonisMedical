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

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildAutoReply = ({ name, email, phone, product, message }) => {
  const safeName = escapeHtml(name || 'there');
  const safeProduct = escapeHtml(product || '');
  const safeEmail = escapeHtml(email || '');
  const safePhone = escapeHtml(phone || '');
  const safeMessage = escapeHtml(message || '');

  const subject = 'We received your enquiry - Adonis Medical Systems';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111827;">
      <h2 style="margin: 0 0 12px 0; font-size: 20px; color: #2563EB;">Thanks for reaching out</h2>
      <p style="margin: 0 0 12px 0; line-height: 1.6;">Hi ${safeName},</p>
      <p style="margin: 0 0 12px 0; line-height: 1.6;">
        We’ve received your enquiry and our team will get back to you shortly.
      </p>
      <div style="margin-top: 12px; padding: 14px 16px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 10px;">
        <p style="margin: 0 0 6px 0; line-height: 1.6;"><strong>Name:</strong> ${safeName}</p>
        ${safeEmail ? `<p style="margin: 0 0 6px 0; line-height: 1.6;"><strong>Email:</strong> ${safeEmail}</p>` : ''}
        ${safePhone ? `<p style="margin: 0 0 6px 0; line-height: 1.6;"><strong>Contact:</strong> ${safePhone}</p>` : ''}
        ${safeProduct ? `<p style="margin: 0 0 6px 0; line-height: 1.6;"><strong>Product:</strong> ${safeProduct}</p>` : ''}
        ${safeMessage ? `<p style="margin: 0; line-height: 1.6; white-space: pre-wrap;"><strong>Message:</strong><br/>${safeMessage}</p>` : ''}
      </div>
      <div style="margin-top: 18px; padding: 14px 16px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 10px;">
        <p style="margin: 0; font-size: 13px; color: #374151; line-height: 1.6;">
          If you didn’t submit this request, you can ignore this email.
        </p>
      </div>
      <p style="margin: 18px 0 0 0; font-size: 12px; color: #6B7280; line-height: 1.6;">
        Regards,<br/>Adonis Medical Systems
      </p>
    </div>
  `;
  const text = `Hi ${name || 'there'},\n\nWe’ve received your enquiry and our team will get back to you shortly.\n\nYour enquiry details:\n${name ? `- Name: ${name}\n` : ''}${email ? `- Email: ${email}\n` : ''}${phone ? `- Contact: ${phone}\n` : ''}${product ? `- Product: ${product}\n` : ''}${message ? `- Message: ${message}\n` : ''}\nRegards,\nAdonis Medical Systems`;

  return { subject, html, text };
};

// Create a new contact submission
exports.create = async (req, res) => {
  try {
    const validated = validateContactSubmission(req.body);
    if (!validated.ok) {
      return status.badRequestResponse(res, validated.message);
    }
    const { name, email, mobile, message } = validated;
    const { source, company, product } = req.body || {};

    // Get client IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for']?.split(',')[0];
    const userAgent = req.headers['user-agent'];

    // Kissflow webhook: fire-and-forget (queued, non-blocking)
    const meta = getRequestMeta(req);
    const phoneDigits = phoneToDigitsOnly(mobile);
    const webhookData = {
      name,
      email,
      Phone_Number: phoneDigits,
      ...(product ? { Product: product } : {}),
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
              ${product ? `<p><strong>Product:</strong> ${product}</p>` : ''}
              <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
              <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280; font-size: 12px;">
                <strong>Submitted:</strong> ${new Date().toLocaleString()}<br>
                <strong>Source:</strong> ${req.body.source || 'contact-us'}
              </p>
            </div>
          </div>
        `;
        const textContent = `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\n${product ? `Product: ${product}\n` : ''}Message: ${message}\n\nSubmitted: ${new Date().toLocaleString()}\nSource: ${req.body.source || 'contact-us'}`;
        
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

    // Send auto-reply to user (best-effort; do not block response)
    try {
      if (email) {
        setImmediate(async () => {
          try {
            const { subject, html, text } = buildAutoReply({
              name,
              email,
              phone: mobile,
              product,
              message,
            });
            await sendEmail(email, subject, html, text);
          } catch (autoReplyErr) {
            console.warn('Auto-reply failed (continuing):', autoReplyErr?.message || autoReplyErr);
          }
        });
      }
    } catch (autoReplyWrapErr) {
      console.warn('Auto-reply scheduling failed (continuing):', autoReplyWrapErr?.message || autoReplyWrapErr);
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

