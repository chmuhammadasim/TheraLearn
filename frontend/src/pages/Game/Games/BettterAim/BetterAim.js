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

  const [paused, setPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [activePowerUps, setActivePowerUps] = useState([]);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('highScore')) || 0);
  const [freezeActive, setFreezeActive] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [reloadGame, setReloadGame] = useState(false);

  const popSoundRef = useRef(new Audio(popSoundFile));

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  let selectedchild = (localStorage.getItem('selectedChildId') || '').replace(/^"|"$/g, '');

  const saveToDatabase = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) throw new Error('No auth token found');
      const gameData = {
        gameName: 'BetterAim',
        score,
        duration: 30 - timeLeft,
        level,
      };
      await axios.post(`${process.env.REACT_APP_API_KEY}/game/saveGameData`, gameData, {
        headers: { 
          'Content-Type': 'application/json', 
          'authorization': `Bearer ${token}`,
          'selectedChild': selectedchild,
        },
      });
    } catch (error) {
      console.error('Error saving game state to database:', error);
    }
  }, [score, timeLeft, level, selectedchild]);

  const loadFromDatabase = useCallback(async () => {
    try {
      let token;
      try {
        token = localStorage.getItem('authToken');
        
        if (!token) throw new Error('No auth token found');
      } catch (tokenError) {
        console.error('Error accessing auth token:', tokenError);
        return;
      }

      let response;
      try {
        response = await axios.get(`${process.env.REACT_APP_API_KEY}game/loadGameData/BetterAim`, {
          headers: { 
            'Content-Type': 'application/json', 
            'authorization': `Bearer ${token}`,
            'selectedChild': selectedchild,
          },
        });
      } catch (axiosError) {
        console.error('Error fetching game data from server:', axiosError);
        return;
      }

      if (!response || !response.data) {
        console.error('No data received from server.');
        return;
      }

      let score = 0, duration = 0, level = 1;
      try {
        score = Number(response.data.score) || 0;
        duration = Number(response.data.duration) || 0;
        level = Number(response.data.level) || 1;
      } catch (parseError) {
        console.error('Error parsing game data:', parseError);
      }

      try {
        setScore(score);
        setLevel(level);
        setTimeLeft(30 - duration);
      } catch (stateError) {
        console.error('Error setting state from loaded data:', stateError);
      }

      console.log('Game state loaded successfully!');
    } catch (error) {
      console.error('Unexpected error loading game state from database:', error);
    }
  }, []);

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
    if (timeLeft <= 0)
       setGameOver(true);
    if (gameOver){
      saveToDatabase();
    }
      
    
    if (!paused && !gameOver) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [paused, gameOver, timeLeft]);

  // Balloon movement
 

  // Lose life function
  const saveHighScore = useCallback(() => {
    if (score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem('highScore', score);
      } catch (e) {
        console.error('Failed to save high score:', e);
      }
    }
  }, [score, highScore]);

  const loseLife = useCallback(() => {
    setLives((prev) => {
      if (prev - 1 <= 0) {
        setGameOver(true);
        saveHighScore();
        return 0;
      }
      return prev - 1;
    });
  }, [saveHighScore]);

  // Advance level function
  const advanceLevel = useCallback(() => {
    setLevel((prev) => prev + 1);
    setSnackbarMessage('⬆️ Level Up!');
  }, []);
  useEffect(() => {
    if (paused || freezeActive) return;
    const movementInterval = setInterval(() => {
      setBalloons((prev) =>
        prev.map((b) => ({ ...b, y: b.y - b.speed })).filter((b) => {
          if (b.y <= -10) {
            try {
              loseLife(); // Balloon escapes
            } catch (e) {
              console.error('Error in loseLife:', e);
            }
            return false;
          }
          return true;
        })
      );
    }, 30);
    return () => clearInterval(movementInterval);
  }, [paused, freezeActive, loseLife]);

  // Handle balloon click
  const handleBalloonClick = (id) => {
    const balloon = balloons.find((b) => b.id === id);
    if (!balloon) return;

    if (soundOn) {
      popSoundRef.current.currentTime = 0; // Reset audio to prevent overlap
      popSoundRef.current.play();
    }

    // Power-up balloon
    if (balloon.type) {
      handlePowerUp(balloon.type);
    }

    // Advance level every 100 points (10 balloons)
    setScore((prevScore) => {
      const newScore = prevScore + (balloon.isBonus ? 20 : 10);
      if (Math.floor(newScore / 100) > Math.floor(prevScore / 100)) {
        advanceLevel();
      }
      return newScore;
    });

    // Remove balloon after pop
    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  // Handle power-up
  const handlePowerUp = (type) => {
    switch (type) {
      case 'time':
        setTimeLeft((prev) => prev + 5);
        setSnackbarMessage('🕰 Extra Time! +5 seconds!');
        break;
      case 'slow':
        setPaused(true);
        setSnackbarMessage('🐌 Slow Motion for 5 seconds!');
        setTimeout(() => setPaused(false), 5000);
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

  // Restart game
  const restartGame = () => {
    saveHighScore();
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setLives(3);
    setPaused(false);
    setBalloons([]);
    setGameOver(false);
    setActivePowerUps([]);
    setSnackbarMessage('');
    setReloadGame(false);
  };

  // Start new game (for welcome screen)
  const handleNewGame = () => {
    restartGame();
    setReloadGame(true);
  };

  // Load saved state on mount
  useEffect(() => {
    loadFromDatabase();
  }, [loadFromDatabase]);

  useEffect(() => {
    const handleUnload = () => {
      saveToDatabase().catch((e) => console.error('Error saving on unload:', e));
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [saveToDatabase]);
  
  const handleLoadLastSession = async () => {
    await loadFromDatabase();
    setReloadGame(true);
  };

  // Save state on unload
  useEffect(() => {
    const handleUnload = () => saveToDatabase();
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [score, level, timeLeft, saveToDatabase]);

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
