const express = require("express");
//let keep it simple and more secure by defining single model for both type of user
const router = express.Router();
const {
  getUsers,
  getUser,
  follow,
  unfollow,  
  publicfeed,
  searchUser,
  editDetails,
} = require("../controllers/user");
const { Verify } = require("../middleware/auth");

router.route("/").get(Verify, getUsers);
router.route("/").put(Verify, editDetails);
router.route("/feed").get(Verify, publicfeed);
router.route("/search").get(searchUser);
router.route("/:username").get(Verify, getUser);
router.route("/:id/friend").get(Verify, follow);
router.route("/:id/unfriend").get(Verify, unfollow);

module.exports = router;