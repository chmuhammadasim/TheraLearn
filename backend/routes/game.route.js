const express = require('express');
const router = express.Router();
const gameController = require('../controller/game.controller');
const {  user } = require('../middleware/authMiddleware');
const checkAuth = require('../middleware/check-auth');
router.get("/",gameController.Checkapi);
router.get("/all",gameController.getAllGames);
router.get('/getbyid/:id',checkAuth, user, gameController.getGameById);

module.exports = router;