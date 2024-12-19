const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: "User",
    },
    deleted: {
      type: Boolean,
      default: false, // Soft delete flag
    },
  });
  
  const Blog = mongoose.model("Blog", blogSchema);
  module.exports = Blog;
  