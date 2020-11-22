const jwt = require("jsonwebtoken");
const Userdb = require("../models/User");
const Notification = require("../models/Notification");

exports.Verify = async (req, res, next) => {
    let token,notices=[];
    if(req.user&&req.user.id){
        notices = Notification.find({}).sort({createdAt:-1});
        notices = notices.filter(function(notice){
            return notice.receiver.includes(req.user.id);
        })
    }
    req.notices = notices;
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
        console.log(decoded);        
        const User = await Userdb.findById(decoded.id).select("-password");
        console.log('\nuser',User);
            if (!User) {
                return next({ message: `No User found for ID ${decoded.id}` });
            }

            req.user = User;
            next();        
    } catch (err) {
        next({
            message: err.message,//redirect to login on frontend
            statusCode: 403,
        });
    }
};