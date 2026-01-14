const express = require('express');
const router = express.Router();
const {
  getTermsPage,
  updateTermsPage,
  getTermsParagraphs,
  createTermsParagraph,
  updateTermsParagraph,
  deleteTermsParagraph,
  getPrivacyPage,
  updatePrivacyPage,
  getPrivacyParagraphs,
  createPrivacyParagraph,
  updatePrivacyParagraph,
  deletePrivacyParagraph
} = require('../controllers/termsAndPrivacyController');

// Terms and Conditions routes
router.get('/terms/content', getTermsPage);
router.put('/terms/content', updateTermsPage);
router.get('/terms/paragraphs', getTermsParagraphs);
router.post('/terms/paragraphs', createTermsParagraph);
router.put('/terms/paragraphs/:id', updateTermsParagraph);
router.delete('/terms/paragraphs/:id', deleteTermsParagraph);

// Privacy Policy routes
router.get('/privacy/content', getPrivacyPage);
router.put('/privacy/content', updatePrivacyPage);
router.get('/privacy/paragraphs', getPrivacyParagraphs);
router.post('/privacy/paragraphs', createPrivacyParagraph);
router.put('/privacy/paragraphs/:id', updatePrivacyParagraph);
router.delete('/privacy/paragraphs/:id', deletePrivacyParagraph);

module.exports = router;

