const router = require("express").Router();
const controller = require("../controllers/CartController");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization} = require("./verifyToken");

//Create Product
router.post("/", verifyToken, controller.createProduct)

//update cart
router.put("/:id", verifyTokenAndAuthorization, controller.updateCart)

//delete cart
router.delete("/:id", verifyTokenAndAdmin, controller.deleteCart)

//get user cart
router.get("/find/:userId", verifyTokenAndAuthorization, controller.getCart)

//get all products
router.get("/", verifyTokenAndAdmin, controller.getCarts);

module.exports = router;