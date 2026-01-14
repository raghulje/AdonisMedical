const router = require("express").Router();
const controller = require("../controllers/qualityAssuranceController");

router.get("/", controller.getPageContent);
router.put("/", controller.updatePageContent);

router.get("/certifications", controller.getCertifications);
router.post("/certifications", controller.createCertification);
router.put("/certifications/:id", controller.updateCertification);
router.delete("/certifications/:id", controller.deleteCertification);

module.exports = router;

