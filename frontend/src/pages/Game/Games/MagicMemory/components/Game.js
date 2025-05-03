import React, { useEffect, useState } from 'react';
import SingleCard from './SingleCard';
import axios from 'axios';
import MusicComponent from './music.js';

// Card levels for the game
const levels = [
  [
    { src: "/img/2.jpg", matched: false },
  ],
  [
    { src: "/img/2.jpg", matched: false },
    { src: "/img/3.jpg", matched: false },
  ],
  [
    { src: "/img/2.jpg", matched: false },
    { src: "/img/3.jpg", matched: false },
    { src: "/img/4.jpg", matched: false },
  ],
  [
    { src: "/img/2.jpg", matched: false },
    { src: "/img/3.jpg", matched: false },
    { src: "/img/4.jpg", matched: false },
    { src: "/img/5.jpg", matched: false },
  ],
  [
    { src: "/img/2.jpg", matched: false },
    { src: "/img/3.jpg", matched: false },
    { src: "/img/4.jpg", matched: false },
    { src: "/img/5.jpg", matched: false },
    { src: "/img/6.jpg", matched: false },
  ],
  [
    { src: "/img/6.jpg", matched: false },
    { src: "/img/7.jpg", matched: false },
    { src: "/img/8.jpg", matched: false },
    { src: "/img/9.jpg", matched: false },
    { src: "/img/10.jpg", matched: false },
    { src: "/img/11.jpg", matched: false },
  ],
  [
    { src: "/img/3.jpg", matched: false },
    { src: "/img/5.jpg", matched: false },
    { src: "/img/7.jpg", matched: false },
    { src: "/img/9.jpg", matched: false },
    { src: "/img/10.jpg", matched: false },
    { src: "/img/11.jpg", matched: false },
    { src: "/img/13.jpg", matched: false },
  ],
  [
    { src: "/img/4.jpg", matched: false },
    { src: "/img/5.jpg", matched: false },
    { src: "/img/6.jpg", matched: false },
    { src: "/img/7.jpg", matched: false },
    { src: "/img/10.jpg", matched: false },
    { src: "/img/11.jpg", matched: false },
    { src: "/img/14.jpg", matched: false },
    { src: "/img/15.jpg", matched: false },
  ],
  [
    { src: "/img/2.jpg", matched: false },
    { src: "/img/3.jpg", matched: false },
    { src: "/img/4.jpg", matched: false },
    { src: "/img/8.jpg", matched: false },
    { src: "/img/9.jpg", matched: false },
    { src: "/img/10.jpg", matched: false },
    { src: "/img/13.jpg", matched: false },
    { src: "/img/15.jpg", matched: false },
    { src: "/img/17.jpg", matched: false },
  ],
  [
    { src: "/img/5.jpg", matched: false },
    { src: "/img/6.jpg", matched: false },
    { src: "/img/7.jpg", matched: false },
    { src: "/img/10.jpg", matched: false },
    { src: "/img/11.jpg", matched: false },
    { src: "/img/12.jpg", matched: false },
    { src: "/img/15.jpg", matched: false },
    { src: "/img/16.jpg", matched: false },
    { src: "/img/17.jpg", matched: false },
    { src: "/img/18.jpg", matched: false },
    { src: "/img/19.jpg", matched: false },
  ],
];

