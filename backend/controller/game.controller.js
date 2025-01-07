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

gameController.saveGameData = async (req, res) => {
  
  const userId = req.userData.userId;
  try {
    const { gameName, level, score, duration } = req.body;

    if ( !gameName || score === undefined || duration === undefined) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    let game = await Game.findOne({ userId });
    console.log(game);
    
    if (!game) {
      game = new Game({ userId, sessions: [] });
    }
    console.log(game);
    game.sessions.push({
      gameName,
      level: level || 1,
      score,
      duration,
    });

    await game.save();

    res.status(200).json({ message: "Game data saved successfully!" });
  } catch (error) {
    console.error("Error saving game data:", error);
    res.status(500).json({ error: "Failed to save game data." });
  }
};

gameController.getGameData = async (req, res) => {
  try {
    const { gameName } = req.params;
    const userId = req.userData.userId;
    if (!userId || !gameName) {
      return res.status(400).json({ error: "User ID and Game Name are required." });
    }
    const game = await Game.findOne({ userId });
    if (!game) {
      return res.status(404).json({ error: "No game data found for this user." });
    }
    const gameSessions = game.sessions.filter(
      (session) => session.gameName.toLowerCase() === gameName.toLowerCase()
    );

    if (gameSessions.length === 0) {
      return res.status(404).json({ error: "No sessions found for the specified game." });
    }
    const latestSession = gameSessions[gameSessions.length - 1];
    res.status(200).json(latestSession);
  } catch (error) {
    console.error("Error retrieving game data:", error);
    res.status(500).json({ error: "Failed to retrieve game data." });
  }
};


module.exports = gameController;