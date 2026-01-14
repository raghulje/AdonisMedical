const router = require("express").Router();
const controller = require("../controllers/productionFacilityController");

router.get("/", controller.getPageContent);
router.put("/", controller.updatePageContent);

router.get("/features", controller.getFeatures);
router.post("/features", controller.createFeature);
router.put("/features/:id", controller.updateFeature);
router.delete("/features/:id", controller.deleteFeature);

module.exports = router;

