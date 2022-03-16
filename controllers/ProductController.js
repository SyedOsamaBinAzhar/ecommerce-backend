const Product = require("../models/Product");
const { verifyTokenAndAuthorization } = require("../routes/verifyToken");

const router = require("express").Router();

module.exports = {

       createProduct : async (req, res) => {
           const newProduct = new Product(req.body);

           try {
               const savedProduct = await newProduct.save();
               res.status(200).json(savedProduct);
           } catch (error) {
               res.status(500).json(error)
           }
       },

     //update product
       updateProduct : async(req,res) => {
    
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                $set : req.body
            }, 
            { new : true }
            );
    
            res.status(200).json(updatedProduct); 
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //deleteProduct
      deleteProduct : async(req,res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);

            res.status(200).json("Product has been deleted.")
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //get single product
      getProduct : async(req,res) => {
        try {
            const product = await Product.findById(req.params.id);
            
            res.status(200).json({product});

        } catch (error) {
            res.status(500).json(error);
        }
    },
    //get all Products
    getAllProducts : async(req,res) => {
        try {
            const qNew = req.query.new;
            const qCategory = req.query.category;

            let products = [];

            if(qNew){
                products = await Product.find().sort({_id : -1}).limit(5)
            }
            else if(qCategory){
                products = await Product.find({ categories : {
                    $in : [qCategory]}
                })
            } else {
                products = await Product.find();
            }
            
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }
    },
}