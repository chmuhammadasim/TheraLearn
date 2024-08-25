const Blog = require("../model/blog.model");
const blogController = {};

blogController.Checkapi = (req, res) => {
  res.status(200).send({
    message: "blog API is working",
  });
};
// Controller to get all blogs
blogController.getAllBlogs = async (req, res) => {
  try {
    // Fetch blogs from the database
    const blogs = await Blog.find();

    if (!blogs.length) {
      return res.status(404).json({
        success: false,
        message: "No blogs found",
      });
    }

    // Respond with the list of blogs
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);

    // Determine the type of error and respond accordingly
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid query parameters",
      });
    }

    if (error.name === "MongoError") {
      return res.status(500).json({
        success: false,
        message: "Database error occurred",
      });
    }

    // Handle generic server error
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message, // Include the error message for debugging purposes
    });
  }
};

blogController.getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch blog",
    });
  }
};

// Delete a blog by ID
blogController.deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  // Check if the blogId is a valid MongoDB ObjectId
  // if (!mongoose.Types.ObjectId.isValid(blogId)) {
  //   return res.status(400).json({ message: 'Invalid blog ID' });
  // }

  try {
    const blog = await Blog.findByIdAndDelete(blogId);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog', error: error.message });
  }
};

// Update blog status
blogController.updateBlogStatus = async (req, res) => {
  const { blogId } = req.params;
  const { status } = req.body;

  // Check if the blogId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({ message: 'Invalid blog ID' });
  }

  // Validate the status field
  const validStatuses = ['draft', 'published', 'archived'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const blog = await Blog.findByIdAndUpdate(blogId, { status }, { new: true });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update blog status', error: error.message });
  }
};

module.exports = blogController;
