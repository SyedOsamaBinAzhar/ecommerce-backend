const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

exports.connection = async() => {
    // console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    // useCreateIndex: true
});
console.log("database connected");
}