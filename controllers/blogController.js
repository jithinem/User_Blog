const blogService = require("../services/blogService");

// Create a new blog post
const createBlog = async (req, res) => {
  try {

    const newBlog = await blogService.createBlog(req.body, req.user.id);
    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Get all blog posts
const getAllBlogs = async (req, res) => {
  try {
    
    const blogs = await blogService.getAllBlogs(req.user.id);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Get a blog post by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog post not found",
      });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Update a blog post
const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await blogService.updateBlog(
      req.params.id,
      req.body,
      req.user.id
    );
    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Soft delete a blog post
const softDeleteBlog = async (req, res) => {
  try {
    await blogService.softDeleteBlog(req.params.id, req.user.id);
    res.status(200).json({
      message: "Blog post soft deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  softDeleteBlog,
};
