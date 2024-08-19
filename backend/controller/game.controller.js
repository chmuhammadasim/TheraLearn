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
    const game = await Game.find();
    // .populate("author", "username")
    // .sort({ publishedAt: -1 });

    // Check if blogs were found
    if (!game.length) {
      return res.status(200).json({
        success: false,
        message: "No game found",
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
  const userId = req.userData.userId; // Extracting the userId from req.userData

  try {
    const game = await Game.findOne({ userId }); // Finding a game associated with the userId

    if (!game) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Game not found",
      });
    }

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
        data: null,
        message: "Invalid user ID format",
      });
    }

    // General server error handling
    res.status(500).json({
      success: false,
      data: null,
      message: "Server Error: Unable to fetch game",
    });
  }
};


module.exports = gameController;
