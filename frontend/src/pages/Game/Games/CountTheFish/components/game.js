import React, { useState, useEffect } from "react";
import "./game.css";
import backgroundImage from "./assets/background.png";
import MusicComponent from './music.js';
import Fish1 from "./assets/Fish1.png";
import Fish2 from "./assets/Fish2.png";
import Fish3 from "./assets/Fish3.png";
import Fish4 from "./assets/Fish4.png";
import Fish5 from "./assets/Fish5.png";
import Fish6 from "./assets/Fish6.png";
import Fish7 from "./assets/Fish7.png";
import Fish8 from "./assets/Fish8.png";

const levelsData = [
  [
    { image: Fish1, count: 1 },
    { image: Fish2, count: 1 },
  ],
  [
    { image: Fish1, count: 1 },
    { image: Fish2, count: 1 },
    { image: Fish3, count: 1 },
  ],
  [
    { image: Fish1, count: 2 },
    { image: Fish2, count: 2 },
    { image: Fish3, count: 2 },
  ],
  [
    { image: Fish1, count: 1 },
    { image: Fish2, count: 1 },
    { image: Fish3, count: 1 },
    { image: Fish4, count: 1 },
  ],
  [
    { image: Fish1, count: 2 },
    { image: Fish2, count: 1 },
    { image: Fish3, count: 1 },
    { image: Fish4, count: 2 },
    { image: Fish5, count: 1 },
  ],
  [
    { image: Fish1, count: 2 },
    { image: Fish2, count: 2 },
    { image: Fish3, count: 1 },
    { image: Fish4, count: 2 },
    { image: Fish5, count: 1 },
    { image: Fish6, count: 1 },
  ],
  [
    { image: Fish1, count: 3 },
    { image: Fish2, count: 2 },
    { image: Fish3, count: 2 },
    { image: Fish4, count: 1 },
    { image: Fish5, count: 1 },
    { image: Fish6, count: 1 },
    { image: Fish7, count: 1 },
  ],
  [
    { image: Fish1, count: 2 },
    { image: Fish2, count: 3 },
    { image: Fish3, count: 2 },
    { image: Fish4, count: 2 },
    { image: Fish5, count: 2 },
    { image: Fish6, count: 1 },
    { image: Fish7, count: 1 },
    { image: Fish8, count: 1 },
  ],
  [
    { image: Fish1, count: 3 },
    { image: Fish2, count: 2 },
    { image: Fish3, count: 2 },
    { image: Fish4, count: 2 },
    { image: Fish5, count: 2 },
    { image: Fish6, count: 2 },
    { image: Fish7, count: 2 },
    { image: Fish8, count: 1 },
  ],
  [
    { image: Fish1, count: 3 },
    { image: Fish2, count: 3 },
    { image: Fish3, count: 2 },
    { image: Fish4, count: 2 },
    { image: Fish5, count: 2 },
    { image: Fish6, count: 2 },
    { image: Fish7, count: 2 },
    { image: Fish8, count: 2 },
  ],
];


// Helper function to generate random positions
const getRandomPosition = (maxLeft, maxTop) => {
  const x = Math.random() * maxLeft;
  const y = Math.random() * maxTop;
  return { x, y };
};

