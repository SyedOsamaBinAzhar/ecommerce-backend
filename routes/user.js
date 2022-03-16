const router = require("express").Router();
const controller = require("../controllers/UserController");
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

//update user
router.put("/:id", verifyTokenAndAuthorization, controller.updateUser)

//delete user
router.delete("/:id", verifyTokenAndAuthorization, controller.deleteUser)

router.get("/find/:id", verifyTokenAndAdmin, controller.getUser)

router.get("/", verifyTokenAndAdmin, controller.getAllUsers)

router.get("/stats", verifyTokenAndAdmin, controller.getUserStats)





module.exports = router;