import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./ObjectGuessingGame.css";
import axios from "axios";

const ObjectGuessingGame = () => {
  const [objects] = useState([
    {
      name: "apple",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg",
    },
    {
      name: "dog",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg",
    },
    {
      name: "banana",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg",
    },
    {
      name: "flower",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/4c/Flower.jpg",
    },
    {
      name: "book",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Book.jpg",
    },
    {
      name: "cat",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/a/a2/Gray_cat.jpg",
    },
    {
      name: "tree",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/Tree.jpg",
    },
    {
      name: "ball",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/2/2d/Football.jpg",
    },
    {
      name: "bird",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/72/Bird%2C_parakeet.jpg",
    },
    {
      name: "hat",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/d/d3/Baseball_cap.jpg",
    },
    {
      name: "phone",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/6/6e/Smartphone.jpg",
    },
    {
      name: "pizza",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Pizza.jpg",
    },
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

  const {
    listening,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const saveToDatabase = async (data) => {
    const token = localStorage.getItem("authToken");
    console.log(data);

    try {
      const response = await axios
        .post(`http://localhost:5000/api/game/saveGameData`, data, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
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
      const response = await axios.get(
        `http://localhost:5000/api/game/loadGameData/${gameName}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Game state loaded successfully:", response.data);

      setCurrentObjectIndex(response.data.score || 0);
      setScore(response.data.score || 0);
      setChances(10);
      setTime(response.data.duration || 0);
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
      gameName: "ObjectGuessingGame",
      score: score,
      duration: time,
      level: currentObjectIndex + 1,
    };
    const handleUpload = (event) => {
      saveToDatabase(gameData);
    };
    window.addEventListener("beforeunload", handleUpload);
    return () => {
      window.removeEventListener("beforeunload", handleUpload);
    };
  });

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
    <div className="min-h-screen bg-ci bg-custom-gradient text-white flex flex-col items-center justify-center pt-12">
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
          <div className="style">
            <div className="purple"></div>
            <div className="medium-blue"></div>
            <div className="light-blue"></div>
            <div className="red"></div>
            <div className="orange"></div>
            <div className="yellow"></div>
            <div className="cyan"></div>
            <div className="light-green"></div>
            <div className="lime"></div>
            <div className="magenta"></div>
            <div className="lightish-red"></div>
            <div className="pink"></div>
          </div>
          <div className="container max-w-4xl mx-auto px-6 py-4">
            <h1 className="text-4xl font-bold mb-2 text-center text-pink-400">
              🎤 Object Guessing Game
            </h1>

            {gameOver ? (
              <div className="p-6 bg-indigo-700 rounded-lg shadow-lg text-center">
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
                  className="mt-4 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded shadow"
                >
                  🔄 Restart Game
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <p className="bg-indigo-800 p-4 rounded-lg shadow">
                    ⏳ Time: <span className="text-blue-400">{time} sec</span>
                  </p>
                  <p className="bg-indigo-800 p-4 rounded-lg shadow">
                    ⭐ Score: <span className="text-green-400">{score}</span>
                  </p>
                  <p className="bg-indigo-800 p-4 rounded-lg shadow">
                    ❤️ Chances: <span className="text-red-400">{chances}</span>
                  </p>
                </div>

                <div className="p-6 bg-indigo-700 rounded-lg shadow-lg mb-2">
                  <img
                    src={objects[currentObjectIndex].imageUrl}
                    alt={objects[currentObjectIndex].name}
                    className="w-1/3 mx-auto rounded-lg mb-2"
                  />
                  <p className="text-xl font-semibold">What is this?</p>
                  <button
                    onClick={() =>
                      playAudioHint(objects[currentObjectIndex].name)
                    }
                    className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded shadow"
                  >
                    🔊 Hear Pronunciation
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 ">
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

                <div className="text-xl font-bold ">
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
                  <p className="mt-2">
                    🗣️ Listening: {finalTranscript || "..."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectGuessingGame;
