const Blog = require("../model/blog.model");
const blogController = {};

blogController.Checkapi = (req, res) => {
  res.status(200).send({
      message: 'blog API is working'
  });
};
// Controller to get all blogs
blogController.getAllBlogs = async (req, res) => {
  try {
    // Fetch blogs from the database
    const blogs = await Blog.find();
      // .populate("author", "username") 
      // .sort({ publishedAt: -1 }); 

    // Check if blogs were found
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

  // Check if ID is a valid ObjectId
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({
  //     success: false,
  //     message: 'Invalid blog ID format',
  //   });
  // }

  try {
    // Find the blog by ID
    const blog = await Blog.findById(id);

    // Check if the blog exists
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    // Return the blog data
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    // Differentiate between database errors and server errors
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog ID format',
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch blog',
    });
  }
};

module.exports = blogController;
