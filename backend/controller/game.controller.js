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
  const id = req.userData.userId;

  try {
    const game = await Game.findById(id);

    if (!game) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Game not found",
      });
    }

    // If the game is found, return it with a 200 status
    res.status(200).json({
      success: true,
      data: game,
    });
  } catch (error) {
    console.error("Error fetching game:", error);

    // Handling invalid ID format (CastError)
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        data: null, // Returning null for invalid ID format
        message: "Invalid game ID format",
      });
    }

    // General server error handling
    res.status(500).json({
      success: false,
      data: null, // Returning null for any other server errors
      message: "Server Error: Unable to fetch game",
    });
  }
};

module.exports = gameController;
