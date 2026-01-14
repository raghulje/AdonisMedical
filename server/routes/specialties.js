const router = require("express").Router();
const controller = require("../controllers/specialtiesController");
const pageController = require("../controllers/specialtiesPageController");

// General specialties (for home page)
router.get("/", controller.getAll);
router.get("/slug/:slug", controller.getBySlug);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

// Specialties page content and cards
router.get("/page/content", pageController.getPageContent);
router.put("/page/content", pageController.updatePageContent);
router.get("/page/cards", pageController.getCards);
router.get("/page/cards/:id", pageController.getCardById);
router.post("/page/cards", pageController.createCard);
router.put("/page/cards/:id", pageController.updateCard);
router.delete("/page/cards/:id", pageController.deleteCard);

module.exports = router;

