const router = require("express").Router();
const controller = require("../controllers/contactInfoController");

router.get("/", controller.get);
router.put("/", controller.update);

module.exports = router;

