const router = require("express").Router();
const controller = require("../controllers/requestDemoController");

router.get("/", controller.getPageContent);
router.put("/", controller.updatePageContent);

// Paragraphs
router.get("/paragraphs", controller.getParagraphs);
router.post("/paragraphs", controller.createParagraph);
router.put("/paragraphs/:id", controller.updateParagraph);
router.delete("/paragraphs/:id", controller.deleteParagraph);

// Features
router.get("/features", controller.getFeatures);
router.post("/features", controller.createFeature);
router.put("/features/:id", controller.updateFeature);
router.delete("/features/:id", controller.deleteFeature);

module.exports = router;

