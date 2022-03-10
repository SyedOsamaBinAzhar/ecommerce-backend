const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { connection } = require('./mongoose');


const app = express();

dotenv.config();



connection();

app.listen(process.env.PORT || 5000, () => {
    console.log("server is running")
})


//password
// osamaazhar
//osama12345