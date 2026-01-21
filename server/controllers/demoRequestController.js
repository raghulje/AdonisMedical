const { DemoRequest, EmailSettings } = require('../models');
const status = require('../helpers/response');

// Helper function to send email
const sendEmail = async (to, subject, htmlContent, textContent) => {
  try {
    const emailSettings = await EmailSettings.findOne({ where: { isActive: true } });
    if (!emailSettings || !emailSettings.requestDemoEmail) {
      console.warn('Email settings not configured or request demo email not set');
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

// Create a new demo request
exports.create = async (req, res) => {
  try {
    // Get client IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for']?.split(',')[0];
    const userAgent = req.headers['user-agent'];

    const demoRequest = await DemoRequest.create({
      name: req.body.name,
      hospitalName: req.body.hospitalName,
      email: req.body.email,
      mobile: req.body.mobile,
      product: req.body.product,
      preferredDate: req.body.preferredDate || req.body.date,
      message: req.body.message || null,
      ipAddress: ipAddress || null,
      userAgent: userAgent || null,
      status: 'pending'
    });

    // Send email notification
    try {
      const emailSettings = await EmailSettings.findOne({ where: { isActive: true } });
      if (emailSettings && emailSettings.requestDemoEmail) {
        const htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">New Demo Request</h2>
            <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <p><strong>Name:</strong> ${req.body.name || 'N/A'}</p>
              <p><strong>Hospital Name:</strong> ${req.body.hospitalName || 'N/A'}</p>
              <p><strong>Email:</strong> ${req.body.email || 'N/A'}</p>
              <p><strong>Mobile:</strong> ${req.body.mobile || 'N/A'}</p>
              <p><strong>Product:</strong> ${req.body.product || 'N/A'}</p>
              <p><strong>Preferred Date:</strong> ${req.body.preferredDate || req.body.date || 'N/A'}</p>
              ${req.body.message ? `<p><strong>Message:</strong><br>${req.body.message.replace(/\n/g, '<br>')}</p>` : ''}
              <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280; font-size: 12px;">
                <strong>Submitted:</strong> ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        `;
        const textContent = `New Demo Request\n\nName: ${req.body.name || 'N/A'}\nHospital Name: ${req.body.hospitalName || 'N/A'}\nEmail: ${req.body.email || 'N/A'}\nMobile: ${req.body.mobile || 'N/A'}\nProduct: ${req.body.product || 'N/A'}\nPreferred Date: ${req.body.preferredDate || req.body.date || 'N/A'}\n${req.body.message ? `Message: ${req.body.message}` : ''}\n\nSubmitted: ${new Date().toLocaleString()}`;
        
        await sendEmail(
          emailSettings.requestDemoEmail,
          'New Demo Request - Adonis Medical',
          htmlContent,
          textContent
        );
      }
    } catch (emailError) {
      console.error('Error sending demo request email:', emailError);
      // Don't fail the request if email fails
    }

    return status.createdResponse(res, "Demo request received successfully", demoRequest);
  } catch (error) {
    console.error('Create Demo Request Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Get all demo requests (for admin)
exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 20, status: statusFilter } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (statusFilter) {
      where.status = statusFilter;
    }

    const { count, rows } = await DemoRequest.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: offset
    });

    return status.successResponse(res, "Retrieved", {
      requests: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get Demo Requests Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Get a single demo request
exports.getById = async (req, res) => {
  try {
    const request = await DemoRequest.findByPk(req.params.id);
    if (!request) {
      return status.notFoundResponse(res, "Demo request not found");
    }
    return status.successResponse(res, "Retrieved", request);
  } catch (error) {
    console.error('Get Demo Request Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Update demo request status
exports.updateStatus = async (req, res) => {
  try {
    const request = await DemoRequest.findByPk(req.params.id);
    if (!request) {
      return status.notFoundResponse(res, "Demo request not found");
    }

    if (req.body.status) {
      const allowedStatuses = ['pending', 'scheduled', 'completed', 'cancelled'];
      if (!allowedStatuses.includes(req.body.status)) {
        return status.errorResponse(res, "Invalid status");
      }
      await request.update({ status: req.body.status });
    }

    if (req.body.preferredDate) {
      await request.update({ preferredDate: req.body.preferredDate });
    }

    return status.successResponse(res, "Demo request updated", request);
  } catch (error) {
    console.error('Update Demo Request Error:', error);
    return status.errorResponse(res, error.message);
  }
};

// Delete a demo request
exports.delete = async (req, res) => {
  try {
    const request = await DemoRequest.findByPk(req.params.id);
    if (!request) {
      return status.notFoundResponse(res, "Demo request not found");
    }
    await request.destroy();
    return status.successResponse(res, "Demo request deleted");
  } catch (error) {
    console.error('Delete Demo Request Error:', error);
    return status.errorResponse(res, error.message);
  }
};

