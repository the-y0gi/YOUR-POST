const Post = require("../model/post.model");
const uploadService = require("./upload.service");

// Create Post
exports.createPostService = async (userId, text, file) => {
  if (!text && !file) {
    throw new Error("Post cannot be empty");
  }

  let imageUrl = "";

  if (file) {
    imageUrl = await uploadService.uploadImage(file.path);
  }

  const post = await Post.create({
    user: userId,
    text,
    image: imageUrl,
  });

  return post;
};

// Get All Posts
exports.getAllPostsService = async () => {
  const posts = await Post.find({ isDeleted: false })
    .populate("user", "name avatar")
    .sort({ createdAt: -1 });

  return posts;
};

// Update Post
exports.updatePostService = async (userId, postId, text, file) => {
  const post = await Post.findById(postId);

  if (!post) throw new Error("Post not found");

  //Ownership check
  if (post.user.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  if (text) post.text = text;

  if (file) {
    const imageUrl = await uploadService.uploadImage(file.path);
    post.image = imageUrl;
  }

  await post.save();

  return post;
};

// Delete Post
exports.deletePostService = async (userId, postId) => {
  const post = await Post.findById(postId);

  if (!post) throw new Error("Post not found");

  //Ownership check
  if (post.user.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  post.isDeleted = true;

  await post.save();

  return;
};

// Get My Posts
exports.getMyPostsService = async (userId) => {
  const posts = await Post
    .find({
      user: userId,
      isDeleted: false,
    })
    .populate("user", "name avatar")
    .sort({ createdAt: -1 });

  return posts;
};
