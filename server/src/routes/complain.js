const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  addPost,
  deletePost,
  toggleLike,
  toggleSave,
  addComment,
  deleteComment,
  searchPost,
} = require("../controllers/post");
const { Verify } = require("../middleware/auth");

router.route("/").get(getPosts).post(Verify, addPost);
router.route("/search").get(searchPost);
router.route("/:id").get(Verify, getPost).delete(Verify, deletePost);
router.route("/:id/togglelike").get(Verify, toggleLike);
router.route("/:id/togglesave").get(Verify, toggleSave);
router.route("/:id/comments").post(Verify, addComment);
router.route("/:id/comments/:commentId").delete(Verify, deleteComment);

module.exports = router;