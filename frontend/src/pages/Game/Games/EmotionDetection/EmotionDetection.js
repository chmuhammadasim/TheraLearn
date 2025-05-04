import { useState,useRef,useEffect,useCallback } from 'react';

import * as faceapi from 'face-api.js';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion'; 

const EMOTIONS = ['happy', 'sad', 'neutral', 'angry'];
const LEVEL_DURATION = 30;
const CONFIDENCE_THRESHOLD = 0.8;
const SUCCESS_DELAY = 2000; 
const DETECTION_INTERVAL = 1000;

const EmotionIcon = ({ emotion }) => {
  const icons = {
    happy: '😊',
    sad: '😢',
    neutral: '😐',
    angry: '😠'
  };
  
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="text-6xl md:text-8xl filter drop-shadow-md"
    >
      {icons[emotion]}
    </motion.div>
  );
};
function EmotionDetection() {
  const [gameState, setGameState] = useState('playing');
  const [player] = useState(null);
  const [gameResult, setGameResult] = useState(null);


  const handleGameOver = (result) => {
    setGameResult(result);
    setGameState('over');
  };

  const handleRestart = () => {
    setGameState('playing');
  };

  return (
    <>
      {gameState === 'playing' && (
        <GameScreen 
          onGameOver={handleGameOver} 
        />
      )}
      {gameState === 'over' && gameResult && (
        <GameOver 
          gameResult={gameResult} 
          onRestart={handleRestart} 
        />
      )}
    </>
  );
}

export default EmotionDetection;


const GameOver = ({ gameResult, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-400 to-blue-500 p-4 sm:p-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div key={i} 
               className="absolute rounded-full bg-white/10 animate-float"
               style={{
                 width: `${Math.random() * 100 + 50}px`,
                 height: `${Math.random() * 100 + 50}px`,
                 top: `${Math.random() * 100}%`,
                 left: `${Math.random() * 100}%`,
                 animationDuration: `${Math.random() * 10 + 10}s`,
                 animationDelay: `${Math.random() * 5}s`
               }}
          />
        ))}
      </div>
      
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] p-8 max-w-md w-full mx-auto transform transition-all duration-300 hover:scale-[1.02] border border-blue-100 z-10">
        <div className="relative mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-3">Game Over</h1>
          <div className="h-1.5 w-32 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-4 mb-8">

          <div className="flex justify-between items-center bg-gray-50/80 p-5 rounded-xl hover:bg-white transition-colors duration-200 border-l-4 border-blue-500 shadow-sm">
            <span className="font-semibold text-gray-700">Final Score:</span>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">{gameResult.score}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-50/80 p-5 rounded-xl hover:bg-white transition-colors duration-200 border-l-4 border-purple-500 shadow-sm">
            <span className="font-semibold text-gray-700">Level Reached:</span>
            <span className="font-medium text-gray-900">{gameResult.level}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-50/80 p-5 rounded-xl hover:bg-white transition-colors duration-200 border-l-4 border-indigo-500 shadow-sm">
            <span className="font-semibold text-gray-700">Total Attempts:</span>
            <span className="font-medium text-gray-900">{gameResult.attempts}</span>
          </div>
        </div>
        
        <button
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 text-white py-4 px-6 rounded-xl transition duration-300 transform hover:scale-105 font-bold text-lg flex items-center justify-center gap-3 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Play Again
        </button>
        
        <div className="text-center mt-6 text-sm text-gray-500">
          Thanks for playing! Challenge yourself to beat your high score.
        </div>
      </div>
    </div>
  );
};

