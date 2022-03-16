const router = require("express").Router();
const controller = require("../controllers/UserController");
const {verifyTokenAndAuthorization} = require("./verifyToken");

//update user
router.put("/:id", verifyTokenAndAuthorization, controller.updateUser)

module.exports = router;