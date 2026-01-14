const router = require("express").Router();
const controller = require("../../controllers/products/hfCArm1kController");

router.get("/", controller.getPageContent);
router.put("/", controller.updatePageContent);
router.get("/images", controller.getImages);
router.post("/images", controller.createImage);
router.put("/images/:id", controller.updateImage);
router.delete("/images/:id", controller.deleteImage);
router.get("/features", controller.getFeatures);
router.post("/features", controller.createFeature);
router.put("/features/:id", controller.updateFeature);
router.delete("/features/:id", controller.deleteFeature);
router.get("/variants", controller.getVariants);
router.post("/variants", controller.createVariant);
router.put("/variants/:id", controller.updateVariant);
router.delete("/variants/:id", controller.deleteVariant);

module.exports = router;


