const { TermsAndConditionsPage, TermsAndConditionsParagraph, PrivacyPolicyPage, PrivacyPolicyParagraph } = require('../models');

// ============================================
// TERMS AND CONDITIONS
// ============================================

// Get Terms and Conditions page content
exports.getTermsPage = async (req, res) => {
  try {
    const page = await TermsAndConditionsPage.findOne({
      where: { id: 1 },
      include: [{
        model: TermsAndConditionsParagraph,
        as: 'paragraphs',
        order: [['orderIndex', 'ASC']]
      }]
    });

    if (!page) {
      return res.status(404).json({ success: false, message: 'Terms and Conditions page not found' });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    console.error('Error fetching terms page:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch terms page', error: error.message });
  }
};

// Update Terms and Conditions page
exports.updateTermsPage = async (req, res) => {
  try {
    const { title, subtitle, richTextContent } = req.body;

    const [page, created] = await TermsAndConditionsPage.upsert({
      id: 1,
      title: title || 'Terms and Conditions',
      subtitle: subtitle || null,
      richTextContent: richTextContent || null
    }, { returning: true });

    res.json({ success: true, data: page });
  } catch (error) {
    console.error('Error updating terms page:', error);
    res.status(500).json({ success: false, message: 'Failed to update terms page', error: error.message });
  }
};

// Get Terms and Conditions paragraphs
exports.getTermsParagraphs = async (req, res) => {
  try {
    const paragraphs = await TermsAndConditionsParagraph.findAll({
      where: { termsAndConditionsPageId: 1 },
      order: [['orderIndex', 'ASC']]
    });

    res.json({ success: true, data: paragraphs });
  } catch (error) {
    console.error('Error fetching terms paragraphs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch paragraphs', error: error.message });
  }
};

// Create Terms and Conditions paragraph
exports.createTermsParagraph = async (req, res) => {
  try {
    const { content, orderIndex } = req.body;

    const paragraph = await TermsAndConditionsParagraph.create({
      termsAndConditionsPageId: 1,
      content: content,
      orderIndex: orderIndex || 0
    });

    res.json({ success: true, data: paragraph });
  } catch (error) {
    console.error('Error creating terms paragraph:', error);
    res.status(500).json({ success: false, message: 'Failed to create paragraph', error: error.message });
  }
};

// Update Terms and Conditions paragraph
exports.updateTermsParagraph = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, orderIndex } = req.body;

    const paragraph = await TermsAndConditionsParagraph.findByPk(id);
    if (!paragraph) {
      return res.status(404).json({ success: false, message: 'Paragraph not found' });
    }

    await paragraph.update({
      content: content !== undefined ? content : paragraph.content,
      orderIndex: orderIndex !== undefined ? orderIndex : paragraph.orderIndex
    });

    res.json({ success: true, data: paragraph });
  } catch (error) {
    console.error('Error updating terms paragraph:', error);
    res.status(500).json({ success: false, message: 'Failed to update paragraph', error: error.message });
  }
};

// Delete Terms and Conditions paragraph
exports.deleteTermsParagraph = async (req, res) => {
  try {
    const { id } = req.params;

    const paragraph = await TermsAndConditionsParagraph.findByPk(id);
    if (!paragraph) {
      return res.status(404).json({ success: false, message: 'Paragraph not found' });
    }

    await paragraph.destroy();

    res.json({ success: true, message: 'Paragraph deleted successfully' });
  } catch (error) {
    console.error('Error deleting terms paragraph:', error);
    res.status(500).json({ success: false, message: 'Failed to delete paragraph', error: error.message });
  }
};

// ============================================
// PRIVACY POLICY
// ============================================

// Get Privacy Policy page content
exports.getPrivacyPage = async (req, res) => {
  try {
    const page = await PrivacyPolicyPage.findOne({
      where: { id: 1 },
      include: [{
        model: PrivacyPolicyParagraph,
        as: 'paragraphs',
        order: [['orderIndex', 'ASC']]
      }]
    });

    if (!page) {
      return res.status(404).json({ success: false, message: 'Privacy Policy page not found' });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    console.error('Error fetching privacy page:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch privacy page', error: error.message });
  }
};

// Update Privacy Policy page
exports.updatePrivacyPage = async (req, res) => {
  try {
    const { title, subtitle, richTextContent } = req.body;

    const [page, created] = await PrivacyPolicyPage.upsert({
      id: 1,
      title: title || 'Privacy Policy',
      subtitle: subtitle || null,
      richTextContent: richTextContent || null
    }, { returning: true });

    res.json({ success: true, data: page });
  } catch (error) {
    console.error('Error updating privacy page:', error);
    res.status(500).json({ success: false, message: 'Failed to update privacy page', error: error.message });
  }
};

// Get Privacy Policy paragraphs
exports.getPrivacyParagraphs = async (req, res) => {
  try {
    const paragraphs = await PrivacyPolicyParagraph.findAll({
      where: { privacyPolicyPageId: 1 },
      order: [['orderIndex', 'ASC']]
    });

    res.json({ success: true, data: paragraphs });
  } catch (error) {
    console.error('Error fetching privacy paragraphs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch paragraphs', error: error.message });
  }
};

// Create Privacy Policy paragraph
exports.createPrivacyParagraph = async (req, res) => {
  try {
    const { content, orderIndex } = req.body;

    const paragraph = await PrivacyPolicyParagraph.create({
      privacyPolicyPageId: 1,
      content: content,
      orderIndex: orderIndex || 0
    });

    res.json({ success: true, data: paragraph });
  } catch (error) {
    console.error('Error creating privacy paragraph:', error);
    res.status(500).json({ success: false, message: 'Failed to create paragraph', error: error.message });
  }
};

// Update Privacy Policy paragraph
exports.updatePrivacyParagraph = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, orderIndex } = req.body;

    const paragraph = await PrivacyPolicyParagraph.findByPk(id);
    if (!paragraph) {
      return res.status(404).json({ success: false, message: 'Paragraph not found' });
    }

    await paragraph.update({
      content: content !== undefined ? content : paragraph.content,
      orderIndex: orderIndex !== undefined ? orderIndex : paragraph.orderIndex
    });

    res.json({ success: true, data: paragraph });
  } catch (error) {
    console.error('Error updating privacy paragraph:', error);
    res.status(500).json({ success: false, message: 'Failed to update paragraph', error: error.message });
  }
};

// Delete Privacy Policy paragraph
exports.deletePrivacyParagraph = async (req, res) => {
  try {
    const { id } = req.params;

    const paragraph = await PrivacyPolicyParagraph.findByPk(id);
    if (!paragraph) {
      return res.status(404).json({ success: false, message: 'Paragraph not found' });
    }

    await paragraph.destroy();

    res.json({ success: true, message: 'Paragraph deleted successfully' });
  } catch (error) {
    console.error('Error deleting privacy paragraph:', error);
    res.status(500).json({ success: false, message: 'Failed to delete paragraph', error: error.message });
  }
};

