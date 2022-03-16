const User = require("../models/User");
const CryptoJS = require("crypto-js");

const jwt = require("jsonwebtoken");

module.exports = {
    //REGISTER USER
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
    //LOGIN USER
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

            //creating token consisting of id and isAdmin
            const accessToken = jwt.sign({
                id : user._id,
                isAdmin : user.isAdmin
            }, 
            process.env.JWT_SEC,
            {expiresIn : "3d"}
            )

            //send details without password for security reasons.
            const {
                password,
                ...others
            } = user._doc;
        
            res.status(200).json({...others,accessToken});
        
             

        } catch (error) {
            res.status(500).json(err);
        }
    }
}