const GameScreen = ({ onGameOver }) => {
  const [currentEmotion, setCurrentEmotion] = useState('');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(true);
  const [detectionResult, setDetectionResult] = useState(null);
  const [isRoundComplete, setIsRoundComplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const gameData = {
    gameName: "EmotionDetection",
    score:score,
    duration:timeLeft,
    level: level,
  };
  
  let selectedchild = (localStorage.getItem('selectedChildId') || '').replace(/^"|"$/g, '');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const gameContainerRef = useRef(null);
  const timerRef = useRef(null);
  const detectionIntervalRef = useRef(null);
  const successTimerRef = useRef(null);

  // Initialize game
  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ])
      .then(() => {
        console.log("All models loaded successfully");
        startDetection();
      })
      .catch(err => {
        console.error("Error loading models:", err);
      });
    };

    startVideo();
    loadModels();
    startNewRound();
    
    const tipInterval = setInterval(() => {
      if (Math.random() > 0.7) setShowTip(true);
    }, 10000);
    
    return () => {
      clearInterval(timerRef.current);
      clearInterval(detectionIntervalRef.current);
      clearTimeout(successTimerRef.current);
      clearInterval(tipInterval);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);


  const endGame = useCallback(() => {
    setGameActive(false);
    clearInterval(timerRef.current);
    clearInterval(detectionIntervalRef.current);
    clearTimeout(successTimerRef.current);
    onGameOver({ score, level, attempts });
  }, [score, level, attempts, onGameOver]);

  useEffect(() => {
    if (timeLeft === 0) {
      const token = localStorage.getItem('authToken');
      console.log(gameData);

      const saveData = async () => {
        try {
          const response = await axios.post(
            `http://localhost:5000/api/game/saveGameData`,
            gameData,
            {
              headers: { 
                "Content-Type": "application/json", 
                'authorization': `Bearer ${token}`,
                'selectedchild': selectedchild,
              },
            }
          );
          console.log(response.data);
          console.log("Game state saved successfully!");
        } catch (error) {
          console.error("Error saving game state to database:", error);
        } finally {
          endGame();
        }
      };

      saveData();
    }
  }, [endGame, gameData, selectedchild, timeLeft]);

  // Save game progress periodically


  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((currentStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
        }
      })
      .catch((err) => {
        console.error("Error starting video:", err);
      });
  };



  const startNewRound = () => {
    setIsRoundComplete(false);
    setShowSuccess(false);
    setCurrentEmotion(EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)]);
    setTimeLeft(LEVEL_DURATION);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
  };

  const startDetection = () => {
    detectionIntervalRef.current = setInterval(async () => {
      if (!videoRef.current || !videoRef.current.videoWidth || !gameActive || isRoundComplete) return;

      try {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        if (canvasRef.current) {
          const context = canvasRef.current.getContext('2d');
          context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          
          if (detections.length > 0) {
            faceapi.matchDimensions(canvasRef.current, {
              width: 640,
              height: 480
            });

            const resized = faceapi.resizeResults(detections, {
              width: 640,
              height: 480
            });

            faceapi.draw.drawDetections(canvasRef.current, resized);
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
            faceapi.draw.drawFaceExpressions(canvasRef.current, resized);

            const expressions = detections[0].expressions;
            const [detectedEmotion, confidence] = Object.entries(expressions)
              .reduce((a, b) => a[1] > b[1] ? a : b);

            console.log(`Detected: ${detectedEmotion} (${confidence.toFixed(2)})`);

            setDetectionResult({
              emotion: detectedEmotion,
              confidence: confidence,
              isMatch: detectedEmotion === currentEmotion && confidence >= CONFIDENCE_THRESHOLD
            });

            if (!isRoundComplete && 
                detectedEmotion === currentEmotion && 
                confidence >= CONFIDENCE_THRESHOLD) {
              console.log("Successful match detected!");
              handleCorrectEmotion();
            }
          }
        }
      } catch (err) {
        console.error("Detection error:", err);
      }
    }, DETECTION_INTERVAL);
  };

  const handleCorrectEmotion = () => {
    setIsRoundComplete(true);
    setShowSuccess(true);
    clearInterval(detectionIntervalRef.current);
    
    const newScore = score + 10 * level;
    const newAttempts = attempts + 1;
    setScore(newScore);
    setAttempts(newAttempts);

    
    // Delay before next round
    successTimerRef.current = setTimeout(() => {
      console.log("Starting new round...");
      if (level < 5) {
        setLevel(prev => prev + 1);
      }
      startNewRound();
      startDetection();
    }, SUCCESS_DELAY);
  };



  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Calculate progress percentage for timer
  const timerPercentage = (timeLeft / LEVEL_DURATION) * 100;

  const getEmotionTip = (emotion) => {
    const tips = {
      happy: "Try a big smile! Show your teeth and raise your cheeks.",
      sad: "Think of something melancholy. Lower your eyebrows and mouth corners.",
      neutral: "Relax your face completely. Keep a straight face with no expressions.",
      angry: "Furrow your brows and tighten your lips. Think of something annoying!"
    };
    return tips[emotion] || "Express the emotion as clearly as possible";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100 p-2 sm:p-4 md:p-6 relative overflow-x-hidden">
      {/* Animated floating shapes for extra visual interest */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-2xl opacity-30`}
            style={{
              width: `${Math.random() * 80 + 60}px`,
              height: `${Math.random() * 80 + 60}px`,
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              background: `linear-gradient(135deg, #6366f1 0%, #a78bfa 100%)`,
              filter: `blur(${Math.random() * 6 + 6}px)`,
              zIndex: 1,
            }}
            animate={{
              y: [0, Math.random() * 40 - 20, 0],
              x: [0, Math.random() * 40 - 20, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
          {/* Game Info */}
          <motion.div 
            layout
            className={`bg-white/95 rounded-2xl shadow-xl p-4 md:p-6 w-full ${isFullscreen ? 'lg:hidden' : 'lg:w-1/3'} border border-indigo-100 transition-all duration-300 ease-in-out backdrop-blur-md`}>
            <motion.h2 
              layout
              className="text-xl md:text-2xl font-extrabold text-indigo-700 mb-3 md:mb-5 flex items-center tracking-tight">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Game Stats
            </motion.h2>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">

              
              <motion.div 
                whileHover={{ scale: 1.04 }}
                className="bg-purple-50 rounded-lg p-2 md:p-3 shadow-sm transition-all duration-200 hover:shadow-md border-l-4 border-purple-400">
                <h3 className="text-xs md:text-sm font-semibold text-purple-600 uppercase tracking-wide">Score</h3>
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={score}
                    initial={{ scale: 1.2, color: "#8B5CF6" }}
                    animate={{ scale: 1, color: "#000" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="text-lg md:text-xl font-bold"
                  >{score}</motion.p>
                </AnimatePresence>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.04 }}
                className="bg-blue-50 rounded-lg p-2 md:p-3 shadow-sm transition-all duration-200 hover:shadow-md border-l-4 border-blue-400">
                <h3 className="text-xs md:text-sm font-semibold text-blue-600 uppercase tracking-wide">Level</h3>
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={level}
                    initial={{ scale: 1.2, color: "#3B82F6" }}
                    animate={{ scale: 1, color: "#000" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="text-lg md:text-xl font-bold"
                  >{level}</motion.p>
                </AnimatePresence>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.04 }}
                className="bg-teal-50 rounded-lg p-2 md:p-3 shadow-sm transition-all duration-200 hover:shadow-md border-l-4 border-teal-400">
                <h3 className="text-xs md:text-sm font-semibold text-teal-600 uppercase tracking-wide">Attempts</h3>
                <p className="text-lg md:text-xl font-bold">{attempts}</p>
              </motion.div>
            </div>
            
            {/* Time left progress bar */}
            <div className="mb-4 md:mb-6">
              <div className="flex justify-between mb-1">
                <h3 className="text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide">Time Left</h3>
                <span className="text-xs md:text-sm font-medium">{timeLeft}s</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 md:h-3 overflow-hidden">
                <motion.div 
                  animate={{ width: `${timerPercentage}%` }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                  className={`h-2.5 md:h-3 rounded-full ${
                    timeLeft < 2 ? 'bg-red-500' : 
                    timeLeft < LEVEL_DURATION/2 ? 'bg-amber-400' : 'bg-indigo-600'
                  }`}
                ></motion.div>
              </div>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="mt-4 md:mt-6 p-3 md:p-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md text-white group border-2 border-indigo-200">
              <h3 className="text-md md:text-lg font-semibold mb-2 opacity-90 group-hover:opacity-100 transition-opacity">Current Emotion</h3>
              <p className="text-2xl md:text-3xl font-bold text-center capitalize flex items-center justify-center gap-2">
                <EmotionIcon emotion={currentEmotion} />
                {currentEmotion}
                {showSuccess && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      times: [0, 0.5, 1],
                      repeat: 3,
                      duration: 0.6
                    }}
                    className="ml-2 text-yellow-300"
                  >✓</motion.span>
                )}
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {detectionResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  key={`${detectionResult.emotion}-${detectionResult.confidence}`}
                  className={`mt-4 md:mt-5 p-3 md:p-4 rounded-lg transition-all duration-300 shadow-sm ${
                    detectionResult.isMatch 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500' 
                      : 'bg-gradient-to-r from-gray-50 to-slate-50 border-l-4 border-gray-300'
                  }`}>
                  <p className="text-xs md:text-sm text-gray-600 mb-1">Detection Results:</p>
                  <div className="flex items-center justify-between">
                    <p className="text-base md:text-lg font-medium capitalize flex items-center gap-2">
                      <EmotionIcon emotion={detectionResult.emotion} />
                      {detectionResult.emotion} 
                    </p>
                    <div className="w-12 h-12 md:w-16 md:h-16 relative">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle 
                          className="text-gray-200" 
                          cx="50" cy="50" r="45" 
                          stroke="currentColor" 
                          strokeWidth="8" 
                          fill="none" 
                        />
                        <motion.circle 
                          initial={{ strokeDashoffset: 283 }}
                          animate={{ strokeDashoffset: 283 - (283 * detectionResult.confidence) }}
                          transition={{ type: "spring", stiffness: 100, damping: 30 }}
                          className={`${detectionResult.isMatch ? 'text-green-500' : 'text-indigo-500'}`}
                          cx="50" cy="50" r="45" 
                          stroke="currentColor" 
                          strokeWidth="8" 
                          fill="none" 
                          strokeDasharray="283"
                        />
                      </svg>
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs md:text-sm font-semibold">
                        {Math.round(detectionResult.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                  {detectionResult.isMatch ? (
                    <motion.div 
                      initial={{ scaleY: 0, originY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="mt-2 bg-green-100 p-2 rounded-md"
                    >
                      <p className="text-green-700 font-semibold flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Perfect match!
                      </p>
                      <p className="text-green-700 text-xs md:text-sm">+{10 * level} points</p>
                    </motion.div>
                  ) : (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-yellow-600 text-xs md:text-sm mt-2 bg-yellow-50 p-2 rounded-md">
                      {detectionResult.confidence >= CONFIDENCE_THRESHOLD - 0.1 ? 
                       "Almost there! Try more clearly expressing the emotion." : 
                       `Keep trying! Need ${Math.round(CONFIDENCE_THRESHOLD * 100)}% confidence to succeed.`}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Game Area */}
          <motion.div 
            layout
            ref={gameContainerRef} 
            className={`w-full transition-all duration-300 ${isFullscreen ? 'lg:w-full' : 'lg:w-2/3'} space-y-3 md:space-y-5`}>
            <motion.div 
              layout
              className="bg-white/95 rounded-2xl shadow-xl p-4 md:p-6 border border-indigo-100 backdrop-blur-md">
              <div className="flex justify-between items-center mb-3">
                <motion.h2 
                  layout
                  className="text-lg md:text-xl font-extrabold text-indigo-700 tracking-tight">Make this face:</motion.h2>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleFullscreen}
                  className="text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-md p-2 transition duration-200"
                  aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                  )}
                </motion.button>
              </div>
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex flex-col md:flex-row justify-center items-center p-4 md:p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-100 rounded-lg shadow-sm border border-indigo-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentEmotion}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <EmotionIcon emotion={currentEmotion} />
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-3 text-center"
                    >
                      <p className="text-lg md:text-xl font-semibold text-indigo-800 capitalize">{currentEmotion}</p>
                      <p className="text-xs md:text-sm text-indigo-600 mt-1 max-w-sm">
                        {getEmotionTip(currentEmotion)}
                      </p>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
                
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-base md:text-xl p-2 md:p-4 ml-0 md:ml-8 mt-4 md:mt-0 rounded-lg shadow-lg border-2 border-green-200"
                    >
                      <span className="flex items-center whitespace-nowrap">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-bold">Great job!</span>
                        <span className="ml-2 text-green-100">+{10 * level} points</span>
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
            
            <motion.div 
              layout
              className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group"
            >
              <video 
                ref={videoRef} 
                autoPlay 
                muted 
                className="w-full rounded-lg border-2 border-indigo-200 shadow-lg"
                style={{ height: isFullscreen ? '550px' : '450px', objectFit: 'cover', background: "#e0e7ff" }}
              />
              <canvas 
                ref={canvasRef} 
                width="640" 
                height="480"
                className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
              />
              
              <motion.div 
                className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold shadow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                {gameActive ? 'Live Camera' : 'Game Over'}
              </motion.div>

              {/* Level badge */}
              <div className="absolute top-4 left-4 bg-indigo-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold shadow">
                Level {level}
              </div>

              {/* Mobile Controls */}
              <div className="lg:hidden absolute top-4 right-4">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleFullscreen}
                  className="text-white bg-black/60 backdrop-blur-sm rounded-full p-2"
                  aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                  )}
                </motion.button>
              </div>
              
              {/* Overlay effect on success */}
              {showSuccess && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-green-500/20 pointer-events-none"
                />
              )}
            </motion.div>
            
            <AnimatePresence>
              {showTip && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-3 md:p-4 text-center shadow-md border border-amber-200 relative"
                >
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowTip(false)}
                    className="absolute top-2 right-2 text-amber-400 hover:text-amber-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                  <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-amber-700 text-sm md:text-base font-medium">
                      Pro Tip: Make sure you have good lighting for better facial recognition!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div 
              whileHover={{ scale: 1.01, boxShadow: "0 4px 20px rgba(79, 70, 229, 0.15)" }}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-3 md:p-4 text-center shadow-md text-white border-2 border-indigo-200"
            >
              <p className="text-sm md:text-base font-medium">
                Express <span className="font-bold">{currentEmotion}</span> to earn points! {timeLeft < 3 && <span className="animate-pulse text-yellow-200">Hurry up!</span>}
              </p>
            </motion.div>
          </motion.div>
        </div>
        {/* Subtle bottom glow */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-24 bg-gradient-to-t from-indigo-400/30 to-transparent rounded-full blur-2xl pointer-events-none z-0" />
      </motion.div>
    </div>
  );
};