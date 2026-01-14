const router = require("express").Router();
const controller = require("../controllers/contactUsController");

router.get("/", controller.getPageContent);
router.put("/", controller.updatePageContent);

module.exports = router;

