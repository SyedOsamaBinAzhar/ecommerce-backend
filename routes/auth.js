const router = require("express").Router();

const controller = require("../controllers/AuthController");

router.post("/register", controller.post);
router.post("/login", controller.login);

module.exports = router;