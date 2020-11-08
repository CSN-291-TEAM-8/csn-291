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
const { verify } = require("../middlewares/auth");

router.route("/").get(getPosts).post(verify, addPost);
router.route("/search").get(searchPost);
router.route("/:id").get(verify, getPost).delete(verify, deletePost);
router.route("/:id/togglelike").get(verify, toggleLike);
router.route("/:id/togglesave").get(verify, toggleSave);
router.route("/:id/comments").post(verify, addComment);
router.route("/:id/comments/:commentId").delete(verify, deleteComment);

module.exports = router;