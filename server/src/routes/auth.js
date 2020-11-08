const express = require("express");
const router = express.Router();
const { login, signup, me } = require("../controllers/auth");
const { verify } = require("../middlewares/auth");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/").get(verify, me);

module.exports = router;