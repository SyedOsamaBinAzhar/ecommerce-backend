const router = require("express").Router();

//importing controller
const controller = require("../controllers/UserController");


router.get("/usertest", controller.get)


module.exports = router;