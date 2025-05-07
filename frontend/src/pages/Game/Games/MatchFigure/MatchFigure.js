import React, { useState, useEffect, useCallback } from "react";
import Shape from "./components/Shape";
import Timer from "./components/Timer";
import StartScreen from "./components/StartScreen";
import FinishScreen from "./components/FinishScreen";
import confetti from "canvas-confetti";
import axios from "axios";
// import "./styles.css"; // Keep for custom animations

// Enhanced shapeTypes with gradients and icons for better visuals
const shapeTypes = {
  square: {
    color: "#FF5252",
    gradient: "linear-gradient(135deg, #FF5252 60%, #FF867F 100%)",
    icon: "square",
    shadow: "0 4px 16px rgba(255,82,82,0.15)",
  },
  triangle: {
    color: "#448AFF",
    gradient: "linear-gradient(135deg, #448AFF 60%, #82B1FF 100%)",
    icon: "triangle",
    shadow: "0 4px 16px rgba(68,138,255,0.15)",
  },
  circle: {
    color: "#66BB6A",
    gradient: "linear-gradient(135deg, #66BB6A 60%, #B9F6CA 100%)",
    icon: "circle",
    shadow: "0 4px 16px rgba(102,187,106,0.15)",
  },
  star: {
    color: "#FFD600",
    gradient: "linear-gradient(135deg, #FFD600 60%, #FFFF8D 100%)",
    icon: "star",
    shadow: "0 4px 16px rgba(255,214,0,0.15)",
  },
  heart: {
    color: "#EC407A",
    gradient: "linear-gradient(135deg, #EC407A 60%, #FF80AB 100%)",
    icon: "heart",
    shadow: "0 4px 16px rgba(236,64,122,0.15)",
  },
};

const selectedchild = (localStorage.getItem("selectedChildId") || "").replace(
  /^"|"$/g,
  ""
);

const levels = [
  {
    id: 1,
    name: "Easy Peasy",
    timeLimit: 60,
    spots: [
      { id: "spot1", type: "square", color: "#FFCDD2" },
      { id: "spot2", type: "triangle", color: "#BBDEFB" },
      { id: "spot3", type: "circle", color: "#C8E6C9" },
    ],
  },
  {
    id: 2,
    name: "Double Trouble",
    timeLimit: 50,
    spots: [
      { id: "spot4", type: "square", color: "#FFCDD2" },
      { id: "spot5", type: "triangle", color: "#BBDEFB" },
      { id: "spot6", type: "circle", color: "#C8E6C9" },
      { id: "spot7", type: "square", color: "#F8BBD0" },
    ],
  },
  {
    id: 3,
    name: "Shape Master",
    timeLimit: 45,
    spots: [
      { id: "spot8", type: "circle", color: "#C8E6C9" },
      { id: "spot9", type: "circle", color: "#B2DFDB" },
      { id: "spot10", type: "square", color: "#FFCDD2" },
      { id: "spot11", type: "triangle", color: "#BBDEFB" },
      { id: "spot12", type: "square", color: "#F8BBD0" },
    ],
  },
];

