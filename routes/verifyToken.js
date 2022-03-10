const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const token = req.header('token');

    //if there is not token in req
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            
            //if the token is not matched   
            if (err) res.status(403).json("INVALID TOKEN!")

            //if the token is matched
            req.user = verified;

            next();

        });

    } catch (error) {
        res.status(400).send('Invalid Token');
    }

}