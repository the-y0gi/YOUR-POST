const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware.js");
const upload = require("../middleware/multer.middleware");

const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getMyPosts,
} = require("../controller/post.controller.js");

router.get("/my-posts", auth, getMyPosts);

//Create Post
router.post("/create", auth, upload.single("image"), createPost);

//Get All Posts (Feed)
router.get("/feed", auth, getAllPosts);

//Update Post
router.put("/:postId", auth, upload.single("image"), updatePost);

// Delete Post
router.delete("/:postId", auth, deletePost);

module.exports = router;
