const Order = require("../models/Order");
const { verifyTokenAndAuthorization } = require("../routes/verifyToken");

const router = require("express").Router();

module.exports = {

        //create cart
       createOrder : async (req, res) => {
           const newOrder = new Order(req.body);

           try {
               const savedOrder = await newOrder.save();
               res.status(200).json(savedOrder);
           } catch (error) {
               res.status(500).json(error)
           }
       },

     //update cart
       updateOrder : async(req,res) => {
    
        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
                $set : req.body
            }, 
            { new : true }
            );
    
            res.status(200).json(updatedOrder); 
        } catch (error) {
            res.status(500).json(error)
        }
    },

      //delete Cart
      deleteOrder : async(req,res) => {
        try {
            await Order.findByIdAndDelete(req.params.id);

            res.status(200).json("Order has been deleted.")
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //get user orders
      getUserOrders : async(req,res) => {
        try {
            const orders = await Order.find({userId : req.params.userId});
            
            res.status(200).json(orders);

        } catch (error) {
            res.status(500).json(error);
        }
    },
    //get all orders
    getAllOrders : async(req, res) => {
        try {
            const orders = awaitOrders.find();
            res.status(200).json(orders);

        } catch (error) {
            res.status(500).json(error)
        }
    },
    getMonthlyIncome : async(req, res) => {
        //if september
        const date = new Date();
        //then aug
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        //then july
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

        try {
            const income = await Order.aggregate([
                { $match : { $gte : previousMonth }},
                {
                    $project : { 
                        month : {$month :"$createdAt"},
                        sales : "$amount"
                    },
                    $group : {
                        _id : "$month",
                        total : {$sum : "$sales"}
                    }
                }
            ])

            res.status(200).json(income)
        } catch (error) {
            res.status(500).json(error)
        }

    }
}