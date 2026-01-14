const router = require("express").Router();
const controller = require("../controllers/ourPresenceController");

router.get("/", controller.getPageContent);
router.put("/", controller.updatePageContent);

router.get("/locations", controller.getLocations);
router.post("/locations", controller.createLocation);
router.put("/locations/:id", controller.updateLocation);
router.delete("/locations/:id", controller.deleteLocation);

module.exports = router;

