const Game = require("../model/game.model");
const gameController = {};

gameController.Checkapi = (req, res) => {
  res.status(200).send({
    message: "game API is working",
  });
};
// Controller to get all blogs
gameController.getAllGames = async (req, res) => {
  try {
    // Fetch blogs from the database
    const blogs = await Game.find();
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

gameController.getGameById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Game.findById(id);
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

module.exports = gameController;
