const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const schema = mongoose.Schema;
const userSchema = new schema({
  fullname: {
    type: String,
    required: [true, "Your fullname"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Your username"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Your email"],
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password should be atleast minimum of 6 characters"],
    maxlength: [20, "Password should be maximum of 20 characters"],//defines length restriction on password
  },
  hostel:{
     type:String,
     required:true
  },
  institute_id:{
      type:Number,
      required:true,
  },
  avatar: {
    type: String,
    default:
      "https://kkleap.github.io/assets/default.jpg",      
  },
  bio: String,
  website: String,
  followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  followerCount: {
    type: Number,
    default: 0,
  },
  following:[{type: mongoose.Schema.ObjectId, ref: "User" }],
  followingCount: {
    type: Number,
    default: 0,
  },
  posts: [{ type: mongoose.Schema.ObjectId, ref: "Post" }],
  postCount: {
    type: Number,
    default: 0,
  },
  taggedComplaints:[{type:mongoose.Schema.ObjectId,ref:"Post"}],
  savedComplaints: [{ type: mongoose.Schema.ObjectId, ref: "Post" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);