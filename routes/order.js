const router = require("express").Router();
const controller = require("../controllers/OrderController");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization} = require("./verifyToken");

//create order
router.post("/", verifyToken, controller.createOrder)

//update order
router.put("/:id", verifyTokenAndAdmin, controller.updateOrder)

//delete order
router.delete("/:id", verifyTokenAndAdmin, controller.deleteOrder)

//get user orders
router.get("/find/:userId", verifyTokenAndAuthorization, controller.getUserOrders)

//get all orders
router.get("/", verifyTokenAndAdmin, controller.getAllOrders);

//get monthly income
router.get("/income", verifyTokenAndAdmin, controller.getMonthlyIncome);


module.exports = router;