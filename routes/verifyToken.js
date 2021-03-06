const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const token = req.header('token');

    //if there is not token in req header
    if (!token) return res.status(401).send("Access Denied");

    try {
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {

            //if the token is not matched   
            if (err) res.status(403).json("INVALID TOKEN!")

            //if the token is matched
            req.user = user;

            next();

        });

    } catch (error) {
        res.status(400).send('Invalid Token');
    }

}

const verifyTokenAndAuthorization = (req, res, next) => {

    verifyToken(req, res, () => {
        //req.user.id -> from req.user = user;
        if (req.user.id === req.params.id || req.user.isAdmin) {
            
            next();
        } else {
            res.status(403).json("You are not allowed to do this.")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {

    verifyToken(req, res, () => {
        //req.user.id -> from req.user = user;
        if (req.user.isAdmin) {

            next();

        } else {
            res.status(403).json("You are not allowed to do this.")
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}