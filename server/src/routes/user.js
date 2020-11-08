const express = require("express");
//let keep it simple and more secure by defining single model for both type of user
const router = express.Router();
const {
  getUsers,
  getUser,
  friend,
  unfriend,  
  publicfeed,
  searchUser,
  editDetails,
} = require("../controllers/user");
const { verify } = require("../middlewares/auth");

router.route("/").get(verify, getUsers);
router.route("/").put(verify, editDetails);
router.route("/feed").get(verify, publicfeed);
router.route("/search").get(searchUser);
router.route("/:username").get(verify, getUser);
router.route("/:id/friend").get(verify, friend);
router.route("/:id/unfriend").get(verify, unfriend);

module.exports = router;