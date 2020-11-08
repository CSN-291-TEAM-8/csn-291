const Student = require("../models/student");
const Authority = require('../models/authority');

exports.login = async (req, res, next) => {
    const { email, password,isStudent } = req.body;

  // make sure the email, pw is not empty
  if (!email) {
    return next({
      message: "Please fill your email",
      statusCode: 400,
    });
  }
  if (!password) {
    return next({
      message: "Please fill your password",
      statusCode: 400,
    });
  }


  // check if the user exists
  const db = isStudent?Student:Authority;
  const user = await db.findOne({ email });

  if (!user) {
    return next({
      message: "The email is not yet registered to an accout",
      statusCode: 400,
    });
  }

  // if exists, make sure the password matches
  const match = await user.checkPassword(password);

  if (!match) {
    return next({ message: "The password does not match", statusCode: 400 });
  }
  const token = user.getJwtToken();

  // then send json web token as response
  res.status(200).json({ success: true,token: token });
};

exports.signup = async (req, res, next) => {
  const { fullname, username, email, password,isStudent,hostel,institute_id } = req.body;
  let p = isStudent?Student:Authority;
  const user = await p.create({ fullname, username, email, password ,hostel,institute_id});

  const token = user.getJwtToken();

  res.status(200).json({ success: true,token: token });
};

exports.me = async (req, res, next) => {
  const { avatar, username, fullname, email, _id, website, bio } = req.user;

  res
    .status(200)
    .json({
      success: true,
      data: { avatar, username, fullname, email, _id, website, bio },
    });
};