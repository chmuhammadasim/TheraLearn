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
  const userId = req.userData.id;
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
  console.log("saveGameData called");
  const userId = req.userData.id;
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
    const userId = req.userData && (req.userData.id || req.userData.userId);
    if (!userId || !gameName) {
      return res.status(400).json({ error: "User ID and Game Name are required." });
    }

    let game;
    try {
      game = await Game.findOne({ userId });
    } catch (dbError) {
      console.error("Database error while fetching game:", dbError);
      if (dbError.name === "CastError") {
        return res.status(400).json({ error: "Invalid user ID format." });
      }
      if (dbError.name === "MongoError") {
        return res.status(500).json({ error: "Database error occurred." });
      }
      return res.status(500).json({ error: "Unknown database error." });
    }

    if (!game) {
      return res.status(404).json({ error: "No game data found for this user." });
    }

    if (!Array.isArray(game.sessions)) {
      return res.status(200).json({ error: "Game sessions data is corrupted." });
    }

    const gameSessions = game.sessions.filter(
      (session) =>
        session &&
        typeof session.gameName === "string" &&
        session.gameName.toLowerCase() === gameName.toLowerCase()
    );

    if (gameSessions.length === 0) {
      return res.status(200).json({ error: "No sessions found for the specified game." });
    }

    const latestSession = gameSessions[gameSessions.length - 1];
    if (!latestSession) {
      return res.status(500).json({ error: "Session data is corrupted." });
    }

    res.status(200).json(latestSession);
  } catch (error) {
    console.error("Error retrieving game data:", error);
    res.status(500).json({ error: "Failed to retrieve game data.", details: error.message });
  }
};


module.exports = gameController;