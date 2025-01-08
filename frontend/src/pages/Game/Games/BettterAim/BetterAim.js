import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios'; // Ensure axios is installed
import Balloon from './Balloon';
import './BetterAim.css';
import popSoundFile from './pop-sound.mp3';
import Snackbar from './Snackbar';
import { FaRegClock, FaStar, FaLevelUpAlt, FaHeart, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

function BetterAim() {
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [combo, setCombo] = useState(0);
  const [paused, setPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [activePowerUps, setActivePowerUps] = useState([]);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('highScore')) || 0);
  const [freezeActive, setFreezeActive] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [reloadGame, setReloadGame] = useState(false);

  const popSoundRef = useRef(new Audio(popSoundFile));

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  // Save game state to the database
  const saveToDatabase = async () => {
    const token = localStorage.getItem('authToken');
    const gameData = {
      gameName: 'BetterAim',
      score,
      duration: 30 - timeLeft,
      level,
    };

    try {
      await axios.post('http://localhost:5000/api/game/saveGameData', gameData, {
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        },
      });
      console.log('Game state saved successfully!');
    } catch (error) {
      console.error('Error saving game state to database:', error);
    }
  };

  const loadFromDatabase = async () => {
    const token = localStorage.getItem('authToken');

    try {
      const response = await axios.get('http://localhost:5000/api/game/loadGameData/BetterAim', {
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        },
      });
      const { score, duration, level } = response.data;
      setScore(score || 0);
      setLevel(level || 1);
      setTimeLeft(30 - (duration || 0));
      console.log('Game state loaded successfully!');
    } catch (error) {
      console.error('Error loading game state from database:', error);
    }
  };

  // Generate balloons
  const generateBalloon = useCallback(() => {
    const types = ['time', 'slow', 'freeze', 'doubleScore', 'extraLife'];
    const faces = ['🎈', '🎃', '🎅', '👻', '🐶', '🐱', '🦄', '🐸', '😎', '🤖'];
    const colors = [
      '#FF6347', '#FFD700', '#40E0D0', '#9370DB', '#FF69B4', 
      '#7CFC00', '#6495ED', '#FFA500', '#DC143C', '#00CED1'
    ];

    const newBalloon = {
      id: Math.random(),
      x: randomInRange(5, 85), // Random X-position
      y: 100, // Start at bottom
      size: randomInRange(60, 80) - level * 2, // Shrink as levels increase
      color: colors[Math.floor(Math.random() * colors.length)], // Random color
      face: faces[Math.floor(Math.random() * faces.length)], // Random face
      isBonus: Math.random() < 0.1, // 10% chance of being a bonus balloon
      type: Math.random() < 0.15 ? types[Math.floor(Math.random() * types.length)] : null, // 15% chance of a power-up
      speed: level * 0.2, // Speed increases with level
    };

    setBalloons((prev) => [...prev, newBalloon]);
  }, [level]);

  // Timer and balloon generation
  useEffect(() => {
    if (paused || gameOver) return;
    const interval = setInterval(generateBalloon, Math.max(800 - level * 50, 300));
    return () => clearInterval(interval);
  }, [generateBalloon, level, paused, gameOver]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) setGameOver(true);
    if (!paused && !gameOver) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [paused, gameOver, timeLeft]);

  // Balloon movement
  useEffect(() => {
    if (paused || freezeActive) return;
    const movementInterval = setInterval(() => {
      setBalloons((prev) =>
        prev.map((b) => ({ ...b, y: b.y - b.speed })).filter((b) => {
          if (b.y <= -10) {
            loseLife(); // Balloon escapes
            return false;
          }
          return true;
        })
      );
    }, 50);
    return () => clearInterval(movementInterval);
  }, [paused, freezeActive]);

  const loseLife = () => {
    setLives((prev) => {
      if (prev - 1 <= 0) {
        setGameOver(true);
        saveHighScore();
        return 0;
      }
      return prev - 1;
    });
  };

  const handleBalloonClick = (id) => {
    const balloon = balloons.find((b) => b.id === id);
    if (!balloon) return;

    if (soundOn) {
      popSoundRef.current.currentTime = 0; // Reset audio to prevent overlap
      popSoundRef.current.play();
    }

    setBalloons((prev) => prev.filter((b) => b.id !== id));
    setScore((prev) => prev + (balloon.isBonus ? 20 : 10));
    handlePowerUp(balloon.type);

    setCombo((prev) => {
      const newCombo = prev + 1;
      if (newCombo % 10 === 0) advanceLevel();
      return newCombo;
    });
  };

  const handlePowerUp = (type) => {
    switch (type) {
      case 'time':
        setTimeLeft((prev) => prev + 5);
        setSnackbarMessage('🕰 Extra Time! +5 seconds!');
        break;
      case 'slow':
        setPaused(true);
        setTimeout(() => setPaused(false), 5000);
        setSnackbarMessage('🐌 Slow Motion for 5 seconds!');
        break;
      case 'freeze':
        setFreezeActive(true);
        setSnackbarMessage('❄️ Freeze! Balloons are stuck!');
        setTimeout(() => setFreezeActive(false), 5000);
        break;
      case 'doubleScore':
        setSnackbarMessage('⭐ Double Score for 10 seconds!');
        setActivePowerUps((prev) => [...prev, { name: 'Double Score', duration: 10000 }]);
        break;
      case 'extraLife':
        setSnackbarMessage('❤️ Extra Life! Stay in the game!');
        setLives((prev) => Math.min(prev + 1, 5)); // Max lives capped at 5
        break;
      default:
        break;
    }
  };

  const advanceLevel = () => {
    setLevel((prev) => prev + 1);
    setTimeLeft(30);
  };

  const saveHighScore = () => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score);
    }
  };

  const restartGame = () => {
    saveHighScore();
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setLives(3);
    setCombo(0);
    setPaused(false);
    setBalloons([]);
    setGameOver(false);
    setActivePowerUps([]);
  };

  // Load saved state on mount
  useEffect(() => {
    loadFromDatabase();
  }, []);

  const handleNewGame = () => {
    restartGame();
    setReloadGame(true);
  };

  const handleLoadLastSession = async () => {
    await loadFromDatabase();
    setReloadGame(true);
  };

  // Save state on unload
  useEffect(() => {
    const handleUnload = () => saveToDatabase();
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [score, level, timeLeft]);

  return (
    <div className="App">
      {!reloadGame ? (<div>
        <div className="text-center h-screen flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-4">🎤 Welcome to the Game</h1>
          <button
            onClick={handleNewGame}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow"
          >
            🆕 Start New Game
          </button>
          <button
            onClick={handleLoadLastSession}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded shadow ml-4"
          >
            🔄 Reload Last Session
          </button>
        </div>
      </div>):(<div>
        <header className="header">
        <h1>🎉 Balloon Pop!</h1>
        <div className="info">
          <span><FaRegClock /> {timeLeft}s</span>
          <span><FaLevelUpAlt /> Level {level}</span>
          <span><FaStar /> {score}</span>
          <span>High Score: {highScore}</span>
          <span><FaHeart /> Lives: {lives}</span>
        </div>
        <div className="controls">
          <button onClick={() => setPaused(!paused)}>
            {paused ? 'Resume' : 'Pause'}
          </button>
          <button onClick={() => setSoundOn(!soundOn)}>
            {soundOn ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
        </div>
      </header>

      <div className="game-area">
        {balloons.map((b) => (
          <Balloon key={b.id} balloon={b} onClick={() => handleBalloonClick(b.id)} />
        ))}
      </div>

      {snackbarMessage && (
        <Snackbar message={snackbarMessage} onClose={() => setSnackbarMessage('')} />
      )}

      <div className="power-ups">
        {activePowerUps.map((p, index) => (
          <span key={index}>{p.name}</span>
        ))}
      </div>

      {gameOver && (
        <div className="game-over-screen">
          <h2>Game Over</h2>
          <p>Your Score: {score}</p>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
      </div>)}
     
    </div>
  );
}

export default BetterAim;