const MatchFigure = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [matchedSpots, setMatchedSpots] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [levelProgress, setLevelProgress] = useState(0);

  const getAvailableShapes = () => {
    const currentLevelSpots = levels[currentLevel].spots;
    const uniqueTypes = [
      ...new Set(currentLevelSpots.map((spot) => spot.type)),
    ];
    return uniqueTypes.map((type) => ({
      id: `shape-${type}`,
      type: type,
      color: shapeTypes[type]?.color || "#888888",
    }));
  };

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("shapeType", type);
    document.body.classList.add("dragging");
    if (e.target) {
      e.target.classList.add("dragging-active");
    }
  };

  const handleDragEnd = (e) => {
    document.body.classList.remove("dragging");
    if (e.target) {
      e.target.classList.remove("dragging-active");
    }
  };

  const handleDrop = (e, spotId) => {
    e.preventDefault();
    document.body.classList.remove("dragging");
    const shapeType = e.dataTransfer.getData("shapeType");
    const spot = levels[currentLevel].spots.find((spot) => spot.id === spotId);

    if (!spot || matchedSpots.includes(spotId)) {
      setMessage("This spot is already filled!");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1500);
      return;
    }

    if (shapeType === spot.type) {
      setMatchedSpots((prev) => [...prev, spotId]);
      setScore((prev) => prev + 10);
      setMessage("Great job! 🎉");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 800);

      const newProgress =
        ((matchedSpots.length + 1) / levels[currentLevel].spots.length) * 100;
      setLevelProgress(newProgress);

      const spotElement = document.getElementById(spotId);
      if (spotElement) {
        spotElement.classList.add("success-pulse");
        setTimeout(() => spotElement.classList.remove("success-pulse"), 1000);
      }

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: [shapeTypes[shapeType].color, "#ffffff", "#FFC107"],
      });
    } else {
      setMessage("Try again! Find the matching shape!");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1500);

      const spotElement = document.getElementById(spotId);
      if (spotElement) {
        spotElement.classList.add("error-shake");
        setTimeout(() => spotElement.classList.remove("error-shake"), 500);
      }
    }
  };
  const saveToDatabase = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    const gameData = {
      gameName: "MatchingFiguresGame",
      score: score,
      duration: remainingTime,
      level: currentLevel + 1,
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_API_KEY}/game/saveGameData`,
        gameData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
            selectedchild: selectedchild,
          },
        }
      );
      setMessage("Game saved successfully!");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1500);
      setShowExitModal(false);
    } catch (error) {
      setMessage("Error saving game!");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1500);
    }
  }, [score, remainingTime, currentLevel]);

  const handleTimeUp = () => {
    setGameOver(true);
    setMessage("Time's up! Game Over!");
    if (remainingTime <= 0) {
      saveToDatabase();
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setCurrentLevel(0);
    setMatchedSpots([]);
    setScore(0);
    setMessage("");
    setShowMessage(false);
    setIsLevelComplete(false);
    setLevelProgress(0);
    setTimeout(() => {
      const gameElements = document.querySelectorAll(".game-container > *");
      gameElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("fade-in");
        }, index * 100);
      });
    }, 300);
    loadFromDatabase();
  };

  const handleRestartGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setIsLevelComplete(false);
    setLevelProgress(0);
  };

  const handleNextLevel = useCallback(() => {
    setIsLevelComplete(false);
    setLevelProgress(0);
    if (currentLevel < levels.length - 1) {
      const gameContent = document.querySelector(".game-content");
      if (gameContent) {
        gameContent.classList.add("level-transition");
      }
      setTimeout(() => {
        setCurrentLevel((prev) => prev + 1);
        setMatchedSpots([]);
        if (gameContent) {
          gameContent.classList.remove("level-transition");
        }
      }, 500);
    } else {
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 },
        colors: [
          "#FF5252",
          "#448AFF",
          "#66BB6A",
          "#FFD600",
          "#EC407A",
        ],
      });
      setGameOver(true);
      setMessage("Congratulations! You've completed all levels! 🎉");
      saveToDatabase();
      setShowMessage(true);
    }
  }, [currentLevel, saveToDatabase]);




  const loadFromDatabase = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}/game/loadGameData/MatchingFiguresGame`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
            selectedchild: selectedchild,
          },
        }
      );
      if (response.data && response.data.level) {
        setCurrentLevel((response.data.level || 1) - 1);
        setScore(response.data.score || 0);
        setMessage("Previous game loaded!");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 1500);
      }
    } catch (error) {}
  };

  const handleExitClick = () => {
    setShowExitModal(true);
  };

  const closeExitModal = () => {
    setShowExitModal(false);
  };

  const updateRemainingTime = (time) => {
    setRemainingTime(time);
  };

  useEffect(() => {
    if (
      matchedSpots.length > 0 &&
      matchedSpots.length === levels[currentLevel].spots.length &&
      !isLevelComplete
    ) {
      setIsLevelComplete(true);
      setLevelProgress(100);

      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.6 },
        colors: [
          "#FF5252",
          "#448AFF",
          "#66BB6A",
          "#FFD600",
          "#EC407A",
        ],
      });

      setMessage(`Level ${currentLevel + 1} Complete! 🎉`);
      setShowMessage(true);

      setTimeout(() => {
        if (currentLevel < levels.length - 1) {
          handleNextLevel();
        } else {
          setGameOver(true);
          saveToDatabase();
          setMessage("Congratulations! You've completed all levels! 🎉");
        }
        setShowMessage(false);
      }, 2000);
    }
  }, [
    matchedSpots,
    currentLevel,
    isLevelComplete,
    handleNextLevel,
    saveToDatabase,
  ]);
  return (
    <>
    <div className="game-container min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-100 p-2 sm:p-4 relative overflow-x-hidden">
      {/* Decorative animated background shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-pink-300 to-yellow-200 rounded-full opacity-30 animate-pulse -z-10"></div>
      <div className="absolute bottom-0 right-0 w-52 h-52 bg-gradient-to-tr from-blue-200 to-green-200 rounded-full opacity-20 animate-pulse delay-1000 -z-10"></div>
      {showExitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xs flex flex-col items-center border-4 border-blue-200">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Do you want to save your progress?
            </h3>
            <div className="flex gap-4">
              <button
                className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
                onClick={saveToDatabase}
              >
                Save & Exit
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold transition"
                onClick={closeExitModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {!gameStarted && !gameOver && <StartScreen onStart={handleStartGame} />}
      {gameStarted && !gameOver && (
        <>
          <h1 className="game-title text-4xl sm:text-5xl font-extrabold text-center mt-20 mb-2 text-blue-700 drop-shadow-lg tracking-tight bg-white bg-opacity-60 rounded-2xl px-6 py-2 border-2 border-blue-200 shadow-xl"> Match Figures</h1>
          <div className="game-controls w-full max-w-4xl flex flex-col md:flex-col justify-between items-center mb-8 gap-6 bg-white bg-opacity-70 rounded-2xl shadow-lg p-4 border-2 border-blue-100">
            <div className="level-info flex flex-row items-center gap-2">
              <div className="level-badge bg-yellow-100 text-yellow-800 font-semibold px-6 py-2 rounded-xl shadow-md text-base sm:text-lg border-2 border-yellow-300">
                <span className="mr-2">⭐</span>
                Level {currentLevel + 1}: {levels[currentLevel].name}
              </div>
              <Timer
                timeLimit={levels[currentLevel].timeLimit}
                onTimeUp={handleTimeUp}
                updateRemainingTime={updateRemainingTime}
              />
            </div>

            <div className="progress-bar-container w-full md:w-1/2 flex flex-row items-center">
              <div className="w-full bg-gray-200 rounded-full h-5 mb-1 shadow-inner border-2 border-blue-200">
                <div
                  className="progress-bar bg-gradient-to-r from-green-400 via-blue-300 to-blue-500 h-5 rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${levelProgress}%` }}
                ></div>
              </div>
              <span className="progress-text text-xs text-gray-700 font-semibold tracking-wide">
                {Math.round(levelProgress)}% complete
              </span>
            </div>

            <div className="score-container flex flex-row items-center gap-2">
              <div className="score-badge bg-green-100 text-green-800 font-semibold px-6 py-2 rounded-xl shadow-md text-base sm:text-lg border-2 border-green-300">
                <span className="mr-2">🏆</span>
                Score: {score}
              </div>
              <button
                className="exit-button bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition border-2 border-pink-200"
                onClick={handleExitClick}
              >
                Exit
              </button>
            </div>
          {showMessage && (
            <div
              className={`message px-8 py-4 rounded-2xl shadow-2xl mb-6 text-center font-bold text-lg sm:text-xl transition-all duration-300 border-2 ${
                message.includes("Great") ||
                message.includes("Complete") ||
                message.includes("saved") ||
                message.includes("loaded")
                  ? "bg-green-200 text-green-900 border-green-400 animate-pulse"
                  : "bg-red-200 text-red-900 border-red-400 animate-shake"
              }`}
            >
              {message}
            </div>
          )}
               
          <div className="game-content w-full max-w-5xl flex flex-row md:flex-row gap-10 justify-center items-stretch border-2 border-blue-100 rounded-2xl shadow-2xl bg-white bg-opacity-80 p-6">
            <div className="play-area shapes-area flex-1 flex flex-col items-center bg-gradient-to-br from-white via-blue-50 to-pink-50 rounded-2xl shadow-xl p-6 mb-4 md:mb-0 border-2 border-blue-100">
              <h3 className="section-title text-xl sm:text-2xl font-bold mb-4 text-blue-700 tracking-wide">
                <span className="mr-2">🟦</span> Drag These Shapes!
              </h3>
              <div className="shapes-container flex flex-wrap gap-6 justify-center">
                {getAvailableShapes().map((shape) => (
                  <div className="hover:scale-110 transition-transform duration-200">
                    <Shape
                      key={shape.id}
                      type={shape.type}
                      color={shape.color}
                      onDragStart={(e) => handleDragStart(e, shape.type)}
                      onDragEnd={handleDragEnd}
                      disabled={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="play-area spots-area flex-1 flex flex-col items-center bg-gradient-to-br from-white via-yellow-50 to-green-50 rounded-2xl shadow-xl p-6 border-2 border-yellow-100">
              <h3 className="section-title text-xl sm:text-2xl font-bold mb-4 text-blue-700 tracking-wide">
                <span className="mr-2">⬇️</span> Drop in Correct Spots!
              </h3>
              <div className="spots-container grid grid-cols-2 sm:grid-cols-3 gap-6 w-full justify-items-center">
                {levels[currentLevel].spots.map((spot) => (
                  <div
                    id={spot.id}
                    key={spot.id}
                    className={`spot w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-2xl shadow-xl border-4 border-dashed transition-all duration-200 cursor-pointer relative group ${
                      matchedSpots.includes(spot.id)
                        ? "border-green-400 bg-green-100 animate-pulse"
                        : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                    style={{ backgroundColor: spot.color }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, spot.id)}
                  >
                    {matchedSpots.includes(spot.id) ? (
                      <img
                        src={`/src/assets/shapes/${spot.type}.svg`}
                        alt={spot.type}
                        className="shape-image filled w-14 h-14 sm:w-20 sm:h-20 drop-shadow-lg"
                      />
                    ) : (
                      <img
                        src={`/src/assets/shapes/${spot.type}-outline.svg`}
                        alt={spot.type}
                        className="shape-image outline w-14 h-14 sm:w-20 sm:h-20 opacity-60 group-hover:opacity-90 transition"
                      />
                    )}
                    {!matchedSpots.includes(spot.id) && (
                      <span className="absolute bottom-2 right-2 text-xs text-gray-400 group-hover:text-blue-400 transition">
                        {spot.type.charAt(0).toUpperCase() + spot.type.slice(1)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
                    
                
            </div>
          
        </>
      )}
      {gameOver && (
        <FinishScreen score={score} onRestart={handleRestartGame} />
      )}
    </div>
    ]
  );
  </>)
};


export default MatchFigure;
