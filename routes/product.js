const router = require("express").Router();
const controller = require("../controllers/ProductController");
const { verifyTokenAndAdmin} = require("./verifyToken");

//Create Product
router.post("/", verifyTokenAndAdmin, controller.createProduct)

//update product
router.put("/:id", verifyTokenAndAdmin, controller.updateProduct)

//delete product
router.delete("/:id", verifyTokenAndAdmin, controller.deleteProduct)

//get single product
router.get("/find/:id", controller.getProduct)

//get all products
router.get("/", controller.getAllProducts);

module.exports = router;