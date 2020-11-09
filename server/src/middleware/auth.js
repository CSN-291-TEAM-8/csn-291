const jwt = require("jsonwebtoken");
const User = require("../models/User");


exports.Verify = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next({
            message: "Please login to continue further",//redirect to login
            statusCode: 403,
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);        
        const User = await User.findById(decoded.id).select("-password");

            if (!User) {
                return next({ message: `No User found for ID ${decoded.id}` });
            }

            req.user = User;
            next();        
    } catch (err) {
        next({
            message: "You need to be logged in to visit this route",//redirect to login on frontend
            statusCode: 403,
        });
    }
};