import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./NumberGuessingGame.css";
import axios from 'axios';

const NumberGuessingGame = () => {
  const [objects] = useState([
    {
      name: "1",
      imageUrl:
        "https://img.freepik.com/free-vector/number-one-with-only-one-monkey-tree_1308-75769.jpg",
    },
    {
      name: "2",
      imageUrl:
        "https://img.freepik.com/free-vector/number-two-with-2-monkeys-tree_1308-37845.jpg",
    },
    {
      name: "3",
      imageUrl:
        "https://img.freepik.com/free-vector/number-three-with-3-monkeys-tree_1308-36158.jpg",
    },
    {
      name: "4",
      imageUrl:
        "https://img.freepik.com/free-vector/flashcard-number-4-with-number-word_1308-71269.jpg",
    }
  ]);

  const [currentObjectIndex, setCurrentObjectIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [chances, setChances] = useState(10);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [highScore, setHighScore] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [reloadGame, setReloadGame] = useState(false);
  let selectedchild = (localStorage.getItem('selectedChildId') || '').replace(/^"|"$/g, '');

  const {
    listening,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const saveToDatabase = async (data) => {
    const token = localStorage.getItem('authToken');
    console.log(data);
    
    try {
      const response = await axios.post( `http://localhost:5000/api/game/saveGameData`,data, {
          headers: { 
            "Content-Type": "application/json", 
            'authorization': `Bearer ${token}`,
            'selectedchild': selectedchild,
          },
        }
      ).then((res) => {
        console.log(res.data);
      });
      
      if (!response.ok) throw new Error("Failed to save data.");
      console.log("Game state saved successfully!");
    } catch (error) {
      console.error("Error saving game state to database:", error);
    }
  };

  const loadFromDatabase = async (gameName) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get( `http://localhost:5000/api/game/loadGameData/${gameName}`,{
          headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer ${token}`,
            'selectedchild': selectedchild,
          },
        }
      );
      console.log("Game state loaded successfully:", response.data);
      
      setCurrentObjectIndex(response.data.score  || 0);
      setScore(response.data.score || 0);
      setChances(10);
      setTime(response.data.duration    || 0);
    } catch (error) {
      console.error("Error loading game state from database:", error);
    }
  };
  

  useEffect(() => {
    if (!gameOver) {
      const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [gameOver]);

  useEffect(() => {
    if (chances <= 0) setGameOver(true);
  }, [chances]);

  useEffect(() => {
    if (gameOver && score > highScore) setHighScore(score);
  }, [gameOver, score, highScore]);

  const playAudioHint = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    setIsListening(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

  const checkAnswer = () => {
    const currentObject = objects[currentObjectIndex];
    const userAnswer = finalTranscript.toLowerCase().trim();

    if (userAnswer.includes(currentObject.name.toLowerCase())) {
      setScore((prev) => prev + 1);
      setFeedbackMessage("🎉 Correct!");
      resetTranscript();
      nextObject();
    } else {
      setChances((prev) => prev - 1);
      setFeedbackMessage("❌ Incorrect. Try again!");
    }
  };
  useEffect(() => {
    const gameData = {
      gameName: "NumberGuessingGame",
      score:score,
      duration:time,
      level: currentObjectIndex + 1,
    };
    const handleUpload = (event) => {
      saveToDatabase(gameData);
    }
    if (gameOver) {
      saveToDatabase(gameData);
    }
    // Save game data to the database when the user leaves the page
    window.addEventListener('beforeunload', handleUpload);
    return () => {
      window.removeEventListener('beforeunload', handleUpload);
    }
    
  })

  const nextObject = () => {
    if (currentObjectIndex + 1 < objects.length) {
      setCurrentObjectIndex((prev) => prev + 1);
      setFeedbackMessage("");
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setCurrentObjectIndex(0);
    setScore(0);
    setChances(10);
    setTime(0);
    setGameOver(false);
    setFeedbackMessage("");
    resetTranscript();
  };
  const handleNewGame = () => {
    resetGame();
    setReloadGame(true);
  };

  const handleLoadLastSession = async () => {
    await loadFromDatabase("NumberGuessingGame");
    setReloadGame(true);
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-center text-red-500 font-bold">
        Your browser does not support speech recognition.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 to-slate-600 text-white flex flex-col items-center justify-center pt-9 relative">
      {!reloadGame ? (
        <div className="text-center">
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
      ) : (
        <div>
          <div className="">
            {/* <div className="stars">
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
            </div> */}
          </div>
          <div className="container max-w-4xl mx-auto px-6 py-8 z-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center animate-fade-in">
              🎤 Speech Recognition Game
            </h1>

            {gameOver ? (
              <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
                <h2 className="text-3xl font-bold mb-4">Game Over</h2>
                <p className="text-2xl mb-2">
                  Final Score: <span className="text-green-400">{score}</span>
                </p>
                <p className="text-2xl mb-2">
                  High Score:{" "}
                  <span className="text-yellow-400">{highScore}</span>
                </p>
                <p className="text-2xl">Time Taken: {time} seconds</p>
                <button
                  onClick={resetGame}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow"
                >
                  🔄 Restart Game
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-6 mb-2">
                  <p className="bg-gray-800 p-4 rounded shadow text-center">
                    ⏳ Time: <span className="text-blue-400">{time} sec</span>
                  </p>
                  <p className="bg-gray-800 p-4 rounded shadow text-center">
                    ⭐ Score: <span className="text-green-400">{score}</span>
                  </p>
                  <p className="bg-gray-800 p-4 rounded shadow text-center">
                    ❤️ Chances Left:{" "}
                    <span className="text-red-400">{chances}</span>
                  </p>
                </div>

                <div className="p-6 bg-gray-800 rounded-lg shadow-lg mb-2">
                  <img
                    src={objects[currentObjectIndex].imageUrl}
                    alt={objects[currentObjectIndex].name}
                    className="w-1/3 sm:w-1/4 mx-auto rounded-lg mb-2 animate-fade-in"
                  />
                  <p className="text-xl sm:text-2xl mb-4">What is this?</p>
                  <button
                    onClick={() =>
                      playAudioHint(objects[currentObjectIndex].name)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow"
                  >
                    🔊 Hear Pronunciation
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-2 rounded shadow"
                    onClick={startListening}
                    disabled={listening}
                  >
                    🎤 Start Listening
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded shadow"
                    onClick={stopListening}
                    disabled={!listening}
                  >
                    🛑 Stop Listening
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-2 rounded shadow"
                    onClick={checkAnswer}
                  >
                    ✅ Check Answer
                  </button>
                  <button
                    className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-2 rounded shadow"
                    onClick={resetGame}
                  >
                    🔄 Reset
                  </button>
                </div>

                <div className="text-xl font-bold mt-3">
                  {feedbackMessage && (
                    <p
                      className={
                        feedbackMessage.includes("Correct")
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {feedbackMessage}
                    </p>
                  )}
                  <p className="mt-2">
                    🎙️ Microphone: {isListening ? "On" : "Off"}
                  </p>
                  <p className="mt-2">🗣️ Listening{finalTranscript || "..."}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberGuessingGame;