function Game() {
  const [username, setUsername] = useState(''); // State for username input
  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [score, setScore] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [history, setHistory] = useState([]);
  const [time, setTime] = useState(0);
  const [levelTime, setLevelTime] = useState(0);
  const [levelStartTime, setLevelStartTime] = useState(Date.now());
  const [completionMessage, setCompletionMessage] = useState('');
  const [transitioning, setTransitioning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started

  // Function to handle username submission
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      alert('Please enter a username');
      return;
    }

    try {
      // Fetch the latest session for the entered username
      const response = await axios.get(`/api/sessions/${username}`);
      if (response.data) {
        const { level, score, turns, duration } = response.data;
        setLevel(level - 1); // Set level (subtract 1 because levels are 0-indexed in the game)
        setScore(score);
        setTurns(turns);
        setTime(duration);
      }
      setGameStarted(true); // Start the game
    } catch (error) {
      console.error('Error fetching latest session:', error);
      setGameStarted(true); // Start the game even if no session is found
    }
  };

  const shuffleCards = () => {
    const currentLevelCards = levels[level];
    const shuffledCards = [...currentLevelCards, ...currentLevelCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setLevelTime(0);
    setLevelStartTime(Date.now());
    setTransitioning(false);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        setScore((prevScore) => prevScore + 10);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (cards.length && cards.every(card => card.matched)) {
      if (level < levels.length - 1) {
        setTransitioning(true);
        setCompletionMessage(`Level ${level + 1} Completed! Moving to Level ${level + 2}...`);
        setTimeout(() => {
          setLevel((prevLevel) => prevLevel + 1);
          setCompletionMessage('');
        }, 2000);
      } else {
        saveSession(); // Save session when the game is completed
      }
    }
  }, [cards]);

  const saveSession = async () => {
    try {
      const response = await axios.post('/api/sessions', {
        username: username,
        level: level + 1,
        score: score,
        turns: turns,
        duration: time,
        status: 'completed',
      });
      setHistory([...history, response.data]); // Appending session data to history
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get('/api/sessions');
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    if (gameStarted) {
      fetchHistory(); // Fetching history when the game starts
      shuffleCards(); // Shuffle cards for the current level
    }
  }, [gameStarted, level]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
      setLevelTime((prevLevelTime) => prevLevelTime + 1);

      if (levelTime >= 60 && !cards.every(card => card.matched)) {
        alert('Time is up! Restarting level...');
        shuffleCards();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [levelTime, cards]);

  if (!gameStarted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-white">
      <div className="w-full max-w-md bg-white/90 rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-700 drop-shadow">Magic Match</h1>
        <form onSubmit={handleUsernameSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-purple-400 px-4 py-2 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-500 border-2 border-white px-4 py-2 rounded-lg text-white font-bold cursor-pointer text-base shadow-md hover:from-pink-500 hover:to-purple-600 transition"
        >
          Start Game
        </button>
        </form>
      </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-8 mt-20 p-4 sm:p-8 bg-gradient-to-br from-white via-purple-50 to-pink-100 rounded-3xl shadow-2xl border-4 border-purple-200 relative z-10 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 rounded-t-2xl" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-200 opacity-30 rounded-full blur-xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-200 opacity-30 rounded-full blur-xl" />

      {/* Music & Title */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <MusicComponent />
        <div className="flex-1">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-500 to-purple-700 drop-shadow-lg tracking-tight">
            Magic Match
          </h1>
          <p className="text-center text-purple-600 font-medium mt-1 text-sm">Match cards to complete the level</p>
        </div>
      </div>

      {/* Controls & Score */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        <button
          className="bg-gradient-to-r from-purple-600 to-pink-500 border-2 border-white px-6 py-3 rounded-xl text-white font-bold cursor-pointer text-lg shadow-lg hover:from-pink-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl w-full md:w-auto"
          onClick={shuffleCards}
        >
          <span className="inline-block mr-2 animate-spin-slow">🔄</span> Restart Level
        </button>
        <div className="score flex flex-wrap gap-4 sm:gap-8 text-base sm:text-xl font-semibold text-purple-800 bg-white/90 backdrop-blur-sm px-5 sm:px-7 py-3 rounded-xl shadow-md justify-center">
          <p className="flex flex-col items-center">
            <span className="font-bold text-pink-600">Level</span> 
            <span className="text-2xl">{level + 1}</span>
          </p>
          <p className="flex flex-col items-center">
            <span className="font-bold text-pink-600">Score</span> 
            <span className="text-2xl">{score}</span>
          </p>
          <p className="flex flex-col items-center">
            <span className="font-bold text-pink-600">Turns</span> 
            <span className="text-2xl">{turns}</span>
          </p>
          <p className="flex flex-col items-center">
            <span className="font-bold text-pink-600">Time</span> 
            <span className="text-2xl">{levelTime}s</span>
          </p>
        </div>
      </div>

      {/* Card Grid */}
      <div className="card-grid mt-8 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6 px-1 sm:px-0">
        {cards.map((card) => (
          <div key={card.id} className="flex justify-center transform hover:scale-102 transition-transform">
            <SingleCard
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled || transitioning}
            />
          </div>
        ))}
      </div>

      {/* Completion Message */}
      {completionMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-pink-600 via-purple-600 to-pink-600 text-white px-10 py-12 rounded-2xl text-2xl sm:text-3xl text-center shadow-2xl border-4 border-white animate-pulse max-w-xs sm:max-w-md mx-auto">
            <div className="animate-bounce inline-block mb-4 text-5xl">🎉</div>
            <div>{completionMessage}</div>
          </div>
        </div>
      )}

      {/* Game History */}
      <div className="history mt-16 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 text-center">Game History</h2>
        
        {history.length === 0 ? (
          <p className="text-center text-purple-600 italic">No game history yet. Complete levels to see your progress!</p>
        ) : (
          <div className="overflow-x-auto">
            <ul className="space-y-3 min-w-[320px]">
              {history.map((session, index) => (
                <li
                  key={index}
                  className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 rounded-xl px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-sm sm:text-base shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <span className="font-semibold text-purple-700">Level:</span> {session.level}
                  </div>
                  <div>
                    <span className="font-semibold text-pink-600">Score:</span> {session.score}
                  </div>
                  <div>
                    <span className="font-semibold text-purple-700">Status:</span> 
                    <span className={`ml-1 ${session.status === 'completed' ? 'text-green-600 font-medium' : 'text-orange-500'}`}>
                      {session.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-pink-600">Date:</span>{" "}
                    {new Date(session.datePlayed).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;