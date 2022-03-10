const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

exports.connection = async() => {
    await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    // useCreateIndex: true
});
console.log("database connected");
}