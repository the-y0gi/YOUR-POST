const postService = require("../services/post.service");

// Create Post
exports.createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { text } = req.body;

    const post = await postService.createPostService(userId, text, req.file);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPostsService();

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;
    const { text } = req.body;

    const post = await postService.updatePostService(
      userId,
      postId,
      text,
      req.file,
    );

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Delete Post
exports.deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    await postService.deletePostService(userId, postId);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Get My Posts
exports.getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await postService.getMyPostsService(userId);

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
