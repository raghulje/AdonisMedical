const router = require("express").Router();
const controller = require("../controllers/careersController");

router.get("/", controller.getPageContent);
router.put("/", controller.updatePageContent);

router.get("/jobs", controller.getJobs);
router.post("/jobs", controller.createJob);
router.put("/jobs/:id", controller.updateJob);
router.delete("/jobs/:id", controller.deleteJob);

module.exports = router;

