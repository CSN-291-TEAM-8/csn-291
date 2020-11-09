const express = require("express");
const router = express.Router();
const { login, signup, me } = require("../controllers/auth");
const { Verify } = require("../middleware/auth");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/").get(Verify, me);

module.exports = router;