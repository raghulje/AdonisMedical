const router = require("express").Router();
const controller = require("../controllers/footerController");

router.get("/sections", controller.getSections);
router.post("/sections", controller.createSection);
router.put("/sections/:id", controller.updateSection);
router.delete("/sections/:id", controller.deleteSection);

router.get("/links", controller.getLinks);
router.post("/links", controller.createLink);
router.put("/links/:id", controller.updateLink);
router.delete("/links/:id", controller.deleteLink);

router.get("/logos", controller.getLogos);
router.get("/logos/:id", controller.getLogoById);
router.post("/logos", controller.createLogo);
router.put("/logos/:id", controller.updateLogo);
router.delete("/logos/:id", controller.deleteLogo);

module.exports = router;

