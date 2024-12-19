const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const protect = require("../middleware/authMiddleware"); 



router.get("/",protect, blogController.getAllBlogs);

router.get("/:id",protect, blogController.getBlogById);

router.post("/", protect, blogController.createBlog);
router.put("/:id", protect, blogController.updateBlog);
router.delete("/:id", protect, blogController.softDeleteBlog);

module.exports = router;
