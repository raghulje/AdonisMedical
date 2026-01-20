const router = require("express").Router();
const controller = require("../controllers/aboutController");

router.get("/", controller.getPageContent);
router.put("/", controller.updatePageContent);

// Highlights routes
router.get("/highlights", controller.getHighlights);
router.post("/highlights", controller.createHighlight);
router.put("/highlights/:id", controller.updateHighlight);
router.delete("/highlights/:id", controller.deleteHighlight);
router.put("/highlights/reorder", controller.reorderHighlights);

// Overview Paragraphs routes
router.get("/overview-paragraphs", controller.getOverviewParagraphs);
router.post("/overview-paragraphs", controller.createOverviewParagraph);
router.put("/overview-paragraphs/:id", controller.updateOverviewParagraph);
router.delete("/overview-paragraphs/:id", controller.deleteOverviewParagraph);
router.put("/overview-paragraphs/reorder", controller.reorderOverviewParagraphs);

// Global Reach Cards routes
router.get("/global-reach-cards", controller.getGlobalReachCards);
router.post("/global-reach-cards", controller.createGlobalReachCard);
router.put("/global-reach-cards/:id", controller.updateGlobalReachCard);
router.delete("/global-reach-cards/:id", controller.deleteGlobalReachCard);
router.put("/global-reach-cards/reorder", controller.reorderGlobalReachCards);

module.exports = router;

