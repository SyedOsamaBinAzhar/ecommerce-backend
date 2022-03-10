//importing model
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//REGISTER USER
module.exports = {
    post: async (req, res) => {

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),

        })

        try {
            //save user in db
            const savedUser = await user.save();
            res.status(201).json(savedUser)
        } catch (error) {
            res.status(501).json(err);
        }
    },
    login: async (req, res) => {

        try {


            const user = await User.findOne({
                username: req.body.username
            });

            !user && res.status(401).json("Wrong Credentials!")
            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)

            //decrypted password
            const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

            OriginalPassword !== req.body.password && res.status(401).json("Wrong Credentials!")

            //send details without password for security reasons.

            const {
                password,
                ...others
            } = user._doc;
        
            res.status(200).json(others);
        
             

        } catch (error) {
            res.status(500).json(err);
        }
    }
}