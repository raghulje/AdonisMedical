const router = require("express").Router();
const controller = require("../controllers/investorRelationsController");

router.get("/", controller.getPageContent);
router.put("/", controller.updatePageContent);

router.get("/documents", controller.getDocuments);
router.post("/documents", controller.createDocument);
router.put("/documents/:id", controller.updateDocument);
router.delete("/documents/:id", controller.deleteDocument);

module.exports = router;

