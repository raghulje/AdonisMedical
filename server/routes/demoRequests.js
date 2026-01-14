const router = require("express").Router();
const controller = require("../controllers/demoRequestController");

// Public endpoint - anyone can submit
router.post("/", controller.create);

// Admin endpoints - require authentication middleware
// router.get("/", requireAuth, controller.getAll);
// router.get("/:id", requireAuth, controller.getById);
// router.put("/:id/status", requireAuth, controller.updateStatus);
// router.delete("/:id", requireAuth, controller.delete);

module.exports = router;

