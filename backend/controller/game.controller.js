const Game = require("../model/game.model");
const gameController = {};
gameController.Checkapi = (req, res) => {
  res.status(200).send({
    message: "game API is working",
  });
};
gameController.getAllGames = async (req, res) => {
  try {
    const game = await Game.find();
    if (!game.length) {
      return res.status(200).json({
        success: false,
        message: "No game found",
      });
    };
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
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
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
gameController.getGameById = async (req, res) => {
  const userId = req.userData.userId;
  try {
    const game = await Game.find({ userId });
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
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Invalid user ID format",
      });
    }
    res.status(500).json({
      success: false,
      data: null,
      message: "Server Error: Unable to fetch game",
    });
  }
};
module.exports = gameController;