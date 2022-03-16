const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { connection } = require('./mongoose');
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");



const app = express();
dotenv.config();

//to consume json of req body
app.use(express.json())
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);




connection();

app.listen(process.env.PORT || 5000, () => {
    console.log("server is running")
})