function Game() {
  const [level, setLevel] = useState(1);
  const [userCounts, setUserCounts] = useState({});
  const [correctFlags, setCorrectFlags] = useState({});
  const [message, setMessage] = useState("");
  const [fishPositions, setFishPositions] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [maxWrongGuesses, setMaxWrongGuesses] = useState(5);
  const [isLevelComplete, setIsLevelComplete] = useState(false);

  // Timer: Increment time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize counts, flags, and positions when level changes
  useEffect(() => {
    if (level <= levelsData.length) {
      const currentLevelData = levelsData[level - 1];
      const initialCounts = currentLevelData.reduce(
        (acc, _, index) => ({ ...acc, [index]: "" }),
        {}
      );
      const initialFlags = currentLevelData.reduce(
        (acc, _, index) => ({ ...acc, [index]: null }),
        {}
      );
      setUserCounts(initialCounts);
      setCorrectFlags(initialFlags);
      setMessage("");
      setWrongGuesses(0);
      setIsLevelComplete(false);

      // Define max width and height for the fish positions
      const maxLeft = 80;
      const maxTop = 80;

      // Generate positions for the current level
      const positions = currentLevelData.flatMap((fish, index) =>
        Array(fish.count)
          .fill()
          .map(() => {
            const { x, y } = getRandomPosition(maxLeft, maxTop);
            // Add random rotation and scale for more visual interest
            const rotation = Math.random() * 360;
            const scale = 0.8 + Math.random() * 0.4; // Scale between 0.8 and 1.2
            return { 
              image: fish.image, 
              x, 
              y, 
              index,
              rotation,
              scale,
              // Add random animation delay for swimming effect
              animationDelay: Math.random() * 5 + 's' 
            };
          })
      );

      setFishPositions(positions);
      setTime(0);
    }
  }, [level]);

  const handleChange = (index, event) => {
    const value = event.target.value.trim();
    const currentLevelData = levelsData[level - 1];
    const correctCount = currentLevelData[index].count;
    const isCorrect = parseInt(value, 10) === correctCount;

    setUserCounts((prevCounts) => ({
      ...prevCounts,
      [index]: value,
    }));

    setCorrectFlags((prevFlags) => ({
      ...prevFlags,
      [index]: isCorrect,
    }));

    if (!isCorrect && value !== "") {
      setWrongGuesses((prevWrongGuesses) => prevWrongGuesses + 1);
    }

    const allCorrect = currentLevelData.every((fish, i) => {
      const currentValue = i === index ? value : userCounts[i];
      return parseInt(currentValue, 10) === fish.count;
    });

    if (allCorrect && value !== "") {
      setIsLevelComplete(true);
      setMessage(`🎉 Congratulations! Level ${level} completed.`);
      setScore((prevScore) => prevScore + 10);
      setTimeout(() => {
        if (level < levelsData.length) {
          setLevel((prevLevel) => prevLevel + 1);
        } else {
          setMessage("🏆 Awesome! You have completed all levels.");
        }
      }, 1500);
    }

    // Game over condition
    if (wrongGuesses + 1 >= maxWrongGuesses) {
      setMessage("💔 Game Over! You've exceeded the maximum wrong guesses.");
      setTimeout(() => {
        setLevel(1);
        setScore(0);
      }, 2000);
    }
  };

  const handleRestart = () => {
    setLevel(1);
    setScore(0);
    setWrongGuesses(0);
    setMessage("");
    setTime(0);
    setIsLevelComplete(false);
  };

  const formattedTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="app">
      <MusicComponent />
      <div className="header" style={{
        backgroundColor: "#1a4b84",
        padding: "70px 20px 20px 20px",
        color: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "space-between"
      }}>
        <div className="stat-item">
          <span className="stat-label">Level</span>
          <div className="stat-value">{level}</div>
        </div>
        <div className="stat-item">
          <span className="stat-label">Score</span>
          <div className="stat-value">{score}</div>
        </div>
        <div className="stat-item">
          <span className="stat-label">Time</span>
          <div className="stat-value">{formattedTime()}</div>
        </div>
        <div className="stat-item">
          <span className="stat-label">Wrong Guesses</span>
          <div className="stat-value" style={{ color: wrongGuesses >= maxWrongGuesses - 1 ? "#ff6b6b" : "white" }}>
            {wrongGuesses} / {maxWrongGuesses}
          </div>
        </div>
      </div>
      
      <div className="rectangle" style={{
        display: "flex",
        border: "8px solid #3a7ca5",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
        height: "70vh"
      }}>
        <div
          className="left-side"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            position: "relative",
            width: "50%",
            height: "100%",
            overflow: "hidden"
          }}
        >
          {fishPositions.map((fish, i) => (
            <img
              key={`${fish.index}-${i}`}
              src={fish.image}
              className={`fish fish-${fish.index + 1} ${isLevelComplete ? 'celebrate' : 'swim'}`}
              alt={`Fish ${fish.index + 1}`}
              style={{
                left: `${fish.x}%`,
                top: `${fish.y}%`,
                position: "absolute",
                width: "70px",
                height: "70px",
                transform: `rotate(${fish.rotation}deg) scale(${fish.scale})`,
                animationDelay: fish.animationDelay,
                transition: "all 0.3s ease-in-out"
              }}
            />
          ))}
        </div>
        <div className="right-side" style={{ 
          width: "50%", 
          backgroundColor: "#f0f8ff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div className="box-container" style={{ 
            display: "flex", 
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "15px"
          }}>
            {levelsData[level - 1].map((fish, index) => (
              <div
                key={index}
                className="box"
                style={{
                  border: "2px solid #3a7ca5",
                  borderRadius: "12px",
                  padding: "15px",
                  textAlign: "center",
                  
                  backgroundColor: "white",
                  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s ease",
                  transform: correctFlags[index] === true ? "translateY(-5px)" : "none"
                }}
              >
                <img
                  src={fish.image}
                  alt={`Fish ${index + 1}`}
                  className="box-image"
                  style={{ 
                    width: "60px", 
                    height: "60px",
                    filter: "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2))"
                  }}
                />
                <div style={{ margin: "10px 0" }}>How many?</div>
                <input
                  type="number"
                  min="0"
                  value={userCounts[index]}
                  onChange={(event) => handleChange(index, event)}
                  className="count-input"
                  style={{ 
                    width: "60px", 
                    padding: "8px",
                    textAlign: "center",
                    fontSize: "18px",
                    border: "2px solid #3a7ca5",
                    borderRadius: "6px",
                    backgroundColor: correctFlags[index] === true ? "#d4edda" : 
                                    correctFlags[index] === false ? "#f8d7da" : "white"
                  }}
                />
                {correctFlags[index] !== null && (
                  <div
                    className={`feedback ${
                      correctFlags[index] ? "correct" : "incorrect"
                    }`}
                    style={{
                      marginTop: "8px",
                      fontSize: "24px",
                      animation: "pop 0.3s ease"
                    }}
                  >
                    {correctFlags[index] ? "✔️" : "❌"}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {message && (
            <div className="message" style={{
              margin: "15px auto",
              padding: "10px 20px",
              borderRadius: "10px",
              backgroundColor: message.includes("Congratulations") || message.includes("Awesome") ? 
                "#d4edda" : "#f8d7da",
              color: message.includes("Congratulations") || message.includes("Awesome") ? 
                "#155724" : "#721c24",
              maxWidth: "80%",
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              animation: "bounce 0.5s ease"
            }}>
              {message}
            </div>
          )}
          
          <button 
            onClick={handleRestart} 
            className="restart-button"
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#3a7ca5",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s ease",
              marginTop: "15px",
              alignSelf: "center"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#2a5d7f"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#3a7ca5"}
          >
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default Game;
