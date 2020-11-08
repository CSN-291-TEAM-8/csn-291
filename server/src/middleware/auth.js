const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const Authority = require('../models/authority');

exports.verify = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next({
            message: "Please first login",//redirect to login
            statusCode: 403,
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (req.body.isStudent) {
            const student = await Student.findById(decoded.id).select("-password");

            if (!student) {
                return next({ message: `No student found for ID ${decoded.id}` });
            }

            req.user = student;
            next();
        }
        else {
            const authority = await Authority.findById(decoded.id).select("-password");
            if (!student)
                return next({ message: `No user detail found for the ID ${decoded.id}` });
        }
        req.user = authority;
        next()
    } catch (err) {
        next({
            message: "You need to be logged in to visit this route",//redirect to login
            statusCode: 403,
        });
    }
};