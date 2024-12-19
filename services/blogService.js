const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/User");

// Create a new blog post
const createBlog = async (blogData, userId) => {
  const { title, content } = blogData;

  // Create a new blog document
  const newBlog = new Blog({
    title,
    content,
    author_id: userId, 
  });

  // Save the new blog
  return await newBlog.save();
};

// Get all blog posts
const getAllBlogs = async (userId) => {
  console.warn(userId);
  return await Blog.find({ deleted: { $ne: true }, author_id:new mongoose.Types.ObjectId(userId) }) 
    .populate("author_id", "username email"); 
};

// Get a single blog post by ID
const getBlogById = async (id) => {
  return await Blog.findById(id)
    .populate("author_id", "username email") 
    .lean();
};

// Update a blog post
const updateBlog = async (id, blogData, userId) => {
  const { title, content } = blogData;

  const blog = await Blog.findById(id);

  if (!blog) {
    throw new Error("Blog post not found");
  }

  // Ensure the logged-in user is the author
  if (blog.author_id.toString() !== userId) {
    throw new Error("You are not authorized to edit this blog post");
  }

  blog.title = title || blog.title;
  blog.content = content || blog.content;

  return await blog.save();
};

// Soft delete a blog post
const softDeleteBlog = async (id, userId) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new Error("Blog post not found");
  }

  if (blog.author_id.toString() !== userId) {
    throw new Error("You are not authorized to delete this blog post");
  }

  blog.deleted = true;
  return await blog.save();
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  softDeleteBlog,
};
